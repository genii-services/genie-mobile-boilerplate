require("react")

const { BLACK, WHITE } = require("/constants/style")
const { Button, Container, Content, Header, Text, Icon } = require("/elements")

const ButtonExample = props => {
	console.debug("running")
	return (
		<Container>
			<Header />
			<Content>
			<Button light><Text> Light </Text></Button>
			<Button primary><Text> Primary </Text></Button>
			<Button success><Text> Success </Text></Button>
			<Button info><Text> Info </Text></Button>
			<Button warning><Text> Warning </Text></Button>
			<Button danger><Text> Danger </Text></Button>
			<Button dark><Text> Dark </Text></Button>
			</Content>
		</Container>
	  )
}

module.exports = ButtonExample
