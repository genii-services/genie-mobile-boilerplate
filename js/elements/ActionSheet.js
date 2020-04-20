const MODULE_NAME$ = "ActionSheetElement"
console.debug(MODULE_NAME$)

/* eslint-disable no-use-before-define */
/* eslint-disable radix */
const React = require("react")
const { ActionSheetIOS, FlatList, Modal, TouchableOpacity } = require("react-native")

const { deviceHeight, itsIOS } = require("/utils/device")
const { createCoordinator, forwardRef, useEffect, useState, useStore, useThis } = require("/hooks")
const { useStyle } = require("/coordinators/style")

const Text = require("./Text")
const Icon = require("./Icon")
const Left = require("./Left")
const Right = require("./Right")
const Body = require("./Body")
const ListItem = require("./ListItem")

const ActionSheetElement = (props) => {
	const _this = useThis()
	const [_modalVisible, set_modalVisible] = useState(false)
	const [_items, set_items] = useState([])

	useEffect(() => !props.autoHide && props.duration && console.warn(`It's not recommended to set autoHide false with duration`), [])

	const { stylez } = useStyle(ActionSheetElement, {})

	createCoordinator("ActionSheet", () => ({
		showActionSheet: (config, callback) => {
			if (itsIOS) {
				if (typeof config.options[0] === "object") {
					config = { ...config, options: config.options.map((item) => item.text) }
				}
				ActionSheetIOS.showActionSheetWithOptions(config, callback)
			} else {
				set_items(config.options)
				_this.title = config.title
				_this.message = config.message
				_this.destructiveButtonIndex = config.destructiveButtonIndex
				_this.cancelButtonIndex = config.cancelButtonIndex
				_this.modalVisible = true
				_this.callback = callback
			}
		},
		hideActionSheet: () => set_modalVisible(false),
	}))

	const close = (index = _this.cancelButtonIndex) => {
		_this.callback && _this.callback(index)
		set_modalVisible(false)
	}

	const renderItem = ({ index, item }) => {
		return typeof _items[0] === "string" ? (
			<ListItem onPress={() => close(parseInt(index))} style={stylez.listItem}>
				<Text>{item}</Text>
			</ListItem>
		) : (
			<ListItem onPress={() => close(parseInt(index))} style={stylez.listItem} icon>
				<Left>
					<Icon name={item.icon} style={{ color: item.iconColor }} />
				</Left>
				<Body style={stylez.listItemBody}>
					<Text>{item.text}</Text>
				</Body>
				<Right />
			</ListItem>
		)
	}

	return (
		<Modal animationType={"fade"} transparent visible={_modalVisible} onRequestClose={close}>
			<TouchableOpacity activeOpacity={1} onPress={close} style={stylez.containerTouchable}>
				<TouchableOpacity activeOpacity={1} style={stylez.innerTouchable}>
					{_this.title && <Text style={stylez.touchableText}>{_this.title}</Text>}
					<FlatList
						style={[stylez.flatList, { marginTop: _this.title ? 15 : 0 }]}
						data={_this.items}
						keyExtractor={(item, index) => String(index)}
						renderItem={renderItem}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	)
}

if (__DEV__) {
	const { array, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	ActionSheetElement.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
	}
}

ActionSheetElement.getDefaultStyle = ({ FLEX_END, TRANSPARENT, WHITE }) => ({
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
		maxHeight: deviceHeight / 2,
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
})

// const { connectStyle } = require("/utils/style")
module.exports = ActionSheetElement //connectStyle(ActionSheetElement, MODULE_NAME$)
