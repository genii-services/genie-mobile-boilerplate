/** 공통 라이브러리 */
const React = require("react")
const PropTypes = require("prop-types")
const { TouchableHighlight } = require("react-native")
const { Thumbnail } = require("native-base")
const FastImage = require("react-native-fast-image")
const localImagez = require("/data/localImagez")

const { defaultImage } = localImagez

const LocalImage = props => {
	let source = localImagez[props.name] || defaultImage
	return props.onPress ? (
		<TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={props.onPress}>
			<FastImage source={source} {...props} />
		</TouchableHighlight>
	) : (
		<FastImage source={source} {...props} />
	)
}

// STATIC METHODS

LocalImage.propTypes = {
	...Thumbnail.propTypes,
	name: PropTypes.string,
	onPress: PropTypes.func,
}

LocalImage.getImageSource = name => localImagez[name]

// EXPORTS

module.exports = LocalImage
