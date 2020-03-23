console.debug("LoginScreen")

const React = require("react")
const { Alert, View, Keyboard, KeyboardAvoidingView } = require("react-native")
const _ = require("lodash")
const Orientation = require("react-native-orientation-locker").default
const IconFA = require("react-native-vector-icons/FontAwesome")
// const { MessageBarManager } require("react-native-message-bar")

const { UNDEFINED } = require("/constants")
const { TRANSPARENT } = require("/constants/style")
const { assign } = require("/utils")
const { PROCESSING } = require("/utils/progress")
const config = require("/data/config")
const { appVersion, buildNumber, bundleID, screen } = require("/utils/device")
const { popup } = require("/utils/view")
const Logo = require("@svgs/genie.svg")
const { useAuth, useStyle } = require("/coordinators")
const { useRefs } = require("/hooks")
const { useThis } = require("/hooks")

const { ActionSheet, Button, CheckBox, Container, Content, Input, Item, Text } = require("/elements")

const appInfo = require("/../app.json")

const AT = "@"
const title = "로그인"

const aboutCounter = 0

const LoginScreen = props => {
	debugger
	const _this = useThis()
	const refs = useRefs()

	const [_orientation, set_orientation] = useState()

	useEffect(() => {
		company.load()
		Orientation.addOrientationListener(_handleOrientationDidChange)
		return () => Orientation.removeOrientationListener(_handleOrientationDidChange)
	}, [])

	const { getStyle } = useStyle()
	const style = getStyle(LoginScreen)

	let { timestamp, loginInfo } = auth
	if (typeof _emailAddress === UNDEFINED || _emailAddress !== loginInfo.emailAddress) {
		console.debug("LoginScreen.getDerivedStateFromProps", timestamp)

		let domainNames = auth.domainNames.slice()
		let { emailAddress = "" } = loginInfo
		let emailParts = emailAddress.split(AT)
		set_timestamp(timestamp)
		assign(nextState, loginInfo, {})
		set_emailName(emailParts[0])
		set_domainName(emailParts[1] || domainNames[0])
		_this.domainNames = domainNames
	}

	const handleOnPress = () => {
		1 < domainNames?.length &&
			ActionSheet.show({ title: "메일 도메인 선택", options: domainNames }, i => 0 <= i && set_domainName(domainNames[i]))
	}

	const renderDomainNamePicker = style => {
		let { domainNames } = _this
		console.debug(this, _domainName)
		return (
			<Button style={style.domainPicker} transparent onPress={handleOnPress}>
				<Input
					style={style.pickerText}
					value={_domainName}
					editable={false}
					onChangeText={domainName => set_domainName(domainName)}
					onEndEditing={Keyboard.dismiss}
				/>
				{1 < domainNames.length && <IconFA style={style.pickerIcon} name="caret-down" />}
			</Button>
		)
	}

	const handleOrientationDidChange = orientation => {
		console.debug(this)
		set_orientation(orientation)
	}

	const handleSubmit = isDevMode => {
		if (auth.status === PROCESSING) return popup("서버에 인증 요청 중입니다.")
		const domainName = _domainName
		const emailName = _.trim(_emailName)
		const password = _.trim(_password)

		if (isDevMode && !password) password = "qwer1234!"

		// if (!companyID || companyID.length == 0) return popup("회사를 선택하세요.", title)
		if (!emailName || emailName.length == 0) return popup("이메일 ID를 입력해야 합니다.", title)
		if (!domainName || domainName.length == 0) return popup("이메일 도메인을 입력해야 합니다.", title)
		if (!password || password.length == 0) return popup("암호를 입력하세요", title)

		const paramz = _.pick(state, ["companyID", "empID", "password", "loginInfoSavable"])
		// payload.empID = "GW_TEST_02"
		paramz.userID = `${paramz.companyID}.${paramz.empID}`
		paramz.emailAddress = `${emailName}@${domainName}`
		paramz.password = password
		auth.login(paramz)
	}

	const about = () => {
		if (2 <= aboutCounter++) {
			Alert.alert(
				"프로그램 정보",
				`ID: ${bundleID}\nVer: ${appVersion}.${buildNumber}\nMode: ${__DEV__ ? "Debug" : "Release"}\nHost: ${
					config.originz.api
				}`,
				[{ text: "확인" }],
				{ cancelable: false }
			)
			aboutCounter = 0
		}
	}

	// if(router.getCurrentScreen() !== props.name && router.getCurrentScreen() !== "DrawerOpen") return <View />	// 이 방식으로 할 경우 router.pop한 경우 하위에 있는 컴포넌트가 빈화면으로 표시됨
	const width = screen.min * 0.8
	const size = screen.height
	let margin = (size - (330 + screen.height / 3.41)) / 2
	if (margin < 20) margin = 20
	const logoScale = (screen.min / 360) * 0.75
	console.debug(LoginScreen, screen.orientation, size, margin, logoScale)
	return (
		<Container style={_style.container}>
			<Content style={[_style.content, { width }]}>
				<KeyboardAvoidingView behavior="position">
					<Logo style={[_style.logo, { marginTop: margin }]} scale={logoScale} />

					<Item style={_style.inputContainer}>
						<Input
							style={[_style.input, style.emailName]}
							placeholder="이메일 ID"
							placeholderTextColor={grayscaleColors[0]}
							value={state.emailName}
							autoCapitalize="none"
							// underlineColorAndroid=TRANSPARENT
							// autoCorrect={false}
							returnKeyType="next"
							onChangeText={emailName => set_emailName(emailName)}
							onSubmitEditing={refs.password._root.focus}
						/>
						<Text style={_style.at}>@</Text>
						{renderDomainNamePicker(style)}
					</Item>
					<Item style={_style.inputContainer}>
						<Input
							style={_style.input}
							placeholder="암호"
							placeholderTextColor={grayscaleColors[0]}
							secureTextEntry
							ref={c => (refs.password = c)}
							value={state.password}
							returnKeyType="send"
							onChangeText={password => set_password(password)}
							onEndEditing={Keyboard.dismiss}
							onSubmitEditing={() => setTimeout(() => handleSubmit, 200)}
						/>
					</Item>
					<Button style={_style.button} rounded onPress={() => handleSubmit}>
						<Text style={style.buttonLabel}>로그인</Text>
					</Button>
					<View style={_style.option}>
						<CheckBox
							style={_style.optionCheckbox}
							checked={state.loginInfoSavable}
							onPress={v => set_loginInfoSavable(!state.loginInfoSavable)}
						/>
						<Text style={_style.optionText} onPress={() => __DEV__ && handleSubmit(__DEV__)}>
							이메일 저장
						</Text>
					</View>
					<Text style={[_style.copyright, { marginTop: margin - 16 }]} onPress={about}>
						2020 AppCreatier. All rights reserved
					</Text>
				</KeyboardAvoidingView>
			</Content>
		</Container>
	)
}

LoginScreen.getDefaultStyle = require("/styles/screens/Login")

module.exports = LoginScreen
