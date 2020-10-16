require("react")
const { useState } = require("/hooks")
const { Button, Container, Header, Content, Form, Icon, Item, Input, Label, Left, Picker } = require("/elements") // /elements	native-base

const FormExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Item>
						<Input placeholder="Username" />
					</Item>
					<Item last>
						<Input placeholder="Password" />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

const FixedLabelExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Item fixedLabel>
						<Label>Username</Label>
						<Input />
					</Item>
					<Item fixedLabel last>
						<Label>Password</Label>
						<Input />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

const InlineLabelExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Item inlineLabel>
						<Label>Username</Label>
						<Input />
					</Item>
					<Item inlineLabel last>
						<Label>Password</Label>
						<Input />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

const FloatingLabelExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Item floatingLabel>
						<Label>Username</Label>
						<Input />
					</Item>
					<Item floatingLabel last>
						<Label>Password</Label>
						<Input />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

const StackedLabelExample = props => {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<Item stackedLabel>
						<Label>Username</Label>
						<Input />
					</Item>
					<Item stackedLabel last>
						<Label>Password</Label>
						<Input />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

const PickerInputExample = props => {
	const [_selected2, set_selected2] = useState()

	const handleOnValueChange = value => {
		set_selected2(value)
	}

	return (
		<Container>
			<Header>
				<Left>
					<Button transparent>
						<Icon name="arrow-back" color="white" />
					</Button>
				</Left>
			</Header>
			<Content>
				<Form>
					<Item picker>
						<Picker
							mode="dropdown"
							iosIcon={<Icon name="arrow-down" />}
							style={{ width: undefined }}
							placeholder="Select your SIM"
							placeholderStyle={{ color: "#bfc6ea" }}
							placeholderIconColor="#007aff"
							selectedValue={_selected2}
							onValueChange={handleOnValueChange}>
							<Picker.Item label="Wallet" value="key0" />
							<Picker.Item label="ATM Card" value="key1" />
							<Picker.Item label="Debit Card" value="key2" />
							<Picker.Item label="Credit Card" value="key3" />
							<Picker.Item label="Net Banking" value="key4" />
						</Picker>
					</Item>
					<Item>
						<Icon name="FontAwesome.cc-visa" />
						<Icon name="FontAwesome.paypal" />
						<Icon name="FontAwesome.google-wallet" />
						<Icon name="FontAwesome.cc-visa" />
						<Icon name="FontAwesome.cc-mastercard" />
						<Icon name="FontAwesome.cc-discover" />
						<Icon name="FontAwesome.cc-amex" />
						<Icon name="FontAwesome.cc-paypal" />
					</Item>
					<Item>
						<Icon name="ios-paper" />
						<Icon name="ios-paper-outline" />
						<Icon name="md-paper" />
					</Item>
				</Form>
			</Content>
		</Container>
	)
}

module.exports = PickerInputExample
