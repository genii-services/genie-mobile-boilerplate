const MODULE_NAME$ = "elements/Content"
console.debug(MODULE_NAME$)

const React = require("react")
const { SafeAreaView } = require("react-native")
const { KeyboardAwareScrollView } = require("react-native-keyboard-aware-scroll-view")

const { useState, useStore, useThis } = require("/hooks")
const { itsIphoneX } = require("/utils/device")
const { connectStyle } = require("/utils/style")

const Content = props => {
	const _this = useThis()
	const [theme] = useStore("theme")

	const { children, contentContainerStyle, disableKBDismissScroll, keyboardShouldPersistTaps, padder, style } = props
	const containerStyle = { flex: 1 }
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle

	return itsIphoneX ? (
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
				contentContainerStyle={[{ padding: padder && defaultStyle.contentPadding }, contentContainerStyle]}>
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
			contentContainerStyle={[{ padding: padder && defaultStyle.contentPadding }, contentContainerStyle]}>
			{children}
		</KeyboardAwareScrollView>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	Content.propTypes = {
		disableKBDismissScroll: bool,
		keyboardShouldPersistTaps: string,
		padder: bool,
		style: oneOfType([object, number, array]),
	}
}

module.exports = connectStyle(Content, MODULE_NAME$)
