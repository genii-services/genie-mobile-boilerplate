require("react")
const { View } = require("react-native")
const _ = require("lodash")
const { Container, Body, Text, ListItem } = require("/elements")
const IconFA = require("react-native-vector-icons/FontAwesome")

const { yyyymmdd } = require("/utils/moment")
const { maxTimestamp } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { List, InputBar, TitleBar } = require("/elements")

const { useAuth, useList, useStyle } = require("/coordinators")

const ItemListScreen = (props) => {
	const router = useRouter()

	const { stylez } = useStyle(DetailScreen)

	let { boardz, auth, board, boardID, searchable, searchKeyword, title, timestamp } = nextProps

	timestamp = maxTimestamp(timestamp, auth.timestamp)
	if (!boardID) boardID = board?.boardID
	if (_boardID !== boardID || _timestamp < timestamp) {
		if (!board || board.boardID !== boardID) board = boardz.getBoard(boardID, { title })
		set_boardID(boardID)
		set_board(board)
		set_timestamp(timestamp)
		boardz.reload(board)
	}

	if (_searchable !== searchable) {
		set_searchable(searchable)
		set_searchVisibled(searchable)
	}

	if (_searchKeyword !== searchKeyword) {
		set_searchKeyword(searchKeyword)
	}
	// return _.size(nextState) ? nextState : null

	const renderSearchBar = () => {
		if (!state.searchVisibled) return
		return (
			<InputBar
				rounded
				autoFocus
				placeholder="제목, 본문에서 찾을 문자열"
				minLength={2}
				value={state.searchKeyword}
				onPress={(v) => search(v)}
			/>
		)
	}

	/*  게시물 목록을 가져온다. 호출하게 되면 페이지번호를 하나 증가시켜 G/W에 요청
	 */
	const load = (where) => {
		let { userID } = auth.userInfo
		console.debug(this, "")
		if (!_board.paramz.pageIndex || _board.paramz.pageIndex == 1) {
			setTimeout(() => props.boardz.load(_board, { userID }), 2000) // pageindex가 1 바로 다음에 2가 실행되지 않고 2부터 실행되는 버그로 timeout 추가
		} else {
			props.boardz.load(_board, { userID })
		}
	}

	const refresh = (paramz = {}) => {
		console.debug(this, "refresh")

		props.boardz.reload(_board, paramz)
	}

	// 검색을 하게 되면 기존 게시물 목록을 제거하고, 페이지번호를 리셋한 후 검색어를 전달
	const search = (keyword) => {
		let { boardz, auth } = props
		boardz.reload(_board, {
			searchType: "",
			searchKeyword: keyword,
			pageIndex: 0,
			userID: auth.userInfo.userID,
		})
	}

	const toggleSearchBar = () => {
		const searchVisibled = !_searchVisibled
		//console.debug(this, nextState)
		if (!searchVisibled) refresh({ searchKeyword: "" })
		set_searchVisibled(searchVisibled)
	}

	const detailArticle = (item, initialTabIndex = 0) => {
		router.push("detailArticle", {
			_board,
			title: _board?.title,
			item,
			initialTabIndex,
			isRefreshAtReturn: true,
		})
	}

	if (!_board) return <View />
	let { articles = [] } = _board
	console.debug(ListScreen, articles, _board)
	return (
		<Container style={stylez.list} timestamp={_board.timestamp}>
			<TitleBar back title={_board.title || "게시판"} rightIconName="ios-search" onRightPress={toggleSearchBar} />
			{renderSearchBar()}
			<List
				style={stylez.list}
				data={articles}
				keyExtractor={(item) => item.itemID}
				renderItem={({ item }) => (
					<ListItem style={stylez.listItem} onPress={() => detailArticle(item)} delayLongPress={10000}>
						<Text style={stylez.listItemIcon}>{item.isRead ? "" : "●"}</Text>
						<Body style={stylez.listItemBody}>
							<Text style={stylez.listItemText1}>{item.itemTitle}</Text>
							<Text style={stylez.listItemText2}>
								{item.author + " " + (item.deptName || "") + " / " + yyyymmdd(item.createdDatetime)}
								{item.statusName ? " / " + item.statusName : ""}
							</Text>
						</Body>
						{item.hasAttachments && (
							<IconFA style={stylez.listItemClip} name="paperclip" onPress={() => detailArticle(item, 1)} />
						)}
					</ListItem>
				)}
				ListFooterComponent={() => <View style={{ height: 120 }} />}
				status={_board.status}
				nothingVisible
				nothingText="게시글이 없습니다"
				onRefresh={refresh}
				onEndReached={load}
			/>
		</Container>
	)
}
ItemListScreen.getDefaultStyle = require("/styles/screens/ItemList")

module.exports = ItemListScreen
