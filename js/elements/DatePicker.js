const React = require("react")
const { Modal, View } = require("react-native")
const DateTimePicker = require("@react-native-community/datetimepicker")

const { useState, useStore } = require("/hooks")

const Text = require("./Text")

const DatePicker = props => {
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

	const [theme] = useStore("theme")
	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	const placeHolderTextStyle = [
		{ padding: style.datePickerPadding, color: style.datePickerTextColor },
		_chosenDate ? textStyle : props.placeHolderTextStyle,
	]
	const modalTextStyle = {
		backgroundColor: style.datePickerBg,
		flex: style.datePickerFlex,
	}

	const showDatePicker = () => {
		if (disabled) return
		set_modalVisible(true)
	}

	const formatChosenDate = date => {
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
				<Text onPress={showDatePicker} style={placeHolderTextStyle}>
					{_chosenDate ? formatChosenDate(_chosenDate) : placeHolderText}
				</Text>
				<Modal
					supportedOrientations={["portrait", "landscape"]}
					animationType={animationType}
					transparent={modalTransparent} // from api
					visible={_modalVisible}
					onRequestClose={handleOnRequestClose}>
					<Text onPress={handleOnPress} style={modalTextStyle} />
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

DatePicker.defaultProps = {
	disabled: false,
	placeHolderText: "Select Date",
}

module.exports = DatePicker
