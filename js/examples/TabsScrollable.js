require("react")
const { Container, Content, Header, ScrollableTab, Tab, Tabs, Text } = require("/elements")

const Tab1 = props => {
	return (
		<Content>
			<Text>1</Text>
		</Content>
	)
}

const Tab2 = props => {
	return (
		<Content>
			<Text>2</Text>
		</Content>
	)
}

const Tab3 = props => {
	return (
		<Content>
			<Text>3</Text>
		</Content>
	)
}

const Tab4 = props => {
	return (
		<Content>
			<Text>4</Text>
		</Content>
	)
}

const Tab5 = props => {
	return (
		<Content>
			<Text>5</Text>
		</Content>
	)
}

const TabsScrollableExample = props => {
	return (
		<Container>
			<Header hasTabs />
			<Tabs renderTabBar={() => <ScrollableTab />}>
				<Tab heading="Tab1">
					<Tab1 />
				</Tab>
				<Tab heading="Tab2">
					<Tab2 />
				</Tab>
				<Tab heading="Tab3">
					<Tab3 />
				</Tab>
				<Tab heading="Tab4">
					<Tab4 />
				</Tab>
				<Tab heading="Tab5">
					<Tab5 />
				</Tab>
			</Tabs>
		</Container>
	)
}

module.exports = TabsScrollableExample
