const MODULE_NAME$ = "elements/List"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View } = require("react-native")

const { connectStyle } = require("/utils/style")

const List = props => {
	const { dataArray } = props

	return dataArray ? (
		<FlatList
			ref={ref => (this._root = ref)}
			data={dataArray}
			renderItem={({ item, index }) => (props.renderItem ? props.renderItem({ item, index }) : props.renderRow(item, 0, index))}
			{...props}
		/>
	) : (
		<View {...props} />
	)
}

module.exports = connectStyle(List, MODULE_NAME$)
