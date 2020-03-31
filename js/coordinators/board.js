console.debug("BoardCoordinator")

const React = require("react")
const { useStore } = require("/hooks")

const useBoard = () => {
	const [boardz, setBoardz] = useStore("board")
	const getBoard = boardName => {
		return { boardName }
	}
	return { boardz, setBoardz, getBoard }
}

module.exports = { useBoard }
