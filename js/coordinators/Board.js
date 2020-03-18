console.debug("BoardCoordinator")

const React = require("react")
const { useState } = React

const { createCtx } = require("/hooks")

const [useCtx, Provider] = createCtx()

const BoardCoordinator = ({ children }) => {
	const [board, setBoard] = useState(initialValue)
	const store = { value, setValue }
	return <Provider value={store}>{children}</Provider>
}

// useCtx.name = "useBoard"

module.exports = {
	BoardCoordinator,
	useBoard: useCtx,
}
