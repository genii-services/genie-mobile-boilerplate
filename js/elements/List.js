const MODULE_NAME$ = "ListElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View } = require("react-native")

const { useRefs } = require("/hooks")
const { connectStyle } = require("/utils/style")

const List = ({ dataArray, renderItem, renderRow, props }) => {
	const refs = useRefs()
	return dataArray ? (
		<FlatList
			ref={c => (refs._root = c)}
			data={dataArray}
			renderItem={({ item, index }) => (renderItem ? renderItem({ item, index }) : renderRow(item, 0, index))}
			{...props}
		/>
	) : (
		<View {...props} />
	)
}

module.exports = connectStyle(List, MODULE_NAME$)
