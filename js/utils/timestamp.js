const timestampz = {}

function resetTimestamp(key) {
	timestampz[key] = 0
}

function checkTimestamp(key) {
	let prevTimestamp = timestampz[key]
	if (!prevTimestamp) return true
	let timestamp = Date.now()
	if (timestamp - prevTimestamp < minRequestInterval) {
		console.debug(key, `${timestamp - prevTimestamp}ms로써 요청 무시`)
		return false
	}
	timestampz[key] = timestamp
	return true
}

function updateTimestamp(key) {
	timestampz[key] = Date.now()
}

module.exports = {
	resetTimestamp,
	checkTimestamp,
	updateTimestamp,
}
