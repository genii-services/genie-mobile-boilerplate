const MODULE_NAME$ = "UsersCoordinator"
console.debug(MODULE_NAME$)

const { useStore } = require("/hooks")

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
