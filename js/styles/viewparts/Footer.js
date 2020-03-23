/** Footer Viewpart Style */
const { COLUMN, FLEX_START, FLEX_END, NOWRAP, PC100, ROW, SPACE_BETWEEN, WHITE } = require("/constants/style")

const FooterStyle = () => {
	return {
		footer: {
			width: PC100,
		},
		inputBar: {
			marginVertical: 8,
			marginHorizontal: 10,

			borderWidth: 1,
			width: PC100,
			paddingLeft: 0,
			paddingRight: 0,
		},
		input: {
			borderRadius: 0,
		},
	}
}

module.exports = FooterStyle
