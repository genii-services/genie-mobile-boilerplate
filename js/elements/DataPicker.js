/** 공통 라이브러리 */
const React = require("react")
const PropTypes = require("prop-types")
const _ = require("lodash")
const { Button, Text, ActionSheet } = require("/elements")

const { __find } = require("/utils")
const { fontFamily } = require("/styles")

const DataPicker = props => {
	const handleOnPress = () => {
		const options = _.map(props.options, v => v[props.labelProp])
		//console.debug(DataPicker, options)
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
	//console.debug(DataPicker, value)
	return (
		<Button style={props.buttonStyle} transparent small onPress={handleOnPress}>
			{value ? <Text style={props.textStyle}>{value}</Text> : <Text style={props.placeholderStyle}>{props.placeholder}</Text>}
		</Button>
	)
}

DataPicker.propTypes = {
	...Button.propTypes,
	buttonStyle: Button.propTypes.style,
	textStyle: Text.propTypes.style,
	placeholderStyle: Text.propTypes.style,
	labelProp: PropTypes.string,
	valueProp: PropTypes.any,
}
DataPicker.defaultProps = {
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
		textAlign: "left",
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
		textAlign: "left",
		color: "#606060",
	},
	labelProp: "label",
	valueProp: "value",
}

module.exports = DataPicker
