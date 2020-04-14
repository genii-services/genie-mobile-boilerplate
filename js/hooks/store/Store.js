const { debounce, createUuid } = require("/utils")
const localStorage = require("/utils/localStorage")

// prefix for localStorage
const GLOBALSTORAGE_PREFIX = "!ush::"

// individual Store implementation for tracking values/setters
class Store {
	constructor({ value, namespace, options }) {
		this.state = value
		this.id = createUuid()

		if (options.persist) {
			try {
				let stored = localStorage.getItem(GLOBALSTORAGE_PREFIX + namespace)
				if (stored !== null) {
					this.state = JSON.parse(stored)
				}
			} catch (err) {}
		}

		if (options.broadcast && window.BroadcastChannel) {
			this.channel = new BroadcastChannel(GLOBALSTORAGE_PREFIX + namespace)
			this.channel.addEventListener("message", this.handleMessage)
		}

		this.options = options
		this.namespace = namespace
		this.setters = []
	}

	handleMessage = debounce((e) => {
		if (!e.data || e.data.id === this.id) return
		this.setState(e.data.message, { broadcast: false })
	}, 300)

	setState = (value, options = { broadcast: true }) => {
		this.state = typeof value === "function" ? value() : value //*. lately call 지원
		if (this.options.persist) {
			try {
				localStorage.setItem(GLOBALSTORAGE_PREFIX + this.namespace, JSON.stringify(value))
			} catch (err) {
				console.warn(`[use-store-hook]: failed to persist`, { value, err })
			}
		}
		this.setters.forEach((setter) => setter(this.state))
		if (options.broadcast && this.options.broadcast) {
			this.channel.postMessage({ id: this.id, message: value })
		}
	}
}

module.exports = Store
