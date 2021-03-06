const MODULE_NAME$ = "TitleElement"
console.debug(MODULE_NAME$)

require("react")
const { Text } = require("react-native")

const TitleElement = (props) => {
	return <Text numberOfLines={1} {...props} />
}

if (__DEV__) {
	const { array, number, object, oneOfType } = require("/utils/propTypes")
	TitleElement.propTypes = {
		...Text.propTypes,
		style: oneOfType([object, number, array]),
	}
}

TitleElement.displayName = "Title"

// const { connectStyle } = require("/utils/style")
module.exports = TitleElement //connectStyle(TitleElement, MODULE_NAME$)
