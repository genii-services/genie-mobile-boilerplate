const hoistStatics = require("hoist-non-react-statics")
const _ = require("lodash")
const { StyleSheet } = require("react-native")

const { useState, useThis } = require("/hooks")
const Theme = require("./Theme")
const { ThemeShape } = Theme
const { resolveComponentStyle } = require("./resolveComponentStyle")

/**
 * 제공된 컨텍스트에서 테마 오브젝트를 리턴하거나
 * 컨텍스트에 테마가 없는 경우 빈 테마를 반환
 *
 * @param context 리액트 컴포넌트 컨텍스트
 * @returns {Theme} 테마 오브젝트
 */
function getTheme(context) {
	// Fallback to a default theme if the component isn't rendered in a StyleProvider.
	return context.theme || Theme.getDefaultTheme()
}

/**
 * 구성 요소 스타일 변형을 나타내는 모든 스타일 특성과 매치
 * 이러한 스타일은 styleName 속성을 사용하여 구성 요소에 적용할 수 있습니다.
 * 모든 스타일 변형 속성 이름은 단일 '.'로 시작해야 합니다. 문자 (예 : '.variant')
 *
 * @param propertyName 스타일 속성 이름
 * @returns {boolean} style 속성이 변형된 구성 요소를 나타내는 경우 true이고, 그렇지 않으면 false입니다.
 */
function isStyleVariant(propertyName) {
	return /^\./.test(propertyName)
}

/**
 * 지정한 속성 이름이 하위 컴포넌트를 대상으로 하는 스타일 규칙인지 판단한다.
 * 이러한 스타일은 두 가지 형식이 있는데,
 * 컴포넌트 이름 ( 'elements.Text')와 컴포넌트 이름 및 변형 ( 'elements.Text.line-through')으로
 * 컴포넌트를 대상으로 지정할 수 있습니다.
 * 컴포넌트 이름을 지정하는 것 외에도 이러한 스타일은
 * '*'와일드 카드 ( '*'또는 '* .line-through')를 사용하여
 * 모든 구성 요소를 대상으로 할 수도 있습니다.
 * 이러한 스타일을 식별하는 규칙은 '.'을 포함해야한다는 것입니다.
 * 이름에 문자를 포함 시키거나 '*'이어야 합니다.
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

let themeCache = {}

/**
 * clear theme cache
 * @export
 */
function clearThemeCache() {
	themeCache = {}
}

/**
 * 컴포넌트 스타일을 테마와 연결할 때 형식을 지정하여 오류를 발생시킵니다.
 *
 * @param errorMessage 오류 메시지
 * @param componentDisplayName 연결 중인 컴포넌트 이름
 */
function throwConnectStyleError(errorMessage, componentDisplayName) {
	throw Error(`${errorMessage} - when connecting ${componentDisplayName} component to style.`)
}

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

		const StyledComponent = props => {
			const resolveStyle = (context, props, styleNames) => {
				const theme = getTheme(context)
				const themeStyle = theme.createComponentStyle(componentStyleName, componentStyle)
				const parentStyle = context.parentPath
					? themeCache[context.parentPath.join(">")]
					: resolveComponentStyle(componentStyleName, styleNames, themeStyle)
				return resolveComponentStyle(componentStyleName, styleNames, themeStyle, parentStyle)
			}

			const getStyleNames = props => {
				const styleNamesArr = _.map(props, (value, key) => (typeof value !== "object" && value === true ? "." + key : false))
				_.remove(styleNamesArr, (value, index) => value === false)
				return styleNamesArr
			}

			const getFinalStyle = (props, context, style, styleNames) => {
				let resolvedStyle = {}
				if (context.parentPath) {
					const getOrSetStylesInCache = (context, props, styleNames, path) => {
						if (themeCache && themeCache[path.join(">")]) return themeCache[path.join(">")]

						const resolvedStyle = resolveStyle(context, props, styleNames)
						if (Object.keys(themeCache).length < 10000) themeCache[path.join(">")] = resolvedStyle
						return resolvedStyle
					}
					resolvedStyle = getOrSetStylesInCache(context, props, styleNames, [
						...context.parentPath,
						componentStyleName,
						...styleNames,
					])
				} else {
					resolvedStyle = resolveStyle(context, props, styleNames)
					themeCache[componentStyleName] = resolvedStyle
				}

				const concreteStyle = getConcreteStyle(_.merge({}, resolvedStyle))

				return _.isArray(style)
					? [concreteStyle, ...style]
					: typeof style == "number" || typeof style == "object"
					? [concreteStyle, style]
					: concreteStyle
			}

			const _this = useThis()

			// console.log(context.parentPath);
			const styleNames = getStyleNames(props)
			const style = props.style

			const [_style, set_style] = useState(() => getFinalStyle(props, context, style, styleNames))
			// AddedProps are additional WrappedComponent props
			// Usually they are set trough alternative ways,
			// such as theme style, or trough options
			const [_addedProps] = useState(() => {
				const addedProps = {}
				if (options.withRef) addedProps.ref = "wrappedInstance"
				return addedProps
			})
			const [_styleNames, set_styleNames] = useState(styleNames)

			const shouldRebuildStyle = (nextProps, nextContext, styleNames) => {
				const hasStyleNameChanged = (nextProps, styleNames) => {
					return (
						mapPropsToStyleNames &&
						props !== nextProps &&
						// Even though props did change here,
						// it doesn't necessary means changed props are those which affect styleName
						!_.isEqual(_styleNames, styleNames)
					)
				}

				return (
					nextProps.style !== props.style ||
					nextProps.styleName !== props.styleName ||
					nextContext.theme !== context.theme ||
					!_.isEqual(nextContext.parentPath, context.parentPath) ||
					hasStyleNameChanged(nextProps, styleNames)
				)
			}
			if (shouldRebuildStyle(props, nextContext, styleNames)) {
				const finalStyle = getFinalStyle(nextProps, nextContext, style, styleNames)
				set_style(finalStyle)
				// set_style(childrenStyle(resolvedStyle.childrenStyle)
				set_styleNames(styleNames)
			}

			const getChildContext = () => {
				parentPath: !context.parentPath
					? [componentStyleName]
					: [...context.parentPath, componentStyleName, ...getStyleNames(props)]
			}

			const setWrappedInstance = el => {
				refs._root = el && el._root ? el._root : el
				_this.wrappedInstance = refs._root
			}

			/**
			 * 하위 구성요소에 제공되는 핼퍼함수로써 모든 속성 값 세트의 스타일을 확인할 수 있음
			 *
			 * @param props 스타일 값을 해석하는 데 사용하는 컴포넌트 속성
			 * @returns {*} 해석된 컴포넌트 스타일
			 */
			const resolveConnectedComponentStyle = props => {
				const resolveStyleNames = props => {
					const { styleName } = props
					const styleNames = styleName ? styleName.split(/\s/g) : []
					if (!mapPropsToStyleNames) return styleNames
					// We only want to keep the unique style names
					return _.uniq(mapPropsToStyleNames(styleNames, props))
				}

				const styleNames = resolveStyleNames(props)
				return resolveStyle(context, props, styleNames).componentStyle
			}

			return <WrappedComponent {...props} {..._addedProps} style={_style} ref={setWrappedInstance} />
		}

		if (__DEV__) {
			const { array, bool, func, number, object, oneOfType, string } = require("prop-types")

			StyledComponent.contextTypes = {
				theme: ThemeShape,
				// The style inherited from the parent
				// parentStyle: object,
				parentPath: array,
			}

			StyledComponent.childContextTypes = {
				// Provide the parent style to child components
				// parentStyle: object,
				// resolveStyle: func,
				parentPath: array,
			}

			StyledComponent.propTypes = {
				// Element style that overrides any other style of the component
				style: oneOfType([object, number, array]),
				// The style variant names to apply to this component, multiple variants may be separated with a space character
				styleName: string,
				// 가상요소는 부모스타일을 자녀에게 전파합니다. 즉, 자녀는 가상요소의 부모 바로 아래에 배치될 때 동작함
				virtual: bool,
			}
		}
		StyledComponent.defaultProps = { virtual: options.virtual }

		StyledComponent.displayName = `Styled(${componentDisplayName})`
		StyledComponent.WrappedComponent = WrappedComponent
		return hoistStatics(StyledComponent, WrappedComponent)
	}
}
exports.clearThemeCache = clearThemeCache
