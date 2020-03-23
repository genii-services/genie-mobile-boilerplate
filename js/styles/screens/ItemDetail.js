/** ItemDetail Screen Style */
const { CENTER, FLEX_START, FLEX_END, MATERIAL, ROW, WHITE } = require("/constants/style")

const DetailScreenStyle = ({ fontFamily, fontSizes, grayscaleColors }) => {
	return {
		articleHeader: {
			backgroundColor: "#f5f5f5",
			padding: 10,
		},
		articleHeaderTitle: {
			fontFamily,
			fontWeight: "500",
			fontSize: fontSizes[7],
			paddingRight: 31,
			paddingBottom: 7,
		},
		articleHeaderSub: {
			borderBottomWidth: 0,
		},
		articleHeaderIdPhoto: {
			width: 40,
			height: 40,
			borderRadius: 20,
		},
		articleHeaderText1: {
			fontFamily,
			fontSize: fontSizes[3],
			lineHeight: fontSizes[3] + 1,
			marginLeft: 12,
			color: grayscaleColors[8],
		},
		articleHeaderText2: {
			fontFamily,
			fontSize: fontSizes[3],
			lineHeight: fontSizes[3] + 1,
			marginLeft: 12,
			color: grayscaleColors[8],
		},
		articleHeaderTextRight2: {
			fontFamily,
			fontSize: fontSizes[3],
			lineHeight: fontSizes[3] + 1,
			marginLeft: 0,
			color: grayscaleColors[8],
		},
		articleBody: {
			flex: 1,
			marginLeft: 10,
			marginRight: 10,
			paddingLeft: 0,
			paddingRight: 0,
		},
		articleBodyHtml: {
			fontSize: fontSizes[5],
		},
		footer: {
			height: 45,
			margin: 0,
			padding: 0,
		},
		button: {
			height: 45,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: -1, // 아이폰에서 맨 오른쪽 버튼과 직전 버튼에 1px 사이가 뜸
			marginRight: 0,
			borderRadius: 0,
			borderWidth: 0,
			backgroundColor: "#808080",
		},
		buttonText: {
			fontSize: fontSizes[6],
			lineHeight: fontSizes[6] + 1,
			fontWeight: "500",
			color: WHITE,
		},
		approve: {
			backgroundColor: "#e0314c",
		},
	}
}
module.exports = DetailScreenStyle
