const React = require("react")
const { Switch } = require("react-native")
const { ActionSheet, Button, Container, Content, Icon, List, ListItem, Text } = require("/elements")
// const { Switch } = require("react-native-switch")

const config = require("/data/config")
const { appVersion, buildNumber, deviceID } = require("/utils/device")
const { upgradeApp } = require("/utils/app")
const { hex_md5 } = require("/utils/md5")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { TitleBar } = require("/elements")

const fontSizeOptions = ["작게", "조금 작게", "표준", "조금 크게", "크게"]
const { useAuth, useStyle } = require("/coordinators")

const SettingsScreen = (props) => {
	const router = useRouter()
	const { auth } = useAuth()
	const { stylez, setFontSizes } = useStyle(LoginScreen)

	const logout = () => auth.logout()

	const setLoginInfoSavable = (v) => {
		auth.setLoginInfoSavable(v)
		set_loginInfoSavable(v)
	}

	const setFontSize = () => {
		let options = [...fontSizeOptions, "취소"]
		ActionSheet.show(
			{
				title: "폰트 크기 선택",
				options,
				cancelButtonIndex: options.length - 1,
			},
			(i) => 0 <= i && i < options.length - 1 && setFontSizes(i)
		)
	}

	const setTheme = () => {}

	console.debug(SettingsScreen, auth.loginInfo.loginInfoSavable)
	return (
		<Container style={stylez.container}>
			<TitleBar
				back
				title="설정"
				onLeftPress={() => {
					router.pop()
					if (_styleChanged) setTimeout(() => router.refresh({ refreshedTimestamp: Date.now() }), 0)
				}}
			/>
			<List style={stylez.list}>
				<ListItem itemDivider style={stylez.listItemDivider}>
					<Text style={stylez.leftText}>로그인 정보</Text>
					<Button style={stylez.rightButton} small onPress={logout}>
						<Text style={stylez.rightButtonText}>로그아웃</Text>
					</Button>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText}>로그인 계정</Text>
					<Button
						style={stylez.right}
						transparent
						small
						// onPress={() => router.push("userDetail", { item: auth.userInfo, footerVisible: false })}
					>
						<Text style={stylez.rightText}>{auth.userInfo.emailAddress}</Text>
					</Button>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText}>로그인ID 저장</Text>
					<Switch
						style={stylez.switch}
						activeText=""
						inActiveText=""
						value={auth.loginInfo.loginInfoSavable}
						onValueChange={(v) => setLoginInfoSavable(v)}
					/>
				</ListItem>
				<ListItem itemDivider style={stylez.listItemDivider}>
					<Text style={stylez.leftText}>화면 설정</Text>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText} onLongPress={() => router.push("intro")}>
						폰트 크기
					</Text>
					<Text style={stylez.rightText} onPress={setFontSize}>
						{fontSizeOptions[stylez.fontSizesIndex]}
					</Text>
				</ListItem>
				{/*<ListItem style={stylez.listItem}>
							<Text  style={stylez.leftText} onLongPress={() => router.push("intro")}>테마</Text>
							<Text style={stylez.rightText} onPress={setTheme}>
								밝은 테마
							</Text>
						</ListItem>*/}
				<ListItem itemDivider style={stylez.listItemDivider}>
					<Text style={stylez.leftText}>버전</Text>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText} onLongPress={() => router.push("intro")}>
						앱 버전
					</Text>
					<Text style={stylez.rightText} onPress={() => upgradeApp({ ver: "/next", cancelable: true })}>
						{`Ver ${appVersion}.${buildNumber}`}
					</Text>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText} onLongPress={() => router.push("intro")}>
						버전 히스토리
					</Text>
					<Icon
						style={stylez.rightIcon}
						name="ios-arrow-forward"
						onPress={() => router.push("listArticle", { boardID: "AppHistory", title: "버전 히스토리" })}
					/>
				</ListItem>
				<ListItem itemDivider style={stylez.listItemDivider}>
					<Text style={stylez.leftText}>일반</Text>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText} onLongPress={() => router.push("intro")}>
						ID
					</Text>
					<Text style={stylez.rightText}>{hex_md5(deviceID).substr(0, 5)}</Text>
				</ListItem>
				<ListItem style={stylez.listItem}>
					<Text style={stylez.leftText} onLongPress={() => router.push("intro")}>
						URL
					</Text>
					<Text style={stylez.rightText}>{config.originz.api}</Text>
				</ListItem>
			</List>
		</Container>
	)
}
SettingsScreen.getDefaultStyle = require("/styles/screens/Settings")

module.exports = SettingsScreen
