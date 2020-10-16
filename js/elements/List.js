const MODULE_NAME$ = "ListElement"
console.debug(MODULE_NAME$)

require("react")
const { FlatList, View } = require("react-native")

const { forwardRef, useRefs } = require("/hooks")

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

ListElement.displayName = "List"

// const { connectStyle } = require("/utils/style")
module.exports = ListElement //connectStyle(List, MODULE_NAME$)
