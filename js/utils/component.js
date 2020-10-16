require("react")
const _ = require("lodash")

/**
 * 컴포넌트 배열을 계층화
 * 사용예:
 * const { hierarchize } = require("/utils/component")
 * const { AuthCoordinator, useAuth } = require("./auth")
 * const { RouterCoordinator, useRouter } = require("./router")
 * const { SettingsCoordinator, useSettings } = require("./settings")
 * const { StyleCoordinator, useStyle } = require("./style")
 * const Coordinators = hierarchize(RouterCoordinator, AuthCoordinator, SettingsCoordinator, StyleCoordinator)

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
