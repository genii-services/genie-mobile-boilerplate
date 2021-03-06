require("react")
const { View } = require("react-native")
const _ = require("lodash")
const Orientation = require("react-native-orientation-locker").default
const {
	Body,
	BorderButton,
	Container,
	Content,
	Item,
	Icon,
	HIconText,
	Left,
	List,
	ListItem,
	RefreshControl,
	Right,
	Text,
	TitleBar,
	VLine,
} = require("/elements")

const { urlz } = require("/data/config")
const { yyyymmdd } = require("/utils/moment")
const { useEffect, useState } = require("/hooks")
const { useBoard } = require("/coordinators/board")
const { useRouter } = require("/coordinators/router")
const { useStyle } = require("/coordinators/style")

const HomeScreen = (props) => {
	const { boardz, getBoard } = useBoard()

	const [_board1, set_board1] = useState(() => getBoard("Announcementsoneaday4"))
	const [_board2, set_board2] = useState(() => getBoard("FamilyEvent4"))
	const [_refreshing, set_refreshing] = useState(false)
	const [_loading, set_loading] = useState(false)

	const { stylez } = useStyle(HomeScreen)

	// if (_this.isChangedProps("Icon,name", { type, name, android, ios, active })) {	}

	useEffect(() => {
		Orientation.addOrientationListener(handleOrientationDidChange)
		return () => Orientation.removeOrientationListener(handleOrientationDidChange)
	}, [])

	const loadData = () => {
		if (_refreshing) set_refreshing(false) // RefreshControl 용은 수동으로 처리
		nextProps.boardz.reload(_board1)
		nextProps.boardz.reload(_board2)
		nextProps.counter.loadMailCount()
		nextProps.menu.load()
	}

	const handleOrientationDidChange = (orientation) => {
		console.debug(HomeScreen)
		forceUpdate()
	}

	const refresh = (isUpdateRefreshing) => {
		if (isUpdateRefreshing) set_refreshing(true)
		props.boardz.reload(_board1)
		props.boardz.reload(_board2)
		props.counter.loadMailCount()
		props.menu.load()
	}

	const renderBoard = (board) => {
		let { title, articles } = board
		if (!articles) return <View />
		let data = 5 < articles.length ? _.slice(articles, 0, 5) : articles
		return (
			<List
				style={stylez.boardListItem}
				ListHeaderComponent={() => (
					<Item
						style={stylez.boardTitleBar}
						onPress={() => router.push("listArticle", { boardID: board.paramz.boardUrl, title })}>
						<Left>
							<Text style={stylez.boardTitleBarText}>{title}</Text>
						</Left>
						<Right>
							<Icon style={stylez.boardTitleBarIcon} name="ios-arrow-forward" />
						</Right>
					</Item>
				)}
				data={data}
				keyExtractor={(item) => item.itemID}
				renderItem={({ item }) => (
					<ListItem style={stylez.boardListItem} onPress={() => router.push("detailArticle", { board, item, title })}>
						<Text style={stylez.boardListItemText} numberOfLines={2}>
							{item.itemTitle}
						</Text>
						<Text style={stylez.boardListItemTextRight}>{yyyymmdd(item.createdDatetime)}</Text>
					</ListItem>
				)}
			/>
		)
	}

	let { title } = props
	return (
		<Container>
			<TitleBar drawer title={title} rightIconName="ios-refresh" onRightPress={refresh} />
			{/*
			<Content refreshControl={<RefreshControl refreshing={_refreshing} onRefresh={() => refresh(true)} />}>
				<View style={stylez.notiArea}>
					<HIconText iconName="envelope-o" imageName="ico-main-mail" title="메일" onPress={() => router.launch("email")} />
					<VLine height={30} />
					<HIconText iconName="list-alt" imageName="ico-main-aprv" title="결재" />
				</View>
				<View style={stylez.rectButtonArea}>
					<BorderButton
						borderColor="#BD4941"
						iconName="bullhorn"
						imageName="ico-main-noti"
						title="공지사항"
						onPress={() => router.push("listArticle", { boardID: "Announcementsoneaday", title: "공지사항" })}
					/>
					<BorderButton
						borderColor="#D96779"
						iconName="calendar-check-o"
						imageName="ico-main-event"
						title="경조사"
						onPress={() => router.push("listArticle", { boardID: "FamilyEvent", title: "경조사" })}
					/>
					<BorderButton
						borderColor="#F5B436"
						iconName="address-book"
						imageName="ico-main-employeeinfo"
						title="사우정보"
						onPress={() => router.jump("userSearch")}
					/>

					<BorderButton
						borderColor="#7A629B"
						iconName="comments-o"
						imageName="ico-main-messenger"
						title="메신저"
						onPress={() => router.launch("messenger", "메신저")}
					/>
					<BorderButton
						borderColor="#4A95A3"
						iconName="calendar"
						imageName="ico-main-schedule"
						title="일정"
						onPress={() => router.launch("calendar", "일정")}
					/>
					<BorderButton
						borderColor="#50769B"
						iconName="windows"
						imageName="ico-main-owa"
						title="웹메일"
						onPress={() => router.browse(urlz.webmail)}
					/>
				</View>
				{renderBoard(_board1)}
				{renderBoard(_board2)}

				<Item style={stylez.qnaArea} onPress={() => router.push("listArticle", { boardID: "Faq", title: "자주하는 질문" })}>
					<Body>
						<Text style={stylez.qnaAreaTitle}>자주하는 질문</Text>
						<Text style={stylez.qnaAreaText}>문의 전 확인하세요!</Text>
					</Body>
				</Item>
			</Content>
							*/}
			{_loading && <Spinner color="green" />}
		</Container>
	)
}

HomeScreen.getDefaultStyle = require("/styles/screens/Home")

module.exports = HomeScreen
