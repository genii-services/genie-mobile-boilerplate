const MODULE_NAME$ = "Tabs/ScrollableTabBar"
console.debug(MODULE_NAME$)

const React = require("react")
const ReactNative = require("react-native")
const { View, Animated, StyleSheet, ScrollView, Platform, Dimensions } = ReactNative
const { isEqual } = require("lodash")

const { ABSOLUTE, BLACK, BOLD, CENTER, NORMAL, ROW } = require("/constants/style")
const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const defaultThemeStyle = require("/styles/themes/default")

const TabHeading = require("../TabHeading")
const Text = require("../Text")
const Button = require("./Button")

const WINDOW_WIDTH = Dimensions.get("window").width

const ScrollableTabBar = props => {
	const [theme] = useStore("theme")
	const _this = useThis()

	const getDefaultProps = () => {
		return {
			scrollOffset: 52,
			activeTextColor: "navy",
			inactiveTextColor: BLACK,
			backgroundColor: defaultThemeStyle.tabDefaultBg,
			style: {},
			tabStyle: {},
			tabsContainerStyle: {},
			underlineStyle: {},
			tabFontSize: defaultThemeStyle.tabFontSize,
		}
	}

	const getInitialState = () => {
		_this._tabsMeasurements = []
		return {
			_leftTabUnderline: new Animated.Value(0),
			_widthTabUnderline: new Animated.Value(0),
			_containerWidth: null,
		}
	}

	useEffect(() => {
		props.scrollValue.addListener(updateView)
		return () => props.scrollValue.removeListener(updateView)
	}, [])

	const updateView = offset => {
		const position = Math.floor(offset.value)
		const pageOffset = offset.value % 1
		const tabCount = props.tabs.length
		const lastTabPosition = tabCount - 1

		if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) return

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
		newScrollX = newScrollX >= 0 ? newScrollX : 0

		if (Platform.OS === "android") {
			_this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false })
		} else {
			const rightBoundScroll = _this._tabContainerMeasurements.width - _this._containerMeasurements.width
			newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX
			_this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false })
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

	const renderTab = (
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
	) => {
		const headerContent = typeof name !== "string" ? name.props.children : undefined
		const { activeTextColor, inactiveTextColor } = props
		const textColor = isTabActive ? activeTextColor : inactiveTextColor
		const fontWeight = isTabActive ? BOLD : NORMAL

		if (typeof name === "string") {
			return (
				<Button key={`${name}_${page}`} onPress={() => onPressHandler(page)} onLayout={onLayoutHandler}>
					<TabHeading scrollable style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
						<Text style={[isTabActive ? activeTextStyle : textStyle, { fontSize: tabFontSize }]}>{name}</Text>
					</TabHeading>
				</Button>
			)
		}
		return (
			<Button key={`${name}_${page}`} onPress={() => onPressHandler(page)} onLayout={onLayoutHandler}>
				<TabHeading scrollable style={tabHeaderStyle} active={isTabActive}>
					{headerContent}
				</TabHeading>
			</Button>
		)
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

	const onTabContainerLayout = e => {
		_this._tabContainerMeasurements = e.nativeEvent.layout
		let width = _this._tabContainerMeasurements.width
		if (width < WINDOW_WIDTH) {
			width = WINDOW_WIDTH
		}
		set_containerWidth(width)
		updateView({ value: props.scrollValue._value })
	}

	const onContainerLayout = e => {
		_this._containerMeasurements = e.nativeEvent.layout
		updateView({ value: props.scrollValue._value })
	}

	const style = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	const tabUnderlineStyle = {
		position: ABSOLUTE,
		height: 4,
		backgroundColor: style.topTabBarActiveBorderColor,
		bottom: 0,
	}

	const dynamicTabUnderline = {
		left: _leftTabUnderline,
		width: _widthTabUnderline,
	}

	return (
		<View style={[styles.container, { backgroundColor: props.backgroundColor }, props.style]} onLayout={_this.onContainerLayout}>
			<ScrollView
				automaticallyAdjustContentInsets={false}
				ref={scrollView => {
					_this._scrollView = scrollView
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				directionalLockEnabled
				onScroll={props.onScroll}
				bounces={false}
				scrollsToTop={false}>
				<View
					style={[styles.tabs, { width: _containerWidth }, props.tabsContainerStyle]}
					ref={"tabContainer"}
					onLayout={onTabContainerLayout}>
					{props.tabs.map((name, page) => {
						const isTabActive = props.activeTab === page
						const renderTab = props.renderTab || renderTab
						return renderTab(
							name,
							page,
							isTabActive,
							props.goToPage,
							measureTab.bind(this, page),
							props.tabStyle[page],
							props.activeTabStyle[page],
							props.textStyle[page],
							props.activeTextStyle[page],
							props.tabHeaderStyle[page],
							style.tabFontSize
						)
					})}
					<Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, props.underlineStyle]} />
				</View>
			</ScrollView>
		</View>
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string } = require("prop-types")
	const { style } = require("react-native").ViewPropTypes
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

const styles = StyleSheet.create({
	tab: {
		height: 49,
		alignItems: CENTER,
		justifyContent: CENTER,
		paddingLeft: 20,
		paddingRight: 20,
	},
	container: {
		height: 50,
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: "#ccc",
	},
	tabs: {
		flexDirection: ROW,
		justifyContent: "space-around",
	},
})

module.exports = connectStyle(ScrollableTabBar, MODULE_NAME$)
