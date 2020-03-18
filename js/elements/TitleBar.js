/** 공통 라이브러리 */
const React = require("react")
const PropTypes = require("prop-types")
const { StatusBar, View } = require("react-native")
const { Header, Button, Icon, Text } = require("/elements")

const { FUNCTION } = require("/constants")
const { CENTER } = require("/constants/style")
const { itsIphoneX } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { useStyle } = require("/coordinators")
const LocalImage = require("./LocalImage")

const app = require("../../app.json")

const TitleBar = props => {
	const router = useRouter()
	const { getStyle } = useStyle()
	const style = getStyle(TitleBar)

	const renderButton = (text, imageName, iconName = "") => {
		return text && imageName ? (
			<View style={style.hview}>
				<LocalImage style={style.image} name={imageName} />
				<Text style={style.text}>{text}</Text>
			</View>
		) : text && iconName ? (
			<View style={style.hview}>
				<Icon style={style.icon} name={iconName} />
				<Text style={style.text}>{text}</Text>
			</View>
		) : imageName ? (
			<LocalImage style={style.image} name={imageName} />
		) : iconName ? (
			<Icon style={style.icon} name={iconName} />
		) : (
			<Text style={style.text}>{text || ""}</Text>
		)
	}

	const handleOnLeftPress = () => {
		let { onLeftPress } = props
		if (typeof onLeftPress === FUNCTION) props.onLeftPress()
		else if (props.drawer) router.openDrawer()
		else if (props.back) router.pop()
	}

	const handleOnLeftLongPress = () => {
		let { onLeftLongPress } = props
		if (typeof onLeftLongPress === FUNCTION) props.onLeftLongPress()
		else if (props.drawer) router.openDrawer()
		else if (props.back) router.popTo("home")
	}

	const handleOnRightPress = () => {
		let { onRightPress } = props
		typeof onRightPress === FUNCTION && onRightPress()
	}

	const handleOnCenterPress = () => {
		let { onCenterPress } = props
		typeof onCenterPress === FUNCTION && onCenterPress()
	}

	let { title } = props
	// console.debug(TitleBar, `+${title}+`)
	return (
		<Header style={[style.header, props.style]}>
			<StatusBar backgroundColor={style.header.backgroundColor} />
			<View style={{ flex: 1, flexDirection: "row", alignItems: CENTER }}>
				<Button style={[style.button, style.left]} transparent onPress={handleOnLeftPress} onLongPress={handleOnLeftPress}>
					{renderButton(
						props.leftText,
						props.leftImageName,
						props.drawer ? "ios-menu" : props.back ? "ios-arrow-back" : props.leftIconName
					)}
				</Button>
				{props.onCenterPress ? (
					<Button
						style={[style.button, style.center, { justifyContent: CENTER, alignItems: CENTER }]}
						transparent
						small
						onPress={handleOnCenterPress}>
						<Text style={style.title}>{title}</Text>
					</Button>
				) : (
					<Text style={style.title}>{title}</Text>
				)}
				<Button style={[style.button, style.right]} transparent onPress={handleOnRightPress}>
					{renderButton(props.rightText, props.rightImageName, props.rightIconName)}
				</Button>
			</View>
		</Header>
	)
}
TitleBar.propTypes = {
	//...Header.defaultProps,		// 이 propType을 지정하지 않고 defaultProps만 지정해도 죽지는 않음
	title: PropTypes.string,
	back: PropTypes.bool,
	drawer: PropTypes.bool,
	// 상속 받은 propType과 동일한 이름으로 다시 지정하는 디버그모드에서는 문제없으나 릴리즈모드에서 죽음. 아마도 스타일 내 속성이 차이가 나서 생기는 문제
}

TitleBar.defaultProps = {
	//...Header.defaultProps,
	title: app.displayName,
}

TitleBar.getDefaultStyle = ({ fontFamily }) => {
	return {
		header: {
			// width: "100%",
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
			color: "white",
			textAlign: CENTER,
			textAlignVertical: CENTER, // Android only
		},
		left: {
			paddingLeft: 10,
			justifyContent: "flex-start",
		},
		center: {
			flex: 1,
		},
		right: {
			paddingRight: 10,
			justifyContent: "flex-end",
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
			flexDirection: "row",
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
			color: "white",
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
			color: "white",
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

module.exports = TitleBar
