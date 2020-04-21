const React = require("react")
const PropTypes = require("prop-types")
const hoistStatics = require("hoist-non-react-statics")
const _ = require("lodash")

const { isEqual } = require("/utils/object")
const { useRefs, useState, useStore, useThis } = require("/hooks")
const Theme = require("./Theme")
const { ThemeShape } = Theme
const { getConcreteStyle } = require("./")
const resolveComponentStyle = require("./resolveComponentStyle")

const themeCache = {}

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
module.exports = (componentStyleName, componentStyle = {}, mapPropsToStyleNames, options = {}) => {
	function getComponentDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || "Component"
	}

	return function wrapWithStyledComponent(WrappedComponent) {
		const componentDisplayName = getComponentDisplayName(WrappedComponent)
		// const [theme] = useStore("theme") // theme: ThemeShape

		if (!_.isPlainObject(componentStyle)) {
			throwConnectStyleError("Component style must be plain object", componentDisplayName)
		}

		if (!_.isString(componentStyleName)) {
			throwConnectStyleError("Component Style Name must be string", componentDisplayName)
		}

		class StyledComponent extends React.Component {
			static contextTypes = {
				theme: ThemeShape,
				// The style inherited from the parent
				parentPath: PropTypes.string,
				parentStyleNames: PropTypes.array,
				// parentStyle: PropTypes.object,
			}

			static childContextTypes = {
				// Provide the parent style to child components
				parentPath: PropTypes.string,
				parentStyleNames: PropTypes.array,
				// parentStyle: PropTypes.object,
				// resolveStyle: PropTypes.func,
			}

			static propTypes = {
				// Element style that overrides any other style of the component
				style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
				// The style variant names to apply to this component,
				// multiple variants may be separated with a space character
				styleName: PropTypes.string,
				// Virtual elements will propagate the parent
				// style to their children, i.e., the children
				// will behave as they are placed directly below
				// the parent of a virtual element.
				virtual: PropTypes.bool,
			}

			static defaultProps = {
				virtual: options.virtual,
			}

			static displayName = `Styled${componentDisplayName}`
			static WrappedComponent = WrappedComponent

			constructor(props, context) {
				super(props, context)
				// console.log(context.parentStyleNames);
				this.state = { _this: this }
				this.styleNames = this.getStyleNames(props)
				this.style = this.getFinalStyle(props, context, props.style, this.styleNames)
				// AddedProps are additional WrappedComponent props
				// Usually they are set trough alternative ways,
				// such as theme style, or trough options
				this.addedProps = options.withRef ? { ref: "wrappedInstance" } : {}
			}

			static getDerivedStateFromProps(nextProps, prevState) {
				const { _this } = prevState
				const { context, props, state } = this
				const styleNames = this.getStyleNames(nextProps)
				const { style, styleName } = nextProps
				const { theme, parentStyleNames } = nextContext
				if (
					props.style !== style ||
					props.styleName !== styleName ||
					context.theme !== theme ||
					!_.isEqual(parentStyleNames, context.parentStyleNames) ||
					// shoutem 속성이 여기에서 변경되었지만, 변경된 속성이 styleName에 영향을 미치는 것을 의미하지는 않음
					(mapPropsToStyleNames && props !== nextProps && !_.isEqual(this.state.styleNames, styleNames))
				) {
					const finalStyle = this.getFinalStyle(nextProps, nextContext, style, styleNames)
					this.setState({
						style: finalStyle,
						// childrenStyle: resolvedStyle.childrenStyle,
						styleNames,
					})
				}
			}

			getFinalStyle(props, context, style, styleNames) {
				const path = _.compact(_.concat(context.parentStyleNames, componentStyleName, styleNames)).join(">")
				let resolvedStyle = themeCache[path]
				if (!resolvedStyle) {
					resolvedStyle = this.resolveStyle(context, styleNames)
					if (Object.keys(themeCache).length < 10000) themeCache[path] = resolvedStyle
				}
				const concreteStyle = getConcreteStyle(_.merge({}, resolvedStyle))
				return _.isArray(style)
					? [concreteStyle, ...style]
					: typeof style == "number" || typeof style == "object"
					? [concreteStyle, style]
					: concreteStyle
			}

			getStyleNames(props) {
				const styleNames = []
				_.forEach(props, (v, k) => {
					if (v !== true) return
					styleNames.push("." + k)
				})
				return styleNames
			}

			getChildContext() {
				const parentStyleNames = this.context.parentStyleNames
					? [...this.context.parentStyleNames, componentStyleName, ...this.getStyleNames(this.props)]
					: [componentStyleName]
				console.debug(componentStyleName, parentStyleNames)
				return {
					// parentStyle: this.props.virtual ?
					//   this.context.parentStyle :
					//   this.state.childrenStyle,
					// resolveStyle: this.resolveConnectedComponentStyle,
					parentStyleNames,
					parentPath,
				}
			}

			setNativeProps(nativeProps) {
				if (this.wrappedInstance.setNativeProps) this.wrappedInstance.setNativeProps(nativeProps)
			}

			setWrappedInstance = (component) => {
				this.wrappedInstance = this._root = component && component._root ? component._root : component
			}

			resolveStyle(context, styleNames) {
				const theme = context.theme || Theme.getDefaultTheme()
				const themeStyle = theme.createComponentStyle(componentStyleName, componentStyle)
				let parentStyle = context.parentStyleNames
					? themeCache[context.parentPath]
					: (parentStyle = resolveComponentStyle(componentStyleName, styleNames, themeStyle, parentStyle))
				return resolveComponentStyle(componentStyleName, styleNames, themeStyle, parentStyle)
			}

			/**
			 * A helper function provided to child components that enables
			 * them to resolve their style for any set of prop values.
			 *
			 * @param props The component props to use to resolve the style values.
			 * @returns {*} The resolved component style.
			 */
			resolveConnectedComponentStyle = (props) => {
				const { styleName } = props
				const styleNames = styleName ? styleName.split(/\s/g) : []
				if (!mapPropsToStyleNames) return styleNames
				// We only want to keep the unique style names
				styleNames = _.uniq(mapPropsToStyleNames(styleNames, props))
				return this.resolveStyle(this.context, styleNames).componentStyle
			}

			render() {
				// console.log('themeCache', themeCache);

				// if(componentStyleName == 'NativeBase.Text') {
				//   console.log(this.state.style);
				//   console.log(themeCache);
				// }
				const { addedProps, style } = this.state
				return <WrappedComponent {...this.props} {...addedProps} style={style} ref={this.setWrappedInstance} />
			}
		}
		return hoistStatics(StyledComponent, WrappedComponent)
	}
}
