console.debug("BoardCoordinator")

const React = require("react")
const { useStore } = require("use-store")

const useBoard = () => {
	const [boardz, setBoardz] = useStore("board")
	const getBoard = boardName => {
		return { boardName }
	}
	return { boardz, setBoardz, getBoard }
}

module.exports = { useBoard }
