const MODULE_NAME$ = "HeaderElement"
console.debug(MODULE_NAME$)

/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
const _ = require("lodash")
const React = require("react")
const { View, StatusBar } = require("react-native")

const { screen, itsIphoneX } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { forwardRef, useState, useStore } = require("/hooks")

const Header = forwardRef((props, ref) => {
	const { androidStatusBarColor, iosBarStyle, transparent, translucent } = props

	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const { platformStyle } = defaultStyle

	let viewStyle
	if (itsIphoneX) {
		const style = StyleSheet.flatten(props.style)
		const inset = defaultStyle.Inset
		const InsetValues = screen.isPortrait() ? inset.portrait : inset.landscape
		const oldHeight = style.height || style[1] ? style[1].height || style[0].height : style[0].height
		const height = oldHeight + InsetValues.topInset
		const paddingTop =
			style.paddingTop || style.padding
				? (style.paddingTop ? style.paddingTop : _.get(style, "padding", 0)) + InsetValues.topInset
				: InsetValues.topInset
		viewStyle = [style, { height, paddingTop }]
	}

	return (
		<View ref={ref}>
			<StatusBar
				backgroundColor={androidStatusBarColor ? androidStatusBarColor : defaultStyle.statusBarColor}
				barStyle={iosBarStyle || platformStyle === "material" ? "light-content" : defaultStyle.iosStatusbar}
				translucent={transparent ? true : translucent}
			/>
			{itsIphoneX ? <View {...props} style={viewStyle} /> : <View {...props} />}
		</View>
	)
})

if (__DEV__) {
	const { array, bool, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	Header.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		searchBar: bool,
		rounded: bool,
	}
}

module.exports = connectStyle(Header, MODULE_NAME$)
