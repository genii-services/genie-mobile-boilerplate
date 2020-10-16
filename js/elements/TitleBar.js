/** TitleBar Element */
require("react")
const { StatusBar, View } = require("react-native")

const { FUNCTION } = require("/constants")
const { CENTER, FLEX_START, FLEX_END, PC100, ROW, WHITE } = require("/constants/style")

const { itsIphoneX } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { useStyle } = require("/coordinators")

const Button = require("./Button")
const Header = require("./Header")
const Icon = require("./Icon")
const LocalImage = require("./LocalImage")
const Text = require("./Text")

const app = require("/../app.json")

const TitleBarElement = (props) => {
	const router = useRouter()
	const { stylez } = useStyle(TitleBarElement)

	const handleOnLeftPress = () => {
		let { onLeftPress } = props
		if (typeof onLeftPress === FUNCTION) Function.callSafely(onLeftPress)
		else if (props.drawer) router.openDrawer()
		else if (props.back) router.pop()
	}

	const handleOnLeftLongPress = () => {
		let { onLeftLongPress } = props
		if (typeof onLeftLongPress === FUNCTION) Function.callSafely(onLeftLongPress)
		else if (props.drawer) router.openDrawer()
		else if (props.back) router.popTo("home")
	}

	const handleOnRightPress = () => {
		let { onRightPress } = props
		Function.callSafely(onRightPress)
	}

	const handleOnCenterPress = () => {
		let { onCenterPress } = props
		Function.callSafely(onCenterPress)
	}

	const renderButton = (text, imageName, iconName = "") => {
		return text && imageName ? (
			<View style={stylez.hview}>
				<LocalImage style={stylez.image} name={imageName} />
				<Text style={stylez.text}>{text}</Text>
			</View>
		) : text && iconName ? (
			<View style={stylez.hview}>
				<Icon style={stylez.icon} name={iconName} />
				<Text style={stylez.text}>{text}</Text>
			</View>
		) : imageName ? (
			<LocalImage style={stylez.image} name={imageName} />
		) : iconName ? (
			<Icon style={stylez.icon} name={iconName} />
		) : (
			<Text style={stylez.text}>{text || ""}</Text>
		)
	}

	const { title } = props
	// console.debug(TitleBar, `+${title}+`)
	return (
		<Header style={[stylez.header, props.style]}>
			<StatusBar backgroundColor={stylez.header.backgroundColor} />
			<View style={{ flex: 1, flexDirection: ROW, alignItems: CENTER }}>
				<Button style={[stylez.button, stylez.left]} transparent onPress={handleOnLeftPress} onLongPress={handleOnLeftPress}>
					{renderButton(
						props.leftText,
						props.leftImageName,
						props.drawer ? "ios-menu" : props.back ? "ios-arrow-back" : props.leftIconName
					)}
				</Button>
				{props.onCenterPress ? (
					<Button
						style={[stylez.button, stylez.center, { justifyContent: CENTER, alignItems: CENTER }]}
						transparent
						small
						onPress={handleOnCenterPress}>
						<Text style={stylez.title}>{title}</Text>
					</Button>
				) : (
					<Text style={stylez.title}>{title}</Text>
				)}
				<Button style={[stylez.button, stylez.right]} transparent onPress={handleOnRightPress}>
					{renderButton(props.rightText, props.rightImageName, props.rightIconName)}
				</Button>
			</View>
		</Header>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	TitleBarElement.propTypes = {
		//...Header.defaultProps,		// 이 propType을 지정하지 않고 defaultProps만 지정해도 죽지는 않음
		title: string,
		back: bool,
		drawer: bool,
		// 상속 받은 propType과 동일한 이름으로 다시 지정하는 디버그모드에서는 문제없으나 릴리즈모드에서 죽음.
		// 아마도 스타일 내 속성이 차이가 나서 생기는 문제
	}
}

TitleBarElement.defaultProps = {
	//...Header.defaultProps,
	title: app.displayName,
}

TitleBarElement.getDefaultStyle = ({ fontFamily }) => {
	return {
		header: {
			// width: PC100,
			// height: itsIphoneX ? 100 : null,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			paddingTop: itsIphoneX ? 25 : 15,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
			backgroundColor: "#3e83be",
		},
		title: {
			flex: 1,
			fontFamily,
			fontSize: 17,
			lineHeight: 18,
			fontWeight: "600",
			color: WHITE,
			textAlign: CENTER,
			textAlignVertical: CENTER, // Android only
		},
		left: {
			paddingLeft: 10,
			justifyContent: FLEX_START,
		},
		center: {
			flex: 1,
		},
		right: {
			paddingRight: 10,
			justifyContent: FLEX_END,
		},
		button: {
			minWidth: 32,
			height: 36,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
		},
		hview: {
			flexDirection: ROW,
			alignItems: CENTER,
			justifyContent: CENTER,
		},
		text: {
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
			fontSize: 15,
			fontWeight: "500",
			color: WHITE,
			textAlign: CENTER,
		},
		icon: {
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
			fontSize: 26,
			color: WHITE,
			textAlign: CENTER,
		},
		image: {
			maxWidth: 32,
			maxHeight: 32,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
		},
	}
}

TitleBarElement.displayName = "TitleBar"

module.exports = TitleBarElement
