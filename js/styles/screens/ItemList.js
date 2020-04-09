/** ItemList Screen Style */
const MODULE_NAME$ = "styles/screens/ItemList"
console.debug(MODULE_NAME$)

const { ABSOLUTE, BLACK, CENTER, PC100, TRANSPARENT, WHITE } = require("/constants/style")

const ItemListStyle = ({ fontFamily, fontSizes, grayscaleColors, backgroundColors }) => {
	console.debug(MODULE_NAME$, "getStyle")
	return {
		list: {
			height: PC100,
			backgroundColor: backgroundColors[5], // white
		},
		listItem: {
			borderTopWidth: 0,
			borderBottomWidth: 1,
			borderBottomColor: "#d7d9dc",
		},
		listItemIcon: {
			width: fontSizes[0] + 2,
			fontSize: fontSizes[0],
			color: "red",
		},
		listItemImageLarge: {
			width: 42,
			height: 42,
		},
		listItemBody: {},
		listItemText1: {
			fontFamily,
			fontSize: fontSizes[6],
			fontWeight: "500",
			lineHeight: 21, // 제목에 그림문자가 있는 경우 ios에서 첫줄 상단 3px이 짤려서 줄높이를 높임
		},
		listItemText2: {
			fontFamily,
			fontSize: fontSizes[3],
			color: grayscaleColors[9], // '#6f6f6f',
		},
		listItemText3: {
			fontFamily,
			fontSize: fontSizes[3],
			color: grayscaleColors[6],
		},
		listItemClip: {
			color: grayscaleColors[2],
			fontSize: fontSizes[8],
		},
	}
}

module.exports = ItemListStyle
