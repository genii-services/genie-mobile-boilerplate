const MODULE_NAME$ = "Tabs/ScrollableTabBar"
console.debug(MODULE_NAME$)

const React = require("react")
const ReactNative = require("react-native")
const { View, Animated, ScrollView } = ReactNative
const { isEqual } = require("lodash")

const { ABSOLUTE, BLACK, BOLD, CENTER, NORMAL, ROW } = require("/constants/style")
const { deviceWidth, itsAndroid, itsIOS } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const TabHeading = require("../TabHeading")
const Text = require("../Text")
const Button = require("./Button")

const ScrollableTabBar = (props) => {
	const _this = useThis(() => {
		_tabsMeasurements: []
	})
	const [_leftTabUnderline] = useState(() => new Animated.Value(0))
	const [_widthTabUnderline] = useState(() => new Animated.Value(0))
	const [_containerWidth, set_containerWidth] = useState(null)

	useEffect(() => {
		props.scrollValue.addListener(updateView)
		return () => props.scrollValue.removeListener(updateView)
	}, [])

	const updateView = (offset) => {
		const position = Math.floor(offset.value)
		const pageOffset = offset.value % 1
		const tabCount = props.tabs.length
		const lastTabPosition = tabCount - 1

		if (tabCount === 0 || offset.value < 0 || lastTabPosition < offset.value) return

		if (necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
			updateTabPanel(position, pageOffset)
			updateTabUnderline(position, pageOffset, tabCount)
		}
	}

	const necessarilyMeasurementsCompleted = (position, isLastTab) => {
		return (
			_this._tabsMeasurements[position] &&
			(isLastTab || _this._tabsMeasurements[position + 1]) &&
			_this._tabContainerMeasurements &&
			_this._containerMeasurements
		)
	}

	const updateTabPanel = (position, pageOffset) => {
		const containerWidth = _this._containerMeasurements.width
		const tabWidth = _this._tabsMeasurements[position].width
		const nextTabMeasurements = _this._tabsMeasurements[position + 1]
		const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0
		const tabOffset = _this._tabsMeasurements[position].left
		const absolutePageOffset = pageOffset * tabWidth
		let newScrollX = tabOffset + absolutePageOffset

		// center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
		newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2
		newScrollX = 0 <= newScrollX ? newScrollX : 0

		if (itsAndroid) {
			_this.scrollViewRef.scrollTo({ x: newScrollX, y: 0, animated: false })
		} else {
			const rightBoundScroll = _this._tabContainerMeasurements.width - _this._containerMeasurements.width
			newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX
			_this.scrollViewRef.scrollTo({ x: newScrollX, y: 0, animated: false })
		}
	}

	const updateTabUnderline = (position, pageOffset, tabCount) => {
		const lineLeft = _this._tabsMeasurements[position].left
		const lineRight = _this._tabsMeasurements[position].right

		if (position < tabCount - 1) {
			const nextTabLeft = _this._tabsMeasurements[position + 1].left
			const nextTabRight = _this._tabsMeasurements[position + 1].right

			const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft
			const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * lineRight

			_leftTabUnderline.setValue(newLineLeft)
			_widthTabUnderline.setValue(newLineRight - newLineLeft)
		} else {
			_leftTabUnderline.setValue(lineLeft)
			_widthTabUnderline.setValue(lineRight - lineLeft)
		}
	}

	const measureTab = (page, event) => {
		const { x, width, height } = event.nativeEvent.layout
		_this._tabsMeasurements[page] = { left: x, right: x + width, width, height }
		updateView({ value: props.scrollValue._value })
	}

	// If the tabs change, force the width of the tabs container to be recalculated
	if (!isEqual(_this.tabs, props.tabs) && _containerWidth) {
		_this.tabs = props.tabs
		set_containerWidth(null)
	}

	const { stylez, defaultTheme } = useStyle(MODULE_NAME$, {}, (defaultStyle) => {
		const tabUnderline = {
			position: ABSOLUTE,
			height: 4,
			backgroundColor: defaultStyle.topTabBarActiveBorderColor,
			bottom: 0,
		}
		return {
			container: [
				{
					height: 50,
					borderWidth: 1,
					borderTopWidth: 0,
					borderLeftWidth: 0,
					borderRightWidth: 0,
					borderColor: "#ccc",
				},
				{ backgroundColor: props.backgroundColor },
				props.style,
			],
			tabs: [
				{
					flexDirection: ROW,
					justifyContent: "space-around",
				},
				{ width: _containerWidth },
				props.tabsContainerStyle,
			],
			tabUnderline,
			view: [
				tabUnderline,
				{
					left: _leftTabUnderline,
					width: _widthTabUnderline,
				},
				props.underlineStyle,
			],
		}
	})

	// RENDERERS

	const renderTab = (name, page, onPressHandler, onLayoutHandler) => {
		const isTabActive = props.activeTab === page
		const tabStyle = props.tabStyle[page]
		const activeTabStyle = props.activeTabStyle[page]
		const textStyle = props.textStyle[page]
		const activeTextStyle = props.activeTextStyle[page]
		const tabHeaderStyle = props.tabHeaderStyle[page]
		const tabFontSize = defaultTheme.tabFontSize

		if (typeof props.renderTab === FUNCTION)
			return props.renderTab(
				name,
				page,
				isTabActive,
				onPressHandler,
				onLayoutHandler,
				tabStyle,
				activeTabStyle,
				textStyle,
				activeTextStyle,
				tabHeaderStyle,
				tabFontSize
			)
		if (typeof name === "string")
			return (
				<Button key={`${name}_${page}`} onPress={() => onPressHandler(page)} onLayout={onLayoutHandler}>
					<TabHeading scrollable style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
						<Text style={[isTabActive ? activeTextStyle : textStyle, { fontSize: tabFontSize }]}>{name}</Text>
					</TabHeading>
				</Button>
			)
		const headerContent = typeof name !== "string" && name.props.children
		return (
			<Button key={`${name}_${page}`} onPress={() => onPressHandler(page)} onLayout={onLayoutHandler}>
				<TabHeading scrollable style={tabHeaderStyle} active={isTabActive}>
					{headerContent}
				</TabHeading>
			</Button>
		)
	}

	// HANDLERS

	const onTabContainerLayout = (e) => {
		_this._tabContainerMeasurements = e.nativeEvent.layout
		let width = _this._tabContainerMeasurements.width
		if (width < deviceWidth) width = deviceWidth

		set_containerWidth(width)
		updateView({ value: props.scrollValue._value })
	}

	const onContainerLayout = (e) => {
		_this._containerMeasurements = e.nativeEvent.layout
		updateView({ value: props.scrollValue._value })
	}

	return (
		<View style={stylez.container} onLayout={onContainerLayout}>
			<ScrollView
				automaticallyAdjustContentInsets={false}
				ref={(el) => (_this.scrollViewRef = el)}
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				directionalLockEnabled
				onScroll={props.onScroll}
				bounces={false}
				scrollsToTop={false}>
				<View style={stylez.tabs} ref={(el) => (_this.tabContainerRef = el)} onLayout={onTabContainerLayout}>
					{props.tabs.map((name, page) => renaderTab(name, page, props.goToPage, measureTab.bind(this, page)))}
					<Animated.View style={stylez.view} />
				</View>
			</ScrollView>
		</View>
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string, ViewPropTypes } = require("/utils/propTypes")
	const { style } = ViewPropTypes
	ScrollableTabBar.propTypes = {
		goToPage: func,
		activeTab: number,
		tabs: array,
		backgroundColor: string,
		activeTextColor: string,
		inactiveTextColor: string,
		scrollOffset: number,
		style: style,
		tabStyle: style,
		tabsContainerStyle: style,
		renderTab: func,
		underlineStyle: style,
		onScroll: func,
	}
}

ScrollableTabBar.getDefaultProps = () => ({
	scrollOffset: 52,
	activeTextColor: "navy",
	inactiveTextColor: BLACK,
	backgroundColor: itsIOS ? "#F8F8F8" : "#3F51B5", // defaultThemeStyle.tabDefaultBg,
	style: {},
	tabStyle: {},
	tabsContainerStyle: {},
	underlineStyle: {},
	tabFontSize: 15, // defaultThemeStyle.tabFontSize,
})

module.exports = ScrollableTabBar //connectStyle(ScrollableTabBar, MODULE_NAME$)
