const MODULE_NAME$ = "ContentElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { SafeAreaView } = require("react-native")
const { KeyboardAwareScrollView } = require("react-native-keyboard-aware-scroll-view")

const { forwardRef, useStore, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")
const { itsIphoneX } = require("/utils/device")
const { connectStyle } = require("/utils/style")

const ContentElement = ({
	contentContainerStyle,
	disableKBDismissScroll,
	keyboardShouldPersistTaps = "handled",
	padder,
	style,
	...props
}) => {
	const _this = useThis()

	const { stylez } = useStyle(MODULE_NAME$, { contentContainerStyle, padder }, defaultStyle => ({
		container: { flex: 1 },
		contentContainer: [
			{
				padding: padder && defaultStyle.contentPadding,
			},
			contentContainerStyle,
		],
	}))
	const resetScrollToCoords = disableKBDismissScroll ? null : { x: 0, y: 0 }
	return itsIphoneX ? (
		<SafeAreaView style={stylez.container}>
			<KeyboardAwareScrollView
				automaticallyAdjustContentInsets={false}
				resetScrollToCoords={resetScrollToCoords}
				keyboardShouldPersistTaps={keyboardShouldPersistTaps}
				ref={c => {
					_this._scrollview = c
					// if (ref) ref.current = c
				}}
				{...props}
				style={style}
				contentContainerStyle={stylez.contentContainer}
			/>
		</SafeAreaView>
	) : (
		<KeyboardAwareScrollView
			automaticallyAdjustContentInsets={false}
			resetScrollToCoords={resetScrollToCoords}
			keyboardShouldPersistTaps={keyboardShouldPersistTaps}
			ref={c => {
				_this._scrollview = c
				// if (ref) ref.current = c
			}}
			{...props}
			contentContainerStyle={stylez.contentContainer}
		/>
	)
}

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

module.exports = ContentElement //connectStyle(ContentElement, MODULE_NAME$)
