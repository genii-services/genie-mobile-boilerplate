/* eslint-disable no-use-before-define */
/* eslint-disable radix */
const React = require("react")
const PropTypes = require("prop-types")
const { Component } = React
const { ActionSheetIOS, Dimensions, FlatList, Modal, TouchableOpacity, StyleSheet, ViewPropTypes } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const { itsIOS } = require("/utils/device")
const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")
const commonColor = require("/styles/themes/common")

const Text = require("./Text")
const Icon = require("./Icon")
const Left = require("./Left")
const Right = require("./Right")
const Body = require("./Body")
const ListItem = require("./ListItem")

class ActionSheetContainer extends Component {
	static actionsheetInstance
	static show(config, callback) {
		this.actionsheetInstance._root.showActionSheet(config, callback)
	}
	static hide() {
		this.actionsheetInstance._root.hideActionSheet()
	}

	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
			items: [],
		}
	}

	componentDidMount() {
		if (!this.props.autoHide && this.props.duration) {
			console.warn(`It's not recommended to set autoHide false with duration`)
		}
	}

	showActionSheet(config, callback) {
		if (itsIOS) {
			if (typeof config.options[0] === "object") {
				const options = config.options
				const filtered = options.map(item => item.text)
				const filteredConfig = { ...config, options: filtered }
				ActionSheetIOS.showActionSheetWithOptions(filteredConfig, callback)
			} else {
				ActionSheetIOS.showActionSheetWithOptions(config, callback)
			}
		} else {
			this.setState({
				items: config.options,
				title: config.title,
				message: config.message,
				destructiveButtonIndex: config.destructiveButtonIndex,
				cancelButtonIndex: config.cancelButtonIndex,
				modalVisible: true,
				callback,
			})
		}
	}

	hideActionSheet() {
		this.setState({ modalVisible: false })
	}

	render() {
		return (
			<Modal
				animationType={"fade"}
				transparent
				visible={this.state.modalVisible}
				onRequestClose={() => {
					this.state.callback(this.state.cancelButtonIndex)
					this.setState({ modalVisible: false })
				}}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						this.state.callback(this.state.cancelButtonIndex)
						this.setState({ modalVisible: false })
					}}
					style={styles.containerTouchable}>
					<TouchableOpacity activeOpacity={1} style={styles.innerTouchable}>
						{this.state.title && <Text style={styles.touchableText}>{this.state.title}</Text>}
						<FlatList
							style={[styles.flatList, { marginTop: this.state.title ? commonColor.marginTop : 0 }]}
							data={this.state.items}
							keyExtractor={(item, index) => String(index)}
							renderItem={({ index, item }) => {
								return typeof this.state.items[0] === "string" ? (
									<ListItem
										onPress={() => {
											this.state.callback(parseInt(index))
											this.setState({ modalVisible: false })
										}}
										style={styles.listItem}>
										<Text>{item}</Text>
									</ListItem>
								) : (
									<ListItem
										onPress={() => {
											this.state.callback(parseInt(index))
											this.setState({ modalVisible: false })
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

module.exports = connectStyle("NativeBase.ActionSheetContainer", {}, mapPropsToStyleNames)(ActionSheetContainer)
