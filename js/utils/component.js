const React = require("react")
const _ = require("lodash")

/**
 * 컴포넌트 배열을 계층화
 *
 * @param {*} components
 * @returns
 */
function hierarchize(...components) {
	components = _.flatten(components)
	switch (components.length) {
		case 0:
			return f => f
		case 1:
			return components[0]
		default:
			return components.reduce((Parent, Child) => ({ children }) => (
				<Parent>
					<Child>{children}</Child>
				</Parent>
			))
	}
}

module.exports = {
	hierarchize,
}
