const MODULE_NAME$ = "ThumbnailElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { Image } = require("react-native")

const { connectStyle } = require("/utils/style")

const ThumbnailElement = props => {
	return <Image ref={c => (_this._root = c)} {...props} />
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	ThumbnailElement.propTypes = {
		...Image.propTypes,
		style: oneOfType([object, number, array]),
		square: bool,
		circular: bool,
		size: number,
	}
}

module.exports = connectStyle(ThumbnailElement, MODULE_NAME$)
