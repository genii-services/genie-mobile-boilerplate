const React = require("react")
const { View, ScrollView } = require("react-native")
const _ = require("lodash")
const { Button, Container, Content, Footer, FooterTab, Icon, Item, ListItem, Tab, Tabs, Text } = require("/elements")
const IconFA = require("react-native-vector-icons/FontAwesome")
const FastImage = require("react-native-fast-image")

const { CENTER } = require("/constants/style")
const { SUCCEED, PROCESSING } = require("/utils/progress")
const config = require("/data/config")
const { toFileSize } = require("/utils/string")
const { yyyymmdd, maxTimestamp } = require("/utils/moment")
const { popup } = require("/utils/view")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const TabStyle = require("/styles/viewparts/Tab")
const AttachementFileStyle = require("/styles/viewparts/AttachementFile")
const { Html, List, LocalImage, TitleBar } = require("/elements")
const { IdPhoto } = require("/viewparts")

const { useThis } = require("/hooks")
const { useItem, useAuth, useStyle } = require("/coordinators")

const DetailScreen = props => {
	const router = useRouter()

	const _this = useThis()
	const [_imageZoomScale, set_imageZoomScale] = useState(1)

	const { getStyle } = useStyle()
	const style = getStyle(DetailScreen)
	const tabStyle = getStyle(TabStyle)
	const attachementFileStyle = getStyle(AttachementFileStyle)

	const { auth } = useAuth()
	let { boardz, board, boardID, boardUrl, article, articleID } = nextProps

	if (!board) board = boardz.getBoard(boardID)
	if (_board != board) set_board(board)

	if (!article) article = boardz.getArticle(nextProps, board)
	if (_article != article) {
		// 로그인 상태 변경, 겸직 선택에 따른 변경
		set_article(article)
		console.debug("ArticleScreen.getDerivedStateFromProps", "loadArticle")
		boardz.loadArticle(article, board)
	}

	// return _.size(nextState) ? nextState : null

	const renderContent = article => {
		let item = article?.data || { author: "", 본문: "" }

		let html = item["본문"]
		let htmlOptions = {}
		let hasTable = /table/gi.test(html)

		let publishPeriod = item.publishPeriod ? String(item.publishPeriod).replace("0001-01-01 00:00 ~ 0001-01-01 00:00", "") : ""
		let publishPeriods = publishPeriod.split("~")
		htmlOptions.zoomScale = _imageZoomScale

		//htmlOptions.viewport = 660 < screen.width ? `width=device-width, user-scalable=no` : `initial-scale=1, maximum-scale=1`
		//console.debug(this, hasTable, htmlOptions)
		return [
			<Tabs tabBarUnderlineStyle={tabStyle.tabBarUnderline} key="tabs" locked>
				<Tab
					tabStyle={tabStyle.tab}
					activeTabStyle={tabStyle.activeTab}
					textStyle={tabStyle.tabText}
					activeTextStyle={tabStyle.activeTabText}
					heading="본문">
					{item.itemID ? (
						<Content>
							<View style={style.articleHeader}>
								<Text style={style.articleHeaderTitle}>{item.itemTitle}</Text>
								<Item style={style.articleHeaderSub}>
									<IdPhoto style={style.articleHeaderIdPhoto} id={item.authorID} />
									<View>
										<Text style={style.articleHeaderText1}>
											{(item.createdDatetime ? yyyymmdd(item.createdDatetime) + "   " : "") +
												(item.viewCount ? "조회 " + item.viewCount : "")}
										</Text>
										<Text style={style.articleHeaderText2}>
											{item.author + (item.authorDept ? " (" + item.authorDept + ")" : "")}
										</Text>
										{publishPeriod !== "" && (
											<View style={{ flexDirection: "row" }}>
												<Text style={style.articleHeaderText2}>
													{publishPeriods.length < 2 ? "게시일" : "게시기간" + ": "}
												</Text>
												<View style={{}}>
													{0 < publishPeriods.length && (
														<Text style={style.articleHeaderTextRight2}>
															{_.trim(publishPeriods[0])}
															{1 < publishPeriods.length && " ~"}
														</Text>
													)}
													{1 < publishPeriods.length && (
														<Text style={style.articleHeaderTextRight2}>{_.trim(publishPeriods[1])}</Text>
													)}
												</View>
											</View>
										)}
									</View>
								</Item>
							</View>
							<ScrollView
								contentContainerStyle={{ flex: 0 }}
								maximumZoomScale={5}
								indicatorStyle="white"
								canCancelContentTouches
								bouncesZoom>
								<ScrollView
									horizontal
									contentContainerStyle={{ flex: 0 }}
									maximumZoomScale={5}
									indicatorStyle="white"
									canCancelContentTouches
									bouncesZoom>
									<Html html={html} baseUrl={originz.portal} {...htmlOptions} />
								</ScrollView>
							</ScrollView>
						</Content>
					) : (
						<View style={{ justifyContent: CENTER, alignItems: CENTER, paddingVertical: "50%" }}>
							<Icon style={styles.nothingIcon} type="MaterialCommunityIcons" name="file-document-box-remove-outline" />
							<Text style={{ marginTop: 23, fontSize: 18, color: "#9b9b9b" }}>요청한 게시글이 없습니다</Text>
						</View>
					)}
					<Button light style={{ position: "absolute", right: 5, top: 6 }} onPress={() => setImageZoomScale(0.2)}>
						<Icon style={{ backgroundColor: "transparent" }} name="ios-add" />
					</Button>
					<Button light style={{ position: "absolute", right: 5, top: 55 }} onPress={() => setImageZoomScale(-0.2)}>
						<Icon style={{ backgroundColor: "transparent" }} name="ios-remove" />
					</Button>
				</Tab>
				<Tab
					tabStyle={tabStyle.tab}
					activeTabStyle={tabStyle.activeTab}
					textStyle={tabStyle.tabText}
					activeTextStyle={tabStyle.activeTabText}
					heading={"첨부파일" + (item.attachements ? " (" + item.attachments.length + ")" : "")}>
					<List
						data={item.attachments}
						keyExtractor={item => item.fileID}
						renderItem={({ item }) => (
							<ListItem style={attachementFileStyle.listItem} icon onPress={() => share(item)}>
								{item.thumbnailUrl ? (
									<FastImage style={attachementFileStyle.iconImage} source={{ uri: item.thumbnailUrl }} square />
								) : (
									<IconFA style={attachementFileStyle.icon} name="file-o" />
								)}
								<Text style={attachementFileStyle.name}>{item.name}</Text>
								<Text style={attachementFileStyle.size}>{toFileSize(item.size)}</Text>
							</ListItem>
						)}
						nothingVisible
					/>
				</Tab>
			</Tabs>,
			item.availableApvActions && item.availableApvActions.length !== 0 && (
				<Footer style={style.footer}>
					<FooterTab>
						{_.map(item.availableApvActions, (v, k) => (
							<Button
								key={k}
								style={[style.button, style[_.lowerFirst(v.actionID)]]}
								onPress={() => submit(v.actionID, v.actionLabel)}>
								<Text style={style.buttonText}>{v.actionLabel}</Text>
							</Button>
						))}
					</FooterTab>
				</Footer>
			),
		]
	}

	const submit = (actionID, label) => {
		let { boardz } = props
		let { boardUrl, articleID } = _article.paramz
		popup(`${label} 하시겠습니까?`, `${label} 확인`, [
			{ text: "취소", style: "cancel" },
			{
				text: label,
				onPress: () =>
					boardz.requestApproval(boardUrl, articleID, actionID, () =>
						router.push("listArticle", { boardID: boardUrl, title: props.title })
					),
			},
		])
	}

	const back = () => {
		if (props.isRefreshAtReturn) {
			// console.debug(this, 'RefreshAtReturn')
			router.pop({ refresh: { refreshedTimestamp: Date.now() } })
		} else router.pop()
		return true
	}

	const load = () => {
		console.debug(this)
		props.boardz.loadArticle(_article, _board)
	}

	const setImageZoomScale = delta => {
		// console.debug( _imageZoomScale, delta )
		let imageZoomScale = _imageZoomScale + delta
		if (imageZoomScale < 1 || 4 < imageZoomScale) return
		// console.debug( 'zoom', imageZoomScale )
		set_imageZoomScale(imageZoomScale)
	}

	isSharing = false
	const share = item => {
		if (_this.isSharing) return popup("처리중입니다.")
		_this.isSharing = true
		//console.debug(this, item)
		let { userID } = auth
		let uri = `${config.urlz.downloadFile}?boardID=${item.boardID}&fileID=${item.fileID}&userID=${userID}`
		console.debug(DetailScreen, auth)
		share(uri, {
			fileName: item.name,
			title: "첨부파일 공유",
			type: "*/*",
			social: "generic",
			drmUsable: config.drmUsable,
		}).finally(() => (_this.isSharing = false))
	}

	let { boardz } = props
	let { style, article } = state
	console.debug(DetailScreen, article.timestamp, article)
	return (
		<Container>
			<TitleBar
				back
				title={props.title || "게시물"}
				rightIconName="ios-chatboxes-outline"
				// rightText={0 < item.commentCount ? item.commentCount : "0"}
				onLeftPress={back}
				onRightPress={() => router.push("comments", article.paramz /*{ boardUrl, articleID }*/)}
			/>
			{article.status === SUCCEED && renderContent(article)}
		</Container>
	)
}

DetailScreen.getDefaultStyle = require("/styles/screens/DetailScreen")

module.exports = DetailScreen
