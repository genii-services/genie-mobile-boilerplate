const localStorage = require("/utils/localStorage")
const Store = require("./Store")

// namespaced index of requested Stores
class GlobalStore {
	set = (namespace, value, options = {}) => {
		if (this.hasOwnProperty(namespace)) {
			this[namespace].setState(value)
		} else {
			this[namespace] = new Store({ namespace, value, options })
		}
	}

	clear = (namespace) => {
		localStorage.removeItem(GLOBALSTORAGE_PREFIX + namespace)
	}

	persist = (...args) => this.set(...args, { persist: true })
}

// shared instantiation of GlobalStore
module.exports = new GlobalStore()
