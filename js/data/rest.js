/**
 * 200311 미사용 속성 정리
 */
const { appID, deviceOS } = require("/utils/device")

const GET = "GET"
const POST = "POST"

const emailAddress = "jshin@genii.kr"
const password = "199801001"
const userID = "HH00.199801001"
const deptID = "HH00.00007"
const companyID = "HH00"
const rootDeptID = "HH00.00001"

const langCode = "ko"
const boardUrl = "Notices"
const articleID = "2829a527-48c6-49f0-971e-126f643af141"

const bucketID = "SmartMobile"

exports.apiz = {
	checkAppVersion: {
		title: "앱 버전 검사",
		url: "/mobile/CheckAppVersion",
		method: GET,
		paramz: { appID, deviceOS },
	},
	setPushSetting: {
		title: "푸시설정 저장",
		url: "/mobile/SetPushSetting",
		method: POST,
		paramz: { appID, categoryID: "APPROVAL", subCategoryID: "A0001", state: 1 },
	},
	getPushSetting: {
		title: "푸시설정 가져오기",
		url: "/mobile/GetPushSetting",
		method: GET,
		paramz: { appID, categoryID: "APPROVAL", subCategoryID: "A0001", state: 1 },
	},
	requestNotification: {
		title: "푸시 요청",
		url: "/notification/RequestNotification",
		method: POST,
		paramz: {
			recvUserID: userID,
			notiType: 1,
			notiMethod: 0,
			notiTitle: "",
			notiContent: "",
			publishArea: 0,
			publishDate: "2017-12-10T09:00:00",
		},
	},
	// 인증 API
	login: {
		title: "로그인",
		url: "/mobile/Login",
		method: POST,
		paramz: { emailAddress, password, pushToken: "" },
		onResulted: res => res.Data && !!res.Data.AuthToken,
	},
	logout: {
		title: "로그아웃",
		url: "/mobile/Logout",
		method: GET,
		onResulted: res => true,
	},
	verifyUserAuthInfo: {
		title: "사용자 정보 확인",
		url: "/Authentication/VerifyUserAuthInfo",
		method: POST,
		paramz: { userID, userPassword: password },
	},
	// 회사, 사우정보 API
	getCompanyList: {
		title: "회사 목록 가져오기",
		url: "/mobile/GetCompanyList",
		method: GET,
	},
	searchUser: {
		title: "사우정보 검색",
		url: "/User/SearchUser",
		method: GET,
		paramz: { searchType: "ALL", pageIndex: 1, pageSize: 30, companyID, keyword: "", langCode, userID, deptID },
	},
	getUserInfo: {
		title: "사우정보 가져오기",
		url: "/User/GetUserInfo",
		method: GET,
		paramz: { userID, langCode },
	},
	getUserAppointments: {
		title: "발령정보 가져오기",
		url: "/User/GetUserAppointments",
		method: GET,
		paramz: { userID, langCode },
	},
	// 게시판 API
	getBoardList: {
		title: "게시판 목록 가져오기",
		url: "/board/GetBoardList",
		method: GET,
		paramz: { bucketID, userID },
	},
	// 게시판 API (체크섬)
	getBoardListMd5: {
		title: "게시판 목록 가져오기",
		url: "/board/GetBoardListMd5",
		method: GET,
		paramz: { bucketID, userID },
	},
	getBoardInfo: {
		title: "게시판 정보 가져오기",
		url: "/board/GetBoardInfo",
		method: GET,
		paramz: { boardUrl, langCode, userID },
	},
	getArticleList: {
		title: "게시물 목록 가져오기",
		url: "/board/GetArticleList",
		method: GET,
		paramz: { boardUrl, pageIndex: 1, pageSize: 30, searchType: "", searchKeyword: "", langCode, userID },
	},
	getArticle: {
		title: "게시물 정보 가져오기",
		url: "/board/GetArticle",
		method: GET,
		paramz: { boardUrl, articleID, langCode, userID },
	},
	requestApproval: {
		title: "게시글 승인",
		url: "/board/ArticleRequest",
		method: GET,
		paramz: {
			boardUrl: "Announcementsoneaday",
			articleID,
			actionType: "Approve",
			langCode,
			userID,
		},
	},
	getArticleCommentList: {
		title: "댓글 가져오기",
		url: "/board/GetArticleCommentList",
		method: GET,
		paramz: { boardUrl, itemID: articleID, pageIndex: 1, pageSize: 30, langCode, userID },
	},
	addComment: {
		title: "댓글 등록",
		url: "/board/AddComment",
		method: POST,
		paramz: { boardUrl, itemID: articleID, content: "", parentID: "", userID },
	},
	// 전자결재 API
	getDocumentCount: {
		title: "전자결재 카운트 가져오기",
		url: "/approval/GetDocumentCount",
		method: GET,
		paramz: { userID, deptID },
	},
	getApprovalList: {
		title: "문서함별 문서 리스트 조회",
		url: "/Approval/GetListItem",
		method: GET,
		paramz: { userID, deptID, listType: "waiting", pageIndex: 1, pageSize: 20, searchType: "", searchKeyword: "", langCode },
	},
	getApprovalDetail: {
		title: "결재함 문서 상세 조회",
		url: "/Approval/GetApprovalDetail",
		method: GET,
		paramz: { apvID: "49", langCode, userID, deptID },
	},
	approvalRequest: {
		title: "결재 진행 승인",
		url: "/Approval/ApprovalRequest",
		method: POST,
		paramz: { apvType: "Approve", apvID: "", comment: "", userID, deptID },
	},
	getFormLineInfo: {
		title: "결재 양식별 기본 결재선 조회",
		url: "/Approval/GetFormLineInfo",
		method: GET,
		paramz: { formID: "2", langCode, userID, deptID: "" }, // deptID를 지정하면 동일 회사 겸직 중에서 기안자로 지정되지 않는 문제 발생
	},
	approvalDraft: {
		title: "결재 기안",
		url: "/Approval/ApprovalDraft",
		method: POST,
		requestType: "body/json",
		paramz: { data: {}, userID, deptID },
	},
	getApprovalComment: {
		title: "결재 의견",
		url: "/Approval/GetComment",
		method: GET,
		paramz: { apvID: "", userID, deptID },
	},
	// 메일 API
	getMailCount: {
		title: "메일 카운트 가져오기",
		url: "/mobile/GetMailCount",
		method: GET,
	},
	//
	searchDeptTree: {
		title: "사우정보 부서 트리",
		url: "/User/SearchDeptTree",
		method: GET,
		paramz: { pageIndex: 1, pageSize: 100, companyID, parentID: "", langCode, userID },
	},
}

exports.minRequestInterval = 1

exports.errorMessagez = {
	"Unexpected token 개 in JSON at position 0": "서버에서 이상한 데이터가 내려옵니다.",
	"위치 0에 행이 없습니다.": "데이터가 없습니다.",
}
