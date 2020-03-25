const React = require("react")
const { Container, Header, Content, Card, CardItem, Body, H1, H2, H3, Text } = require("/elements")

const CardExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Card>
					<CardItem>
						<Body>
							<H1 id="h1">
								Header 1
								<Text id="txt" style={{ color: "red" }}>
									//Your text here
								</Text>
							</H1>
						</Body>
					</CardItem>
				</Card>
				<Card>
					<CardItem>
						<Body>
							<H2 id="h2">
								Header 2
								<Text id="txt" style={{ color: "red" }}>
									//Your text here
								</Text>
							</H2>
						</Body>
					</CardItem>
				</Card>
				<Card>
					<CardItem>
						<Body>
							<H2 id="h3">
								Header 3
								<Text id="txt" style={{ color: "red" }}>
									//Your text here
								</Text>
							</H2>
						</Body>
					</CardItem>
				</Card>
			</Content>
		</Container>
	)
}

module.exports = CardExample
