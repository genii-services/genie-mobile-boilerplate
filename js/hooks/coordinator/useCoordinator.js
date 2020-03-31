const { useStore } = require("/hooks")

const useCoordinator = namespace => {
	const [coordinator] = useStore(namespace)
	return coordinator
}

module.exports = useCoordinator
