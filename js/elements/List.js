const MODULE_NAME$ = "ListElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View } = require("react-native")

const { forwardRef, useRefs } = require("/hooks")
const { connectStyle } = require("/utils/style")

const ListElement = ({ dataArray, renderItem, renderRow, props }) => {
	const refs = useRefs()
	return dataArray ? (
		<FlatList
			data={dataArray}
			renderItem={({ item, index }) => (renderItem ? renderItem({ item, index }) : renderRow(item, 0, index))}
			{...props}
		/>
	) : (
		<View {...props} />
	)
}

module.exports = ListElement //connectStyle(List, MODULE_NAME$)
