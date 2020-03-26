/** 공통 라이브러리 */
console.debug("IconElement")

const React = require("react")
const { View } = require("react-native")

const { ABSOLUTE, CENTER, FLEX_START, WHITE } = require("/constants/style")

const Icon = require("./IconNB")

const IconElement = props => {
	//let icon = /^fa-/.test(props.name) ? <Icon theme={{ iconFamily: 'FontAwesome' }} {...props} /> : <Icon {...props} />
	return (
		<View style={[{ justifyContent: FLEX_START, alignItems: CENTER }, props.style]}>
			{/*<Image style={props.backgroundImageStyle} backgroundImage={props.backgroundImage} />*/}
			<Icon
				style={[props.backgroundIconStyle, { color: props.color || props.backgroundIconStyle.color }]}
				name={props.backgroundIconName}
			/>
			<Icon style={[props.iconStyle, { backgroundColor: props.color || props.iconStyle.backgroundColor }]} name={props.name} />
		</View>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	IconElement.propTypes = {
		...View.propTypes,
		//style: View.propTypes.style,			// 상속 받은 propType과 동일한 이름으로 다시 지정하는 디버그모드에서는 문제없으나 릴리즈모드에서 죽음. 아마도 스타일 내 속성이 차이가 나서 생기는 문제
		name: string,
		//backgroundImageStyle: Image.propTypes.style,
		backgroundIconStyle: Icon.propTypes.style,
		iconStyle: Icon.propTypes.style,
	}
}

IconElement.defaultProps = {
	...View.defaultProps,
	/*
	backgroundImage: {
		source: LocalImage.getImageSource('ico-board-off')
	},
	backgroundImageStyle: {
		flex:1,
		position:'absolute',
		width:'100%',
		height:'100%',
		justifyContent:'center',
		resizeMode:'center',
	},*/
	backgroundIconName: "md-clipboard",
	backgroundIconStyle: {
		position: ABSOLUTE,
		marginTop: -4,
		fontSize: 48,
		color: "#e0314c",
	},
	iconStyle: {
		width: 32,
		height: 32,
		backgroundColor: "#e0314c",
		fontSize: 24,
		marginTop: 7,
		paddingTop: 4,
		color: WHITE,
		textAlign: CENTER,
	},
}

module.exports = IconElement
