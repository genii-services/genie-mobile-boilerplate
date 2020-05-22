/**
 * createCoordinator
 * 200401 by appcreatier@gmail.com
 */
const { FUNCTION } = require("/constants")
const { forwardRef, useEffect, useState, useStore, useThis } = require("/hooks")

const createCoordinator = (namespace, methodz) => {
	const [coordinator, setCoordinator] = useStore(namespace, methodz)
	if (!coordinator.registered) {
		Object.assign(coordinator, { registered: true }, typeof methodz === FUNCTION ? methodz() : methodz)
	}

	return { coordinator, setCoordinator }
}

module.exports = createCoordinator
