require("react")
const { Accordion, Container, Header, Content } = require("/elements")

const AccordionExample = props => {
	const dataArray = [
		{ title: "First Element", content: "Lorem ipsum dolor sit amet" },
		{ title: "Second Element", content: "Lorem ipsum dolor sit amet" },
		{ title: "Third Element", content: "Lorem ipsum dolor sit amet" },
	]
	return (
		<Container>
			<Header />
			<Content padder>
				<Accordion dataArray={dataArray} expanded={0} />
			</Content>
		</Container>
	)
}

module.exports = AccordionExample
