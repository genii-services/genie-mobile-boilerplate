const React = require("react")
const { Modal, View, DatePickerIOS, DatePickerAndroid } = require("react-native")

const { useState, useStore } = require("/hooks")
const { itsAndroid } = require("/utils/device")

const Text = require("./Text")

const DatePickerElement = props => {
	const [theme] = useStore("theme")

	const [_modalVisible, set_modalVisible] = useState(false)
	const [_defaultDate] = useState(props.defaultDate || new Date())
	const [_chosenDate, set_chosenDate] = useState(!props.placeHolderText && props.defaultDate && props.defaultDate)

	const setDate = date => {
		set_chosenDate(new Date(date))(props.onDateChange) && props.onDateChange(date)
	}

	const showDatePicker = () => {
		if (itsAndroid) openAndroidDatePicker()
		else set_modalVisible(true)
	}

	const openAndroidDatePicker = async () => {
		try {
			const newDate = await DatePickerAndroid.open({
				date: _chosenDate ? _chosenDate : _defaultDate,
				minDate: props.minimumDate,
				maxDate: props.maximumDate,
				mode: props.androidMode,
			})
			const { action, year, month, day } = newDate
			if (action === "dateSetAction") {
				const selectedDate = new Date(year, month, day)
				set_chosenDate(selectedDate)
				props.onDateChange(selectedDate)
			}
		} catch ({ code, message }) {
			console.warn("Cannot open date picker", message)
		}
	}

	const formatChosenDate = date => {
		if (props.formatChosenDate) {
			return props.formatChosenDate(date)
		}
		return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/")
	}

	const {
		animationType,
		disabled,
		locale,
		maximumDate,
		minimumDate,
		modalTransparent,
		placeHolderText,
		placeHolderTextStyle,
		textStyle,
		timeZoneOffsetInMinutes,
	} = props

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle

	return (
		<View>
			<View>
				<Text
					onPress={() => !disabled && showDatePicker()}
					style={[
						{ padding: style.datePickerPadding, color: style.datePickerTextColor },
						_chosenDate ? textStyle : placeHolderTextStyle,
					]}>
					{_chosenDate ? formatChosenDate(_chosenDate) : placeHolderText || "Select Date"}
				</Text>
				<View>
					<Modal
						supportedOrientations={["portrait", "landscape"]}
						animationType={animationType}
						transparent={modalTransparent} // from api
						visible={_modalVisible}
						onRequestClose={() => {}}>
						<Text
							onPress={() => set_modalVisible(false)}
							style={{
								backgroundColor: style.datePickerBg,
								flex: style.datePickerFlex,
							}}
						/>
						<DatePickerIOS
							date={_chosenDate || _defaultDate}
							onDateChange={date => setDate(date)}
							minimumDate={minimumDate}
							maximumDate={maximumDate}
							mode="date"
							locale={locale}
							timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
						/>
					</Modal>
				</View>
			</View>
		</View>
	)
}

DatePickerElement.defaultProps = {
	disabled: false,
}

module.exports = DatePickerElement
