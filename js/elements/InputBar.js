/** 공통 라이브러리 */
console.debug("InputBar")

const React = require("react")
const _ = require("lodash")
const { View, Keyboard } = require("react-native")

const { ABSOLUTE, BLACK, ROW } = require("/constants/style")

const Button = require("./Button")
const Icon = require("./Icon")
const Input = require("./Input")
const Item = require("./Item")
const Text = require("./Text")

const InputBar = props => {
	const [_value, set_value] = useState(props.value)
	const [_emptied, set_emptied] = useState(() => !props.value || (props.value && props.value.length == 0))
	const [_minLength, set_minLength] = useState(props.minLength || 1)

	set_value(props.value)
	let disabled = !_value ? true : _value.length < _minLength

	const updateValue = value => {
		if (value == _value) return
		set_value(value), set_emptied(value.length == 0)
		typeof props.onChangeText === String.FUNCTION && props.onChangeText(value)
	}

	const handleOnPress = paramz => {
		!disabled && typeof props.onPress && props.onPress(_value)
		Keyboard.dismiss()
	}

	console.debug(InputBar, _value, styles.input, props.inputStyle)
	return (
		<View style={styles.container} rounded={props.rounded}>
			<Item style={props.rounded ? styles.roundedItem : styles.item}>
				{props.leaderIconName && <Icon name={props.leaderIconName} />}
				<Input
					style={[styles.input, props.inputStyle]}
					autoFocus={props.autoFocus}
					placeholder={props.placeholder}
					value={_value}
					returnKeyType="search"
					onChangeText={value => updateValue(_.trimStart(value))}
					onEndEditing={() => updateValue(_.trim(_value))}
					onSubmitEditing={handleOnPress}
				/>
				{!state.emptied && <Icon name="ios-close" disabled={_emptied} onPress={(() => set_value(""), set_emptied(true))} />}
			</Item>
			{/*<Icon style={styles.buttonIcon} name="ios-search" onPress={() => handleOnPress('icon')} />*/}
			<Button style={styles.button} transparent small disabled={disabled} onPress={() => handleOnPress("button.onPress")}>
				<Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>{props.buttonTitle || "검색"}</Text>
			</Button>
		</View>
	)
}

if (__DEV__) {
	const { array, bool, func, object, oneOfType, string } = require("/utils/propTypes")
	InputBar.propTypes = {
		placeholder: string,
		value: string,
		onChangeText: func,
		onPress: func,
	}
}

InputBar.defaultProps = {
	...Input.defaultProps,
	placeholder: "찾을 문자열",
	rounded: false,
}

InputBar.getDefaultStyle = ({ fontFamily }) => {
	return {
		container: {
			flexDirection: ROW,
			height: 60,
			margin: 0,
			paddingTop: 12,
			paddingLeft: 15,
			paddingRight: 0,
			backgroundColor: "#ececec",
		},
		item: {
			flex: 1,
			height: 36,
			paddingLeft: 5,
			backgroundColor: "#ffffff",
		},
		roundedItem: {
			flex: 1,
			height: 36,
			paddingLeft: 20,
			paddingRight: 10,
			paddingTop: 0,
			paddingBottom: 0,
			backgroundColor: "#ffffff",
			borderRadius: 20,
		},
		input: {
			height: 18, // item 아래쪽으로 삐져나가는 것을 보정하기 위해 폰트사이즈(정확히 lineHeight)와 동기화
			margin: 0,
			padding: 0,
			color: BLACK,
			backgroundColor: "#ffffff",
			fontFamily,
			fontSize: 15,
			lineHeight: 16,
		},
		button: {
			borderRadius: 0,
			height: 36,
			margin: 0,
			marginRight: 0,
			backgroundColor: "#ececec",
		},
		buttonIcon: {
			color: BLACK,
		},
		buttonText: {
			fontFamily,
			color: "#4b4b4b",
		},
		buttonTextDisabled: {
			fontFamily,
			color: "#9b9b9b",
		},
	}
}
module.exports = InputBar
