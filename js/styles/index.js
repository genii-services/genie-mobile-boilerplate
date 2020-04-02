/** 공통 라이브러리 */
console.debug("styles")

const { TRANSPARENT, WHITE, BLACK, CENTER } = require("/constants/style")

// COLORS

const colors = ["#b8cde3", "#b5cde4", "#755307", "#4082BF", "#3e83be", "#1f84da"]
const grayscaleColors = [
	WHITE,
	"#cccccc",
	"#c0c0c0",
	"#adadad",
	"#a3a3a3",
	"#9b9b9b",
	"#808080",
	"#6f6f6f",
	"#4a4a4a",
	"#2f2f2f",
	BLACK,
]
const backgroundColors = [TRANSPARENT, "#134a7a", "#3e83be", "#4082BF", "#eeeeee", WHITE]

const colors = {
	"#b8cde3",
	"#b5cde4",
	"#755307",
	"#4082BF",
	"#3e83be",
	"#1f84da"
}
const grayscaleColors = {
	"-5":WHITE,
	"-4":"#cccccc",
	"-3":"#c0c0c0",
	"-2":"#adadad",
	"-1":"#9b9b9b",
	"+0":"#808080",
	"+1":"#6f6f6f",
	"+2":"#4a4a4a",
	"+3":"#2f2f2f",
	"+4":BLACK,
}
const backgroundColors = {
	"":TRANSPARENT,
	"":"#134a7a",
	"":"#3e83be",
	"":"#4082BF",
	"":"#eeeeee",
	"":WHITE
}


// LAYOUTS

const textAlign = CENTER

