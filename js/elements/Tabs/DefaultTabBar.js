const MODULE_NAME$ = "DefaultTabBarElement"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")
const ReactNative = require("react-native")
const { Animated } = ReactNative

const { FUNCTION } = require("/constants")
const { ABSOLUTE, BOLD, FLEX_START, FLEX_END, NORMAL, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { connectStyle } = require("/utils/style")
const { useState, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const Button = require("./Button")
const TabHeading = require("../TabHeading")
const Text = require("../Text")
const TabContainer = require("../TabContainer")

const DefaultTabBarElement = (props) => {
	const { containerWidth, tabs } = props
	const { stylez, defaultTheme } = useStyle(MODULE_NAME$, { containerWidth, tabs }, (defaultStyle) => {
		const numberOfTabs = tabs.length
		const tabUnderlineStyle = {
			position: ABSOLUTE,
			width: containerWidth / numberOfTabs,
			height: 4,
			backgroundColor: defaultStyle.topTabBarActiveBorderColor,
			bottom: 0,
		}
		const left = props.scrollValue.interpolate({ inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs] })
		return {
			tabContainer: [
				{
					backgroundColor: defaultTheme.tabDefaultBg,
				},
				props.tabContainerStyle,
			],
			view: [tabUnderlineStyle, { left }, props.underlineStyle],
			button: { flex: 1 },
		}
	})

	const renderTab = (name, page) => {
		const isTabActive = props.activeTab === page
		const onPressHandler = props.goToPage
		const tabStyle = props.tabStyle[page]
		const activeTabStyle = props.activeTabStyle[page]
		const textStyle = props.textStyle[page]
		const activeTextStyle = props.activeTextStyle[page]
		const tabHeaderStyle = props.tabHeaderStyle[page]
		const tabFontSize = defaultTheme.tabFontSize
		const disabled = props.disabled[page]
		const disabledTextColor = props.disabledTextColor

		if (typeof props.renderTab === FUNCTION)
			return props.renderTab(
				name,
				page,
				isTabActive,
				onPressHandler,
				tabStyle,
				activeTabStyle,
				textStyle,
				activeTextStyle,
				tabHeaderStyle,
				tabFontSize,
				disabled,
				disabledTextColor
			)

		const headerContent = typeof name !== "string" && name.props.children
		const { activeTextColor, inactiveTextColor } = props
		const fontWeight = isTabActive ? BOLD : NORMAL
		const isDisabled = disabled !== undefined
		let textColor = isDisabled
			? disabledTextColor
			: isTabActive
			? activeTextStyle
				? activeTextStyle.color
				: activeTextColor // activeTextColor: default color for active Tab
			: textStyle
			? textStyle.color
			: inactiveTextColor // inactiveTextColor: default color for inactive Tab

		return typeof name === "string" ? (
			<Button style={stylez.button} disabled={isDisabled} key={name} onPress={() => onPressHandler(page)}>
				<TabHeading style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
					<Text style={[{ fontSize: tabFontSize }, isTabActive ? activeTextStyle : textStyle, { color: textColor }]}>
						{name}
					</Text>
				</TabHeading>
			</Button>
		) : (
			<Button style={stylez.button} disabled={isDisabled} key={_.random(1.2, 5.2)} onPress={() => onPressHandler(page)}>
				<TabHeading style={tabHeaderStyle} active={isTabActive}>
					{headerContent}
				</TabHeading>
			</Button>
		)
	}

	return (
		<TabContainer style={stylez.tabContainer}>
			{tabs.map((name, page) => renderTab(name, page))}
			<Animated.View style={stylez.view} />
		</TabContainer>
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string, ViewPropTypes } = require("/utils/propTypes")
	const { style } = ViewPropTypes
	DefaultTabBarElement.propTypes = {
		goToPage: func,
		activeTab: number,
		tabs: array,
		backgroundColor: string,
		activeTextColor: string,
		inactiveTextColor: string,
		disabledTextColor: string,
		tabStyle: style,
		renderTab: func,
		underlineStyle: style,
		tabContainerStyle: style,
	}

	DefaultTabBarElement.contextTypes = {
		theme: object,
	}
}

DefaultTabBarElement.getDefaultProps = () => {
	return {
		activeTextColor: itsIOS ? "#007aff" : WHITE,
		inactiveTextColor: itsIOS ? "#6b6b6b" : "#b3c7f9",
		disabledTextColor: "#BDBDBD",
		backgroundColor: TRANSPARENT,
		tabFontSize: 15, // defaultThemeStyle.tabFontSize,
	}
}

module.exports = DefaultTabBarElement //connectStyle(DefaultTabBarElement, MODULE_NAME$)
