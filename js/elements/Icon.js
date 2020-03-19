const MODULE_NAME$ = "elements/Icon"
console.debug(MODULE_NAME$)

const React = require("react")
const PropTypes = require("prop-types")

const iosIconz = require("/data/iconz.ios.json")
const androidIconz = require("/data/iconz.android.json")
const { itsIOS } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { useStore } = require("/hooks")
const variable = require("/styles/themes/default")

const IconNB = require("./IconNB")

const Icon = props => {
	const [theme] = useStore("theme")

	const getName = () => {
		const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
		const platformStyle = variables.platformStyle
		const platform = variables.platform

		if ((props.type || variables.iconFamily) === "Ionicons") {
			const icon = platform === "ios" && platformStyle !== "material" ? iosIconz[props.name] : androidIconz[props.name]
			return typeof icon !== "object"
				? props.name
				: typeof icon === "object"
				? props.active
					? icon.active
					: icon.default
				: undefined
		} else {
			return props.name
		}
	}

	const getIconName = () => {
		if (itsIOS) return props.ios ? props.ios : props.active ? iosIconz[props.name].active : iosIconz[props.name].default
		return props.android ? props.android : props.active ? androidIconz[props.name].active : androidIconz[props.name].default
	}

	const name =
		props.ios && props.android
			? itsIOS
				? props.ios
				: props.android
			: props.name && (props.android || props.ios)
			? getIconName()
			: getName()
	return <IconNB {...props} name={name} />
}

Icon.propTypes = {
	...IconNB.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	name: PropTypes.string,
	ios: PropTypes.string,
	android: PropTypes.string,
	active: PropTypes.bool,
	type: PropTypes.string,
}

module.exports = connectStyle(Icon, "elements/Icon")
