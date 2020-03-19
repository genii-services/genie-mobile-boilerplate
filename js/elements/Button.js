const MODULE_NAME$ = "elements/Button"
console.debug(MODULE_NAME$)

/* eslint-disable new-cap */
const React = require("react")
const PropTypes = require("prop-types")
const { TouchableOpacity, Platform, View, TouchableNativeFeedback, StyleSheet } = require("react-native")

const { useStore } = require("/hooks")

const variable = require("/styles/themes/default")
const { itsIOS } = require("/utils/device")
const computeProps = require("/utils/computeProps")
const { connectStyle } = require("/utils/style")

const Text = require("./Text")

const Button = props => {
	const [theme] = useStore("theme")

	const getInitialStyle = () => {
		return {
			borderedBtn: {
				borderWidth: this.props.bordered ? variable.buttonDefaultBorderWidth : undefined,
				borderRadius:
					this.props.rounded && this.props.bordered ? variable.borderRadiusLarge : variable.buttonDefaultBorderRadius,
			},
		}
	}

	const prepareRootProps = () => {
		const defaultProps = {
			style: this.getInitialStyle().borderedBtn,
		}

		if (Array.isArray(this.props.style)) {
			const flattenedStyle = this.props.style.reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
			return computeProps({ ...this.props, style: flattenedStyle }, defaultProps)
		}

		return computeProps(this.props, defaultProps)
	}

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	const children = itsIOS
		? this.props.children
		: React.Children.map(this.props.children, child =>
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
				{...this.prepareRootProps()}
				ref={c => (this._root = c)}
				activeOpacity={this.props.activeOpacity > 0 ? this.props.activeOpacity : variable.buttonDefaultActiveOpacity}>
				{children}
			</TouchableOpacity>
		)
	}
	if (this.props.rounded) {
		const buttonStyle = { ...this.prepareRootProps().style }
		const buttonFlex = this.props.full || this.props.block ? variable.buttonDefaultFlex : buttonStyle.flex
		return (
			<View style={[{ maxHeight: buttonStyle.height }, buttonStyle, { paddingTop: undefined, paddingBottom: undefined }]}>
				<TouchableNativeFeedback
					ref={c => (this._root = c)}
					background={TouchableNativeFeedback.Ripple(this.props.androidRippleColor || variables.androidRippleColor, true)}
					{...this.prepareRootProps()}>
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
			ref={c => (this._root = c)}
			onPress={this.props.onPress}
			background={
				this.props.transparent
					? TouchableNativeFeedback.Ripple("transparent")
					: TouchableNativeFeedback.Ripple(variables.androidRippleColor, false)
			}
			{...this.prepareRootProps()}>
			<View {...this.prepareRootProps()}>{children}</View>
		</TouchableNativeFeedback>
	)
}

Button.propTypes = {
	...TouchableOpacity.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	block: PropTypes.bool,
	primary: PropTypes.bool,
	transparent: PropTypes.bool,
	success: PropTypes.bool,
	danger: PropTypes.bool,
	warning: PropTypes.bool,
	info: PropTypes.bool,
	bordered: PropTypes.bool,
	disabled: PropTypes.bool,
	rounded: PropTypes.bool,
	large: PropTypes.bool,
	small: PropTypes.bool,
	active: PropTypes.bool,
}

const styles = StyleSheet.create({
	childContainer: {
		flexShrink: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
})

module.exports = connectStyle(Button, "elements/Button")
