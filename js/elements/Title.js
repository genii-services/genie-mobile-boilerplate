const MODULE_NAME$ = "TitleElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const TitleElement = props => {
	return <Text numberOfLines={1} {...props} />
}

if (__DEV__) {
	const { array, number, object, oneOfType } = require("/utils/propTypes")
	TitleElement.propTypes = {
		...Text.propTypes,
		style: oneOfType([object, number, array]),
	}
}

module.exports = TitleElement //connectStyle(TitleElement, MODULE_NAME$)
