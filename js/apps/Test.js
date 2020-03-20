const React = require("react")
const { Button, View, Text } = require("react-native")

const { useEffect, useState } = require("/hooks")

let a = 1
function aa() {
	console.log(a)
}

let b = 11
const bb = () => {
	console.log(b)
}

a = 2

const Test = props => {
	const initC = () => {
		console.log("initC")
		return 333333
	}

	const initE = function() {
		console.log("initE")
		return 5555555
	}

	const [_c, set_c] = useState(initC())
	const [_d, set_d] = useState()
	const [_e, set_e] = useState(initE)

	aa()
	bb()

	useEffect(() => {
		setTimeout(() => set_d(_d + 1), 3000)
	}, [])

	const handleOnPress = () => {
		console.log("handleOnPress")
		set_c(_c++)
	}

	return (
		<View>
			<Text>{_c}</Text>
			<Text>{_d}</Text>
			<Text>{_e}</Text>
			<Button title="C++" onPress={handleOnPress}></Button>
			<Button title="Alert" onPress={() => Alert.alert("Simple Button pressed")}></Button>
		</View>
	)
}

module.exports = Test
