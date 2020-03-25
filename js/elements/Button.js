const MODULE_NAME$ = "elements/Button"
console.debug(MODULE_NAME$)

/* eslint-disable new-cap */
const React = require("react")
const { TouchableOpacity, Platform, View, TouchableNativeFeedback } = require("react-native")
const { Ripple } = TouchableNativeFeedback
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const { useStore, useRefs } = require("/hooks")

const { itsIOS, itsWeb } = require("/utils/device")
const { connectStyle, mergeStyle } = require("/utils/style")

const Text = require("./Text")

const defaultThemeStyle = {
	buttonDefaultActiveOpacity: 0.5,
	buttonDefaultFlex: 1,
	buttonDefaultBorderRadius: 2,
	buttonDefaultBorderWidth: 1,
	borderRadiusLarge: 15 * 3.8, // fontSizeBase * 3.8,
}

const Button = ({ style, ...props }) => {
	const refs = useRefs()

	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle

	const rootStyle = mergeStyle(style, {
		borderWidth: props.bordered && defaultThemeStyle.buttonDefaultBorderWidth,
		borderRadius:
			props.rounded && props.bordered ? defaultThemeStyle.borderRadiusLarge : defaultThemeStyle.buttonDefaultBorderRadius,
	})

	const children = itsIOS
		? props.children
		: React.Children.map(props.children, child =>
				child && child.type === Text
					? React.cloneElement(child, {
							uppercase: defaultStyle.buttonUppercaseAndroidText,
							...child.props,
					  })
					: child
		  )
	if (itsIOS || itsWeb || defaultStyle.androidRipple === false || Platform.Version < 21) {
		return (
			<TouchableOpacity
				{...props}
				style={rootStyle}
				ref={c => (refs._root = c)}
				activeOpacity={0 < props.activeOpacity ? props.activeOpacity : defaultThemeStyle.buttonDefaultActiveOpacity}>
				{children}
			</TouchableOpacity>
		)
	}
	if (props.rounded) {
		const buttonStyle = rootStyle
		const buttonFlex = props.full || props.block ? defaultThemeStyle.buttonDefaultFlex : buttonStyle.flex
		const outerViewStyle = [{ maxHeight: buttonStyle.height }, buttonStyle, { paddingTop: undefined, paddingBottom: undefined }]
		const innerViewStyle = [
			// eslint-disable-next-line no-use-before-define
			styles.childContainer,
			{
				paddingTop: buttonStyle.paddingTop,
				paddingBottom: buttonStyle.paddingBottom,
				height: buttonStyle.height,
				flexGrow: buttonFlex,
			},
		]
		return (
			<View style={outerViewStyle}>
				<TouchableNativeFeedback
					ref={c => (refs._root = c)}
					background={Ripple(props.androidRippleColor || defaultStyle.androidRippleColor, true)}
					{...props}
					style={rootStyle}>
					<View style={innerViewStyle}>{children}</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
	return (
		<TouchableNativeFeedback
			ref={c => (refs._root = c)}
			onPress={props.onPress}
			background={props.transparent ? Ripple(TRANSPARENT) : Ripple(style.androidRippleColor, false)}
			{...props}
			style={rootStyle}>
			<View {...props} style={rootStyle}>
				{children}
			</View>
		</TouchableNativeFeedback>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	Button.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		block: bool,
		primary: bool,
		transparent: bool,
		success: bool,
		danger: bool,
		warning: bool,
		info: bool,
		bordered: bool,
		disabled: bool,
		rounded: bool,
		large: bool,
		small: bool,
		active: bool,
	}
}

const styles = {
	childContainer: {
		flexShrink: 1,
		flexDirection: ROW,
		justifyContent: CENTER,
		alignItems: CENTER,
	},
}

module.exports = connectStyle(Button, "elements/Button")
