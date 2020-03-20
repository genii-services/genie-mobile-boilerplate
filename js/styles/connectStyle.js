import React from "react"
import hoistStatics from "hoist-non-react-statics"
import * as _ from "lodash"
import normalizeStyle from "./StyleNormalizer/normalizeStyle"
import { StyleSheet } from "react-native"

import Theme, { ThemeShape } from "./Theme"
import { resolveComponentStyle } from "./resolveComponentStyle"

let themeCache = {}

/**
 * clear theme cache
 * @export
 */
export function clearThemeCache() {
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
	// Fallback to a default theme if the component isn't
	// rendered in a StyleProvider.
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
 * Resolves the final component style by using the theme style, if available and
 * merging it with the style provided directly through the style prop, and style
 * variants applied through the styleName prop.
 *
 * @param componentStyleName The component name that will be used
 * to target this component in style rules.
 * @param componentStyle The default component style.
 * @param mapPropsToStyleNames Pure function to customize styleNames depending on props.
 * @param options The additional connectStyle options
 * @param options.virtual The default value of the virtual prop
 * @param options.withRef Create component ref with addedProps; if true, ref name is wrappedInstance
 * @returns {StyledComponent} The new component that will handle
 * the styling of the wrapped component.
 */
export default (componentStyleName, componentStyle = {}, mapPropsToStyleNames, options = {}) => {
	function getComponentDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || "Component"
	}

	return function wrapWithStyledComponent(WrappedComponent) {
		if (__DEV__) {
			const componentDisplayName = getComponentDisplayName(WrappedComponent)
			if (!_.isPlainObject(componentStyle)) throwConnectStyleError("Component style must be plain object", componentDisplayName)
			if (!_.isString(componentStyleName)) throwConnectStyleError("Component Style Name must be string", componentDisplayName)
		}

		return hoistStatics(StyledComponent, WrappedComponent)
	}
}
