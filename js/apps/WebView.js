require("react")
const { Body, Card, CardItem, Container, Content, Header, Html, Icon, Right, Text } = require("/elements")

const fontSize = 15
const fontSizez = {
	"-4": parseInt(fontSize * 0.6),
	"-3": parseInt(fontSize * 0.7),
	"-2": parseInt(fontSize * 0.8),
	"-1": parseInt(fontSize * 0.9),
	"0": fontSize,
	"+1": fontSize * 1.2,
	"+2": fontSize * 1.4,
	"+3": fontSize * 1.6,
	"+4": fontSize * 1.8,
}
console.log(fontSizez[+1])

const WebViewExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Html style={{ margin: 0 }} source={{ uri: "https://infinite.red" }} />
			</Content>
		</Container>
	)
}

module.exports = WebViewExample
