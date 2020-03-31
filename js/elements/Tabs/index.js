const React = require("react")
const _ = require("lodash")
const InteractionManager = require("/utils/InteractionManager")
const ReactNative = require("react-native")
const { View, Animated, ScrollView } = ReactNative

const { ABSOLUTE } = require("/constants/style")
const { deviceWidth } = require("/utils/device")
const { useThis } = require("/hooks")

const DefaultTabBar = require("./DefaultTabBar")
const SceneComponent = require("./SceneComponent")
const ScrollableTabBar = require("./ScrollableTabBar")

const TabsElement = props => {
	const _this = useThis()

	const [_currentPage, set_currentPage] = useState(props.initialPage)
	const [_scrollValue] = useState(new Animated.Value(props.initialPage))
	const [_containerWidth, set_containerWidth] = useState(deviceWidth)
	const [_sceneKeys, set_sceneKeys] = useState(newSceneKeys({ currentPage: props.initialPage }))

	useEffect(() => {
		const scrollFn = () => _this.scrollViewRef && _scrollValue.setValue(props.initialPage)

		InteractionManager.runAfterInteractions(scrollFn)
		// because of contentOffset is not working on Android
		setTimeout(() => _this.scrollViewRef.scrollTo({ x: props.initialPage * _containerWidth, animated: false }))
		return () => {
			_.map(_this.reqz, (v, k) => cancelAnimationFrame(k))
		}
	}, [])
	if (_this.children !== props.children) {
		_this.children = props.children
		updateSceneKeys({ page: _currentPage, children: props.children })
	}

	props.page >= 0 && props.page !== _currentPage && goToPage(props.page)

	const goToPage = pageNumber => {
		const offset = pageNumber * _containerWidth
		_this.scrollViewRef &&
			_this.scrollViewRef.scrollTo({
				x: offset,
				y: 0,
				animated: !props.scrollWithoutAnimation,
			})

		const currentPage = _currentPage
		updateSceneKeys({ page: pageNumber, callback: _onChangeTab.bind(this, currentPage, pageNumber) })
	}

	const renderTabBar = props => {
		return props.renderTabBar === false ? null : props.renderTabBar ? (
			React.cloneElement(props.renderTabBar(props), props)
		) : (
			<DefaultTabBar {...props} />
		)
	}

	const updateSceneKeys = ({ page, children = props.children, callback = () => {} }) => {
		const newKeys = newSceneKeys({
			previousKeys: _sceneKeys,
			currentPage: page,
			children,
		})
		set_currentPage(page)
		set_sceneKeys(newKeys)
	}

	useEffect(() => _this.onUpdateSceneKeys && _this.onUpdateSceneKeys(), [sceneKeys])

	const newSceneKeys = ({ previousKeys = [], currentPage = 0, children = props.children }) => {
		const newKeys = []
		children &&
			getGrandchildren(children).forEach((child, idx) => {
				const key = _makeSceneKey(child, idx)
				if (_keyExists(previousKeys, key) || _shouldRenderSceneKey(idx, currentPage)) newKeys.push(key)
			})
		return newKeys
	}

	const _shouldRenderSceneKey = (idx, currentPageKey) => {
		const numOfSibling = props.prerenderingSiblingsNumber
		return idx < currentPageKey + numOfSibling + 1 && idx > currentPageKey - numOfSibling - 1
	}

	const _keyExists = (sceneKeys, key) => sceneKeys.find(sceneKey => key === sceneKey)

	const _makeSceneKey = (child, idx) => `${child.props.heading}_${idx}`

	const renderScrollableContent = () => {
		const scenes = _composeScenes()
		return (
			<ScrollView
				horizontal
				pagingEnabled
				automaticallyAdjustContentInsets={false}
				keyboardShouldPersistTaps="handled"
				contentOffset={{ x: props.initialPage * _containerWidth }}
				ref={el => (_this.scrollViewRef = el)}
				onScroll={e => {
					const offsetX = e.nativeEvent.contentOffset.x
					_updateScrollValue(offsetX / _containerWidth)
				}}
				onMomentumScrollBegin={_onMomentumScrollBeginAndEnd}
				onMomentumScrollEnd={_onMomentumScrollBeginAndEnd}
				scrollEventThrottle={16}
				scrollsToTop={false}
				showsHorizontalScrollIndicator={false}
				scrollEnabled={!props.locked}
				directionalLockEnabled
				alwaysBounceVertical={false}
				keyboardDismissMode="on-drag"
				{...props.contentProps}>
				{scenes}
			</ScrollView>
		)
	}

	const _composeScenes = () => {
		return _.map(getGrandchildren(), (child, idx) => {
			const key = _makeSceneKey(child, idx)
			return (
				<SceneComponent
					key={child.key}
					shouldUpdated={_shouldRenderSceneKey(idx, _currentPage)}
					style={{ width: _containerWidth }}>
					{_keyExists(_sceneKeys, key) ? child : <View heading={child.props.heading} />}
				</SceneComponent>
			)
		})
	}

	const _onMomentumScrollBeginAndEnd = e => {
		const offsetX = e.nativeEvent.contentOffset.x
		const page = Math.round(offsetX / _containerWidth)
		if (_currentPage !== page) _updateSelectedPage(page)
	}

	const _updateSelectedPage = nextPage => {
		let localNextPage = nextPage(typeof localNextPage === "object")
		localNextPage = nextPage.nativeEvent.position

		const currentPage = _currentPage
		updateSceneKeys({ page: localNextPage, callback: _onChangeTab.bind(this, currentPage, localNextPage) })
	}

	const _onChangeTab = (prevPage, currentPage) =>
		props.onChangeTab({ i: currentPage, ref: getGrandchildren()[currentPage], from: prevPage })

	const _updateScrollValue = value => {
		_scrollValue.setValue(value)
		props.onScroll(value)
	}

	const _handleLayout = e => {
		const { width } = e.nativeEvent.layout
		if (!width || width <= 0 || Math.round(width) === Math.round(_containerWidth)) return

		set_containerWidth(width)
		const req = requestAnimationFrame(() => goToPage(_currentPage))
		_this.reqz[req] = req
	}

	const getGrandchildren = (children = props.children) => React.Children.map(children, child => child)

	const { tabBarPosition } = props
	const overlayTabs = tabBarPosition === "overlayTop" || tabBarPosition === "overlayBottom"
	const c = getGrandchildren()
	const tabBarProps = {
		goToPage: goToPage,
		tabs: _.map(c, child => child.props.heading),
		tabStyle: _.map(c, child => child.props.tabStyle),
		activeTabStyle: _.map(c, child => child.props.activeTabStyle),
		textStyle: _.map(c, child => child.props.textStyle),
		activeTextStyle: _.map(c, child => child.props.activeTextStyle),
		tabHeaderStyle: _.map(c, child => _.get(child.props.heading.props, "style", undefined)),
		disabled: _.map(c, child => child.props.disabled),
		activeTab: _currentPage,
		scrollValue: _scrollValue,
		containerWidth: _containerWidth,
	}

	if (props.tabBarBackgroundColor) tabBarProps.backgroundColor = props.tabBarBackgroundColor
	if (props.tabBarActiveTextColor) tabBarProps.activeTextColor = props.tabBarActiveTextColor
	if (props.tabBarInactiveTextColor) tabBarProps.inactiveTextColor = props.tabBarInactiveTextColor
	if (props.tabBarTextStyle) tabBarProps.textStyle = props.tabBarTextStyle
	if (props.tabBarUnderlineStyle) tabBarProps.underlineStyle = props.tabBarUnderlineStyle
	if (props.tabContainerStyle) tabBarProps.tabContainerStyle = props.tabContainerStyle

	if (overlayTabs) {
		tabBarProps.style = {
			position: ABSOLUTE,
			left: 0,
			right: 0,
			[tabBarPosition === "overlayTop" ? "top" : "bottom"]: 0,
			backgroundColor: "rgba(255, 255, 255, 0.7)",
		}
	}

	return (
		<View style={[styles.container, props.style]} onLayout={_handleLayout}>
			{(tabBarPosition === "top" || tabBarPosition === "overlayTop") && renderTabBar(tabBarProps)}
			{renderScrollableContent()}
			{(tabBarPosition === "bottom" || tabBarPosition === "overlayBottom") && renderTabBar(tabBarProps)}
		</View>
	)
}

// mixins: [TimerMixin]
TabsElement.DefaultTabBar = DefaultTabBar
TabsElement.ScrollableTabBar = ScrollableTabBar

if (__DEV__) {
	const { any, bool, func, number, object, oneOf, string } = require("/utils/propTypes")
	const { style } = require("react-native").ViewPropTypes

	TabsElement.propTypes = {
		tabBarPosition: oneOf(["top", "bottom", "overlayTop", "overlayBottom"]),
		initialPage: number,
		page: number,
		onChangeTab: func,
		onScroll: func,
		renderTabBar: any,
		style,
		contentProps: object,
		scrollWithoutAnimation: bool,
		locked: bool,
		prerenderingSiblingsNumber: number,
	}
}

TabsElement.getDefaultProps = () => {
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
}

const styles = {
	container: {
		flex: 1,
	},
	scrollableContentAndroid: {
		flex: 1,
	},
}

module.exports = TabsElement
