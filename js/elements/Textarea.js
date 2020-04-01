const MODULE_NAME$ = "TextareaElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const { useRefs } = require("/hooks")
const { useStyle } = require("/coordinators")

const TextareaElement = ({ placeholderTextColor, rowSpan, style, ...props }) => {
	const refs = useRefs()

	const { stylez, defaultStyle } = useStyle(MODULE_NAME$, { rowSpan, style }, defaultStyle => ({
		root: [
			{
				height: rowSpan ? rowSpan * 25 : 60,
			},
			style,
		],
	}))

	return (
		<TextInput
			{...rootProps}
			style={stylez.root}
			ref={c => (refs._textInput = c)}
			multiline
			placeholderTextColor={placeholderTextColor || defaultStyle.placeholderTextColor}
			underlineColorAndroid="rgba(0,0,0,0)"
			editable={!props.disabled}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("/utils/propTypes")
	TextareaElement.propTypes = {
		...TextInput.propTypes,
		style: oneOfType([object, number, array]),
		rowSpan: number,
		bordered: bool,
		underline: bool,
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = TextareaElement //connectStyle(TextareaElement, MODULE_NAME$)
