/** HIcon Element */
require("react")

const { BOLD, CENTER, ROW } = require("/constants/style")
const { useStyle } = require("/coordinators")

const Button = require("./Button")
const Icon = require("./Icon")
const LocalImage = require("./LocalImage")
const Text = require("./Text")

const HIconTextElement = (props) => {
	const { iconName, imageName, style, title, note, onPress } = props
	const { stylez } = useStyle(HIconElement, { style }, () => ({
		button: style,
	}))
	return (
		<Button style={stylez.button} transparent small onPress={onPress}>
			{iconName ? (
				<Icon style={stylez.buttonIcon} name={iconName} />
			) : (
				<LocalImage style={stylez.buttonImage} square name={imageName} />
			)}
			<Text style={stylez.buttonText}>{title}</Text>
			<Text style={stylez.buttonTextRight}>{note}</Text>
		</Button>
	)
}

if (__DEV__) {
	const { any, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	HIconTextElement.propTypes = {
		name: string,
		title: string,
		note: any,
	}
}

HIconTextElement.getDefaultStyle = ({ fontFamily }) => {
	return {
		button: {
			marginTop: 0,
			marginBottom: 0,
			marginHorizontal: 0,
			paddingTop: 0, // padding은 작동하지 않음
			paddingBottom: 0,
			flexDirection: ROW,
			justifyContent: CENTER,
			alignItems: CENTER,
		},
		buttonIcon: {
			width: 36, // Icon fontSize + boardWidth * 2
			height: 36,
			color: "#666666",
			fontSize: 36,
		},
		buttonImage: {
			width: 38,
			height: 38,
		},
		buttonText: {
			marginHorizontal: 8,
			fontFamily,
			fontSize: 18,
			lineHeight: 36, // icon height에 맞춰서 수직 중앙에 배열
			fontWeight: BOLD,
			color: "#666666",
		},
		buttonTextRight: {
			minWidth: 20,
			fontFamily,
			fontSize: 18,
			lineHeight: 36, // icon height에 맞춰서 수직 중앙에 배열
			fontWeight: BOLD,
			color: "#38A2E4",
		},
	}
}

HIconTextElement.displayName = "HIconText"

module.exports = HIconTextElement
