const hoistStatics = require("hoist-non-react-statics")
const _ = require("lodash")

let themeCache = {}

/**
 * clear theme cache
 * @export
 */
function clearThemeCache() {
	themeCache = {}
}

/**
 * Formats and throws an error when connecting component style with the theme.
 *
 * @param errorMessage The error message.
 * @param componentDisplayName The name of the component that is being connected.
 */
function throwConnectStyleError(errorMessage, componentDisplayName) {
	throw Error(`${errorMessage} - when connecting ${componentDisplayName} component to style.`)
}

/**
 * Returns the theme object from the provided context,
 * or an empty theme if the context doesn't contain a theme.
 *
 * @param context The React component context.
 * @returns {Theme} The Theme object.
 */
function getTheme(context) {
	// Fallback to a default theme if the component isn't rendered in a StyleProvider.
	return context.theme || Theme.getDefaultTheme()
}

/**
 * Matches any style properties that represent component style variants.
 * Those styles can be applied to the component by using the styleName
 * prop. All style variant property names must start with a single '.'
 * character, e.g., '.variant'.
 *
 * @param propertyName The style property name.
 * @returns {boolean} True if the style property represents a component variant, false otherwise.
 */
function isStyleVariant(propertyName) {
	return /^\./.test(propertyName)
}

/**
 * Matches any style properties that represent style rules that target the
 * component children. Those styles can have two formats, they can either
 * target the components by component name ('shoutem.ui.Text'), or by component
 * name and variant ('shoutem.ui.Text.line-through'). Beside specifying the
 * component name, those styles can also target any component by using the
 * '*' wildcard ('*', or '*.line-through'). The rule to identify those styles is
 * that they have to contain a '.' character in their name or be a '*'.
 *
 * @param propertyName The style property name.
 * @returns {boolean} True if the style property represents a child style, false otherwise.
 */
function isChildStyle(propertyName) {
	return /(^[^\.].*\.)|^\*$/.test(propertyName)
}

function getConcreteStyle(style) {
	return _.pickBy(style, (value, key) => {
		return !isStyleVariant(key) && !isChildStyle(key)
	})
}

const StyledComponent = require("./StyledComponent")

/**
 * 사용 가능한 경우 테마 스타일을 사용하고
 * 스타일 속성을 통해 직접 제공된 스타일 및 styleName 속성을 통해
 * 적용된 스타일 변형과 병합하여 최종 구성 요소 스타일을 해결
 *
 * @param componentStyleName The component name that will be used to target this component in style rules.
 * @param componentStyle The default component style.
 * @param mapPropsToStyleNames Pure function to customize styleNames depending on props.
 * @param options The additional connectStyle options
 * @param options.virtual The default value of the virtual prop
 * @param options.withRef Create component ref with addedProps; if true, ref name is wrappedInstance
 * @returns {StyledComponent} The new component that will handle the styling of the wrapped component.
 */
exports = module.exports = (componentStyleName, componentStyle = {}, mapPropsToStyleNames, options = {}) => {
	function getComponentDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || "Component"
	}

	return function wrapWithStyledComponent(WrappedComponent) {
		const componentDisplayName = getComponentDisplayName(WrappedComponent)
		if (__DEV__) {
			if (!_.isPlainObject(componentStyle)) throwConnectStyleError("Component style must be plain object", componentDisplayName)
			if (!_.isString(componentStyleName)) throwConnectStyleError("Component Style Name must be string", componentDisplayName)
		}

		StyledComponent.defaultProps = {
			virtual: options.virtual,
		}

		StyledComponent.displayName = `Styled(${componentDisplayName})`
		StyledComponent.WrappedComponent = WrappedComponent
		return hoistStatics(StyledComponent, WrappedComponent, { mapPropsToStyleNames, options })
	}
}
exports.clearThemeCache = clearThemeCache
