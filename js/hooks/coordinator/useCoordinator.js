/**
 * useCoordinator
 * 200331 by appcreatier@gmail.com
 */
const { useStore } = require("/hooks")

const useCoordinator = (namespace) => {
	const [coordinator] = useStore(namespace)
	return coordinator
}

module.exports = useCoordinator
