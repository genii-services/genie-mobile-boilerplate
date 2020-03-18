console.debug("UsersCoordinator")

const React = require("react")
const { useState } = React

const { createCtx } = require("/hooks")

const [useCtx, Provider] = createCtx()

const initialData = {}

const UsersCoordinator = ({ children }) => {
	const [data, setData] = useState(initialData)

	const search = paramz => {}

	const store = { data, setData, search }
	return <Provider value={store}>{children}</Provider>
}

// useCtx.name = "useUsers"

module.exports = {
	UsersCoordinator,
	useUsers: useCtx,
}

/*
	const users = useUsers()
	users.data
	users.search(paramz)
*/
