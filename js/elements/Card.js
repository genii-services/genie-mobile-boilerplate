const MODULE_NAME$ = "elements/Card"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View, ViewPropTypes } = require("react-native")

const Card = ({ dataArray, renderRow, ...props }) => {
	return dataArray && renderRow ? (
		<FlatList {...props} data={dataArray} renderItem={renderRow} keyExtractor={(item, index) => index.toString()} />
	) : (
		<View {...props} />
	)
}

if (__DEV__) {
	const { array, func, number, object, oneOfType } = require("/utils/propTypes")
	Card.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		// eslint-disable-next-line react/forbid-prop-types
		dataArray: array,
		renderRow: func,
	}
}

const { connectStyle } = require("/utils/style")
module.exports = connectStyle(Card, MODULE_NAME$)
