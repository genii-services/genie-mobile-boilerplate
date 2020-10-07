const { observable, action } = require("mobx")
const _ = require("lodash")

const { NUMBER, OBJECT, STRING } = require("/constants")
const boardz = require("/data/boardz")
const { assign } = require("/utils")
const { whoami } = require("/utils/debug")
const { Progress, createProgress, IGNORE, SUCCEED, FAILED, ERROR } = require("/utils/progress")
const { request } = require("/services/rest")
const authStore = require("./auth")

console.debug("boardzStore", "(re)loaded")

let counter = 0

class BoardzStore {
	// 게시판 목록
	boardz = {}

	// 게시글 목록 (게시판에 종속적이지 않음)
	articlez = {} // 글 상세보기 용

	@observable comment_timestampupdateValue
	comment = createProgress({
		list: [],
	})

	constructor() {
		this.boardz = _.mapValues(boardz, (board) => new Progress({ ...board }))
	}

	getBoard(boardID, props) {
		return this.boardz[boardID] || this.setBoard(boardID, props)
	}

	// 동적 게시판 생성용
	@action setBoard(boardID, props) {
		return (this.boardz[boardID] = new Progress({
			paramz: { boardUrl: boardID, pageSize: 20, searchType: "", searchKeyword: "" },
			...props,
		}))
	}

	@action load(board, paramz) {
		if (!board) return
		if (typeof board === STRING) board = this.getBoard(board)

		paramz = assign(board.paramz, paramz, { userID: authStore.workInfo.userID })
		// 페이징 첫페이지인 경우 배열 초기화
		if (!paramz.pageIndex || paramz.pageIndex < 1) board.articles = []

		request("getArticleList", board, handleOnLoad)
	}

	@action.bound handleOnLoad({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				let list = payload.items
				progress.articles = progress.articles.concat(list)
				// this.map.set(progress.boardID, progress)
				break
			}
			case FAILED:
				if (payload.ResultCode == "E00201") payload.ResultMessage = `${progress.title || "게시판"}에 글이 없습니다.`
			case ERROR: {
				progress.articles = []
			}
		}
	}

	reload(board, paramz = {}) {
		console.debug("boardz.reload")
		paramz.pageIndex = 0
		board.articles = []
		this.load(board, paramz)
	}

	getBoardUrl(param) {
		if (!param) return
		if (param.boardID) {
			let board = this.boardz[param.boardID]
			if (board && board.boardUrl) return board.boardUrl
		}
		return typeof param === STRING || typeof param === NUMBER
			? param
			: param.boardUrl
			? param.boardUrl
			: param.paramz && param.paramz.boardUrl
			? param.paramz.boardUrl
			: typeof param.board === OBJECT
			? this.getBoardUrl(param.board)
			: undefined
	}

	/*
		게시글 관련
	*/

	getArticleID(param) {
		return !param
			? undefined
			: typeof param === STRING || typeof param === NUMBER
			? param
			: param.itemData
			? param.itemData.itemID // 게시글 상세보기
			: param.itemID
			? param.itemID //
			: param.articleID
			? param.articleID // 장면 간 전달되는 파라메터 중에서 게시글 ID
			: typeof param.item === OBJECT
			? this.getArticleID(param.item) // 장면 간 전달되는 파라메터 중에서 게시글 오브젝트
			: undefined
	}

	@action getArticle(param, board) {
		if (!board || !param) return
		let articleID = this.getArticleID(param)
		let article = this.articlez[articleID]
		if (!article) {
			article = this.articlez[articleID] = new Progress({
				paramz: {
					boardUrl: this.getBoardUrl(board),
					articleID,
				},
				data: { ...article },
			})
		}
		return article
	}

	@action loadArticle(article, board) {
		if (typeof article === STRING) article = this.getArticle(article, board)
		if (!article) return

		article.paramz.userID = authStore.workInfo.userID

		request("getArticle", article, handleOnLoadArticle, { board })
	}

	@action.bound handleOnLoadArticle({ status, payload, progress, board }) {
		switch (status) {
			case SUCCEED: {
				let data = payload.itemData // 정규화 시에 deeping clone을 했으므로 _.cloneDeep할 필요없음
				_.forEach(payload.fields, (v) => (data[v.fieldName] = v.fieldValue))
				data.attachments = payload.attachments // _.cloneDeep 상동
				data.isRead = true
				data.availableApvActions = payload.availableApvActions // 승인/반려 버튼 활성화

				progress.data = data // 데이터를 완성 후 적용해야 mobx에 의해 중간에 observe되는 상황이 발생하지 않음

				// 게시판에 게시글ID를 가진 게시글이 있으면 읽은 것으로 처리
				if (typeof board == STRING) board = this.getBoard(board)
				let index = _.findIndex(board.articles, { itemID: data.itemID })
				if (0 <= index) {
					board.articles[index].isRead = true
					board.timestamp = Date.now()
				} else console.warn(whoami(this, arguments), "읽음 표시할 게시물을 못 찾음", data)
			}
		}
	}

	/*
		게시글 승인
	*/
	@action requestApproval(board, article, actionType, onSucceed) {
		let comment = this.comment
		if (!comment) return

		comment.paramz = { boardUrl: board, articleID: article, actionType: actionType, userID: authStore.workInfo.userID }
		request("requestApproval", comment, handleOnRequestApproval, { onSucceed })
	}

	@action.bound handleOnRequestApproval({ status, payload, onSucceed }) {
		switch (status) {
			case SUCCEED: {
				if (onSucceed) onSucceed.call(this)
				break
			}
		}
	}

	@action getCommentInfo(board, article) {
		if (!board || !article) return
		let comment = this.comment
		comment.paramz.boardUrl = this.getBoardUrl(board)
		comment.paramz.itemID = this.getArticleID(article)
		/*
		let { comment } = article
		if(!comment) comment = article.comment = {paramz:{boardUrl:board.paramz.boardUrl, itemID:article.itemID}, list:observable([])}
		*/
		return comment
	}

	@action submit(item, apvType, comment, onSucceed) {
		if (!item) return

		item.paramz = { apvID: this.getId(item), apvType, comment, userID: authStore.workInfo.userID }
		request("approvalRequest", item, handleOnSubmit, { onSucceed })
		return item
	}

	@action.bound handleOnSubmit({ status, onSucceed }) {
		switch (status) {
			case IGNORE: {
				return popup("게시글 처리 중입니다.")
			}
			case SUCCEED: {
				// this.removeItem(item)
				this.reload()
				this.loadDocumentCount()
				if (onSucceed) onSucceed.call(this)
				break
			}
		}
	}

	@action loadComments(board, article, paramz) {
		let comment = this.getCommentInfo(board, article)
		if (!comment) return

		paramz = assign(comment.paramz, paramz, { userID: authStore.workInfo.userID })
		// 페이징 첫페이지인 경우 배열 초기화
		if (!paramz.pageIndex || paramz.pageIndex < 1) comment.list.length = 0
		request("getArticleCommentList", comment, handleOnLoadComments)
	}

	@action.bound handleOnLoadComments({ status, payload, progress }) {
		switch (status) {
			case SUCCEED: {
				let list = payload.items
				_.forEach(list, (v) => v.createdDatetime.add(9, "hours")) // 서버에서 시간대가 잘못 내려와서 +9 hours 함
				//console.debug(this, list.length)
				progress.list = progress.list.concat(list)
				break
			}
		}
	}

	reloadComments(board, article) {
		this.loadComments(board, article, { pageIndex: 0 })
	}

	@action enterComment(board, article, content) {
		let comment = this.getCommentInfo(board, article)
		if (!comment) return //popup('서버에 댓글 등록 중입니다.')

		assign(comment.paramz, { content, userID: authStore.workInfo.userID })
		request("addComment", comment, handleOnEnterComment)
	}

	@action.bound handleOnEnterComment({ status, progress }) {
		switch (status) {
			case SUCCEED: {
				progress.timestamp = 0
				this.reloadComments(board, article) // onEndReached로 인해 자동으로 리프레쉬 안된다면
				break
			}
		}
	}
}

module.exports = new BoardzStore()
