const { forwardRef, useEffect, useState, useStore, useThis } = require("/hooks")

const createCoordinator = (namespace, methodz) => {
	const [coordinator] = useStore(namespace, methodz)
	return coordinator
}

module.exports = createCoordinator
