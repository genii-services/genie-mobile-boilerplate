/* eslint-disable no-param-reassign */
/** Element Style */

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
		"elements/Badge": { ...badgeTheme(theme) },
		"elements/Body": { ...bodyTheme(theme) },
		"elements/Button": { ...buttonTheme(theme) },
		"elements/Card": { ...cardTheme(theme) },
		"elements/CardItem": { ...cardItemTheme(theme) },
		"elements/CheckBox": { ...checkBoxTheme(theme) },
		"elements/Container": { ...containerTheme(theme) },
		"elements/Content": { ...contentTheme(theme) },
		"elements/Fab": { ...fabTheme(theme) },
		"elements/Form": { ...formTheme(theme) },
		"elements/Footer": { ...footerTheme(theme) },
		"elements/FooterTab": { ...footerTabTheme(theme) },
		"elements/H1": { ...h1Theme(theme) },
		"elements/H2": { ...h2Theme(theme) },
		"elements/H3": { ...h3Theme(theme) },
		"elements/Header": { ...headerTheme(theme) },
		"elements/Icon": { ...iconTheme(theme) },
		"elements/IconNB": { ...iconTheme(theme) },
		"elements/Input": { ...inputTheme(theme) },
		"elements/InputGroup": { ...inputGroupTheme(theme) },
		"elements/Item": { ...itemTheme(theme) },
		"elements/Label": { ...labelTheme(theme) },
		"elements/Left": { ...leftTheme(theme) },
		"elements/ListItem": { ...listItemTheme(theme) },
		"elements/ListItem1": { ...listItemTheme(theme) },
		"elements/PickerNB": { ...pickerTheme(theme), "elements/Button": { "elements/Text": {} } },
		"elements/Radio": { ...radioTheme(theme) },
		"elements/Right": { ...rightTheme(theme) },
		"elements/Separator": { ...separatorTheme(theme) },
		"elements/Segment": { ...segmentTheme(theme) },
		"elements/Spinner": { ...spinnerTheme(theme) },
		"elements/Subtitle": { ...subtitleTheme(theme) },
		"elements/Switch": { ...switchTheme(theme) },
		"elements/SwipeRow": { ...swipeRowTheme(theme) },
		"elements/Tab": { ...tabTheme(theme) },
		"elements/TabBar": { ...tabBarTheme(theme) },
		"elements/TabHeading": { ...tabHeadingTheme(theme) },
		"elements/TabContainer": { ...tabContainerTheme(theme) },
		"elements/Tabs": { flex: 1 },
		"elements/Text": { ...textTheme(theme) },
		"elements/Textarea": { ...textAreaTheme(theme) },
		"elements/Thumbnail": { ...thumbnailTheme(theme) },
		"elements/Title": { ...titleTheme(theme) },
		"elements/Toast": { ...toastTheme(theme) },
		"elements/ViewNB": { ...viewTheme(theme) },
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
				if (!grandParent[styleName]) grandParent[styleName] = {}
				else grandParent[styleName][parentKey] = style
			}
			if (style && typeof style === OBJECT && styleName !== "fontVariant" && styleName !== "transform") {
				cssifyTheme(parent, style, styleName)
			}
		})
	}

	cssifyTheme(null, _theme, null)

	return _theme
}
