const MODULE_NAME$ = "elements/Thumbnail"
console.debug(MODULE_NAME$)

const React = require("react")
const { Image } = require("react-native")

const { connectStyle } = require("/utils/style")

const Thumbnail = props => {
	return <Image ref={c => (_this._root = c)} {...props} />
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	Thumbnail.propTypes = {
		...Image.propTypes,
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
		square: PropTypes.bool,
		circular: PropTypes.bool,
		size: PropTypes.number,
	}
}

module.exports = connectStyle(Thumbnail, MODULE_NAME$)
