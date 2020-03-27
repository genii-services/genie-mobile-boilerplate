const MODULE_NAME$ = "DefaultTabBarElement"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")
const ReactNative = require("react-native")
const { Animated } = ReactNative

const { ABSOLUTE, BOLD, FLEX_START, FLEX_END, NORMAL, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")

const Button = require("./Button")
const TabHeading = require("../TabHeading")
const Text = require("../Text")
const TabContainer = require("../TabContainer")

const DefaultTabBarElement = props => {
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

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const containerWidth = props.containerWidth
	const numberOfTabs = props.tabs.length
	const tabUnderlineStyle = {
		position: ABSOLUTE,
		width: containerWidth / numberOfTabs,
		height: 4,
		backgroundColor: style.topTabBarActiveBorderColor,
		bottom: 0,
	}
	const left = props.scrollValue.interpolate({ inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs] })
	return (
		<TabContainer style={[{ backgroundColor: style.tabDefaultBg }, props.tabContainerStyle]}>
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
					style.tabFontSize,
					props.disabled[page],
					props.disabledTextColor
				)
			})}
			<Animated.View style={[tabUnderlineStyle, { left }, props.underlineStyle]} />
		</TabContainer>
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string } = require("/utils/propTypes")
	const { style } = require("react-native").ViewPropTypes
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

module.exports = connectStyle(DefaultTabBarElement, MODULE_NAME$)
