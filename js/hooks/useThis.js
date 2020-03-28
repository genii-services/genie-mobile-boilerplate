/**
 */
const _ = require("lodash")
const { useRef } = require("react")

const { isEqual } = require("/utils/object")

const useThis = defaultValue => {
	const _this = useRef(defaultValue || {})
	const { current } = _this
	if (!current.isChangedProps) {
		current.isChangedProps = props => {
			if (!current.prevProps || !isEqual(current.prevProps, props)) {
				current.prevProps = props
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
