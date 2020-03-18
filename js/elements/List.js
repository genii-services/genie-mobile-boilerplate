console.log("List", "load")

const React = require("react")
const { Component } = React
const { FlatList, View } = require("react-native")
const { connectStyle } = require("native-base-shoutem-theme")

const mapPropsToStyleNames = require("/utils/mapPropsToStyleNames")

class List extends Component {
	render() {
		const { props } = this
		const { dataArray } = props

		if (dataArray) {
			return (
				<FlatList
					ref={ref => (this._root = ref)}
					data={dataArray}
					renderItem={({ item, index }) =>
						props.renderItem ? props.renderItem({ item, index }) : props.renderRow(item, 0, index)
					}
					{...props}
				/>
			)
		}
		return <View ref={c => (this._root = c)} {...props} />
	}
}

module.exports = connectStyle("NativeBase.List", {}, mapPropsToStyleNames)(List)
