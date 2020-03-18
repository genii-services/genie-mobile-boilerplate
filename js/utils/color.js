/** 공통 라이브러리 */
const { toHex2 } = require("./string")

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null
}

function rgbaToHex(r, g, b, a) {
	return "#" + toHex2(r) + toHex2(g) + toHex2(b) + toHex2(a * 255)
}

module.exports = {
	hexToRgb,
	rgbaToHex,
}
