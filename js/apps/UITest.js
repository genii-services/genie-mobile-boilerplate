const React = require("react")
// const { useState } = React
const { Body, Card, CardItem, Container, Content, Header, Icon, Right, Text } = require("/elements")

const CardHeaderFooterExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Card>
					<CardItem header>
						<Text>NativeBase</Text>
					</CardItem>
					<CardItem>
						<Body>
							<Text>//Your text here</Text>
						</Body>
					</CardItem>
					<CardItem footer>
						<Text>GeekyAnts</Text>
					</CardItem>
				</Card>
			</Content>
		</Container>
	)
}

const CardListExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Card>
					<CardItem>
						<Icon active name="logo-googleplus" />
						<Text>Google Plus</Text>
						<Right>
							<Icon name="arrow-forward" />
						</Right>
					</CardItem>
				</Card>
			</Content>
		</Container>
	)
}

module.exports = CardHeaderFooterExample
