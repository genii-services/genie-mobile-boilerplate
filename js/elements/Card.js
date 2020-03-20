const MODULE_NAME$ = "elements/Card"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View, ViewPropTypes } = require("react-native")
const { connectStyle } = require("/utils/style")

const Card = props => {
	return props.dataArray && props.renderRow ? (
		<FlatList {...props} data={props.dataArray} renderItem={props.renderRow} keyExtractor={(item, index) => index.toString()} />
	) : (
		<View {...props} />
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType, string } = require("prop-types")
	Card.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		// eslint-disable-next-line react/forbid-prop-types
		dataArray: array,
		renderRow: func,
	}
}

module.exports = connectStyle(Card, MODULE_NAME$)
