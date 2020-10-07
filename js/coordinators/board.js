console.debug("BoardCoordinator")

const React = require("react")
const { useStore } = require("/hooks")

const useBoard = (boardId) => {
	const [board, setBoard] = useStore("board" + boardId)
	const getBoard = (boardName) => {
		return { boardName }
	}
	return { board, setBoard, getBoard }
}

module.exports = { useBoard }
