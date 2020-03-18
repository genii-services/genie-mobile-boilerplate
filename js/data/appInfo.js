const { IntentConstant } = require("react-native-android-intent-launcher")

const {
	hostz,
	urlz: { downloadApp },
} = require("./config")

const CATEGORY = "category"

exports.checkingAppNames = [
	"otp",
	"messenger",
	//drm
]

// 기본 작동 방식은 DeepLink이며, 다른 작동 방식은 해당 Platform에 오브젝트 형태로 명시
exports.callingAppInfoz = {
	calendar: { title: "일정", ios: "calshow://", android: { type: CATEGORY, category: IntentConstant.CATEGORY_APP_CALENDAR } }, // android:'content://com.android.calendar/time/'
	contacts: { title: "연락처", ios: "addressbook://", android: { type: CATEGORY, category: IntentConstant.CATEGORY_APP_CONTACTS } }, // _android:'content://com.android.contacts/contacts/'
	email: { title: "메일", ios: "message://", android: { type: CATEGORY, category: IntentConstant.CATEGORY_APP_EMAIL } },

	otp: {
		title: "OTP",
		ios: "hanilotp://",
		android: "hanil://com.hanil.otpauthenticator",
		downloadURL: downloadApp,
	},
	messenger: {
		title: "메신저",
		ios: "cafe6mobile://",
		android: "cafe6mobile://hanil",
		downloadURL: downloadApp,
	},
	/*
	drm: {
		title: "문서보안",
		ios: "dsmobileAppLink://",
		android: { type: "package", package: "com.softcamp.dsmobile" },
		downloadURL: downloadApp,
	}, // android:'hanildrm://com.hanil.mobiledrm',
	*/
}
