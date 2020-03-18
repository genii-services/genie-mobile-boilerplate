console.debug(Logo)

const React = require("react")
const { RemoteImage } = require("/elements")

const Logo = props => {
	console.debug(Logo, "render")
	return <RemoteImage source="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
}
module.exports = Logo
