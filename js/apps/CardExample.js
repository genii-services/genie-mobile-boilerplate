const React = require("react")
const { Container, Header, Content, Card, CardItem, Body, H1, Text } = require("/elements")

const CardExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Card>
					<CardItem>
						<Body>
							<H1>
								Header 1<Text style={{ color: "red" }}>//Your text here</Text>
							</H1>
						</Body>
					</CardItem>
				</Card>
			</Content>
		</Container>
	)
}

module.exports = CardExample