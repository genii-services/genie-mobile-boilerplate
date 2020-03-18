/** 공통 라이브러리
 * 191206 한일용
 */
const moment = require("moment")

const { STRING } = require("/constants")

function toMoment(v, format) {
	if (!format)
		format = /.*(오전|오후|am|pm|a|p)\s*$/i.test(v)
			? "YYYY-MM-DD hh:mm:ss a"
			: /.*(오전|오후|am|pm|a|p).*$/i.test(v)
			? "YYYY-MM-DD a hh:mm:ss"
			: undefined
	if (typeof v === STRING) v = v.replace(/Z$/i, "") // ISODateString "2017-12-09T15:58:31Z"에서 Z가 붙으면 표준시에 TimeZone을 계산하여 반환함. 현재 서버에 저장되는 모든 시간은 한국시간대이므로 Z를 제거함
	return moment(v, format)
}

function toDateFormatString(date, format) {
	if (!date) return ""
	if (!moment.isMoment(date)) date = toMoment(date)
	if (date.year() < 1900) return ""
	return date.format(format)
}

function yyyymmdd(date, option) {
	if (!date) date = moment()
	let format = option == "." ? "YYYY.MM.DD" : "YYYY-MM-DD"
	return toDateFormatString(date, format)
}

function yyyymmddhhmm(date, option) {
	if (!date) date = moment()
	let format = option == "." ? "YYYY.MM.DD HH:mm" : "YYYY-MM-DD HH:mm"
	return toDateFormatString(date, format)
}

function yyyymmddhhmmss(date, option) {
	if (!date) date = moment()
	let format = option == "." ? "YYYY.MM.DD HH:mm:ss" : "YYYY-MM-DD HH:mm:ss"
	return toDateFormatString(date, format)
}

function maxTimestamp(t1, t2) {
	if (!t1) t1 = 0
	if (!t2) t2 = 0
	return Math.max(t1, t2)
}

function minTimestamp(t1, t2) {
	if (!t1) t1 = 0
	if (!t2) t2 = 0
	return Math.min(t1, t2)
}

module.exports = {
	toMoment,
	toDateFormatString,
	yyyymmdd,
	yyyymmddhhmm,
	yyyymmddhhmmss,
	maxTimestamp,
	minTimestamp,
}
