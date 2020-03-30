const MODULE_NAME$ = "TitleElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const TitleElement = props => {
	return <Text numberOfLines={1} {...props} />
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	TitleElement.propTypes = {
		...Text.propTypes,
		style: oneOfType([object, number, array]),
	}
}

module.exports = forwardRef(TitleElement) //connectStyle(TitleElement, MODULE_NAME$)
