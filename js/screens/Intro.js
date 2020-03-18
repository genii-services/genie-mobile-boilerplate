console.debug("IntroScreen")

const React = require("react")
const _ = require("lodash")
const { TouchableHighlight, Text } = require("react-native")
const { Container } = require("native-base")

const { CENTER } = require("/constants/style")
const { useStyle } = require("/coordinators")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")

const appInfo = require("/../app.json")
// const Logo = require("/../svgs/genie.svg")
const Logo = require("/viewparts")

const IntroScreen = props => {
	const router = useRouter()

	const { getStyle } = useStyle()
	const style = getStyle(IntroScreen)
	return (
		<Container style={style.container}>
			{/*<Logo style={style.logo} onPress={() => router.push("login")} />*/}
			<TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => router.push("login")}>
				<Text style={style.copyright}>{appInfo.copyright}</Text>
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
			justifyContent: "space-between",
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
