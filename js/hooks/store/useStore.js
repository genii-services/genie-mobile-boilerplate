const { useState, useEffect } = require("react")

const Store = require("./Store")
const globalStore = require("./globalStore")

// the actual hook
export function useStore(namespace, value, options = {}) {
	let whichStore = undefined

	if (!namespace) throw new Error("no namespace provided to useStore... try using useState() instead?")

	whichStore = globalStore.hasOwnProperty(namespace)
		? globalStore[namespace]
		: (globalStore[namespace] = new Store({ value, options, namespace }))

	const [state, set] = useState(whichStore.state)

	if (whichStore.setters.indexOf(set) === -1) whichStore.setters.push(set)

	useEffect(() => () => (whichStore.setters = whichStore.setters.filter(setter => setter !== set)), [])

	const magicSetter = setter => e => {
		typeof e === "object" && (e.nativeEvent || e.constructor.name === "SyntheticEvent") && e.target
			? setter(e.target.value)
			: setter(e)
	}

	return [state, magicSetter(whichStore.setState)]
}

module.exports = useStore
