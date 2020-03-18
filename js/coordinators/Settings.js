console.debug("SettingsCoordinator")

const React = require("react")
const { useState } = React

const { createCtx } = require("/hooks")

const [useCtx, Provider] = createCtx()

const SettingsCoordinator = ({ children }) => {
	const [value, setValue] = useState({})

	const store = {
		value,
		setValue,
	}

	return <Provider value={store}>{children}</Provider>
}

// useCtx.name = "useSettings"

module.exports = {
	SettingsCoordinator,
	useSettings: useCtx,
}
