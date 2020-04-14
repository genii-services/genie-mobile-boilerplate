const MODULE_NAME$ = "ButtonElement"
console.debug(MODULE_NAME$)

/* eslint-disable new-cap */
const React = require("react")
const { TouchableOpacity, Platform, View, TouchableNativeFeedback } = require("react-native")
const { Ripple } = TouchableNativeFeedback
const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const { forwardRef, useStore, useRefs } = require("/hooks")

const { itsIOS, itsWeb } = require("/utils/device")
const { mergeStyle } = require("/utils/style")
const { useStyle } = require("/coordinators")

const Text = require("./Text")

const defaultThemeStyle = {
	buttonDefaultActiveOpacity: 0.5,
	buttonDefaultFlex: 1,
	buttonDefaultBorderRadius: 2,
	buttonDefaultBorderWidth: 1,
	borderRadiusLarge: 15 * 3.8, // fontSize * 3.8,
}

const ButtonElement = ({ style, transparent, onPress, ...props }) => {
	const { bordered, rounded } = props
	const { stylez, defaultTheme } = useStyle(MODULE_NAME$, { style, bordered, rounded }, (defaultStyle) => {
		const stylez = {
			button: mergeStyle(style, {
				borderWidth: bordered && defaultThemeStyle.buttonDefaultBorderWidth,
				borderRadius: rounded && bordered ? defaultThemeStyle.borderRadiusLarge : defaultThemeStyle.buttonDefaultBorderRadius,
			}),
		}
		if (rounded) {
			const buttonFlex = props.full || props.block ? defaultThemeStyle.buttonDefaultFlex : buttonStyle.flex
			stylez.outerViewStyle = [
				{ maxHeight: buttonStyle.height },
				buttonStyle,
				{ paddingTop: undefined, paddingBottom: undefined },
			]
			stylez.innerViewStyle = {
				flexShrink: 1,
				flexDirection: ROW,
				justifyContent: CENTER,
				alignItems: CENTER,

				paddingTop: buttonStyle.paddingTop,
				paddingBottom: buttonStyle.paddingBottom,
				height: buttonStyle.height,
				flexGrow: buttonFlex,
			}
		}
		return stylez
	})

	const children = itsIOS
		? props.children
		: React.Children.map(props.children, (child) =>
				child && child.type === Text
					? React.cloneElement(child, {
							uppercase: defaultTheme.buttonUppercaseAndroidText,
							...child.props,
					  })
					: child
		  )
	const buttonStyle = stylez.button
	if (itsIOS || itsWeb || defaultTheme.androidRipple === false || Platform.Version < 21) {
		return (
			<TouchableOpacity
				{...props}
				style={buttonStyle}
				activeOpacity={0 < props.activeOpacity ? props.activeOpacity : defaultThemeStyle.buttonDefaultActiveOpacity}>
				{children}
			</TouchableOpacity>
		)
	}
	if (rounded) {
		return (
			<View style={stylez.outerViewStyle}>
				<TouchableNativeFeedback
					onPress={onPress}
					background={Ripple(props.androidRippleColor || defaultTheme.androidRippleColor, true)}
					{...props}
					style={buttonStyle}>
					<View style={stylez.innerViewStyle}>{children}</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
	return (
		<TouchableNativeFeedback
			onPress={onPress}
			background={transparent ? Ripple(TRANSPARENT) : Ripple(defaultTheme.androidRippleColor, false)}
			{...props}
			style={buttonStyle}>
			<View {...props} style={buttonStyle}>
				{children}
			</View>
		</TouchableNativeFeedback>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	ButtonElement.propTypes = {
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

// const { connectStyle } = require("/utils/style")
module.exports = ButtonElement //connectStyle(ButtonElement, MODULE_NAME$)
