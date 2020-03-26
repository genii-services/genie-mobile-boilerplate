/** BorderButtonElement */
const MODULE_NAME$ = "BorderButtonElement"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")
const IconFA = require("react-native-vector-icons/FontAwesome")

const { BOLD, CENTER, COLUMN, WHITE } = require("/constants/style")
const { LANDSCAPE, PORTRAIT, PORTRAIT_UPSIDEDOWN, itsIOS, itsTablet, screen } = require("/utils/device")
const { useStyle } = require("/coordinators")

const Button = require("./Button")
const LocalImage = require("./LocalImage")
const Text = require("./Text")

const p_widths = [800, 1280] // 768 아이패드, 800 캘럭시TAB
const pui_widths = [667, 1280] // 667 아이폰6 1280 캘릭시탭x2	아이폰은  PORTRAITUPSIDEDOWN인 경우 Landscape로 처리하는 기종이 있어서 예외처리용, 아이패드는 정상적으로 Portrait로 나옴
const pua_widths = [1024, 1280] // 1024 아이패드 1280 캘릭시탭x2
const l_widths = [320, 1280] // 1280 캘릭시탭x2

const BorderButtonElement = props => {
	const { iconName, imageName, title, borderColor, onPress } = props
	const { orientation, width, height } = screen

	const { getStyle } = useStyle()
	const style = getStyle(BorderButton)

	let size, borderSize, ratio
	if (orientation == PORTRAIT || (orientation == PORTRAIT_UPSIDEDOWN && itsIOS && itsTablet)) {
		size = Math.min(width, height)
		ratio = _.findIndex(p_widths, v => size <= v) + 1 || p_widths.length + 1
		borderSize = size / (3.45 * ratio)
	} else if (orientation == LANDSCAPE || height < width) {
		ratio = _.findIndex(l_widths, v => width <= v) + 1 || l_widths.length + 1
		borderSize = screen.max / (3.45 * ratio)
	} else {
		// PORTRAITUPSIDEDOWN
		size = Math.min(width, height)
		if (itsIOS) ratio = _.findIndex(pui_widths, v => v >= size) + 1 || pui_widths.length + 1
		else ratio = _.findIndex(pua_widths, v => v >= size) + 1 || pua_widths.length + 1
		borderSize = size / (3.3 * ratio)
	}
	//borderSize = screen.width / (3.3 * ratio)
	const iconSize = iconName ? borderSize / 3 : 38 * ratio
	/*
	let ratio = parseInt((screen.width / 360 + 1) * 0.666666)
	let borderSize = 55 * ratio
	let iconSize = (iconName ? 24 : 38) * ratio
	*/
	// console.debug(BorderButton, borderSize, ratio, screen.orientation, screen.width, screen.height)
	return (
		<Button
			style={[
				style.rectButton,
				{
					borderColor,
					width: borderSize,
					height: borderSize,
				},
			]}
			onPress={onPress}>
			{iconName ? (
				<IconFA name={iconName} style={{ marginVertical: borderSize / 10, color: borderColor, fontSize: iconSize }} />
			) : (
				<LocalImage
					style={[style.rectButtonThumbnail, { marginVertical: 6 * ratio, width: iconSize, height: iconSize }]}
					square
					name={imageName}
				/>
			)}
			<Text style={[style.text, { color: borderColor }]}>{title}</Text>
		</Button>
		/*
		<Body style={style.rectButton} borderColor={borderColor}>
			<TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={props.onPress}>
				<View style={{justifyContent:'center', alignItems:'center'}}>
					<LocalImage style={style.rectButtonThumbnail} square name={iconName} />
					<Text>{title}</Text>
				</View>
			</TouchableHighlight>
		</Body>*/
	)
}

if (__DEV__) {
	const { string } = require("/utils/propTypes")
	BorderButtonElement.propTypes = {
		name: string,
		title: string,
		borderColor: string,
	}
}

BorderButtonElement.getDefaultStyle = ({ fontFamily }) => {
	return {
		rectButton: {
			flexDirection: COLUMN,
			justifyContent: CENTER,
			alignItems: CENTER,
			marginVertical: 5,
			marginLeft: 0,
			marginRight: 0,
			padding: 5,
			borderRadius: 4,
			borderWidth: 9,
			backgroundColor: WHITE,
			minWidth: 90,
			minHeight: 90,
		},
		rectButtonThumbnail: {
			margin: 0,
			padding: 0,
		},
		text: {
			marginTop: 0,
			marginBottom: 0,
			marginLeft: -100,
			marginRight: -100,

			fontFamily,
			fontWeight: BOLD,
			fontSize: 18,
			lineHeight: 19,
			textAlign: CENTER,
		},
	}
}

module.exports = BorderButtonElement
