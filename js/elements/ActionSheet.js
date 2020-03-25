const MODULE_NAME$ = "elements/ActionSheet"
console.debug(MODULE_NAME$)

/* eslint-disable no-use-before-define */
/* eslint-disable radix */
const React = require("react")
const { ActionSheetIOS, Dimensions, FlatList, Modal, TouchableOpacity } = require("react-native")

const { FLEX_END, TRANSPARENT, WHITE } = require("/constants/style")
const { itsIOS } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useThis } = require("/hooks")

const Text = require("./Text")
const Icon = require("./Icon")
const Left = require("./Left")
const Right = require("./Right")
const Body = require("./Body")
const ListItem = require("./ListItem")

const ActionSheet = props => {
	const { useStore } = require("use-store")
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
						style={[styles.flatList, { marginTop: _title ? 15 : 0 }]}
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
									style={styles.listItem}
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
// ActionSheet.instance
ActionSheet.show = (config, callback) => {
	try {
		ActionSheet.instance._root.showActionSheet(config, callback)
	} catch (e) {
		console.error(e)
	}
}
ActionSheet.hide = () => {
	try {
		ActionSheet.instance._root.hideActionSheet()
	} catch (e) {
		console.error(e)
	}
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const { array, number, object, oneOfType } = require("/utils/propTypes")

	ActionSheet.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

const styles = {
	containerTouchable: {
		backgroundColor: "rgba(0,0,0,0.4)",
		flex: 1,
		justifyContent: FLEX_END,
	},
	flatList: {
		marginHorizontal: -15,
	},
	innerTouchable: {
		backgroundColor: WHITE,
		minHeight: 56,
		maxHeight: Dimensions.get("window").height / 2,
		padding: 15,
		elevation: 4,
	},
	listItem: {
		height: 50,
		marginLeft: 14,
		borderColor: TRANSPARENT,
	},
	listItemBody: {
		borderColor: TRANSPARENT,
		paddingLeft: 7, // marginLeft: 14 / 2
	},
	touchableText: {
		color: "#757575",
	},
}

module.exports = connectStyle(ActionSheet, MODULE_NAME$)
