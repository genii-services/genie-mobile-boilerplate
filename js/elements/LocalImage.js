/** LocalImage Element */
require("react")
const { TouchableHighlight } = require("react-native")
const FastImage = require("react-native-fast-image")

const localImagez = require("/data/localImagez")

const Thumbnail = require("./Thumbnail")

const { defaultImage } = localImagez

const LocalImageElement = props => {
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

if (__DEV__) {
	const { func, string } = require("/utils/propTypes")
	LocalImageElement.propTypes = {
		...Thumbnail.propTypes,
		name: string,
		onPress: func,
	}
}

LocalImageElement.getImageSource = name => localImagez[name]

LocalImageElement.displayName = "LocalImage"

// EXPORTS

module.exports = LocalImageElement
