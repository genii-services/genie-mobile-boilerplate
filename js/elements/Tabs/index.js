const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const createReactClass = require("create-react-class")
const _ = require("lodash")
const InteractionManager = require("/utils/InteractionManager")
const ReactNative = require("react-native")
const { Dimensions, View, Animated, ScrollView, StyleSheet, Platform, ViewPropTypes } = ReactNative
const TimerMixin = require("react-timer-mixin")

const DefaultTabBar = require("./DefaultTabBar")
const SceneComponent = require("./SceneComponent")
const ScrollableTabBar = require("./ScrollableTabBar")

const Tabs = createReactClass({
	mixins: [TimerMixin],
	statics: {
		DefaultTabBar,
		ScrollableTabBar,
	},

	propTypes: {
		tabBarPosition: PropTypes.oneOf(["top", "bottom", "overlayTop", "overlayBottom"]),
		initialPage: PropTypes.number,
		page: PropTypes.number,
		onChangeTab: PropTypes.func,
		onScroll: PropTypes.func,
		renderTabBar: PropTypes.any,
		style: ViewPropTypes.style,
		contentProps: PropTypes.object,
		scrollWithoutAnimation: PropTypes.bool,
		locked: PropTypes.bool,
		prerenderingSiblingsNumber: PropTypes.number,
	},

	getDefaultProps() {
		return {
			tabBarPosition: "top",
			initialPage: 0,
			page: -1,
			onChangeTab: () => {},
			onScroll: () => {},
			contentProps: {},
			scrollWithoutAnimation: false,
			locked: false,
			prerenderingSiblingsNumber: 0,
		}
	},

	getInitialState() {
		return {
			currentPage: this.props.initialPage,
			scrollValue: new Animated.Value(this.props.initialPage),
			containerWidth: Dimensions.get("window").width,
			sceneKeys: this.newSceneKeys({ currentPage: this.props.initialPage }),
		}
	},

	componentDidMount() {
		const scrollFn = () => this.scrollView && this.state.scrollValue.setValue(this.props.initialPage)

		InteractionManager.runAfterInteractions(scrollFn)
		// because of contentOffset is not working on Android
		setTimeout(() => this.scrollView.scrollTo({ x: this.props.initialPage * this.state.containerWidth, animated: false }))
	},

	UNSAFE_componentWillReceiveProps(props) {
		if (props.children !== this.props.children) {
			this.updateSceneKeys({ page: this.state.currentPage, children: props.children })
		}

		props.page >= 0 && props.page !== this.state.currentPage && this.goToPage(props.page)
	},

	goToPage(pageNumber) {
		const offset = pageNumber * this.state.containerWidth
		this.scrollView &&
			this.scrollView.scrollTo({
				x: offset,
				y: 0,
				animated: !this.props.scrollWithoutAnimation,
			})

		const currentPage = this.state.currentPage
		this.updateSceneKeys({ page: pageNumber, callback: this._onChangeTab.bind(this, currentPage, pageNumber) })
	},

	renderTabBar(props) {
		return this.props.renderTabBar === false ? null : this.props.renderTabBar ? (
			React.cloneElement(this.props.renderTabBar(props), props)
		) : (
			<DefaultTabBar {...props} />
		)
	},

	updateSceneKeys({ page, children = this.props.children, callback = () => {} }) {
		const newKeys = this.newSceneKeys({
			previousKeys: this.state.sceneKeys,
			currentPage: page,
			children,
		})
		this.setState({ currentPage: page, sceneKeys: newKeys }, callback)
	},

	newSceneKeys({ previousKeys = [], currentPage = 0, children = this.props.children }) {
		const newKeys = []
		children &&
			this._children(children).forEach((child, idx) => {
				const key = this._makeSceneKey(child, idx)
				if (this._keyExists(previousKeys, key) || this._shouldRenderSceneKey(idx, currentPage)) newKeys.push(key)
			})
		return newKeys
	},

	_shouldRenderSceneKey(idx, currentPageKey) {
		const numOfSibling = this.props.prerenderingSiblingsNumber
		return idx < currentPageKey + numOfSibling + 1 && idx > currentPageKey - numOfSibling - 1
	},

	_keyExists(sceneKeys, key) {
		return sceneKeys.find(sceneKey => key === sceneKey)
	},

	_makeSceneKey(child, idx) {
		return `${child.props.heading}_${idx}`
	},

	renderScrollableContent() {
		const scenes = this._composeScenes()
		return (
			<ScrollView
				horizontal
				pagingEnabled
				automaticallyAdjustContentInsets={false}
				keyboardShouldPersistTaps="handled"
				contentOffset={{ x: this.props.initialPage * this.state.containerWidth }}
				ref={scrollView => (this.scrollView = scrollView)}
				onScroll={e => {
					const offsetX = e.nativeEvent.contentOffset.x
					this._updateScrollValue(offsetX / this.state.containerWidth)
				}}
				onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
				onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
				scrollEventThrottle={16}
				scrollsToTop={false}
				showsHorizontalScrollIndicator={false}
				scrollEnabled={!this.props.locked}
				directionalLockEnabled
				alwaysBounceVertical={false}
				keyboardDismissMode="on-drag"
				{...this.props.contentProps}>
				{scenes}
			</ScrollView>
		)
	},

	_composeScenes() {
		return _.map(this._children(), (child, idx) => {
			const key = this._makeSceneKey(child, idx)
			return (
				<SceneComponent
					key={child.key}
					shouldUpdated={this._shouldRenderSceneKey(idx, this.state.currentPage)}
					style={{ width: this.state.containerWidth }}>
					{this._keyExists(this.state.sceneKeys, key) ? child : <View heading={child.props.heading} />}
				</SceneComponent>
			)
		})
	},

	_onMomentumScrollBeginAndEnd(e) {
		const offsetX = e.nativeEvent.contentOffset.x
		const page = Math.round(offsetX / this.state.containerWidth)
		if (this.state.currentPage !== page) this._updateSelectedPage(page)
	},

	_updateSelectedPage(nextPage) {
		let localNextPage = nextPage(typeof localNextPage === "object")
		localNextPage = nextPage.nativeEvent.position

		const currentPage = this.state.currentPage
		this.updateSceneKeys({ page: localNextPage, callback: this._onChangeTab.bind(this, currentPage, localNextPage) })
	},

	_onChangeTab(prevPage, currentPage) {
		this.props.onChangeTab({
			i: currentPage,
			ref: this._children()[currentPage],
			from: prevPage,
		})
	},

	_updateScrollValue(value) {
		this.state.scrollValue.setValue(value)
		this.props.onScroll(value)
	},

	_handleLayout(e) {
		const { width } = e.nativeEvent.layout
		if (!width || width <= 0 || Math.round(width) === Math.round(this.state.containerWidth)) return

		this.setState({ containerWidth: width })
		this.requestAnimationFrame(() => this.goToPage(this.state.currentPage))
	},

	_children(children = this.props.children) {
		return React.Children.map(children, child => child)
	},

	render() {
		const { props } = this
		const { tabBarPosition } = props
		const overlayTabs = tabBarPosition === "overlayTop" || tabBarPosition === "overlayBottom"
		const { _children } = this
		const c = _children()
		const tabBarProps = {
			goToPage: this.goToPage,
			tabs: _.map(c, child => child.props.heading),
			tabStyle: _.map(c, child => child.props.tabStyle),
			activeTabStyle: _.map(c, child => child.props.activeTabStyle),
			textStyle: _.map(c, child => child.props.textStyle),
			activeTextStyle: _.map(c, child => child.props.activeTextStyle),
			tabHeaderStyle: _.map(c, child => _.get(child.props.heading.props, "style", undefined)),
			disabled: _.map(c, child => child.props.disabled),
			activeTab: this.state.currentPage,
			scrollValue: this.state.scrollValue,
			containerWidth: this.state.containerWidth,
		}

		if (props.tabBarBackgroundColor) tabBarProps.backgroundColor = props.tabBarBackgroundColor
		if (props.tabBarActiveTextColor) tabBarProps.activeTextColor = props.tabBarActiveTextColor
		if (props.tabBarInactiveTextColor) tabBarProps.inactiveTextColor = props.tabBarInactiveTextColor
		if (props.tabBarTextStyle) tabBarProps.textStyle = props.tabBarTextStyle
		if (props.tabBarUnderlineStyle) tabBarProps.underlineStyle = props.tabBarUnderlineStyle
		if (props.tabContainerStyle) tabBarProps.tabContainerStyle = props.tabContainerStyle

		if (overlayTabs) {
			tabBarProps.style = {
				position: "absolute",
				left: 0,
				right: 0,
				[tabBarPosition === "overlayTop" ? "top" : "bottom"]: 0,
				backgroundColor: "rgba(255, 255, 255, 0.7)",
			}
		}

		return (
			<View style={[styles.container, props.style]} onLayout={this._handleLayout}>
				{(tabBarPosition === "top" || tabBarPosition === "overlayTop") && this.renderTabBar(tabBarProps)}
				{this.renderScrollableContent()}
				{(tabBarPosition === "bottom" || tabBarPosition === "overlayBottom") && this.renderTabBar(tabBarProps)}
			</View>
		)
	},
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollableContentAndroid: {
		flex: 1,
	},
})

module.exports = Tabs
