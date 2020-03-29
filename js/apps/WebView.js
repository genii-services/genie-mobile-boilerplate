const React = require("react")
// const { useState } = React
const { Body, Card, CardItem, Container, Content, Header, Html, Icon, Right, Text } = require("/elements")

const fontSizeBase = 15
const fontSizez = {
	"-4": parseInt(fontSizeBase * 0.6),
	"-3": parseInt(fontSizeBase * 0.7),
	"-2": parseInt(fontSizeBase * 0.8),
	"-1": parseInt(fontSizeBase * 0.9),
	"0": fontSizeBase,
	"+1": fontSizeBase * 1.2,
	"+2": fontSizeBase * 1.4,
	"+3": fontSizeBase * 1.6,
	"+4": fontSizeBase * 1.8,
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
