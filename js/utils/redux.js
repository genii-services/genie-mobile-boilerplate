const createAction = (type) => (payload) => ({ type, payload })

const payload = {}

module.exports = {
	createAction,
	payload,
}
