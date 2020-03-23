// exports.BorderButton = require("./BorderButton")
// exports.DataPicker = require("./DataPicker")
// exports.DatePicker = require("./DatePicker")
// exports.HIcon = require("./HIcon")
// exports.HLine = require("./HLine")
// exports.Html = require("./Html")
// exports.Icon = require("./Icon")
// exports.InputBar = require("./InputBar")
// exports.List = require("./List")
// exports.ListItem = require("./ListItem")
// exports.LocalImage = require("./LocalImage")
// exports.RemoteImage = require("./RemoteImage")
// exports.TitleBar = require("./TitleBar")
// exports.VLine = require("./VLine")

const { StyleProvider, connectStyle } = require("/styles")
const { Col, Row, Grid } = require("react-native-easy-grid")
const { key } = require("lodash")

exports.StyleProvider = StyleProvider
exports.connectStyle = connectStyle
exports.keys = key
exports.Col = Col
exports.Row = Row
exports.Grid = Grid

exports.Accordion = require("./Accordion")
exports.ActionSheetContainer = require("./ActionSheet")
exports.Badge = require("./Badge")
exports.Body = require("./Body")
exports.Button = require("./Button")
exports.Card = require("./Card")
exports.CardItem = require("./CardItem")
exports.CheckBox = require("./Checkbox")
exports.Container = require("./Container")
exports.Content = require("./Content")
exports.DatePicker = require("./DatePicker")
exports.DeckSwiper = require("./DeckSwiper")
exports.DefaultTabBar = require("./Tabs")
exports.Drawer = require("./Drawer")
exports.Fab = require("./Fab")
exports.Footer = require("./Footer")
exports.FooterTab = require("./FooterTab")
exports.Form = require("./Form")
exports.H1 = require("./H1")
exports.H2 = require("./H2")
exports.H3 = require("./H3")
exports.Header = require("./Header")
exports.Icon = require("./Icon")
exports.InputGroup = require("./InputGroup")
exports.Input = require("./Input")
exports.Item = require("./Item")

exports.Label = require("./Label")
exports.Left = require("./Left")
exports.List = require("./List")
exports.ListItem = require("./ListItem")

exports.Picker = require("./Picker")
exports.Radio = require("./Radio")
exports.Right = require("./Right")
exports.Root = require("./Root")
exports.Tabs = require("./Tabs")
exports.ScrollableTab = require("./Tabs")
exports.Segment = require("./Segment")
exports.Separator = require("./Separator")
exports.Spinner = require("./Spinner")
exports.Subtitle = require("./Subtitle")
exports.SwipeRow = require("./SwipeRow")
exports.Switch = require("./Switch")
exports.TabHeading = require("./TabHeading")
exports.TabContainer = require("./TabContainer")
exports.Tab = require("./Tab")
exports.Text = require("./Text")
exports.Textarea = require("./Textarea")
exports.Thumbnail = require("./Thumbnail")
exports.Title = require("./Title")
exports.ToastContainer = require("./ToastContainer")
exports.View = require("./View")

// Theme

const { Theme } = require("/utils/style")
const getThemeStyle = require("/styles/elements")

function setDefaultThemeStyle() {
	const theme = getThemeStyle()
	Theme.setDefaultThemeStyle(theme)
}

exports.setDefaultThemeStyle = setDefaultThemeStyle
exports.variables = require("/styles/themes/default")
exports.mapPropsToStyleNames = (styleNames, props) => keys(props)

setDefaultThemeStyle()
