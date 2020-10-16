require("react")
const { Modal, View } = require("react-native")
const DateTimePicker = require("@react-native-community/datetimepicker")

const { useState } = require("/hooks")
const { useStyle } = require("/coordinators")

const Text = require("./Text")

const DatePickerElement = (props) => {
	const {
		animationType,
		disabled,
		locale,
		maximumDate,
		minimumDate,
		modalTransparent,
		placeHolderText,

		textStyle,
		timeZoneOffsetInMinutes,
	} = props

	const [_modalVisible, set_modalVisible] = useState(false)
	const [_defaultDate] = useState(() => props.defaultDate || new Date())
	const [_chosenDate, set_chosenDate] = useState(() => !props.placeHolderText && props.defaultDate && props.defaultDate)

	const { placeHolderTextStyle } = props
	const { stylez } = useStyle(MODULE_NAME$, { placeHolderTextStyle, textStyle }, (defaultStyle) => ({
		placeHolderText: [
			{
				padding: defaultStyle.datePickerPadding,
				color: defaultStyle.datePickerTextColor,
			},
			_chosenDate ? textStyle : placeHolderTextStyle,
		],
		modalText: {
			backgroundColor: style.datePickerBg,
			flex: style.datePickerFlex,
		},
	}))

	const showDatePicker = () => {
		if (disabled) return
		set_modalVisible(true)
	}

	const formatChosenDate = (date) => {
		if (props.formatChosenDate) return props.formatChosenDate(date)
		return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/")
	}

	const handleOnRequestClose = () => {}

	const handleOnPress = () => set_modalVisible(false)

	const handleOnDateChange = (event, date) => {
		set_chosenDate(date)
		props.onDateChange && props.onDateChange(date)
	}

	return (
		<View>
			<View>
				<Text onPress={showDatePicker} style={stylez.placeHolderText}>
					{_chosenDate ? formatChosenDate(_chosenDate) : placeHolderText}
				</Text>
				<Modal
					supportedOrientations={["portrait", "landscape"]}
					animationType={animationType}
					transparent={modalTransparent} // from api
					visible={_modalVisible}
					onRequestClose={handleOnRequestClose}>
					<Text onPress={handleOnPress} style={stylez.modalText} />
					<DateTimePicker
						value={_chosenDate || _defaultDate}
						minimumDate={minimumDate}
						maximumDate={maximumDate}
						mode="date"
						locale={locale}
						timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
						onDateChange={handleOnDateChange}
					/>
				</Modal>
			</View>
		</View>
	)
}

DatePickerElement.defaultProps = {
	disabled: false,
	placeHolderText: "Select Date",
}

DatePickerElement.displayName = "DatePicker"

module.exports = DatePickerElement
