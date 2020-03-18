const React = require("react")
const { MessageBar: MessageBar_, MessageBarManager } = require("react-native-message-bar")

const { useRefs } = require("/hooks")

const MessageBar = props => {
	const refs = useRefs()

	useEffect(() => {
		// Register the alert located on this master page
		// This MessageBar will be accessible from the current (same) component, and from its child component
		// The MessageBar is then declared only once, in your main component.
		MessageBarManager.registerMessageBar(refs.alert)
		return () => {
			// Remove the alert located on this master page from the manager
			MessageBarManager.unregisterMessageBar()
		}
	}, [])

	return <MessageBar_ ref={el => (refs.alert = el)} />
}

module.exports = MessageBar
