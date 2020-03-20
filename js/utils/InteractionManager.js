const { InteractionManager } = require("react-native")

module.exports = {
	...InteractionManager,
	runAfterInteractions: f => {
		let called = false
		const timeout = setTimeout(() => {
			called = true
			f()
		}, 10)
		InteractionManager.runAfterInteractions(() => {
			if (called) return
			clearTimeout(timeout)
			f()
		})
	},
}
