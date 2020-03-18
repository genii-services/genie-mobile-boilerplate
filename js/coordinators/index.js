const React = require("react")

const { hierarchize } = require("/utils/component")
const { AuthCoordinator, useAuth } = require("./Auth")
const { RouterCoordinator, useRouter } = require("./Router")
const { SettingsCoordinator, useSettings } = require("./Settings")
const { StyleCoordinator, useStyle } = require("./Style")

// Coordinator를 계층화
const Coordinators = hierarchize(RouterCoordinator, AuthCoordinator, SettingsCoordinator, StyleCoordinator)

const coordinatorsHOC = WrappedComponent => props => {
	// 자식 컴포넌트를 변경하지 않고 컨테이너에 랩핑
	return (
		<Coordinators>
			<WrappedComponent {...props} />
		</Coordinators>
	)
}

module.exports = {
	Coordinators,
	coordinatorsHOC,

	AuthCoordinator,
	RouterCoordinator,
	SettingsCoordinator,
	StyleCoordinator,

	useAuth,
	useRouter,
	useSettings,
	useStyle,
}
