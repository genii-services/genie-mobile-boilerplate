/* eslint-disable no-param-reassign */
/** 공통 라이브러리 */

const _ = require("lodash")

const { OBJECT, STRING } = require("/constants")
const defaultTheme = require("/styles/themes/default")

const bodyTheme = require("./Body")
const leftTheme = require("./Left")
const rightTheme = require("./Right")
const headerTheme = require("./Header")
const switchTheme = require("./Switch")
const thumbnailTheme = require("./Thumbnail")
const containerTheme = require("./Container")
const contentTheme = require("./Content")
const buttonTheme = require("./Button")
const titleTheme = require("./Title")
const subtitleTheme = require("./Subtitle")
const inputGroupTheme = require("./InputGroup")
const badgeTheme = require("./Badge")
const checkBoxTheme = require("./CheckBox")
const cardTheme = require("./Card")
const radioTheme = require("./Radio")
const h3Theme = require("./H3")
const h2Theme = require("./H2")
const h1Theme = require("./H1")
const footerTheme = require("./Footer")
const footerTabTheme = require("./FooterTab")
const fabTheme = require("./Fab")
const itemTheme = require("./Item")
const labelTheme = require("./Label")
const textAreaTheme = require("./Textarea")
const textTheme = require("./Text")
const toastTheme = require("./Toast")
const tabTheme = require("./Tab")
const tabBarTheme = require("./TabBar")
const tabContainerTheme = require("./TabContainer")
const viewTheme = require("./View")
const tabHeadingTheme = require("./TabHeading")
const iconTheme = require("./Icon")
const inputTheme = require("./Input")
const swipeRowTheme = require("./SwipeRow")
const segmentTheme = require("./Segment")
const spinnerTheme = require("./Spinner")
const cardItemTheme = require("./CardItem")
const listItemTheme = require("./ListItem")
const formTheme = require("./Form")
const separatorTheme = require("./Separator")
const pickerTheme = require("./Picker")

module.exports = (theme = defaultTheme) => {
	const _theme = {
		variables: theme,
		"NativeBase.Left": {
			...leftTheme(theme),
		},
		"NativeBase.Right": {
			...rightTheme(theme),
		},
		"NativeBase.Body": {
			...bodyTheme(theme),
		},

		"NativeBase.Header": {
			...headerTheme(theme),
		},

		"NativeBase.Button": {
			...buttonTheme(theme),
		},

		"NativeBase.Title": {
			...titleTheme(theme),
		},
		"NativeBase.Subtitle": {
			...subtitleTheme(theme),
		},

		"NativeBase.InputGroup": {
			...inputGroupTheme(theme),
		},

		"NativeBase.Input": {
			...inputTheme(theme),
		},

		"NativeBase.Badge": {
			...badgeTheme(theme),
		},

		"NativeBase.CheckBox": {
			...checkBoxTheme(theme),
		},

		"NativeBase.Radio": {
			...radioTheme(theme),
		},

		"NativeBase.Card": {
			...cardTheme(theme),
		},

		"NativeBase.CardItem": {
			...cardItemTheme(theme),
		},

		"NativeBase.Toast": {
			...toastTheme(theme),
		},

		"NativeBase.H1": {
			...h1Theme(theme),
		},
		"NativeBase.H2": {
			...h2Theme(theme),
		},
		"NativeBase.H3": {
			...h3Theme(theme),
		},
		"NativeBase.Form": {
			...formTheme(theme),
		},

		"NativeBase.Container": {
			...containerTheme(theme),
		},
		"NativeBase.Content": {
			...contentTheme(theme),
		},

		"NativeBase.Footer": {
			...footerTheme(theme),
		},

		"NativeBase.Tabs": {
			flex: 1,
		},

		"NativeBase.FooterTab": {
			...footerTabTheme(theme),
		},

		"NativeBase.ListItem": {
			...listItemTheme(theme),
		},

		"NativeBase.ListItem1": {
			...listItemTheme(theme),
		},

		"NativeBase.Icon": {
			...iconTheme(theme),
		},
		"NativeBase.IconNB": {
			...iconTheme(theme),
		},
		"NativeBase.Text": {
			...textTheme(theme),
		},
		"NativeBase.Spinner": {
			...spinnerTheme(theme),
		},

		"NativeBase.Fab": {
			...fabTheme(theme),
		},

		"NativeBase.Item": {
			...itemTheme(theme),
		},

		"NativeBase.Label": {
			...labelTheme(theme),
		},

		"NativeBase.Textarea": {
			...textAreaTheme(theme),
		},

		"NativeBase.PickerNB": {
			...pickerTheme(theme),
			"NativeBase.Button": {
				"NativeBase.Text": {},
			},
		},

		"NativeBase.Tab": {
			...tabTheme(theme),
		},

		"NativeBase.Segment": {
			...segmentTheme(theme),
		},

		"NativeBase.TabBar": {
			...tabBarTheme(theme),
		},
		"NativeBase.ViewNB": {
			...viewTheme(theme),
		},
		"NativeBase.TabHeading": {
			...tabHeadingTheme(theme),
		},
		"NativeBase.TabContainer": {
			...tabContainerTheme(theme),
		},
		"NativeBase.Switch": {
			...switchTheme(theme),
		},
		"NativeBase.Separator": {
			...separatorTheme(theme),
		},
		"NativeBase.SwipeRow": {
			...swipeRowTheme(theme),
		},
		"NativeBase.Thumbnail": {
			...thumbnailTheme(theme),
		},
	}

	const cssifyTheme = (grandParent, parent, parentKey) => {
		_.forEach(parent, (style, styleName) => {
			if (
				grandParent &&
				typeof styleName === STRING &&
				styleName.indexOf(".") === 0 &&
				parentKey &&
				parentKey.indexOf(".") === 0
			) {
				if (!grandParent[styleName]) {
					grandParent[styleName] = {}
				} else {
					grandParent[styleName][parentKey] = style
				}
			}
			if (style && typeof style === OBJECT && styleName !== "fontVariant" && styleName !== "transform") {
				cssifyTheme(parent, style, styleName)
			}
		})
	}

	cssifyTheme(null, _theme, null)

	return _theme
}
