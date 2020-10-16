require("react")
const { useState } = require("/hooks")
const { ActionSheet, Button, Container, Content, Header, Text } = require("/elements")

var DESTRUCTIVE_INDEX = 3
var CANCEL_INDEX = 4

const ActionSheetIconExample = props => {
	const [_clicked, set_clicked] = useState()

	return (
		<Container>
			<Header />
			<Content padder>
				<Button
					onPress={() =>
						ActionSheet.show(
							{
								options: BUTTONS,
								cancelButtonIndex: CANCEL_INDEX,
								destructiveButtonIndex: DESTRUCTIVE_INDEX,
								title: "Testing ActionSheet",
							},
							buttonIndex => set_clicked(BUTTONS[buttonIndex])
						)
					}>
					<Text>ActionSheet</Text>
				</Button>
			</Content>
		</Container>
	)
}

module.exports = ActionSheetIconExample
