const MODULE_NAME$ = "elements/PickerItem"
console.debug(MODULE_NAME$)

const { Picker } = require("react-native")

const { connectStyle } = require("/utils/style")

const Item = Picker.Item

Item.propTypes = {
	...Picker.Item.propTypes,
}

module.exports = connectStyle(Item, "elements/Item")
