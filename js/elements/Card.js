const React = require("react")
const { Component } = React
const PropTypes = require("prop-types")
const { FlatList, View, ViewPropTypes } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class Card extends Component {
	render() {
		if (this.props.dataArray && this.props.renderRow) {
			return (
				<FlatList
					{...this.props}
					data={this.props.dataArray}
					renderItem={this.props.renderRow}
					keyExtractor={(item, index) => index.toString()}
				/>
			)
		}
		return (
			<View ref={c => (this._root = c)} {...this.props}>
				{this.props.children}
			</View>
		)
	}
}

Card.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	// eslint-disable-next-line react/forbid-prop-types
	dataArray: PropTypes.array,
	renderRow: PropTypes.func,
}

module.exports = connectStyle("NativeBase.Card", {}, mapPropsToStyleNames)(Card)

console.log("Card", "loaded")
