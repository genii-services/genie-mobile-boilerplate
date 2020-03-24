const MODULE_NAME$ = "elements/Header"
console.debug(MODULE_NAME$)

/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
const { get } = require("lodash")
const React = require("react")
const { View, StatusBar, StyleSheet } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore } = require("/hooks")
const defaultThemeStyle = require("/styles/themes/default")

const Header = props => {
	const [theme] = useStore("theme")

	const [_orientation, set_orientation] = useState("portrait")

	const layoutChange = val => {
		const maxComp = Math.max(defaultThemeStyle.deviceWidth, defaultThemeStyle.deviceHeight)
		set_orientation(val.width >= maxComp ? "landscape" : "portrait")
	}

	const calculateHeight = (mode, inSet) => {
		const { style } = props
		let inset = inSet || defaultThemeStyle.Inset

		const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape
		let oldHeight =
			style.height !== undefined
				? style.height
				: style[1]
				? style[1].height
					? style[1].height
					: style[0].height
				: style[0].height

		const height = oldHeight + InsetValues.topInset
		return height
	}

	const calculatePadder = (mode, inSet) => {
		let inset = inSet || defaultThemeStyle.Inset
		const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape
		let topPadder = null
		const style = StyleSheet.flatten(props.style)

		if (style.padding !== undefined || style.paddingTop !== undefined) {
			topPadder = (style.paddingTop ? style.paddingTop : get(style, "padding", 0)) + InsetValues.topInset
		} else {
			topPadder = InsetValues.topInset
		}
		return topPadder
	}

	const { androidStatusBarColor, iosBarStyle, style, transparent, translucent } = props

	const defaultStyle = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	const { platformStyle } = defaultStyle

	return (
		<View onLayout={e => layoutChange(e.nativeEvent.layout)}>
			<StatusBar
				backgroundColor={androidStatusBarColor ? androidStatusBarColor : defaultStyle.statusBarColor}
				barStyle={iosBarStyle ? iosBarStyle : platformStyle === "material" ? "light-content" : defaultStyle.iosStatusbar}
				translucent={transparent ? true : translucent}
			/>
			{defaultStyle.isIphoneX ? (
				<View
					{...props}
					style={[
						style,
						{
							height: calculateHeight(_orientation, defaultStyle.Inset),
							paddingTop: calculatePadder(_orientation, defaultStyle.Inset),
						},
					]}
				/>
			) : (
				<View {...props} />
			)}
		</View>
	)
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const { array, bool, number, object, oneOfType, string } = require("prop-types")

	Header.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		searchBar: bool,
		rounded: bool,
	}
}

module.exports = connectStyle(Header, MODULE_NAME$)
