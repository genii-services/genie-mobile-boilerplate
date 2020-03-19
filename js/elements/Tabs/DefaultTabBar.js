const MODULE_NAME$ = "Tabs/DefaultTabBar"
console.debug(MODULE_NAME$)

const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const _ = require("lodash")
const ReactNative = require("react-native")
const { Animated, ViewPropTypes } = ReactNative

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")
const variable = require("/styles/themes/default")

const Button = require("./Button")
const TabHeading = require("../TabHeading")
const Text = require("../Text")
const TabContainer = require("../TabContainer")

const DefaultTabBar = props => {
	const [theme] = useStore("theme")
	const renderTabOption = (name, page) => {}

	const renderTab = (
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
		const headerContent = typeof name !== "string" ? name.props.children : undefined
		const { activeTextColor, inactiveTextColor } = this.props
		const fontWeight = isTabActive ? "bold" : "normal"
		const isDisabled = disabled !== undefined
		let textColor
		if (isDisabled) {
			textColor = disabledTextColor
		} else if (isTabActive) {
			textColor = activeTextStyle ? activeTextStyle.color : activeTextColor // activeTextColor: default color for active Tab
		} else {
			textColor = textStyle ? textStyle.color : inactiveTextColor // inactiveTextColor: default color for inactive Tab
		}

		if (typeof name === "string") {
			return (
				<Button style={{ flex: 1 }} disabled={isDisabled} key={name} onPress={() => onPressHandler(page)}>
					<TabHeading style={isTabActive ? activeTabStyle : tabStyle} active={isTabActive}>
						<Text style={[{ fontSize: tabFontSize }, isTabActive ? activeTextStyle : textStyle, { color: textColor }]}>
							{name}
						</Text>
					</TabHeading>
				</Button>
			)
		}
		return (
			<Button style={{ flex: 1 }} disabled={isDisabled} key={_.random(1.2, 5.2)} onPress={() => onPressHandler(page)}>
				<TabHeading style={tabHeaderStyle} active={isTabActive}>
					{headerContent}
				</TabHeading>
			</Button>
		)
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const platformStyle = variables.platformStyle
	const containerWidth = props.containerWidth
	const numberOfTabs = props.tabs.length
	const tabUnderlineStyle = {
		position: "absolute",
		width: containerWidth / numberOfTabs,
		height: 4,
		backgroundColor: variables.topTabBarActiveBorderColor,
		bottom: 0,
	}

	const left = props.scrollValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, containerWidth / numberOfTabs],
	})
	return (
		<TabContainer style={[{ backgroundColor: variables.tabDefaultBg }, props.tabContainerStyle]}>
			{props.tabs.map((name, page) => {
				const isTabActive = props.activeTab === page
				const renderTab = props.renderTab || this.renderTab
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

DefaultTabBar.propTypes = {
	goToPage: PropTypes.func,
	activeTab: PropTypes.number,
	tabs: PropTypes.array,
	backgroundColor: PropTypes.string,
	activeTextColor: PropTypes.string,
	inactiveTextColor: PropTypes.string,
	disabledTextColor: PropTypes.string,
	tabStyle: ViewPropTypes.style,
	renderTab: PropTypes.func,
	underlineStyle: ViewPropTypes.style,
	tabContainerStyle: ViewPropTypes.style,
}

DefaultTabBar.contextTypes = {
	theme: PropTypes.object,
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
