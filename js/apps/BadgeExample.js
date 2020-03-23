const React = require("react")

const { BLACK, WHITE } = require("/constants/style")
const { Container, Header, Content, Badge, Text, Icon } = require("/elements")

const BadgeExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Badge>
					<Text>2</Text>
				</Badge>
				<Badge primary>
					<Text>2</Text>
				</Badge>
				<Badge success>
					<Text>2</Text>
				</Badge>
				<Badge info>
					<Text>2</Text>
				</Badge>
				<Badge warning>
					<Text>2</Text>
				</Badge>
				<Badge danger>
					<Text>2</Text>
				</Badge>
				<Badge primary>
					<Icon name="star" style={{ fontSize: 15, color: WHITE, lineHeight: 20 }} />
				</Badge>
				<Badge style={{ backgroundColor: BLACK }}>
					<Text style={{ color: WHITE }}>1866</Text>
				</Badge>
			</Content>
		</Container>
	)
}

module.exports = BadgeExample
