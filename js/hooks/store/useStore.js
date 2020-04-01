const { useState, useEffect } = require("react")

const Store = require("./Store")
const globalStore = require("./globalStore")

// the actual hook
export function useStore(namespace, value, options = {}) {
	if (!namespace) throw new Error("no namespace provided to useStore... try using useState() instead?")

	const store = globalStore.hasOwnProperty(namespace)
		? globalStore[namespace]
		: (globalStore[namespace] = new Store({ value, options, namespace }))

	const [state, set] = useState(store.state)

	if (store.setters.indexOf(set) === -1) store.setters.push(set)

	useEffect(() => () => (store.setters = store.setters.filter(setter => setter !== set)), [])

	const magicSetter = setter => e => {
		setter(typeof e === "object" && (e.nativeEvent || e.constructor.name === "SyntheticEvent") && e.target ? e.target.value : e)
	}

	return [state, magicSetter(store.setStore)]
}

module.exports = useStore
