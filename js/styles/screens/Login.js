const { CENTER } = require("/constants/style")
const { itsIOS } = require("/utils/device")

const LoginScreenStyle = ({ fontFamily, fontSizes, colors, grayscaleColors, backgroundColors, textAlign }) => {
	return {
		container: {
			backgroundColor: backgroundColors[3], // #4082BF
			alignItems: CENTER,
		},
		content: {
			flex: 1,
		},
		logo: {
			marginBottom: 40,
			width: 128,
			alignSelf: CENTER, // 좌우 중간
		},
		emailName: { flex: 4.5, marginRight: 0, paddingRight: 0, textAlign: "right" },
		domainPicker: { flex: 5.5, margin: 0, padding: 0 },

		picker: {
			width: "100%", // Picker인 경우 295,
			height: 40,
			marginTop: 0,
			marginRight: 0,
			marginBottom: 10,
			marginLeft: 0,
			paddingLeft: 0,
			paddingRight: 0,
			borderWidth: 1,
			borderRadius: 20,
			borderColor: "#fff",
			justifyContent: CENTER,
			alignItems: CENTER,
			backgroundColor: backgroundColors[0], // transparent
		},
		pickerHeader: {
			color: "white",
			textAlign,
		},
		pickerText: {
			color: "white",
			fontFamily,
			fontSize: fontSizes[6],
			// fontWeight: "600",
			textAlign: "left",
			marginLeft: 0,
			marginTop: itsIOS ? 0 : 0,
			paddingLeft: 0,
		},
		pickerIcon: {
			width: fontSizes[9],
			fontSize: fontSizes[9],
			marginRight: 0,
			color: "white",
			marginTop: itsIOS ? 0 : 5,
			textAlign: CENTER,
		},
		inputContainer: {
			flexDirection: "row",
			height: 40,
			marginVertical: 10,
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			justifyContent: CENTER,
			alignItems: CENTER,
			borderTopWidth: 0,
			borderBottomWidth: 1,
			borderBottomColor: "white",
		},
		at: {
			color: "white",
			paddingHorizontal: 2,
			fontFamily,
			fontSize: fontSizes[6],
			textAlign,
		},
		input: {
			color: "white",
			paddingRight: 0,
			fontFamily,
			fontSize: fontSizes[6],
			textAlign,
		},
		button: {
			// marginTop: 20,
			width: "100%",
			height: 40,
			justifyContent: CENTER,
			alignItems: CENTER,
			backgroundColor: backgroundColors[5], // white
			marginTop: itsIOS ? 20 : 0,
		},
		buttonLabel: {
			fontFamily,
			fontWeight: "600",
			color: colors[3],
			width: "100%",
			height: "100%",
			textAlign,
			paddingTop: 5,
		},
		option: {
			marginTop: 30,
			flexDirection: "row",
			justifyContent: CENTER,
			alignItems: CENTER,
		},
		optionCheckbox: {
			marginRight: 20,
			borderColor: grayscaleColors[0],
		},
		optionText: {
			fontFamily,
			fontSize: fontSizes[3],
			color: grayscaleColors[0],
		},
		copyright: {
			fontFamily,
			fontSize: fontSizes[2],
			color: colors[0],
			alignSelf: CENTER,
		},
	}
}

module.exports = LoginScreenStyle
