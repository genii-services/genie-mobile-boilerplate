const MODULE_NAME$ = "elements/Button"
console.debug(MODULE_NAME$)

/* eslint-disable new-cap */
const React = require("react")
const { TouchableOpacity, Platform, View, TouchableNativeFeedback, StyleSheet } = require("react-native")

const { CENTER, ROW, TRANSPARENT } = require("/constants/style")
const { useStore, useRefs } = require("/hooks")
const variable = require("/styles/themes/default")
const { itsIOS } = require("/utils/device")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const Text = require("./Text")

const Button = props => {
	const [theme] = useStore("theme")
	const refs = useRefs()

	const getInitialStyle = () => {
		return {
			borderedBtn: {
				borderWidth: props.bordered ? variable.buttonDefaultBorderWidth : undefined,
				borderRadius: props.rounded && props.bordered ? variable.borderRadiusLarge : variable.buttonDefaultBorderRadius,
			},
		}
	}

	const prepareRootProps = () => {
		const defaultProps = {
			style: getInitialStyle().borderedBtn,
		}

		if (Array.isArray(props.style)) {
			const flattenedStyle = props.style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
			return computeProps({ ...props, style: flattenedStyle }, defaultProps)
		}

		return computeProps(props, defaultProps)
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const children = itsIOS
		? props.children
		: React.Children.map(props.children, child =>
				child && child.type === Text
					? React.cloneElement(child, {
							uppercase: variables.buttonUppercaseAndroidText,
							...child.props,
					  })
					: child
		  )
	if (itsIOS || Platform.OS === "web" || variables.androidRipple === false || Platform.Version < 21) {
		return (
			<TouchableOpacity
				{...prepareRootProps()}
				ref={c => (refs._root = c)}
				activeOpacity={props.activeOpacity > 0 ? props.activeOpacity : variable.buttonDefaultActiveOpacity}>
				{children}
			</TouchableOpacity>
		)
	}
	if (props.rounded) {
		const buttonStyle = { ...prepareRootProps().style }
		const buttonFlex = props.full || props.block ? variable.buttonDefaultFlex : buttonStyle.flex
		return (
			<View style={[{ maxHeight: buttonStyle.height }, buttonStyle, { paddingTop: undefined, paddingBottom: undefined }]}>
				<TouchableNativeFeedback
					ref={c => (refs._root = c)}
					background={TouchableNativeFeedback.Ripple(props.androidRippleColor || variables.androidRippleColor, true)}
					{...prepareRootProps()}>
					<View
						style={[
							// eslint-disable-next-line no-use-before-define
							styles.childContainer,
							{
								paddingTop: buttonStyle.paddingTop,
								paddingBottom: buttonStyle.paddingBottom,
								height: buttonStyle.height,
								flexGrow: buttonFlex,
							},
						]}>
						{children}
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
	return (
		<TouchableNativeFeedback
			ref={c => (refs._root = c)}
			onPress={props.onPress}
			background={
				props.transparent
					? TouchableNativeFeedback.Ripple(TRANSPARENT)
					: TouchableNativeFeedback.Ripple(variables.androidRippleColor, false)
			}
			{...prepareRootProps()}>
			<View {...prepareRootProps()}>{children}</View>
		</TouchableNativeFeedback>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("prop-types")

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

const styles = StyleSheet.create({
	childContainer: {
		flexShrink: 1,
		flexDirection: ROW,
		justifyContent: CENTER,
		alignItems: CENTER,
	},
})

module.exports = connectStyle(Button, "elements/Button")
