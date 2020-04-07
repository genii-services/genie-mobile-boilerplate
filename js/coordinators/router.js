console.debug("RouterCoordinator")

const React = require("react")
const { useState } = React
const { Linking } = require("react-native")
const {
	Actions,
	Drawer: Drawer_,
	Lightbox,
	Modal,
	Overlay,
	Reducer,
	Router: Router_,
	Scene,
	Stack: Stack_,
} = require("react-native-router-flux")

const router = require("/utils/router")

const { FUNCTION, NUMBER, STRING } = require("/constants")
const { useStore, useThis } = require("/hooks")

const useRouter = () => {
	const [router, setRouter] = useStore("value")
	const _this = useThis()

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

	const refresh = (props) => Actions.refresh(props)

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

	const browse = (uri) => {
		console.debug("router.browse", uri)
		Linking.openURL(uri).catch((err) => console.warn("An error occurred", err))
	}

	const handleOnEnter = (props) => {
		typeof _this.onEnterScreen === FUNCTION && _this.onEnterScreen(props)
	}

	const setOnEnterScreen = (handler) => {
		_this.onEnterScreen = handler
	}

	const value = {
		router,
		setRouter,
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

		handleOnEnter,
		setOnEnterScreen,
	}

	console.debug(this, "ready to render", "+".repeat(40), "end")
	return value
}

const Drawer = (props) => {
	const { handleOnEnter } = useRouter()
	const _handleOnEnter = (_props) => {
		handleOnEnter(_props)
		typeof props.onEnter === String.FUNCTION && props.onEnter(_props)
	}
	return <Drawer_ {...props} onEnter={_handleOnEnter} />
}

const Router = ({ onEnterScreen, ...props }) => {
	const { setOnEnterScreen } = useRouter()
	if (onEnterScreen) setOnEnterScreen(onEnterScreen)
	return <Router_ {...props} />
}

const Screen = (props) => {
	const { handleOnEnter } = useRouter()
	const _handleOnEnter = (_props) => {
		handleOnEnter(_props)
		typeof props.onEnter === String.FUNCTION && props.onEnter(_props)
	}
	return <Scene {...props} onEnter={_handleOnEnter} />
}

const { StackViewStyleInterpolator } = require("react-navigation-stack")
const Stack = (props) => {
	if (!props.transitionConfig)
		props.transitionConfig = () => {
			screenInterpolator: StackViewStyleInterpolator.forHorizontal
		}
	return <Stack_ {...props} />
}

module.exports = {
	useRouter,

	Actions,
	Drawer,
	Lightbox,
	Modal,
	Overlay,
	Reducer,
	Router,
	Screen,
	Stack,
}
