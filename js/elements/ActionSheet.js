const MODULE_NAME$ = "elements/ActionSheet"
console.debug(MODULE_NAME$)

/* eslint-disable no-use-before-define */
/* eslint-disable radix */
const React = require("react")
const PropTypes = require("prop-types")
const { ActionSheetIOS, Dimensions, FlatList, Modal, TouchableOpacity, StyleSheet, ViewPropTypes } = require("react-native")

const { itsIOS } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useThis } = require("/hooks")
const commonColor = require("/styles/themes/common")

const Text = require("./Text")
const Icon = require("./Icon")
const Left = require("./Left")
const Right = require("./Right")
const Body = require("./Body")
const ListItem = require("./ListItem")

const ActionSheetContainer = props => {
	const _this = useThis()
	const [_modalVisible, set_modalVisible] = useState(false)
	const [_items, set_items] = useState([])

	useEffect(() => !props.autoHide && props.duration && console.warn(`It's not recommended to set autoHide false with duration`), [])

	const showActionSheet = (config, callback) => {
		if (itsIOS) {
			if (typeof config.options[0] === "object") {
				const filteredConfig = { ...config, options: config.options.map(item => item.text) }
				ActionSheetIOS.showActionSheetWithOptions(filteredConfig, callback)
			} else {
				ActionSheetIOS.showActionSheetWithOptions(config, callback)
			}
		} else {
			set_items(config.options)
			_this.title = config.title
			_this.message = config.message
			_this.destructiveButtonIndex = config.destructiveButtonIndex
			_this.cancelButtonIndex = config.cancelButtonIndex
			_this.modalVisible = true
			_this.callback = callback
		}
	}

	const hideActionSheet = () => set_modalVisible(false)

	return (
		<Modal
			animationType={"fade"}
			transparent
			visible={_modalVisible}
			onRequestClose={() => {
				_callback(_cancelButtonIndex)
				set_modalVisible(false)
			}}>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					_callback(_cancelButtonIndex)
					set_modalVisible(false)
				}}
				style={styles.containerTouchable}>
				<TouchableOpacity activeOpacity={1} style={styles.innerTouchable}>
					{_title && <Text style={styles.touchableText}>{_title}</Text>}
					<FlatList
						style={[styles.flatList, { marginTop: _title ? commonColor.marginTop : 0 }]}
						data={_items}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ index, item }) => {
							return typeof _items[0] === "string" ? (
								<ListItem
									onPress={() => {
										_callback(parseInt(index))
										set_modalVisible(false)
									}}
									style={styles.listItem}>
									<Text>{item}</Text>
								</ListItem>
							) : (
								<ListItem
									onPress={() => {
										_callback(parseInt(index))
										set_modalVisible(false)
									}}
									style={[styles.listItem, { height: commonColor.listItemHeight }]}
									icon>
									<Left>
										<Icon name={item.icon} style={{ color: item.iconColor }} />
									</Left>
									<Body style={styles.listItemBody}>
										<Text>{item.text}</Text>
									</Body>
									<Right />
								</ListItem>
							)
						}}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	)
}
// ActionSheetContainer.actionsheetInstance
ActionSheetContainer.show = (config, callback) => {
	ActionSheetContainer.actionsheetInstance._root.showActionSheet(config, callback)
}
ActionSheetContainer.hide = () => {
	ActionSheetContainer.actionsheetInstance._root.hideActionSheet()
}

ActionSheetContainer.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

const styles = StyleSheet.create({
	containerTouchable: {
		backgroundColor: commonColor.containerTouchableBackgroundColor,
		flex: 1,
		justifyContent: "flex-end",
	},
	flatList: {
		marginHorizontal: commonColor.marginHorizontal,
	},
	innerTouchable: {
		backgroundColor: commonColor.innerTouchableBackgroundColor,
		minHeight: commonColor.minHeight,
		maxHeight: Dimensions.get("window").height / 2,
		padding: commonColor.padding,
		elevation: commonColor.elevation,
	},
	listItem: {
		borderColor: commonColor.listItemBorderColor,
		marginLeft: commonColor.marginLeft,
	},
	listItemBody: {
		borderColor: commonColor.listItemBorderColor,
		paddingLeft: commonColor.marginLeft / 2,
	},
	touchableText: {
		color: commonColor.touchableTextColor,
	},
})

module.exports = connectStyle(ActionSheetContainer, MODULE_NAME$)
