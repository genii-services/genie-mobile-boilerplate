const MODULE_NAME$ = "Picker.iosElement"
console.debug(MODULE_NAME$)

/* eslint-disable react/sort-comp */
const React = require("react")
const { FlatList, Modal, View } = require("react-native")
const { Picker } = require("@react-native-community/picker")
const { find, get } = require("lodash")

const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const Text = require("./Text")
const { Radio } = require("./Radio")
const { Container } = require("./Container")
const { ListItem } = require("./ListItem")
const Button = require("./Button")
const { Header } = require("./Header")
const { Title } = require("./Title")
const { Left } = require("./Left")
const { Right } = require("./Right")
const { Body } = require("./Body")

const PickerNB = props => {
	const getChildren = children => (children && !Array.isArray(children) ? [].concat(children) : [].concat.apply([], children)) // eslint-disable-line prefer-spread
	const children = getChildren(props.children)

	const getLabel = () => {
		const item = find(children, child => child.props.value === props.selectedValue)
		return get(item, "props.label")
	}

	const nextLabel = getLabel(props)

	const [_modalVisible, set_modalVisible] = useState(false)
	const [_currentLabel, set_currentLabel] = useState(nextLabel)
	const [_dataSource, set_dataSource] = useState(children)

	set_currentLabel(nextLabel)
	set_dataSource(children)
	set_dataSource(children)

	const getSelectedItem = () => {
		return find(props.children, child => child.props.value === props.selectedValue)
	}

	const renderIcon = () => {
		return React.cloneElement(props.iosIcon, {
			style: [{ fontSize: 22, lineHeight: 26 }, { ...props.iosIcon.props.style }],
		})
	}

	const renderButton = () => {
		const onPress = () => {
			if (props.enabled !== undefined && !props.enabled) return
			set_modalVisible(true)
		}
		const text = _currentLabel ? _currentLabel : props.placeholder
		if (props.renderButton) return props.renderButton({ onPress, text, picker: this, selectedItem: getSelectedItem() })

		return (
			<Button style={props.style} dark picker transparent onPress={onPress}>
				{_currentLabel ? (
					<Text style={[props.textStyle]} note={props.note} numberOfLines={1} ellipsizeMode="tail">
						{_currentLabel}
					</Text>
				) : (
					<Text
						style={[props.textStyle, props.placeholderStyle]}
						note={props.note !== false}
						numberOfLines={1}
						ellipsizeMode="tail">
						{props.placeholder}
					</Text>
				)}
				{props.iosIcon === undefined ? null : renderIcon()}
			</Button>
		)
	}

	const buttonStyle = {
		shadowOffset: null,
		shadowColor: null,
		shadowRadius: null,
		shadowOpacity: null,
		marginLeft: 3,
		...props.headerBackButtonStyle,
	}

	const renderHeader = () => {
		return props.renderHeader ? (
			props.renderHeader(() => set_modalVisible(false))
		) : (
			<Header style={props.headerStyle}>
				<Left>
					<Button style={buttonStyle} transparent onPress={() => set_modalVisible(false)}>
						<Text style={props.headerBackButtonTextStyle}>{props.headerBackButtonText || "Back"}</Text>
					</Button>
				</Left>
				<Body>
					<Title style={props.headerTitleStyle}>{props.iosHeader || "Select One"}</Title>
				</Body>
				<Right />
			</Header>
		)
	}

	return (
		<View>
			{renderButton()}
			<Modal
				// supportedOrientations={props.supportedOrientations || null}
				supportedOrientations={["portrait", "landscape"]}
				animationType="slide"
				transparent={false}
				visible={_modalVisible}
				onRequestClose={() => set_modalVisible(false)}>
				<Container style={props.modalStyle}>
					{renderHeader()}
					<FlatList
						data={_dataSource}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item }) => (
							<ListItem
								selected={item.props.value === props.selectedValue}
								button
								style={props.itemStyle}
								onPress={() => {
									set_modalVisible(false)
									props.onValueChange(item.props.value)
									set_current(item.props.label)
								}}>
								<Left>
									<Text style={props.itemTextStyle}>{item.props.label}</Text>
								</Left>
								<Right>
									<Radio selected={item.props.value === props.selectedValue} />
								</Right>
							</ListItem>
						)}
					/>
				</Container>
			</Modal>
		</View>
	)
}

PickerNB.Item = Picker.Item

if (__DEV__) {
	const { func, ViewPropTypes } = require("/utils/propTypes")
	PickerNB.propTypes = {
		...ViewPropTypes,
		renderButton: func,
	}
}

module.exports = PickerNB //connectStyle(PickerNB, "PickerNBElement")
