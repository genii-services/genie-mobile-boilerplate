const MODULE_NAME$ = "IntroScreen"
console.debug(MODULE_NAME$)

require("react")
const { TouchableHighlight, Text } = require("react-native")
const { Container } = require("/elements")

const { CENTER, FLEX_START, FLEX_END, SPACE_BETWEEN } = require("/constants/style")
const { useStyle } = require("/coordinators")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")

const appInfo = require("/../app.json")
// const Logo = require("/../svgs/genie.svg")
const Logo = require("/viewparts")

const IntroScreen = props => {
	const router = useRouter()

	const { stylez } = useStyle(MODULE_NAME$, { style })

	const handleOnPress = () => router.push("login")

	return (
		<Container style={stylez.container}>
			{/*<Logo style={style.logo} onPress={() => router.push("login")} />*/}
			<TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={handleOnPress}>
				<Text style={stylez.copyright}>{appInfo.copyright}</Text>
			</TouchableHighlight>
		</Container>
	)
}

IntroScreen.getDefaultStyle = ({ fontFamily, fontSizes, colors, backgroundColors }) => {
	return {
		container: {
			paddingTop: "45%",
			paddingBottom: "5%",
			alignItems: CENTER,
			justifyContent: SPACE_BETWEEN,
			backgroundColor: backgroundColors[3], // #4082BF
		},
		logo: {
			width: "33%",
		},
		copyright: {
			fontFamily,
			fontSize: fontSizes[2],
			color: colors[1],
		},
	}
}

module.exports = IntroScreen
