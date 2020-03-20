const React = require("react")
const { View } = require("react-native")
const _ = require("lodash")
const Orientation = require("react-native-orientation-locker").default
const { Left, Right, ListItem, Item, Icon, Text } = require("/elements")

const { urlz } = require("/data/config")
const { yyyymmdd } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { List } = require("/elements")

const { useAuth, useItems, useItem, useCounter, useMenu, useStyle } = require("/coordinators")

const HomeScreen = props => {
	const [_board1, set_board1] = useState(props.boardz.getBoard("Announcementsoneaday4"))
	const [_board2, set_board2] = useState(props.boardz.getBoard("FamilyEvent4"))
	const [_refreshing, set_refreshing] = useState(false)

	const { getStyle } = useStyle()
	const style = getStyle(HomeScreen)

	if (_timestamp !== timestamp) {
		console.debug("Home.getDerivedStateFromProps", timestamp)
		nextProps.boardz.reload(_board1)
		nextProps.boardz.reload(_board2)
		nextProps.counter.loadMailCount()
		nextProps.menu.load()

		set_timestamp(timestamp)
	}
	// return _.size(nextState) ? nextState : null

	useEffect(() => {
		Orientation.addOrientationListener(handleOrientationDidChange)
		return () => Orientation.removeOrientationListener(handleOrientationDidChange)
	}, [])

	const renderBoard = board => {
		let { title, articles } = board
		if (!articles) return <View />
		let data = 5 < articles.length ? _.slice(articles, 0, 5) : articles
		return (
			<List
				timestamp={board.timestamp}
				style={style.boardListItem}
				ListHeaderComponent={() => (
					<Item
						style={style.boardTitleBar}
						onPress={() => router.push("listArticle", { boardID: board.paramz.boardUrl, title })}>
						<Left>
							<Text style={style.boardTitleBarText}>{title}</Text>
						</Left>
						<Right>
							<Icon style={style.boardTitleBarIcon} name="ios-arrow-forward" />
						</Right>
					</Item>
				)}
				data={data}
				keyExtractor={item => item.itemID}
				renderItem={({ item }) => (
					<ListItem style={style.boardListItem} onPress={() => router.push("detailArticle", { board, item, title })}>
						<Text style={style.boardListItemText} numberOfLines={2}>
							{item.itemTitle}
						</Text>
						<Text style={style.boardListItemTextRight}>{yyyymmdd(item.createdDatetime)}</Text>
					</ListItem>
				)}
			/>
		)
	}

	const loadData = () => {
		console.debug(HomeScreen)
		if (_refreshing) set_refreshing(false) // RefreshControl 용은 수동으로 처리
	}

	const handleOrientationDidChange = orientation => {
		console.debug(HomeScreen)
		forceUpdate()
	}

	const refresh = isUpdateRefreshing => {
		if (isUpdateRefreshing) set_refreshing(true)
		props.boardz.reload(_board1)
		props.boardz.reload(_board2)
		props.counter.loadMailCount()
		props.menu.load()
	}

	loadData()
	let { title } = props
	return (
		<Container>
			<TitleBar drawer title={title} rightIconName="ios-refresh" onRightPress={refresh} />
			<Content refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={() => refresh(true)} />}>
				<View style={style.notiArea}>
					<HIcon
						iconName="envelope-o"
						imageName="ico-main-mail"
						title="메일"
						note={props.counter.mailCount.unRead}
						onPress={() => router.launch("email")}
					/>
					<VLine height={30} />
					<HIcon iconName="list-alt" imageName="ico-main-aprv" title="결재" />
				</View>
				<View style={style.rectButtonArea}>
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
				<Item style={style.qnaArea} onPress={() => router.push("listArticle", { boardID: "Faq", title: "자주하는 질문" })}>
					<Body>
						<Text style={style.qnaAreaTitle}>자주하는 질문</Text>
						<Text style={style.qnaAreaText}>문의 전 확인하세요!</Text>
					</Body>
				</Item>
			</Content>
			{state.loading && <Spinner color="green" />}
		</Container>
	)
}

HomeScreen.getDefaultStyle = require("/styles/screens/HomeScreen")

module.exports = HomeScreen
