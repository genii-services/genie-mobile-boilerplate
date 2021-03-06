require("react")
const { MessageBar, MessageBarManager } = require("react-native-message-bar")

const { useRefs } = require("/hooks")

const MessageBarElement = props => {
	const refs = useRefs()

	useEffect(() => {
		// Register the alert located on this master page
		// This MessageBarElement will be accessible from the current (same) component, and from its child component
		// The MessageBarElement is then declared only once, in your main component.
		MessageBarManager.registerMessageBar(refs.alert)
		return () => {
			// Remove the alert located on this master page from the manager
			MessageBarManager.unregisterMessageBar()
		}
	}, [])

	return <MessageBar ref={el => (refs.alert = el)} />
}

MessageBarElement.displayName = "MessageBar"

module.exports = MessageBarElement
