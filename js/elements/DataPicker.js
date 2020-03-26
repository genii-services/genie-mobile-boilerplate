/** DataPicker Element */
const MODULE_NAME$ = "DataPickerElement"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")

const { ABSOLUTE, FLEX_START, LEFT } = require("/constants/style")
const { __find } = require("/utils")
const { fontFamily } = require("/styles")

const ActionSheet = require("./ActionSheet")
const Button = require("./Button")
const Text = require("./Text")

const DataPickerElement = props => {
	const handleOnPress = () => {
		const options = _.map(props.options, v => v[props.labelProp])
		//console.debug(MODULE_NAME$, options)
		ActionSheet.show(
			{
				style: { fontFamily },
				title: props.title,
				options,
			},
			i => {
				if (props.onPickerConfirm && 0 <= i && options.length > i) {
					const value = props.options[i][props.valueProp]
					props.onPickerConfirm(value)
				}
			}
		)
	}
	const value = __find(props.options, { value: props.value }, props.labelProp)
	//console.debug(MODULE_NAME$, value)
	return (
		<Button style={props.buttonStyle} transparent small onPress={handleOnPress}>
			{value ? <Text style={props.textStyle}>{value}</Text> : <Text style={props.placeholderStyle}>{props.placeholder}</Text>}
		</Button>
	)
}

if (__DEV__) {
	const { any, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	DataPickerElement.propTypes = {
		...Button.propTypes,
		buttonStyle: Button.propTypes.style,
		textStyle: Text.propTypes.style,
		placeholderStyle: Text.propTypes.style,
		labelProp: string,
		valueProp: any,
	}
}

DataPickerElement.defaultProps = {
	...Button.defaultProps,
	buttonStyle: {
		flex: 0.6,
		marginTop: -5,
		marginBottom: -5,
		marginLeft: 0,
		marginRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	textStyle: {
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: 0,
		paddingRight: 0,
		fontFamily,
		fontSize: 15,
		lineHeight: 16,
		textAlign: LEFT,
		color: "#4a4a4a",
	},
	placeholderStyle: {
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: 0,
		paddingRight: 0,
		fontFamily,
		fontSize: 15,
		lineHeight: 16,
		textAlign: LEFT,
		color: "#606060",
	},
	labelProp: "label",
	valueProp: "value",
}

module.exports = DataPickerElement
