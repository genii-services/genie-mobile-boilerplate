/**
 */
const _ = require("lodash")
const { useRef } = require("react")

const { FUNCTION, NUMBER, STRING } = require("/constants")
const { isEqual } = require("/utils/object")

const useThis = (defaultValue) => {
	const _this = useRef(typeof defaultValue === FUNCTION ? defaultValue() : defaultValue || {})
	const { current } = _this
	if (!current.isChangedProps) {
		current.isChangedProps = (key = "prevProps", props) => {
			if (!current[key] || !isEqual(current[key], props)) {
				current[key] = props
				return true
			}
			return false
		}
	}
	return current
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
