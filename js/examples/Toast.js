const React = require("react")

const { useCoordinator, useState } = require("/hooks")
const { Button, Container, Content, Form, Header, Root, Text, Toast } = require("/elements")

const ToastExample = (props) => {
	console.debug(ToastExample, "called")
	const [_selected, set_selected] = useState("key1")

	const onValueChange = (value) => {
		set_selected(value)
	}

	const toast = useCoordinator("Toast")

	const showToast = () => {
		toast.show({
			text: "Wrong password!",
			buttonText: "Okay",
			duration: 3000,
		})
	}

	return (
		<Root>
			<Container>
				<Header />
				<Content padder>
					<Button round onPress={showToast}>
						<Text>Button for</Text>
						<Text>Toast</Text>
					</Button>
				</Content>
			</Container>
		</Root>
	)
}

module.exports = ToastExample
