const MODULE_NAME$ = "elements/Textarea"
console.debug(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")
const { TextInput } = require("react-native")

const variables = require("/styles/themes/default")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const Textarea = props => {
	const { useRefs } = require("/hooks")
	const refs = useRefs()

	const getStyle = () => {
		textarea: {
			height: props.rowSpan ? props.rowSpan * 25 : 60
		}
	}

	const prepareRootProps = () => {
		const defaultProps = {
			style: getStyle().textarea,
		}
		return computeProps(props, defaultProps)
	}

	return (
		<TextInput
			ref={c => (refs._textInput = c)}
			{...prepareRootProps()}
			multiline
			placeholderTextColor={props.placeholderTextColor || variables.inputColorPlaceholder}
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={!props.disabled}
		/>
	)
}

Textarea.propTypes = {
	...TextInput.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	rowSpan: PropTypes.number,
	bordered: PropTypes.bool,
	underline: PropTypes.bool,
}

module.exports = connectStyle(Textarea, MODULE_NAME$)
