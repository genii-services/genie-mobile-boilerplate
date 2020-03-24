const MODULE_NAME$ = "elements/Textarea"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const defaultThemeStyle = require("/styles/themes/default")
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
			placeholderTextColor={props.placeholderTextColor || defaultThemeStyle.inputColorPlaceholder}
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={!props.disabled}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("prop-types")
	Textarea.propTypes = {
		...TextInput.propTypes,
		style: oneOfType([object, number, array]),
		rowSpan: number,
		bordered: bool,
		underline: bool,
	}
}

module.exports = connectStyle(Textarea, MODULE_NAME$)
