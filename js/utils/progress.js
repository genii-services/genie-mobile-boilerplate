const { assign } = require("/utils")

const { STRING } = require("/constants")

const PREPARING = "preparing"
const PROCESSING = "processing"

const IGNORE = "ignore"
const SUCCEED = "succeed"
const FAILED = "failed"
const ERROR = "error"

class Progress {
	constructor(props) {
		console.debug(props)
		if (props) assign(this, props)
	}

	timestamp
	status
	paramz = {}
	data

	changeStatus(status, timestampUpdatable) {
		this.status = status
		if (timestampUpdatable) this.timestamp = Date.now()
	}

	isChanged(target) {
		if (!target) return true // undefined이면 timestamp가 없는 것이므로 초기화로 판단하여 true 리턴
		if (typeof target === STRING) return target !== this.timestamp
		return target.timestamp !== this.timestamp
	}

	isProgressive() {
		return isProgressive(this.status)
	}

	isPreterite() {
		return isPreterite(this.status)
	}
}
Progress.PREPARING = PREPARING
Progress.PREPARING = PREPARING
Progress.PROCESSING = PROCESSING
Progress.IGNORE = IGNORE
Progress.SUCCEED = SUCCEED
Progress.FAILED = FAILED
Progress.ERROR = ERROR

function createProgress(props) {
	return new Progress(props)
}

/**
 * 프로세싱 상태가 진행형인지 판단
 *
 * @export
 * @param {*} status
 * @returns {bool}	진행형이면 true, 완료형이면 false
 * 			{undefined}	판단이 모호한 경우
 */
function isProgressive(status) {
	if (!status) return false
	if (status.hasOwnProperty("status")) status = status.status
	switch (status) {
		case PREPARING:
		case PREPARING:
		case PROCESSING:
			return true
		case IGNORE:
		case SUCCEED:
		case FAILED:
		case ERROR:
		case undefined:
		case null:
		case "":
			return
		default:
			if (typeof status === STRING && status.toLowerCase().substr(-3, 3) === "ing") return true
	}
	return
}

/**
 * 프로세싱 상태가 완료형인지 판단
 *
 * @export
 * @param {*} status
 * @returns {bool}	진행형이면 false, 완료형이면 true
 * 			{undefined}	판단이 모호한 경우
 */
function isPreterite(status) {
	switch (status) {
		case IGNORE:
		case PREPARING:
		case PROCESSING:
			return false
		case SUCCEED:
		case FAILED:
		case ERROR:
			return true
		case undefined:
		case null:
		case "":
			return
		default:
			if (typeof status === STRING && status.toLowerCase().substr(-2, 2) === "ed") return true
	}
	return
}

module.exports = {
	IGNORE,
	PREPARING,
	PROCESSING,
	SUCCEED,
	FAILED,
	ERROR,
	Progress,
	createProgress,
	isProgressive,
	isPreterite,
}
