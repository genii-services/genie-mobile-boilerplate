const MODULE_NAME$ = "GravatarElement"
console.debug(MODULE_NAME$)

const _ = require("lodash")
const md5 = require("blueimp-md5")
const React = require("react")
const { Image } = require("react-native")

const GravatarElement = (props) => {
	const { size } = props

	const { stylez } = useStyle(GravatarElement, { circular, square }, () => {
		return {
			style: {
				borderRadius: props.square ? size / 2 : 0,
				width: size,
				height: size,
				resizeMode: props.contain && "contain",
			},
		}
	})

	const uri = `${GRAVATAR_URI + md5(props.email)}?s=${stylez.style.height}`
	return <Image {...props} style={stylez.style} source={{ uri }} />
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	GravatarElement.propTypes = {
		...Image.propTypes,
		email: string.isRequired,
		style: oneOfType([object, number, array]),
		size: number,
		circular: bool,
		square: bool,
	}
}

GravatarElement.defaultProps = {
	GRAVATAR_URI: "https://www.gravatar.com/avatar/",
	size: 30,
}

// const { connectStyle } = require("/utils/style")
module.exports = GravatarElement //connectStyle(GravatarElement, MODULE_NAME$)
