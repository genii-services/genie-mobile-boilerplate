const React = require("react")
const { View, KeyboardAvoidingView } = require("react-native")
const _ = require("lodash")
const { Container, Body, ListItem, Text } = require("/elements")

const { itsIOS } = require("/utils/device")
const { yyyymmddhhmmss } = require("/utils/moment")
const { maxTimestamp } = require("/utils/moment")
const CommentListStyle = require("/styles/viewparts/CommentList")
const FooterStyle = require("/styles/viewparts/Footer")
const { List, InputBar, TitleBar } = require("/elements")
const { IdPhoto } = require("/viewparts")
const { useThis } = require("/hooks")
const { useRefs } = require("/hooks")

const CommentListScreen = (props) => {
	let { boardz } = props

	const _this = useThis()
	const refs = useRefs()

	if (!refs.top) {
		_this.board = props.board || boardz.getBoard(props.boardID || props.boardUrl)
		_this.boardUrl = boardz.getBoardUrl(props)
		_this.articleID = boardz.getArticleID(props)

		refresh() // 최초 rendering 시 onEndReached에서 이벤트 발생여부에 따라 처리 결정
	}

	let { auth, title, timestamp } = nextProps
	/* props 변경에 따른 state 설정 */

	const { stylez, getStylez } = useStyle(CommentListStyle)
	const footerStylez = getStylez("Footer", FooterStyle)

	timestamp = maxTimestamp(timestamp, auth.timestamp)
	if (_timestamp < timestamp) {
		set_timestamp(timestamp)
	}

	console.debug(this, "end getDerivedStateFromProps")
	// return _.size(nextState) ? nextState : null

	const load = (where) => {
		console.debug(CommentsScreen, where)
		props.boardz.loadComments(_this.boardUrl, _this.articleID)
	}

	const refresh = (where) => {
		console.debug(CommentsScreen, where)
		props.boardz.reloadComments(_this.boardUrl, _this.articleID)
	}

	const enterComment = (text) => {
		console.debug(CommentsScreen)
		props.boardz.enterComment(_this.boardUrl, _this.articleID, text)
	}

	let commentable = _this.board?.commentable
	let { comment } = props.boardz
	console.debug(CommentsScreen, comment)
	return (
		<Container style={stylez.container}>
			<TitleBar back title="댓글보기" />
			<List
				timestamp={comment.timestamp}
				style={stylez.list}
				data={comment.list}
				keyExtractor={(item) => item.commentID}
				renderItem={({ item }) => (
					<ListItem style={stylez.item}>
						<IdPhoto style={stylez.icon} id={item.authorID} />
						<Body>
							<Text style={stylez.textAuthor}>{item.author + " " + (item.authorDept || "")}</Text>
							<Text style={stylez.textDate}>{yyyymmddhhmmss(item.createdDatetime)}</Text>
							<Text style={stylez.textBody}>{item.content}</Text>
						</Body>
					</ListItem>
				)}
				nothingText="댓글이 없습니다"
				ListFooterComponent={() => <View style={{ height: 100 }} />}
				status={comment.status}
				onRefresh={() => refresh("List.onRefresh")}
				onEndReached={() => load("List.onEndReached")}
			/>
			{commentable && (
				<KeyboardAvoidingView behavior={itsIOS ? "padding" : null}>
					<InputBar
						style={footerStylez.inputBar}
						inputStyle={footerStylez.input}
						placeholder="댓글을 입력해 주세요."
						minLength={1}
						buttonTitle="등록"
						onPress={(text) => enterComment(text)}
					/>
				</KeyboardAvoidingView>
			)}
		</Container>
	)
}

module.exports = CommentListScreen
