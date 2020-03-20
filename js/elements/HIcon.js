/** 공통 라이브러리 */
const React = require("react")

const { CENTER } = require("/constants/style")

const Button = require("./Button")
const Icon = require("./Icon")
const LocalImage = require("./LocalImage")
const Text = require("./Text")

const HIcon = props => {
	const { iconName, imageName, style, title, note, onPress } = props

	return (
		<Button style={[styles.button, style]} transparent small onPress={onPress}>
			{iconName ? (
				<Icon style={styles.buttonIcon} name={iconName} />
			) : (
				<LocalImage style={styles.buttonImage} square name={imageName} />
			)}
			<Text style={styles.buttonText}>{title}</Text>
			<Text style={styles.buttonTextRight}>{note}</Text>
		</Button>
	)
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	HIcon.propTypes = {
		name: PropTypes.string,
		title: PropTypes.string,
		note: PropTypes.any,
	}
}

HIcon.getDefaultStyle = ({ fontFamily }) => {
	return {
		button: {
			marginTop: 0,
			marginBottom: 0,
			marginHorizontal: 0,
			paddingTop: 0, // padding은 작동하지 않음
			paddingBottom: 0,
			flexDirection: "row",
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
			fontWeight: "bold",
			color: "#666666",
		},
		buttonTextRight: {
			minWidth: 20,
			fontFamily,
			fontSize: 18,
			lineHeight: 36, // icon height에 맞춰서 수직 중앙에 배열
			fontWeight: "bold",
			color: "#38A2E4",
		},
	}
}

module.exports = HIcon
