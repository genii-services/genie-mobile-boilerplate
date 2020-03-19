MODULE_NAME$ = "elements/Title"
console.log(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")
const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const Title = props => {
	return <Text numberOfLines={1} {...props} />
}

Title.propTypes = {
	...Text.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle(Title, MODULE_NAME$)
