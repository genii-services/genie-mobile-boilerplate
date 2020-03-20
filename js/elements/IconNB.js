const MODULE_NAME$ = "elements/IconNB"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")

const AntDesign = require("react-native-vector-icons/AntDesign").default
const Entypo = require("react-native-vector-icons/Entypo").default
const EvilIcons = require("react-native-vector-icons/EvilIcons").default
const Feather = require("react-native-vector-icons/Feather").default
const FontAwesome = require("react-native-vector-icons/FontAwesome").default
const FontAwesome5 = require("react-native-vector-icons/FontAwesome5").default
const Foundation = require("react-native-vector-icons/Foundation").default
const Ionicons = require("react-native-vector-icons/Ionicons").default
const MaterialCommunityIcons = require("react-native-vector-icons/MaterialCommunityIcons").default
const MaterialIcons = require("react-native-vector-icons/MaterialIcons").default
const Octicons = require("react-native-vector-icons/Octicons").default
const SimpleLineIcons = require("react-native-vector-icons/SimpleLineIcons").default
const Zocial = require("react-native-vector-icons/Zocial").default

const { useState, useStore, useThis } = require("/hooks")

const { connectStyle } = require("/utils/style")

const Iconz = {
	AntDesign,
	Entypo,
	EvilIcons,
	Feather,
	FontAwesome,
	FontAwesome5,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	SimpleLineIcons,
	Zocial,
}

const defaultIcon = Ionicons

const IconNB = props => {
	const [theme] = useStore("theme")
	const _this = useThis()

	const setIcon = iconType => {
		if (iconType === undefined && theme) {
			// eslint-disable-next-line
			iconType = theme["@@shoutem.theme/themeStyle"].variables.iconFamily
		}
		_this.Icon = Iconz[iconType] || defaultIcon
		_this.type = iconType || "Ionicons"
	}

	if (!_this.type || _this.type !== props.type) setIcon(props.type)

	return <_this.Icon {...props} />
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	IconNB.propTypes = {
		type: PropTypes.oneOf(_.keys(Iconz)),
	}
}

module.exports = connectStyle(IconNB, MODULE_NAME$)
console.debug(MODULE_NAME$, module.exports)
