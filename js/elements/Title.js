const MODULE_NAME$ = "elements/Title"
console.debug(MODULE_NAME$)

const React = require("react")
const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const Title = props => {
	return <Text numberOfLines={1} {...props} />
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	Title.propTypes = {
		...Text.propTypes,
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	}
}

module.exports = connectStyle(Title, MODULE_NAME$)
