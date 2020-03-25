const React = require("react")
const {} = require("react-native")
const _ = require("lodash")
const { Container, Body, ListItem, Button, Icon, Label, Text, Footer, FooterTab } = require("/elements")

const { toString } = require("/utils/string")
const { maxTimestamp } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const UserDetailStyle = require("/styles/screens/UserDetail")
const { List, TitleBar } = require("/elements")
const { IdPhoto } = require("/viewparts")

const { useUser, useAuth, getStyle } = require("/coordinators")

const UserDetailScreen = props => {
	const router = useRouter()
	const { useRefs } = require("/hooks")
	const refs = useRefs()

	const { getStyle } = useStyle()
	const style = getStyle(UserDetailStyle)

	let timestamp = maxTimestamp(nextProps.user.timestamp, nextProps.auth.timestamp)
	if (_timestamp !== timestamp) {
		set_timestamp(timestamp)
	}
	// return _.size(nextState) ? nextState : null

	const renderItem = (item, style) => {
		let launchable = (item.type == "mobile" || item.type == "tel") && item.value
		return (
			<ListItem style={style.listItem} onPress={() => launchable && router.launch("tel:" + item.value, "전화 걸기")}>
				<Label style={style.listItemLabel}>{item.label}</Label>
				<Text style={style.listItemText}>{toString(item.value)}</Text>
				{launchable ? (
					<Icon style={style.listItemIcon} name={item.type == "mobile" ? "ios-phone-portrait" : "ios-call"} />
				) : (
					undefined
				)}
			</ListItem>
		)
	}

	const renderFooter = (defaultz, style) => {
		if (!props.footerVisible || !defaultz) return
		return (
			<Footer style={style.footer}>
				<FooterTab style={style.footerTab}>
					<Button
						style={style.footerButton}
						vertical
						onPress={() => !!defaultz.mail && router.launch("mailto:" + defaultz.mail, "메일 보내기")}>
						<Icon style={style.footerIcon} name="ios-mail" />
						<Text style={style.footerText}>메일</Text>
					</Button>
					<Button
						style={style.footerButton}
						vertical
						onPress={() => !!defaultz.tel && router.launch("tel:" + defaultz.tel, "전화 걸기")}>
						<Icon style={style.footerIcon} name="ios-call" />
						<Text style={style.footerText}>전화</Text>
					</Button>
					<Button
						style={[style.footerButton]}
						vertical
						onPress={() => !!defaultz.sms && router.launch("sms:" + defaultz.sms, "문자 보내기")}>
						<Icon style={style.footerIcon} name="ios-text" />
						<Text style={style.footerText}>문자</Text>
					</Button>
					<Button
						style={[style.footerButton, { borderRightWidth: 0 }]}
						vertical
						onPress={() => router.launch("messenger", "메신저")}>
						<Icon style={style.footerIcon} name="ios-chatboxes" />
						<Text style={style.footerText}>메신저</Text>
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
	let style = _style
	console.debug(UserDetailScreen, userProps, defaultz)
	return (
		<Container style={style.container}>
			{viewAppointmentYN == "Y" || viewAppointmentYN == "1" ? (
				<TitleBar back title="사우정보" rightText="발령정보" onRightPress={() => router.push("listAppointment", { item })} />
			) : (
				<TitleBar back title="사우정보" />
			)}
			<ListItem style={style.listHeader}>
				<IdPhoto style={style.listHeaderPhoto} source={item.photoURL1} reload={true} />
				<Body>
					<Text style={style.listHeaderText1}>{item.userName + " " + (item.titleName || "")}</Text>
					<Text style={style.listHeaderText2}>{item.companyName + " | " + (item.deptName || "알수없음")}</Text>
					<Text style={style.listHeaderText2}>{item.emailAddress}</Text>
				</Body>
			</ListItem>
			<List
				style={style.list}
				data={userProps}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => renderItem(item, style)}
			/>
			{renderFooter(defaultz, style)}
		</Container>
	)
}

UserDetail.defaultProps = {
	...List.defaultProps,
	footerVisible: true,
}

module.exports = UserDetailScreen
