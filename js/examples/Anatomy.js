require("react")
const { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } = require("/elements")

const AnatomyExample = props => {
	return (
		<Container>
			<Header>
				<Left>
					<Button transparent>
						<Icon name="menu" />
					</Button>
				</Left>
				<Body>
					<Title>Header</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Text>This is Content Section</Text>
			</Content>
			<Footer>
				<FooterTab>
					<Button full>
						<Text>Footer</Text>
					</Button>
				</FooterTab>
			</Footer>
		</Container>
	)
}

module.exports = AnatomyExample
