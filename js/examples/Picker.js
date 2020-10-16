require("react")
const { useState } = require("/hooks")
const { Container, Content, Form, Header, Picker, Item } = require("/elements")

const PickerExample = props => {
	const [_selected, set_selected] = useState("key1")

	const onValueChange = value => {
		set_selected(value)
	}

	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Picker note mode="dropdown" style={{ width: 120 }} selectedValue={_selected} onValueChange={onValueChange}>
						<Picker.Item label="Wallet" value="key0" />
						<Picker.Item label="ATM Card" value="key1" />
						<Picker.Item label="Debit Card" value="key2" />
						<Picker.Item label="Credit Card" value="key3" />
						<Picker.Item label="Net Banking" value="key4" />
					</Picker>
				</Form>
			</Content>
		</Container>
	)
}

module.exports = PickerExample
