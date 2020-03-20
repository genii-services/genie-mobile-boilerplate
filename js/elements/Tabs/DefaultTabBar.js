const MODULE_NAME$ = "Tabs/DefaultTabBar"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")
const ReactNative = require("react-native")
const { Animated } = ReactNative

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const variable = require("/styles/themes/default")

const Button = require("./Button")
const TabHeading = require("../TabHeading")
const Text = require("../Text")
const TabContainer = require("../TabContainer")

const DefaultTabBar = props => {
	const [theme] = useStore("theme")

	const renderDefaultTab = (
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
	) => {
		const headerContent = typeof name !== "string" && name.props.children
		const { activeTextColor, inactiveTextColor } = props
		const fontWeight = isTabActive ? "bold" : "normal"
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
			<Button style={{ flex: 1 }} disabled={isDisabled} key={name} onPress={() => onPressHandler(page)}>
				<TabHeading style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
					<Text style={[{ fontSize: tabFontSize }, isTabActive ? activeTextStyle : textStyle, { color: textColor }]}>
						{name}
					</Text>
				</TabHeading>
			</Button>
		) : (
			<Button style={{ flex: 1 }} disabled={isDisabled} key={_.random(1.2, 5.2)} onPress={() => onPressHandler(page)}>
				<TabHeading style={tabHeaderStyle} active={isTabActive}>
					{headerContent}
				</TabHeading>
			</Button>
		)
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const containerWidth = props.containerWidth
	const numberOfTabs = props.tabs.length
	const tabUnderlineStyle = {
		position: "absolute",
		width: containerWidth / numberOfTabs,
		height: 4,
		backgroundColor: variables.topTabBarActiveBorderColor,
		bottom: 0,
	}
	const left = props.scrollValue.interpolate({ inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs] })
	return (
		<TabContainer style={[{ backgroundColor: variables.tabDefaultBg }, props.tabContainerStyle]}>
			{props.tabs.map((name, page) => {
				const isTabActive = props.activeTab === page
				const renderTab = props.renderTab || renderDefaultTab
				return renderTab(
					name,
					page,
					isTabActive,
					props.goToPage,
					props.tabStyle[page],
					props.activeTabStyle[page],
					props.textStyle[page],
					props.activeTextStyle[page],
					props.tabHeaderStyle[page],
					variables.tabFontSize,
					props.disabled[page],
					props.disabledTextColor
				)
			})}
			<Animated.View style={[tabUnderlineStyle, { left }, props.underlineStyle]} />
		</TabContainer>
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string } = require("prop-types")
	const { style } = require("react-native").ViewPropTypes
	DefaultTabBar.propTypes = {
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
}

DefaultTabBar.contextTypes = {
	theme: object,
}

DefaultTabBar.getDefaultProps = () => {
	return {
		activeTextColor: variable.topTabBarActiveTextColor,
		inactiveTextColor: variable.topTabBarTextColor,
		disabledTextColor: variable.tabBarDisabledTextColor,
		backgroundColor: "transparent",
		tabFontSize: variable.tabFontSize,
	}
}

module.exports = connectStyle(DefaultTabBar, MODULE_NAME$)
