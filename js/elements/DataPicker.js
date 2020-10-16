/** DataPicker Element */
const MODULE_NAME$ = "DataPickerElement"
console.debug(MODULE_NAME$)

require("react")
const _ = require("lodash")

const { LEFT } = require("/constants/style")
const { __find } = require("/utils")

const ActionSheet = require("./ActionSheet")
const Button = require("./Button")
const Text = require("./Text")

const DataPickerElement = (props) => {
	const handleOnPress = () => {
		const options = _.map(props.options, (v) => v[props.labelProp])
		//console.debug(MODULE_NAME$, options)
		ActionSheet.show(
			{
				style: stylez.actionSheet,
				title: props.title,
				options,
			},
			(i) => {
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
	const { any, string } = require("/utils/propTypes")
	DataPickerElement.propTypes = {
		...Button.propTypes,
		buttonStyle: Button.propTypes.style,
		textStyle: Text.propTypes.style,
		placeholderStyle: Text.propTypes.style,
		labelProp: string,
		valueProp: any,
	}
}

DataPickerElement.getDefaultProps = { fontFamily } = {
	...Button.defaultProps,
	actionSheet: {
		// fontFamily,
	},
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
		// fontFamily,
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
		// fontFamily,
		fontSize: 15,
		lineHeight: 16,
		textAlign: LEFT,
		color: "#606060",
	},
	labelProp: "label",
	valueProp: "value",
}

DataPickerElement.displayName = "DataPicker"

module.exports = DataPickerElement
