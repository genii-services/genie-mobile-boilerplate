/**
 */
const { useRef } = require("react")

const useThis = defaultValue => {
	const _this = useRef(defaultValue || {})

	return _this.current
}

/*	사용법:
const MyComponent = () => {
	const _this = useThis({ initValue: 1 });
	console.debug(_this.initValue)
	_this.value2 = 2
	return (
		<div>{_this.value2}</div
	)
}
*/
module.exports = useThis
