const MODULE_NAME$ = "elements/Header"
console.debug(MODULE_NAME$)

/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
const { get } = require("lodash")
const PropTypes = require("prop-types")
const React = require("react")
const { View, StatusBar, StyleSheet, ViewPropTypes } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore } = require("/hooks")
const variable = require("/styles/themes/default")

const Header = props => {
	const [theme] = useStore("theme")

	const [_orientation, set_orientation] = useState("portrait")

	const layoutChange = val => {
		const maxComp = Math.max(variable.deviceWidth, variable.deviceHeight)
		set_orientation(val.width >= maxComp ? "landscape" : "portrait")
	}

	const calculateHeight = (mode, inSet) => {
		const { style } = props
		let inset = inSet || variable.Inset

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
		let inset = inSet || variable.Inset
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

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const platformStyle = variables.platformStyle

	return (
		<View onLayout={e => layoutChange(e.nativeEvent.layout)}>
			<StatusBar
				backgroundColor={androidStatusBarColor ? androidStatusBarColor : variables.statusBarColor}
				barStyle={iosBarStyle ? iosBarStyle : platformStyle === "material" ? "light-content" : variables.iosStatusbar}
				translucent={transparent ? true : translucent}
			/>
			{variables.isIphoneX ? (
				<View
					{...props}
					style={[
						style,
						{
							height: calculateHeight(_orientation, variables.Inset),
							paddingTop: calculatePadder(_orientation, variables.Inset),
						},
					]}
				/>
			) : (
				<View {...props} />
			)}
		</View>
	)
}

Header.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	searchBar: PropTypes.bool,
	rounded: PropTypes.bool,
}

module.exports = connectStyle(Header, MODULE_NAME$)
