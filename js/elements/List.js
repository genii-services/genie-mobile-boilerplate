/** 공통 라이브러리
 * V2 200107 appcreatier@gmail.com
 *           getDerivedStateFromProps 방식으로 변경
 */
console.debug("List")

const React = require("react")
// const PropTypes = require("prop-types")
const _ = require("lodash")
const { FlatList, RefreshControl, Text, TouchableHighlight, View } = require("react-native")
const { Icon } = require("native-base")

const { FUNCTION, UNDEFINED } = require("/constants")
const { isProgressive, isPreterite } = require("/utils/progress")
const { useThis } = require("/hooks")

const statusTextz = {
	PROCESSING: "",
	SUCCEED: "",
	ERROR: "",
}

const List = props => {
	const _this = useThis()

	let { data, status, refreshing, nothingVisible, nothingText, onRefresh } = props

	const { getStyle } = useStyle()
	const style = getStyle(List)

	let preterite = true
	// 비교를 위한 데이터 목록 준비
	if (!data) {
		data = []
		preterite = false // data가 undefined이면 데이터 수신 전이라고 판단
	} else if (!(data instanceof Array)) data = [data]
	else if (data.length === 0) {
		if (nothingVisible) preterite = false // nothingVisible이 true이면 [] 이라 하더라도 nothingText 표시하지 않음
	}

	// nothingVisible이 미정의인 경우 status가 진행형이면 true
	if (typeof refreshing === UNDEFINED) refreshing = isProgressive(status)

	// status가 지정되면 data 내용에 따른 진행 여부 보다 우선하여 판단
	if (isPreterite(status)) preterite = true

	// nothingVisible이 미정의인 경우 nothingVisible이 있으면 true
	if (typeof nothingVisible === UNDEFINED && !!nothingText) nothingVisible = true
	if (!preterite || data.length) nothingVisible = false

	const handleEndReached = () => {
		if (_this.ingOnEndReached) return
		_this.ingOnEndReached = true
		typeof props.onEndReached === FUNCTION && props.onEndReached()
	}
	const handleMomentumScrollBegin = () => {
		_this.ingOnEndReached = false
		typeof props.onMomentumScrollBegin === FUNCTION && props.onMomentumScrollBegin()
	}

	// console.debug(List, nothingVisible, data, nothingText, onRefresh)
	return !nothingVisible ? (
		<FlatList
			scrollIndicatorInsets={{ right: 1 }}
			{...props}
			data={data}
			refreshing={refreshing}
			onEndReached={handleEndReached}
			onMomentumScrollBegin={handleMomentumScrollBegin}
			// ListFooterComponent={() => <Spinner style={style.spinner} />}
		/>
	) : onRefresh ? (
		<View style={style.nothingArea} refreshControl={<RefreshControl refreshing={true} onRefresh={onRefresh} />}>
			<TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={onRefresh}>
				<Icon style={style.nothingIcon} name="md-refresh" />
			</TouchableHighlight>
			<Text style={style.nothingText}>{nothingText}</Text>
		</View>
	) : (
		<View style={style.nothingArea}>
			<Icon style={style.nothingIcon} name="md-refresh" />
			<Text style={style.nothingText}>{nothingText}</Text>
		</View>
	)
	// <Icon style={style.nothingIcon} type="MaterialCommunityIcons" name="file-document-box-remove" />
	// _loading ? <Spinner color='green'/> : undefined
}

List.propTypes = {
	...FlatList.propTypes,
	// nothingVisible: PropTypes.bool,
}
List.defaultProps = {
	...FlatList.defaultProps,
	onEndReachedThreshold: 0.025,
	nothingText: "데이터가 없습니다.",
}

const { CENTER } = require("/constants/style")
List.getDefaultStyle = () => {
	return {
		nothingArea: {
			flex: 1,
			justifyContent: CENTER,
			alignItems: CENTER,
		},
		nothingIcon: {
			fontSize: 96,
			color: "#dbdbdb",
		},
		nothingText: {
			fontSize: 18,
			color: "#9b9b9b",
		},
		// spinner: {
		// 	marginTop: 10,
		// 	marginBottom: 10,
		// },
	}
}

module.exports = List
