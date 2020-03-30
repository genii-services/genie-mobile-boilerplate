console.debug("UsersCoordinator")

const { useStore } = require("use-store")

const initialData = {}

const useUsers = ({ children }) => {
	const [data, setData] = useStore("users", initialData)

	const search = paramz => {}

	return { data, setData, search }
}

module.exports = { useUsers }

/*
	const users = useUsers()
	users.data
	users.search(paramz)
*/
