/** Element Style */

module.exports = () => {
	return {
		ItemElement: {
			".fixedLabel": {
				LabelElement: {
					paddingLeft: null,
				},
				marginLeft: 15,
			},
			".inlineLabel": {
				LabelElement: {
					paddingLeft: null,
				},
				marginLeft: 15,
			},
			".placeholderLabel": {
				InputElement: {},
			},
			".stackedLabel": {
				LabelElement: {
					top: 5,
					paddingLeft: null,
				},
				InputElement: {
					paddingLeft: null,
					marginLeft: null,
				},
				IconElement: {
					marginTop: 36,
				},
				marginLeft: 15,
			},
			".floatingLabel": {
				InputElement: {
					top: 10,
					marginLeft: null,
					paddingLeft: null,
				},
				LabelElement: {
					left: 0,
					top: 6,
				},
				IconElement: {
					top: 6,
				},
				marginTop: 15,
				marginLeft: 15,
			},
			".regular": {
				LabelElement: {
					left: 0,
				},
				marginLeft: 0,
			},
			".rounded": {
				LabelElement: {
					left: 0,
				},
				marginLeft: 0,
			},
			".underline": {
				LabelElement: {
					left: 0,
					top: 0,
					position: "relative",
				},
				InputElement: {
					left: -15,
				},
				marginLeft: 15,
			},
			".last": {
				marginLeft: 0,
				paddingLeft: 15,
			},
			LabelElement: {
				paddingRight: 5,
			},
			marginLeft: 15,
		},
	}
}
