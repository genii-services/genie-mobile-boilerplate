/** Element Style */

module.exports = () => {
	return {
		"elements/Item": {
			".fixedLabel": {
				"elements/Label": {
					paddingLeft: null,
				},
				marginLeft: 15,
			},
			".inlineLabel": {
				"elements/Label": {
					paddingLeft: null,
				},
				marginLeft: 15,
			},
			".placeholderLabel": {
				"elements/Input": {},
			},
			".stackedLabel": {
				"elements/Label": {
					top: 5,
					paddingLeft: null,
				},
				"elements/Input": {
					paddingLeft: null,
					marginLeft: null,
				},
				"elements/Icon": {
					marginTop: 36,
				},
				marginLeft: 15,
			},
			".floatingLabel": {
				"elements/Input": {
					paddingLeft: null,
					top: 10,
					marginLeft: null,
				},
				"elements/Label": {
					left: 0,
					top: 6,
				},
				"elements/Icon": {
					top: 6,
				},
				marginTop: 15,
				marginLeft: 15,
			},
			".regular": {
				"elements/Label": {
					left: 0,
				},
				marginLeft: 0,
			},
			".rounded": {
				"elements/Label": {
					left: 0,
				},
				marginLeft: 0,
			},
			".underline": {
				"elements/Label": {
					left: 0,
					top: 0,
					position: "relative",
				},
				"elements/Input": {
					left: -15,
				},
				marginLeft: 15,
			},
			".last": {
				marginLeft: 0,
				paddingLeft: 15,
			},
			"elements/Label": {
				paddingRight: 5,
			},
			marginLeft: 15,
		},
	}
}
