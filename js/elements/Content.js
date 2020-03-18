const { connectStyle } = require("native-base-shoutem-theme")
const PropTypes = require("prop-types")
const React = require("react")
const { Component } = React
const { SafeAreaView } = require("react-native")
const { KeyboardAwareScrollView } = require("react-native-keyboard-aware-scroll-view")

const variable = require("/styles/themes/default")
const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Content extends Component {
	static contextTypes = {
		theme: PropTypes.object,
	}

	constructor(props) {
		super(props)
		this.state = {
			orientation: "portrait",
		}
	}

	layoutChange(val) {
		const maxComp = Math.max(variable.deviceWidth, variable.deviceHeight)

		if (val.width >= maxComp) this.setState({ orientation: "landscape" })
		else {
			this.setState({ orientation: "portrait" })
		}
	}

	render() {
		const { children, contentContainerStyle, disableKBDismissScroll, keyboardShouldPersistTaps, padder, style } = this.props
		const containerStyle = { flex: 1 }
		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable

		return variables.isIphoneX ? (
			<SafeAreaView style={containerStyle}>
				<KeyboardAwareScrollView
					automaticallyAdjustContentInsets={false}
					resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
					keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
					ref={c => {
						this._scrollview = c
						this._root = c
					}}
					{...this.props}
					style={style}
					contentContainerStyle={[{ padding: padder ? variables.contentPadding : undefined }, contentContainerStyle]}>
					{children}
				</KeyboardAwareScrollView>
			</SafeAreaView>
		) : (
			<KeyboardAwareScrollView
				automaticallyAdjustContentInsets={false}
				resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
				keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
				ref={c => {
					this._scrollview = c
					this._root = c
				}}
				{...this.props}
				contentContainerStyle={[{ padding: padder ? variables.contentPadding : undefined }, contentContainerStyle]}>
				{children}
			</KeyboardAwareScrollView>
		)
	}
}

Content.propTypes = {
	disableKBDismissScroll: PropTypes.bool,
	keyboardShouldPersistTaps: PropTypes.string,
	padder: PropTypes.bool,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
}

module.exports = connectStyle("NativeBase.Content", {}, mapPropsToStyleNames)(Content)

console.log("Content", "loaded")
