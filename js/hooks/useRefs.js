/**
 * useRefs
 * 200308 by appcreatier@gmail.com
 */
const { useRef } = require("react")

const useRefs = (defaultValue) => {
	const refs = useRef(defaultValue || {})

	return refs.current
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
module.exports = useRefs
