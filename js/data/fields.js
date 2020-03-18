// 결재, 사우정보에서 사용

const _ = require("lodash")

const { BOOLEAN, NUMBER, UNDEFINED } = require("/constants")
const { yyyymmdd } = require("/utils/moment")

const CHOICE = "choice"
const DATE = "date"
const DATETIME = "datetime"
const ID = "id"
const MAIL = "mail"
const MOBILE = "mobile"
const TEL = "tel"

function int$(value) {
	return !isNaN(value) ? Number(value).toLocaleString() : value
}

function number$(value, unit = "") {
	if (typeof value === UNDEFINED || value == "") return ""
	if (!isNaN(value)) {
		return 0 <= value.indexOf(".") ? parseFloat(value).toLocaleString() + unit : parseInt(value).toLocaleString() + unit
	}
	return 0 <= value.indexOf(",") ? value + unit : value
}

const fields = [
	{ name: "approveDisplayName", label: "결재자" },
	{ name: "approveUserID", label: "결재자 ID", type: ID },
	{ name: "approveUserName", label: "결재자 이름" },
	{ name: "approveDeptID", label: "결재자 부서 ID", type: ID },
	{ name: "approveDeptName", label: "결재자 부서명" },
	{ name: "approver", label: "승인자" },
	{
		name: "apvAccess",
		label: "공개범위",
		type: CHOICE,
		options: [
			//{ label:'전사', value:"AA.001" },
			{ label: "일반", value: "AA.002" },
			{ label: "대외비", value: "AA.003" },
			{ label: "비밀", value: "AA.004" },
		],
	},
	{ name: "apvAccessName", label: "보안등급" },
	{ name: "apvArchiveTermName", label: "보존연한" },
	{ name: "apvID", label: "결재 ID", type: ID },
	{ name: "apvLineStatus", label: "결재 상태" },
	{ name: "apvLineUserName", label: "결재중인 사용자 " },
	{
		name: "archiveTerm",
		label: "보존연한",
		type: CHOICE,
		options: [
			{ label: "1년", value: 1 },
			{ label: "3년", value: 3 },
			{ label: "5년", value: 5 },
			{ label: "10년", value: 10 },
			{ label: "영구보존", value: 0 },
		],
	},

	{ name: "createdDT", label: "작성 일자", type: DATETIME },
	{ name: "companyCode", label: "회사코드" },
	{ name: "companyName", label: "회사" },
	{ name: "countrtCode", label: "국가코드" },
	{ name: "countryName", label: "국가명" },
	{ name: "completed", label: "완료" },
	{ name: "completedDT", label: "완료 일자", type: DATETIME },
	{ name: "currentLine", label: "현재 결재선" },
	{ name: "currentLineStep", label: "현재 결재 단계" },

	{ name: "deptCode", label: "부서코드" },
	{ name: "displayName", label: "표시명" },
	{ name: "documentNumber", label: "문서 번호" },
	{ name: "draftDisplayName", label: "작성자" },
	{ name: "draftUserID", label: "작성자 ID", type: ID },
	{ name: "draftUserName", label: "작성자 이름" },
	{ name: "draftDeptID", label: "작성자 부서 ID", type: ID },
	{ name: "draftDeptName", label: "소속" },
	{ name: "draftedDT", label: "기안 일자", type: DATETIME },
	{ name: "drafter", label: "기안자" },
	{ name: "dutyCode", label: "직무코드" },
	{ name: "dutyName", label: "직무" },

	{ name: "emailAddress", label: "이메일", type: MAIL },
	{ name: "empID", label: "사원ID" },
	{ name: "enterDate", label: "입사일", type: DATE },

	{ name: "fax", label: "팩스번호" },
	{ name: "footer", label: "꼬리말" },
	{ name: "formID", label: "폼 ID", type: ID },
	{ name: "formName", label: "폼이름" },

	{ name: "hasComment", label: "코멘트 여부", type: BOOLEAN },
	{ name: "hasAttachment", label: "첨부 여부", type: BOOLEAN },
	{ name: "homeTel", label: "집전화번호", type: TEL },

	{ name: "jobDescription", label: "담당업무" },
	{ name: "jobName", label: "업무명" },

	{ name: "lastStepDT", label: "마지막 단계 일자", type: DATETIME },
	{ name: "lastUpdated", label: "수정일시", type: DATETIME },
	{ name: "locationCode", label: "근무지코드" },
	{ name: "locationName", label: "근무지" },

	{ name: "mobileTel", label: "휴대폰번호", type: MOBILE },

	{ name: "officeTel", label: "내선번호" },

	{ name: "parentDeptDescription", label: "소속부서정보" },

	{ name: "rankName", label: "등급" },
	{ name: "reviewer", label: "검토자" },

	{ name: "title", label: "제목" },
	{ name: "titleCode", label: "직급코드" },
	{ name: "titleName", label: "직급" },

	{ name: "userID", label: "사용자ID" },
	{ name: "userName", label: "이름" },
]

const fieldz = {}
_.forEach(fields, v => (fieldz[v.name] = v))

function getFieldLabel(name, fieldLabelz) {
	if (fieldLabelz) {
		let label = fieldLabelz[name]
		if (label) return label
	}
	let field = fieldz[name]
	return field ? field.label : name
}

function getStrValue(label, value, type) {
	switch (type) {
		case "html":
		case "customhtml":
		case "editor": {
			return // HTML은 Skip
		}
		case "won":
		case "currency": {
			return number$(value, "원")
		}
		case "thousand-won": {
			return number$(value, "천원")
		}
		case "10000-won": {
			return number$(value, "만원")
		}
		case "million-won": {
			return number$(value, "백만원")
		}
		case NUMBER: {
			//return Number.parse(value)
			if (0 <= label.indexOf("금액")) return number$(value, "원")
			else if (label == "부") return Number(value).toLocaleString() + "부"
			else if (/^계/.test(label)) return number$(value, "원")
			else if (/이익$/.test(label) || /단가$/.test(label)) return number$(value, "원")
			else if (label == "합계") return number$(value, "원")
			else if (/^수량/.test(label)) return int$(value) + "개"
			else if (/년수\s*\d*$/.test(label)) return Number(value).toString() + "년"
			else if (/일수\s*\d*$/.test(label)) return Number(value).toString() + "일"
			return number$(value)
		}
		case "choice": {
			if (0 <= label.indexOf("금액")) return number$(value, "원") // 토요출근비신청서
			break
		}
		case "date":
		case "datetime": {
			// DB 데이터형으로써 ItemField에서는 날짜값만 있음
			return yyyymmdd(value)
		}
		case "percent": {
			return value + "%"
		}
		case "year": {
			return value + "년"
		}
		case "month": {
			return value + "월"
		}
		case "day": {
			return value + "일"
		}
		case "months": {
			return number$(value, "개월")
		}
		case "age": {
			return value + "세"
		}
		case "person": {
			return value + "명"
		}
		case "house": {
			return value + "호"
		}
		case "text": {
		}
	}
	return value
}

module.exports = {
	int$,
	number$,

	fields,
	fieldz,
	getFieldLabel,
	getStrValue,
}
