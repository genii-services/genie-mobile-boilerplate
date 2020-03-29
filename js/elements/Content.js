const MODULE_NAME$ = "ContentElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { SafeAreaView } = require("react-native")
const { KeyboardAwareScrollView } = require("react-native-keyboard-aware-scroll-view")

const { forwardRef, useStore, useThis } = require("/hooks")
const { itsIphoneX } = require("/utils/device")
const { connectStyle } = require("/utils/style")

const ContentElement = forwardRef(
	({ contentContainerStyle, disableKBDismissScroll, keyboardShouldPersistTaps = "handled", padder, style, ...props }, ref) => {
		const _this = useThis()
		const [theme] = useStore("theme")
		const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle
		const containerStyle = { flex: 1 }
		const resetScrollToCoords = disableKBDismissScroll ? null : { x: 0, y: 0 }
		contentContainerStyle = [{ padding: padder && defaultStyle.contentPadding }, contentContainerStyle]
		return itsIphoneX ? (
			<SafeAreaView style={containerStyle}>
				<KeyboardAwareScrollView
					automaticallyAdjustContentInsets={false}
					resetScrollToCoords={resetScrollToCoords}
					keyboardShouldPersistTaps={keyboardShouldPersistTaps}
					ref={c => {
						_this._scrollview = c
						if (ref) ref.current = c
					}}
					{...props}
					style={style}
					contentContainerStyle={contentContainerStyle}
				/>
			</SafeAreaView>
		) : (
			<KeyboardAwareScrollView
				automaticallyAdjustContentInsets={false}
				resetScrollToCoords={resetScrollToCoords}
				keyboardShouldPersistTaps={keyboardShouldPersistTaps}
				ref={c => {
					_this._scrollview = c
					if (ref) ref.current = c
				}}
				{...props}
				contentContainerStyle={contentContainerStyle}
			/>
		)
	}
)

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	ContentElement.propTypes = {
		disableKBDismissScroll: bool,
		keyboardShouldPersistTaps: string,
		padder: bool,
		style: oneOfType([object, number, array]),
	}
}

ContentElement.getDefaultStyle = ({ TRANSPARENT }) => {
	return {
		flex: 1,
		backgroundColor: TRANSPARENT,
		SegmentElement: {
			borderWidth: 0,
			backgroundColor: TRANSPARENT,
		},
	}
}

module.exports = connectStyle(ContentElement, MODULE_NAME$)
