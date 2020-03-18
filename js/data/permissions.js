/** 공통 라이브러리 */
const { PERMISSIONS } = require("react-native-permissions")

module.exports = {
	// Android permissions

	[PERMISSIONS.ANDROID.ACCEPT_HANDOVER]: {
		title: "통화 이어 받기",
		content: "앱이 다른 앱에서 시작된 통화를 계속하도록 허용합니다.",
	},

	[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]: {
		title: "백그라운드에서 위치 액세스",
		content: "앱이 백그라운드에서 위치를 액세스하도록 허용합니다.",
	}, // 이 권한을 요청하는 경우 ACCESS_COARSE_LOCATION과 ACCESS_FINE_LOCATION도 요청해야 합니다
	[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]: {
		title: "대략적인 위치(네트워크 기반)",
		content:
			"이 앱은 기지국 및 Wi-Fi 네트워크와 같은 네트워크 소스를 통해 내 위치를 알 수 있습니다. 앱에서 위치 서비스를 사용하려면 휴대전화에서 위치 서비스가 사용 설정되어 일으며 사용 가능해야 합니다.",
	}, // 위치
	"android.permission.ACCESS_CHECKIN_PROPERTIES": {
		title: "체크인 속성 액세스",
		content: "체크인 데이터베이스의 속성 테이블에 대한 읽기/쓰기 액세스를 허용하여 업로드되는 값을 변경할 수 있습니다",
	},
	[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]: {
		title: "정확한 위치",
		content: "응용 프로그램이 정확한 위치에 액세스 할 수 있습니다",
	},
	[PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION]: {
		title: "신체 활동 인식",
		content: "애플리케이션이 신체 활동을 인식할 수 있도록 합니다.",
	},
	[PERMISSIONS.ANDROID.ADD_VOICEMAIL]: {
		title: "보이스 메일 추가",
		content: "애플리케이션이 시스템에 음성 메일을 추가 할 수 있도록 합니다.",
	},
	[PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS]: {
		title: "전화 수신",
		content: "앱이 수신 전화에 응답하도록 허용합니다",
	},
	[PERMISSIONS.ANDROID.BODY_SENSORS]: {
		title: "심장 박동수 측정",
		content:
			"애플리케이션이 사용자가 자신의 신체 내부에서 발생하는 심장 박동수를 측정하는 데 사용하는 센서의 데이터에 액세스할 수 있도록 합니다",
	},
	[PERMISSIONS.ANDROID.CALL_PHONE]: {
		title: "전화 걸기",
		content: "사용자가 전화를 걸기 위해 다이얼러 사용자 인터페이스를 거치지 않고 응용 프로그램이 전화를 시작할 수 있도록 합니다",
	},
	[PERMISSIONS.ANDROID.CAMERA]: {
		title: "카메라 사용",
		content: "카메라 장치에 액세스 할 수 있어야 합니다",
	},
	[PERMISSIONS.ANDROID.GET_ACCOUNTS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_CALENDAR]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_CALL_LOG]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_CONTACTS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]: {
		title: "보호된 저장소에 엑세스 테스트",
		content: "앱이 SD 카드의 내용을 읽을 수 있도록 허용합니다.",
	}, // 저장소

	[PERMISSIONS.ANDROID.READ_PHONE_NUMBERS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_PHONE_STATE]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.READ_SMS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.RECEIVE_MMS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.RECEIVE_SMS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.RECORD_AUDIO]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.SEND_SMS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.USE_SIP]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.WRITE_CALENDAR]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.WRITE_CALL_LOG]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.WRITE_CONTACTS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]: {
		title: "SD 카드의 콘텐츠 수정 또는 삭제",
		content: "앱이 SD 카드에 쓸 수 있도록 허용합니다.",
	}, // 저장소
	"android.permission.BLUETOOTH": {
		title: "블루투스 기기와 페어링",
		content: "앱이 휴대폰의 블루투스 설정을 확인하고 페어링된 기기에 연결하며 연결을 수락할 수 있도록 허용합니다.",
	}, // 블루투스
	"android.permission.BLUETOOTH_ADMIN": {
		title: "블루투스 설정에 액세스",
		content: "앱이 로컬 블루투스 휴대폰을 설정한 다음 원격 기기를 검색하여 페어링할 수 있도록 허용합니다.",
	}, // 블루투스
	drawoverlay: {
		title: "다른 앱 위에 그리기 허용",
		content:
			"앱이 사용 중인 다른 앱 위에 표시할 수 있으며, 다른 애플리게이션에서의 인퍼페이스 사용을 방해하거나 다른 애플리케이션에 표시되는 콘텐츠를 변경할 수 있습니다.",
	}, //
	"android.permission.INTERNET": {
		title: "인터넷에서 데이터 받기",
		content: "앱이 클라우드로 부터 데이터를 수신할 수 있도록 합니다. 이 서비스는 데이터 사용량이 발생할 수 있습니다.",
	},

	// iOS permissions

	[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.CALENDARS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.CAMERA]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.CONTACTS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.FACE_ID]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.LOCATION_ALWAYS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.MEDIA_LIBRARY]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.MICROPHONE]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.MOTION]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.PHOTO_LIBRARY]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.REMINDERS]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.SIRI]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.SPEECH_RECOGNITION]: {
		title: "",
		content: "",
	},
	[PERMISSIONS.IOS.STOREKIT]: {
		title: "",
		content: "",
	},
}
