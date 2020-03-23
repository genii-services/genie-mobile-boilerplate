/** 공통 라이브러리 */
const React = require("react")
const DatePicker_ = require("react-native-datepicker")

const { ABSOLUTE, FLEX_START, LEFT } = require("/constants/style")
const { toString } = require("/utils/string")
const { fontFamily } = require("/styles")

// const  Button = require("./Button")
// const Text = require("./Text")

const DatePicker = props => {
	const { mode } = props
	const selectedDate = toString(props.value, props.datePickerMode, "-")
	const format = mode == "date" ? "YYYY-MM-DD" : mode == "time" ? "hh:mm:ss" : "YYYY-MM-DD hh:mm"
	// console.debug(DatePicker, format, selectedDate)
	return (
		<DatePicker_
			style={props.buttonStyle}
			date={selectedDate}
			mode={mode}
			format={format}
			placeholder={props.placeholder}
			confirmBtnText={props.doneText}
			cancelBtnText={props.cancelText}
			showIcon={false}
			customStyles={{
				dateIcon: {
					position: ABSOLUTE,
					marginLeft: 0,
					paddingRight: 0,
					top: 4,
				},
				dateInput: {
					// View 컴포넌트라서 textAlign 불가
					borderWidth: 0,
					marginLeft: 0,
					alignSelf: FLEX_START,
				},
				dateTouchBody: {
					borderWidth: 0,
				},
				dateText: {
					marginLeft: 0,
					textAlign: LEFT,
					alignSelf: FLEX_START,
				},
				placeholderText: {
					alignSelf: FLEX_START,
				},
				// ... You can check the source to find the other keys.
			}}
			onDateChange={date => typeof props.onPickerConfirm === "function" && onPickerConfirm(date)}
		/>
	)
}
DatePicker.defaultProps = {
	...DatePicker_.defaultProps,
	buttonStyle: {
		flex: 0.6,
		marginTop: -10,
		marginBottom: -10,
		marginLeft: 0,
		marginRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		borderWidth: 0,
	},
	textStyle: {
		fontFamily,
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: 0,
		paddingRight: 0,
		fontSize: 15,
		lineHeight: 16,
		textAlign: LEFT,
		color: "#4a4a4a",
	},
	title: "날짜 선택",
	placeholder: "날짜를 선택하세요",
	doneText: "확인",
	cancelText: "취소",
	mode: "date",
	minimumDate: "1900-01-01 00:00:00",
	maximumDate: "2222-12-12 23:59:59",
}

module.exports = DatePicker

/*
// 안드로이드 NullPointerException 발생
const { DatePicker_ } = require("rnkit-actionsheet-picker")

module.exports = DatePickerEx;const DatePickerEx = (props) =>  {
	static defaultProps = {
		...DatePicker_.defaultProps,
		buttonStyle: {
			flex: 0.6,
			marginTop: -5, marginBottom: -5, marginLeft: 0, marginRight: 0,
			paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
		},
		textStyle: {
			fontFamily,
			marginLeft: 0, marginRight: 0,
			paddingLeft: 0, paddingRight: 0,
			fontSize: 15,
			lineHeight: 16,
			textAlign: 'left',
			color: '#4a4a4a',
		},
		title: '날짜 선택',
		doneText: '확인',
		cancelText: '취소',
		datePickerMode: 'datetime',
		minimumDate: '1900-01-01 00:00:00',
		maximumDate: '2222-12-12 23:59:59',
	}

	render() {
		//console.debug(this, .value)
		return (
			<Button style={.buttonStyle} transparent small
				onPress={handleOnPress}>
				<Text style={.textStyle}>{.value}</Text>
			</Button>
		)
	}

	handleOnPress() {
		let selectedDate = toString(.value, .datePickerMode, '-')
		//console.debug(this, selectedDate)

		DatePicker_.show({
			selectedDate,
			datePickerMode: .datePickerMode,
			titleText: .title,
			doneText: .doneText,
			cancelText: .cancelText,
			doneTextColor: .textStyle.color,
			cancelTextColor: .textStyle.color,
			yearText:	'',
			monthText:	'',
			dayText:	'',
			hoursText:	'',
			minutesText: '',
			secondsText: '',
			onPickerConfirm: (selectedDate) => {
				//console.debug(this, selectedDate)
				if(.onPickerConfirm) {
					.onPickerConfirm(selectedDate)
				}
			},
			onPickerCancel: () => {
				//console.debug(this, 'date picker canceled')
			},
			onPickerDidSelect: (selectedDate) => {
				//console.debug(this, selectedDate)
			}
		})
	}
}

*/
