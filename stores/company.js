const { observable, action } = require("mobx")

class CompanyStore {
	@observable list = observable.array(
		__DEV__
			? [
					{ companyID: "HC00", name: "한일" },
					{ companyID: "HN00", name: "한일네트웍스" },
			  ]
			: [{ companyID: "HC00", name: "한일" }],
	)

	@action load() {}
}

module.exports = new CompanyStore()
