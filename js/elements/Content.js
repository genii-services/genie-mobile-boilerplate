const MODULE_NAME$ = "elements/Content"
console.debug(MODULE_NAME$)

const React = require("react")
const { SafeAreaView } = require("react-native")
const { KeyboardAwareScrollView } = require("react-native-keyboard-aware-scroll-view")

const { useState, useStore } = require("/hooks")
const variable = require("/styles/themes/default")
const { connectStyle } = require("/utils/style")

const Content = props => {
	const [theme] = useStore("theme")

	const [_orientation, set_orientation] = useState("portrait")

	const layoutChange = val => {
		const maxComp = Math.max(variable.deviceWidth, variable.deviceHeight)

		set_orientation(val.width >= maxComp ? "landscape" : "portrait")
	}

	const { children, contentContainerStyle, disableKBDismissScroll, keyboardShouldPersistTaps, padder, style } = props
	const containerStyle = { flex: 1 }
	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable

	return variables.isIphoneX ? (
		<SafeAreaView style={containerStyle}>
			<KeyboardAwareScrollView
				automaticallyAdjustContentInsets={false}
				resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
				keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
				ref={c => {
					_this._scrollview = c
					_this._root = c
				}}
				{...props}
				style={style}
				contentContainerStyle={[{ padding: padder ? variables.contentPadding : undefined }, contentContainerStyle]}>
				{children}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	) : (
		<KeyboardAwareScrollView
			automaticallyAdjustContentInsets={false}
			resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
			keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
			ref={c => {
				_this._scrollview = c
				_this._root = c
			}}
			{...props}
			contentContainerStyle={[{ padding: padder ? variables.contentPadding : undefined }, contentContainerStyle]}>
			{children}
		</KeyboardAwareScrollView>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("prop-types")

	Content.propTypes = {
		disableKBDismissScroll: bool,
		keyboardShouldPersistTaps: string,
		padder: bool,
		style: oneOfType([object, number, array]),
	}
}

module.exports = connectStyle(Content, MODULE_NAME$)
