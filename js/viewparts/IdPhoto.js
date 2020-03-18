const React = require("react")
const PropTypes = require("prop-types")
const _ = require("lodash")
const { Image } = require("react-native")
const { Icon } = require("/elements")
const FastImage = require("react-native-fast-image")

const { STRING } = require("/constants")
const { originz, urlz } = require("/data/config")
const { unknown } = require("/data/localImagez")

// require("@images/icons/ico-board-placeholder-profile.png")
//{uri: 'http://image.genii.interactors/iconfinder/if_Account_Audience_person_customer_profile_user_1886036.png' }

const IdPhoto = ({ source, id, watched, ...props }) => {
	const [_its_unknown, set_its_unknown] = useState(false)

	if (typeof source === STRING) {
		// TO-DO 현재 상대경로로 내려오는 것을 고정되어 있는데 절대/상대경로를 파악하여 처리해야 함
		source = source != "" && { uri: originz.portal + source }
	}
	if (!source && typeof id === STRING) {
		const a = id.split(".")
		id = a[a.length - 1]
		source = !!id ? { uri: urlz.profileImage.replace("$id", id) } : unknown
	}
	// FlatList에서 보이지 않는 IdPhoto의 state가 초기화되는 문제가 있어서
	// render시 source가 undefined이면 getSource를 다시 호출
	if (!source || watched) source = unknown

	const renderImage = () => {
		return (
			<FastImage
				// defaultSource={unknown}
				{...props}
				source={source}
				onError={() => set_its_unknown(true)}
			/>
		)
	}

	const renderUnknown = () => {
		return <Image style={props.style} source={unknown} />
		/*
		const { width, height } = style || {}
		const fontSize = Math.max(width, height)
		return <Icon style={[style, { fontSize: fontSize * 1.1, color: "gray" }]} name="contact" />
		 */
	}

	// console.debug(IdPhoto)
	return !_its_unknown ? renderImage() : renderUnknown()
}

IdPhoto.propTypes = {
	id: PropTypes.string,
	watched: PropTypes.bool,
}

module.exports = IdPhoto
