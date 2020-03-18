const React = require("react")
const _ = require("lodash")
const { View } = require("react-native")
const { Container, Body, Icon, ListItem, Text } = require("native-base")
const IconFA = require("react-native-vector-icons/FontAwesome")

const { SUCCEED } = require("/utils/progress")
const { maxTimestamp } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { List, InputBar, TitleBar } = require("/elements")
const { IdPhoto, UserBar } = require("/viewparts")
const { useAuth, useUser } = require("/coordinators")
const { useRefs } = require("/hooks")

/**
 * 조직목록 & 사용자 목록 화면 컴포넌트
 */
const UserSearchScreen = props => {
	const router = useRouter()
	const { auth } = useAuth()
	const { user } = useUser()

	const refs = useRefs()

	const [_refreshing, set_refreshing] = useState(false)
	const [_search, set_search] = useState(false)
	const [_timestamp, set_timestamp] = useState()

	if (!refs.top) {
		// 부서정보 호출용 root
		user.clear()
		user.loadDept({ parentID: "" })
	}

	const { getStyle } = useStyle()
	const style = getStyle(UserSearchScreen)

	let timestamp = maxTimestamp(user.timestamp, auth.timestamp)
	if (_timestamp !== timestamp) {
		set_timestamp(timestamp)
	}
	// return _.size(nextState) ? nextState : null

	// 조직도 목록 출력용, 조직목록 & 사우목록
	const renderListItem = item => {
		if (item.deptCode != null) {
			return (
				<ListItem style={_style.item} button onPress={() => searchDept(item)}>
					<IconFA name="clone" style={_style.listItemsLeft} />
					<Body style={_style.itemInfo}>
						<Text style={_style.name}>{item.deptName}</Text>
					</Body>
				</ListItem>
			)
		} else {
			return (
				<ListItem style={_style.item} button onPress={() => router.push("detailUser", { item })}>
					<IdPhoto style={_style.itemPhoto} source={item.photoURL1} />
					<Body style={_style.itemInfo}>
						<Text style={_style.name}>{item.userName + " " + (item.titleName || "")}</Text>
						<Text style={_style.font13}>{item.companyName + " | " + (item.deptName || "알수없음")}</Text>
						<Text style={_style.font13}>
							<Icon name="ios-mail-outline" style={_style.icon13} /> {item.emailAddress}
						</Text>
						<View style={_style.tels}>
							{item.mobileTel ? (
								<Text style={_style.tel}>
									<Icon name="ios-phone-portrait" style={_style.icon13} /> {item.mobileTel}{" "}
								</Text>
							) : (
								undefined
							)}
							{item.officeTel && (
								<Text style={_style.tel}>
									<Icon name="ios-call-outline" style={_style.icon13} /> {item.officeTel}{" "}
								</Text>
							)}
						</View>
					</Body>
				</ListItem>
			)
		}
	}

	//  게시물 목록을 가져온다. 호출하게 되면 페이지번호를 하나 증가시켜 G/W에 요청
	const load = where => {
		//console.debug(this, where)
		user.load()
	}

	// 새로 고침
	const refresh = where => {
		//console.debug(this, where)
		user.reload()
	}

	// 검색을 하게 되면 기존 게시물 목록을 제거하고, 페이지번호를 리셋한 후 검색어를 전달
	const search = keyword => {
		//console.debug(this, keyword)
		user.load({ keyword, pageIndex: 0 })
	}

	// 부서를 검색한다.
	const searchDept = item => {
		console.debug(this)
		let { user } = props
		user.loadDept(item)
		user.addOrg(item)
	}

	// 상위 부서를 검색
	const delOrg = () => {
		/// 마지막 항목을 삭제한다.
		console.debug(this)
		let { user } = props
		user.delOrg()
		let item = 0 < user.org.length ? user.org[user.org.length - 1] : { deptCode: "", deptName: "" }
		user.loadDept(item)
	}
	console.debug(this, user.status, !!user.status)

	return (
		<Container style={_style.container} timestamp={user.timestamp}>
			<TitleBar
				back
				title="사우 검색"
				rightIconName={state.search ? "contacts" : "search"}
				onRightPress={() => set_search(!state.search)}
			/>
			{state.search
				? [
						<InputBar
							key="inputBar"
							rounded
							autoFocus
							placeholder="검색어를 입력하세요"
							minLength={1}
							value={user.paramz.keyword}
							onPress={v => search(v)}
						/>,
						<List
							style={_style.list}
							key="list"
							nothingVisible={user.status == SUCCEED}
							data={user.list}
							keyExtractor={item => item.userID}
							renderItem={({ item }) => (
								<ListItem style={_style.item} onPress={() => router.push("detailUser", { item })}>
									<IdPhoto style={_style.itemPhoto} source={item.photoURL1} />
									<Body style={_style.itemInfo}>
										<Text style={_style.name}>{item.userName + " " + (item.titleName || "")}</Text>
										<Text style={_style.font13}>{item.companyName + " | " + (item.deptName || "알수없음")}</Text>
										<Text style={_style.font13}>
											<Icon name="ios-mail-outline" style={_style.icon13} /> {item.emailAddress}
										</Text>
										<View style={_style.tels}>
											{item.mobileTel ? (
												<Text style={_style.tel}>
													<Icon name="ios-phone-portrait" style={_style.icon13} /> {item.mobileTel}{" "}
												</Text>
											) : (
												undefined
											)}
											{item.officeTel ? (
												<Text style={_style.tel}>
													<Icon name="ios-call-outline" style={_style.icon13} /> {item.officeTel}{" "}
												</Text>
											) : (
												undefined
											)}
										</View>
									</Body>
								</ListItem>
							)}
							ListFooterComponent={() => <View style={{ height: 120 }} />}
							refreshing={state.refreshing}
							onRefresh={() => refresh("onRefresh")}
							onEndReached={() => load("onEndReached")}
						/>,
				  ]
				: [
						<UserBar key={user.org.timestamp || "org"} value={user.org} onRightPress={delOrg} />,

						<List
							style={_style.list}
							key={user.dept.timestamp || "dept"}
							nothingVisible={user.status == SUCCEED}
							data={user.dept}
							ListFooterComponent={() => <View style={{ height: 180 }} />}
							keyExtractor={item => item.userID}
							renderItem={({ item }) => renderListItem(item, style)}
						/>,
				  ]}
		</Container>
	)
}

UserSearchScreen.getDefaultStyle = require("/styles/screens/UserSearch")

module.exports = UserSearchScreen
