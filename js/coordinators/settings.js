console.debug("SettingsCoordinator")

require("react")

const { useStore } = require("/hooks")

const useSettings = () => {
	const [value, setValue] = useStore("value")

	return {
		value,
		setValue,
	}
}

module.exports = {
	useSettings,
}
