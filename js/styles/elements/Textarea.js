/** Element Style */

module.exports = style => {
	return {
		".underline": {
			borderBottomWidth: style.borderWidth,
			marginTop: 5,
			borderColor: style.inputBorderColor,
		},
		".bordered": {
			borderWidth: 1,
			marginTop: 5,
			borderColor: style.inputBorderColor,
		},
		color: style.textColor,
		paddingLeft: 10,
		paddingRight: 5,
		fontSize: 15,
		textAlignVertical: "top",
	}
}
