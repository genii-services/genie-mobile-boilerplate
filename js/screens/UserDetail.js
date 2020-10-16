require("react")
const {} = require("react-native")
const _ = require("lodash")
const { Container, Body, ListItem, Button, Icon, Label, Text, Footer, FooterTab } = require("/elements")

const { toString } = require("/utils/string")
const { maxTimestamp } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const UserDetailStyle = require("/styles/screens/UserDetail")
const { List, TitleBar } = require("/elements")
const { IdPhoto } = require("/viewparts")

const { useUser, useAuth, useStyle } = require("/coordinators")

const UserDetailScreen = (props) => {
	const router = useRouter()
	const { useRefs } = require("/hooks")
	const refs = useRefs()

	const { stylez } = useStyle(UserDetailStyle)

	let timestamp = maxTimestamp(nextProps.user.timestamp, nextProps.auth.timestamp)
	if (_timestamp !== timestamp) {
		set_timestamp(timestamp)
	}
	// return _.size(nextState) ? nextState : null

	const renderItem = (item) => {
		let launchable = (item.type == "mobile" || item.type == "tel") && item.value
		return (
			<ListItem style={stylez.listItem} onPress={() => launchable && router.launch("tel:" + item.value, "전화 걸기")}>
				<Label style={stylez.listItemLabel}>{item.label}</Label>
				<Text style={stylez.listItemText}>{toString(item.value)}</Text>
				{launchable ? (
					<Icon style={stylez.listItemIcon} name={item.type == "mobile" ? "ios-phone-portrait" : "ios-call"} />
				) : undefined}
			</ListItem>
		)
	}

	const renderFooter = (defaultz) => {
		if (!props.footerVisible || !defaultz) return
		return (
			<Footer style={stylez.footer}>
				<FooterTab style={stylez.footerTab}>
					<Button
						style={stylez.footerButton}
						vertical
						onPress={() => !!defaultz.mail && router.launch("mailto:" + defaultz.mail, "메일 보내기")}>
						<Icon style={stylez.footerIcon} name="ios-mail" />
						<Text style={stylez.footerText}>메일</Text>
					</Button>
					<Button
						style={stylez.footerButton}
						vertical
						onPress={() => !!defaultz.tel && router.launch("tel:" + defaultz.tel, "전화 걸기")}>
						<Icon style={stylez.footerIcon} name="ios-call" />
						<Text style={stylez.footerText}>전화</Text>
					</Button>
					<Button
						style={[stylez.footerButton]}
						vertical
						onPress={() => !!defaultz.sms && router.launch("sms:" + defaultz.sms, "문자 보내기")}>
						<Icon style={stylez.footerIcon} name="ios-text" />
						<Text style={stylez.footerText}>문자</Text>
					</Button>
					<Button
						style={[stylez.footerButton, { borderRightWidth: 0 }]}
						vertical
						onPress={() => router.launch("messenger", "메신저")}>
						<Icon style={stylez.footerIcon} name="ios-chatboxes" />
						<Text style={stylez.footerText}>메신저</Text>
					</Button>
				</FooterTab>
			</Footer>
		)
	}

	const load = () => {
		props.user.loadItem(props.item)
	}

	if (!refs.top) {
		load()
	}

	let { item } = props
	let { userProps, defaultz } = props.user.item
	let { viewAppointmentYN } = auth.userInfo // 현재 Y/N,  V2에서는 "Y"이면 권한없음, "1"이면 권한있음
	console.debug(UserDetailScreen, userProps, defaultz)
	return (
		<Container style={stylez.container}>
			{viewAppointmentYN == "Y" || viewAppointmentYN == "1" ? (
				<TitleBar back title="사우정보" rightText="발령정보" onRightPress={() => router.push("listAppointment", { item })} />
			) : (
				<TitleBar back title="사우정보" />
			)}
			<ListItem style={stylez.listHeader}>
				<IdPhoto style={stylez.listHeaderPhoto} source={item.photoURL1} reload={true} />
				<Body>
					<Text style={stylez.listHeaderText1}>{item.userName + " " + (item.titleName || "")}</Text>
					<Text style={stylez.listHeaderText2}>{item.companyName + " | " + (item.deptName || "알수없음")}</Text>
					<Text style={stylez.listHeaderText2}>{item.emailAddress}</Text>
				</Body>
			</ListItem>
			<List
				style={stylez.list}
				data={userProps}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => renderItem(item)}
			/>
			{renderFooter(defaultz)}
		</Container>
	)
}

UserDetail.defaultProps = {
	...List.defaultProps,
	footerVisible: true,
}

module.exports = UserDetailScreen
