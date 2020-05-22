/**
 * globalStore
 * 200414 react-native용으로 포팅 by appcreatier@gmail.com
 * 191010 v1.7.3 by kwhitley/use-store
 */

const { localStorage } = global
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
		localStorage.removeItem(Store.storagePrefix + namespace)
	}

	persist = (...args) => this.set(...args, { persist: true })
}

// shared instantiation of GlobalStore
module.exports = new GlobalStore()
