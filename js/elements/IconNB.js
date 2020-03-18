import Ionicons from "react-native-vector-icons/Ionicons"
console.log("IconNB", "load")

const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const _ = require("lodash")
const { connectStyle } = require("native-base-shoutem-theme")

const AntDesign = require("react-native-vector-icons/AntDesign")
const Entypo = require("react-native-vector-icons/Entypo")
const EvilIcons = require("react-native-vector-icons/EvilIcons")
const Feather = require("react-native-vector-icons/Feather")
const FontAwesome = require("react-native-vector-icons/FontAwesome")
const FontAwesome5 = require("react-native-vector-icons/FontAwesome5")
const Foundation = require("react-native-vector-icons/Foundation")
// const Ionicons = require("react-native-vector-icons/Ionicons")
const MaterialCommunityIcons = require("react-native-vector-icons/MaterialCommunityIcons")
const MaterialIcons = require("react-native-vector-icons/MaterialIcons")
const Octicons = require("react-native-vector-icons/Octicons")
const SimpleLineIcons = require("react-native-vector-icons/SimpleLineIcons")
const Zocial = require("react-native-vector-icons/Zocial")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

const Iconz = {
	AntDesign: AntDesign,
	Entypo: Entypo,
	EvilIcons: EvilIcons,
	Feather: Feather,
	FontAwesome: FontAwesome,
	FontAwesome5: FontAwesome5,
	Foundation: Foundation,
	Ionicons: Ionicons,
	MaterialCommunityIcons: MaterialCommunityIcons,
	MaterialIcons: MaterialIcons,
	Octicons: Octicons,
	SimpleLineIcons: SimpleLineIcons,
	Zocial: Zocial,
}
const defaultIcon = Ionicons

class IconNB extends Component {
	static contextTypes = {
		theme: PropTypes.object,
	}

	constructor(props) {
		super(props)
		this.setIcon(props.type)
	}

	setIcon(iconType) {
		if (iconType === undefined && _.get(this, "context.theme")) {
			// eslint-disable-next-line
			iconType = this.context.theme["@@shoutem.theme/themeStyle"].variables.iconFamily
		}
		this.Icon = Iconz[iconType] || defaultIcon
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillUpdate(nextProps) {
		if (nextProps.type && this.props.type !== nextProps.type) this.setIcon(nextProps.type)
	}

	render() {
		return <this.Icon ref={c => (this._root = c)} {...this.props} />
	}
}

IconNB.propTypes = {
	type: PropTypes.oneOf([
		"AntDesign",
		"Entypo",
		"EvilIcons",
		"Feather",
		"FontAwesome",
		"FontAwesome5",
		"Foundation",
		"Ionicons",
		"MaterialCommunityIcons",
		"MaterialIcons",
		"Octicons",
		"SimpleLineIcons",
		"Zocial",
	]),
}

module.exports = connectStyle("NativeBase.IconNB", {}, mapPropsToStyleNames)(IconNB)
