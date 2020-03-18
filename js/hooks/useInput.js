/**
 */
const React = require("react")
const { useState } = React // eslint-disable-line no-unused-vars

const useInput = defaultValue => {
	const [value, setValue] = useState(defaultValue)
	const onChange = e => setValue(e.target.value)
	return { value, onChange }
}

/*	사용법:
const MyComponent = () => {
	const _userId = useInput("초기값");
	console.debug("입력한 값:", _userId.value)
	return (
		<input placeholder="ID를 입력하세요." {..._userId}/>
	)
}
*/
module.exports = useInput
