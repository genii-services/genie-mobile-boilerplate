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
	const PropTypes = require("prop-types")
	Card.propTypes = {
		...ViewPropTypes,
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
		// eslint-disable-next-line react/forbid-prop-types
		dataArray: PropTypes.array,
		renderRow: PropTypes.func,
	}
}

module.exports = connectStyle(Card, MODULE_NAME$)
