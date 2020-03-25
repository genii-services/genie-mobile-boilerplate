/** 공통 라이브러리 */
const React = require("react")
const { TouchableHighlight } = require("react-native")
const FastImage = require("react-native-fast-image")

const localImagez = require("/data/localImagez")

const Thumbnail = require("./Thumbnail")

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

if (__DEV__) {
	const { array, bool, func, object, oneOfType, string } = require("/utils/propTypes")
	LocalImage.propTypes = {
		...Thumbnail.propTypes,
		name: string,
		onPress: func,
	}
}

LocalImage.getImageSource = name => localImagez[name]

// EXPORTS

module.exports = LocalImage
