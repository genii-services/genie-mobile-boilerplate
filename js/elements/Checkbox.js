const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { TouchableOpacity } = require("react-native")
const IconNB = require("react-native-vector-icons/Ionicons")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")
const variable = require("/styles/themes/default")
const computeProps = require("../utils/computeProps")
const { itsIOS } = require("/utils/device")

class CheckBox extends Component {
	static contextTypes = {
		theme: PropTypes.object,
	}

	getInitialStyle(variables) {
		const { color, checked } = this.props
		return {
			checkStyle: {
				borderColor: color || variables.checkboxBgColor,
				backgroundColor: checked === true ? color || variables.checkboxBgColor : variables.checkboxDefaultColor,
			},
		}
	}

	prepareRootProps(variables) {
		const defaultProps = {
			style: this.getInitialStyle(variables).checkStyle,
		}

		return computeProps(this.props, defaultProps)
	}
	render() {
		const { checked } = this.props
		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable
		const platformStyle = variables.platformStyle
		const platform = variables.platform
		return (
			<TouchableOpacity ref={c => (this._root = c)} {...this.prepareRootProps(variables)}>
				<IconNB
					style={{
						color: checked === true ? variables.checkboxTickColor : variables.checkboxDefaultColor,
						fontSize: variables.CheckboxFontSize,
						lineHeight: variables.CheckboxIconSize,
						marginTop: variables.CheckboxIconMarginTop,
						textShadowRadius: variables.checkboxTextShadowRadius,
					}}
					name={itsIOS && platformStyle !== "material" ? "ios-checkmark" : "md-checkmark"}
				/>
			</TouchableOpacity>
		)
	}
}

CheckBox.propTypes = {
	...TouchableOpacity.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	checked: PropTypes.bool,
	onPress: PropTypes.func,
}

module.exports = connectStyle("NativeBase.CheckBox", {}, mapPropsToStyleNames)(CheckBox)

console.log("CheckBox", "loaded")
