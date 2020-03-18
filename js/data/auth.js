const { domainName } = require("/data/config")
const domainNames = [domainName, "partner" + domainName]

module.exports = __DEV__
	? {
			agreed: false,
			authToken: "123",
			userInfo: {},
			loginInfo: {
				companyID: "HC00",
				emailAddress: "jshin@hanildev.com",
				empID: "GW_TEST_02",
				password: "199801001",
				loginInfoSavable: true,
				userID: "HC00.199801001",
				deptID: "HC00.00520",
				rootDeptID: "HC00.00000",
			},
			currentScreen: undefined,
			domainNames,
	  }
	: {
			agreed: false,
			authToken: undefined,
			userInfo: {},
			loginInfo: {
				companyID: "HC00",
				emailAddress: "",
				empID: "",
				password: "",
				loginInfoSavable: true,
				userID: "",
				deptID: "",
				rootDeptID: "",
			},
			currentScreen: undefined,
			domainNames,
	  }
