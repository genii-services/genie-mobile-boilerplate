const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { TouchableOpacity, View } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class CardItem extends Component {
	render() {
		if (this.props.button) {
			return (
				<TouchableOpacity ref={c => (this._root = c)} activeOpacity={0.2} {...this.props}>
					{this.props.children}
				</TouchableOpacity>
			)
		}
		return (
			<View ref={c => (this._root = c)} {...this.props}>
				{this.props.children}
			</View>
		)
	}
}

CardItem.propTypes = {
	...TouchableOpacity.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	header: PropTypes.bool,
	cardBody: PropTypes.bool,
	footer: PropTypes.bool,
	button: PropTypes.bool,
}

module.exports = connectStyle("NativeBase.CardItem", {}, mapPropsToStyleNames)(CardItem)

console.log("CardItem", "loaded")
