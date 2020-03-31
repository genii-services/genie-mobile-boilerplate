const MODULE_NAME$ = "TextareaElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { TextInput } = require("react-native")

const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const TextareaElement = props => {
	const { rowSpan } = props
	const { useRefs } = require("/hooks")
	const refs = useRefs()

	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const rootProps = computeProps(props, {
		style: {
			height: rowSpan ? rowSpan * 25 : 60,
		},
	})

	return (
		<TextInput
			ref={c => (refs._textInput = c)}
			{...rootProps}
			multiline
			placeholderTextColor={props.placeholderTextColor || defaultStyle.placeholderTextColor}
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

module.exports = TextareaElement //connectStyle(TextareaElement, MODULE_NAME$)
