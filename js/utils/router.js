const { Linking } = require("react-native")
const { Actions } = require("react-native-router-flux")

const { NUMBER, STRING } = require("/constants")

const prevAction = {}

const getCurrentScreen = () => Actions.currentScene

const getPrevScreen = () => Actions.prevAction

const push = (key, props) => {
	console.debug("router.push", key, props)
	prevAction.key = key
	prevAction.props = props
	Actions.push(key, props)
}

const pop = (params, refreshInterval) => {
	Actions.pop(params)
	if (typeof refreshInterval === NUMBER) setTimeout(() => refresh({ refreshedTimestamp: Date.now() }), refreshInterval)
}

const popTo = (key, props) => Actions.popTo(key, props)

const jump = (key, props) => Actions.jump(key, props)

const refresh = props => Actions.refresh(props)

const replace = (key, props) => Actions.replace(key, props)

const reset = (key, props) => Actions.reset(key, props)

const openDrawer = () => Actions.drawerOpen()

const closeDrawer = () => Actions.drawerClose()

const navigate = (itemOrSceneKey, props) => {
	try {
		if (typeof itemOrSceneKey === STRING) return push(itemOrSceneKey, props)
		const { action, title, paramz } = itemOrSceneKey
		push(action, { title, ...paramz })
	} catch (err) {
		console.warn("navigate", "An error occurred", err)
	}
}

const launch = (appPath, appName, options) => launchApp(appPath, appName, options)

const browse = uri => {
	console.debug("router.browse", uri)
	Linking.openURL(uri).catch(err => console.warn("An error occurred", err))
}

module.exports = {
	prevAction,
	getCurrentScreen,
	getPrevScreen,
	push,
	pop,
	popTo,
	jump,
	refresh,
	replace,
	reset,
	openDrawer,
	closeDrawer,
	navigate,
	launch,
	browse,
}
