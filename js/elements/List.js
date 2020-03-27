const MODULE_NAME$ = "ListElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { FlatList, View } = require("react-native")

const { forwardRef, useRefs } = require("/hooks")
const { connectStyle } = require("/utils/style")

const List = forwardRef(({ dataArray, renderItem, renderRow, props }, ref) => {
	const refs = useRefs()
	return dataArray ? (
		<FlatList
			ref={ref}
			data={dataArray}
			renderItem={({ item, index }) => (renderItem ? renderItem({ item, index }) : renderRow(item, 0, index))}
			{...props}
		/>
	) : (
		<View ref={ref} {...props} />
	)
})

module.exports = connectStyle(List, MODULE_NAME$)
