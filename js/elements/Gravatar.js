const MODULE_NAME$ = "elements/Gravatar"
console.debug(MODULE_NAME$)

const React = require("react")
const { Image } = require("react-native")
const _ = require("lodash")
const md5 = require("blueimp-md5")

const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const GRAVATAR_URI = "https://www.gravatar.com/avatar/"

const Gravatar = props => {
	const { size = 30 } = props

	const getInitialStyle = () => {
		return {
			gravatar: {
				borderRadius: size / 2,
				width: size,
				height: size,
				resizeMode: props.contain ? "contain" : undefined,
			},
		}
	}

	const prepareRootProps = () => {
		const gravatarStyle = {}
		if (props.circular) {
			gravatarStyle.width = size
			gravatarStyle.height = size
			gravatarStyle.borderRadius = size / 2
		} else if (props.square) {
			gravatarStyle.width = size
			gravatarStyle.height = size
			gravatarStyle.borderRadius = 0
		}

		const defaultProps = {
			style: _.merge(getInitialStyle().gravatar, gravatarStyle),
		}

		return computeProps(props, defaultProps)
	}

	const rootProps = prepareRootProps()

	const uri = `${GRAVATAR_URI + md5(props.email)}?s=${rootProps.style.height}`
	return <Image {...rootProps} source={{ uri }} />
}

if (__DEV__) {
	const { ViewPropTypes } = require("react-native")
	const PropTypes = require("prop-types")
	Gravatar.propTypes = {
		...Image.propTypes,
		email: PropTypes.string.isRequired,
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
		size: PropTypes.number,
		circular: PropTypes.bool,
		square: PropTypes.bool,
	}
}

module.exports = connectStyle(Gravatar, MODULE_NAME$)
