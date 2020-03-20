const React = require("react")
const { StatusBar, View } = require("react-native")
const async = require("async")
const Permissions = require("react-native-permissions")
const { PERMISSIONS } = Permissions
const { Button, Container, Content, Footer, Icon, Left, Right, Text } = require("/elements")

const { itsAndroid } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { useAuth } = require("/coordinators")
const { useThis } = require("/hooks")
const { useRefs } = require("/hooks")
const Logo = require("@svgs/genie.svg")

const dataArray = [
	{
		title: "카메라 사용",
		content: "카메라 장치에 액세스 할 수 있어야 합니다",
	},
	{
		title: "SD 카드의 콘텐츠 수정 또는 삭제",
		content: "앱이 SD 카드에 쓸 수 있도록 허용합니다.",
	}, // 저장소
	{
		title: "보호된 저장소에 엑세스 테스트",
		content: "앱이 SD 카드의 내용을 읽을 수 있도록 허용합니다.",
	}, // 저장소
	{
		title: "인터넷에서 데이터 받기",
		content: "앱이 클라우드로 부터 데이터를 수신할 수 있도록 합니다. 이 서비스는 데이터 사용량이 발생할 수 있습니다.",
	},
]

const androidPermissions = [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]

const iosPermissions = []

const PermissionScreen = props => {
	const router = useRouter()
	const { agreed, setAgreed, authToken } = useAuth()
	console.debug(this, "render", "+".repeat(80), agreed, authToken)
	const _this = useThis()
	const refs = useRefs()
	const [_permission, set_permission] = useState({})
	if (!refs.top) {
		if (!props || !props.data) {
			_this.action = props.action || "submit"
			_this.title = "앱 권한"
			_this.buttonLabel = "동의"
		} else {
			_this.action = "edit"
			_this.title = "앱 권한 확인"
			_this.buttonLabel = "확인"
		}

		_this.permissions = itsAndroid ? androidPermissions : iosPermissions
		if (!_this.permissions || !_this.permissions.length) agree()
	}

	const agree = () => {
		setAgreed(true)
		// router.pop()
		router.push(authToken ? "home" : "login")
	}

	useEffect(() => {
		// Check the status of a single permission
		Permissions.check(PERMISSIONS.ANDROID.CAMERA).then(response => {
			// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
			_permission[PERMISSIONS.ANDROID.CAMERA] = response
			set_permission(_permission)
		})
	}, [])

	// Request permission to access photos
	const _requestPermission = () => {
		Permissions.request(PERMISSIONS.ANDROID.CAMERA).then(response => {
			// Returns once the user has chosen to 'allow' or to 'not allow' access
			// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
			_permission[PERMISSIONS.ANDROID.CAMERA] = response
			set_permission(_permission)
		})
	}

	const _requestPermissions = () => {
		let { state } = this
		async.series(
			{
				[PERMISSIONS.ANDROID.CAMERA]: next => {
					Permissions.request(PERMISSIONS.ANDROID.CAMERA).then(response => {
						if (response != "authorized") return set_timestamp(Date.now())
						next(null, response)
					})
				},
			},
			(err, results) => {
				console.debug(this, "agree")
				// auth.permissions = 2
				if (authToken) router.push("home")
				if (_this.action == "edit") router.pop()
				else router.push("login")
			}
		)
	}

	// Check the status of multiple permissions
	const _checkCameraAndPhotos = () => {}

	// This is a common pattern when asking for permissions.
	// iOS only gives you once chance to show the permission dialog,
	// after which the user needs to manually enable them from settings.
	// The idea here is to explain why we need access and determine if
	// the user will say no, so that we don't blow our one chance.
	// If the user already denied access, we can ask them to enable it from settings.
	const _alertForPhotosPermission = () => {
		Alert.alert("Can we access your photos?", "We need access so you can set your profile pic", [
			{
				text: "No way",
				onPress: () => console.debug(this, "Permission denied"),
				style: "cancel",
			},
			_photoPermission == "undetermined"
				? { text: "OK", onPress: _requestPermission }
				: { text: "Open Settings", onPress: Permissions.openSettings },
		])
	}

	console.debug(PermissionScreen)

	let logoScale = 1
	return (
		<Container style={style.container}>
			<StatusBar barStyle="light-content" backgroundColor="#000" />
			<Content style={style.content} contentContainerStyle={{ alignItems: "center" }}>
				<View style={style.titleWrapper}>
					<Logo style={style.logo} scale={logoScale} />
					<Text style={style.titleText}>에서 사용하는 접근권한 안내</Text>
				</View>
				<View style={style.guide}>
					<Text style={style.accessTitleText}>필수 접근권한</Text>
					<Text style={style.accessContentText}>기기 및 앱 기록(사용성 개선)</Text>
					<Text style={[style.accessTitleText, { marginTop: 42 }]}>선택적 접근권한</Text>
					<View style={style.accessItem}>
						<Left style={style.accessItemLeft}>
							<Icon style={style.icon} name="ios-save" />
						</Left>
						<Right style={style.accessItemRight}>
							<Text style={style.accessTitleText}>SD 카드의 콘텐츠 수정 또는 삭제</Text>
							<Text style={style.accessContentText}>앱이 SD 카드에 쓸 수 있도록 허용합니다.</Text>
						</Right>
					</View>

					<Text style={[style.accessContentText, { marginTop: 16 }]}>
						선택적 접근권한은 기능 사용 시 허용이 필요하며, 비 허용시에도 해당 기능 외 서비스 이용이 가능합니다.
					</Text>
				</View>
			</Content>
			<Footer style={style.footer}>
				<Button style={style.footerButton} rounded onPress={agree}>
					<Text style={style.buttonText}>{_this.buttonLabel}</Text>
				</Button>
			</Footer>
		</Container>
	)
}

PermissionScreen.getDefaultStyle = require("/styles/screens/Permission")

module.exports = PermissionScreen
