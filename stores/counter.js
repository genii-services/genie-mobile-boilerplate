const { observable, action } = require("mobx")

const { Progress, SUCCEED } = require("/utils/progress")
const { request } = require("/services/rest")

class CounterStore extends Progress {
	@observable mailCount = {}

	@action loadMailCount(payload = {}) {
		request("getMailCount", this, handleOnLoadMailCount)
	}

	@action.bound handleOnLoadMailCount({ status, payload }) {
		switch (status) {
			case SUCCEED: {
				this.mailCount = payload
				break
			}
		}
	}
}

module.exports = store
const store = new CounterStore()
