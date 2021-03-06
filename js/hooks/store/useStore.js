/**
 * useStore
 * 200413 react-native용으로 포팅 by appcreatier@gmail.com
 * 191010 v1.7.3 by kwhitley/use-store
 */
const { useState, useEffect } = require("react")

const Store = require("./Store")
const globalStore = require("./globalStore")

// the actual hook
function useStore(namespace, value, options = {}) {
	if (!namespace) throw new Error("no namespace provided to useStore... try using useState() instead?")

	const store = globalStore.hasOwnProperty(namespace)
		? globalStore[namespace]
		: (globalStore[namespace] = new Store({ value, options, namespace }))

	const [state, set] = useState(store.state)

	if (store.setters.indexOf(set) === -1) store.setters.push(set)

	useEffect(() => () => (store.setters = store.setters.filter((setter) => setter !== set)), [])

	const magicSetter = (setter) => (e) => {
		setter(typeof e === "object" && (e.nativeEvent || e.constructor.name === "SyntheticEvent") && e.target ? e.target.value : e)
	}

	return [state, magicSetter(store.setState)]
}

module.exports = useStore
