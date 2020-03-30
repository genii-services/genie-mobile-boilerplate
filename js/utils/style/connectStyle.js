const React = require("react")
const hoistStatics = require("hoist-non-react-statics")
const _ = require("lodash")

const { forwardRef, useRefs, useState, useStore, useThis } = require("/hooks")
const Theme = require("./Theme")
const resolveComponentStyle = require("./resolveComponentStyle")

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

let parentPath
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
	// console.debug("connectStyle", componentStyleName)

	return function wrapWithStyledComponent(WrappedComponent) {
		const componentDisplayName = getComponentDisplayName(WrappedComponent)
		if (__DEV__) {
			if (!_.isPlainObject(componentStyle)) throwConnectStyleError("Component style must be plain object", componentDisplayName)
			if (!_.isString(componentStyleName)) throwConnectStyleError("Component Style Name must be string", componentDisplayName)
		}
		// console.debug("wrapWithStyledComponent", componentDisplayName)

		const StyledComponent = props => {
			const resolveStyle = () => {
				const themeStyle = theme.createComponentStyle(componentStyleName, componentStyle)
				const parentStyle = genealStyleNames
					? themeCache[genealStyleNames.join(">")]
					: resolveComponentStyle(componentStyleName, styleNames, themeStyle)
				return resolveComponentStyle(componentStyleName, styleNames, themeStyle, parentStyle)
			}

			const { style, styleName, genealStyleNames } = props
			// console.log(genealStyleNames);

			const styleNames = []
			_.forEach(props, (value, key) => {
				if (typeof value !== "object" && value === true) styleNames.push("." + key)
			})

			const [theme] = useStore("theme") // theme: ThemeShape
			const refs = useRefs()
			const _this = useThis()

			// AddedProps are additional WrappedComponent props
			// Usually they are set trough alternative ways,
			// such as theme style, or trough options
			const [_addedProps] = useState(() => {
				const addedProps = {}
				if (options.withRef) addedProps.ref = "wrappedInstance"
				return addedProps
			})

			if (
				_this.style !== props.style ||
				_this.styleName !== styleName ||
				_this.theme !== theme ||
				!_.isEqual(_this.genealStyleNames, genealStyleNames) ||
				// shoutem 속성이 여기에서 변경되었지만, 변경된 속성이 styleName에 영향을 미치는 것을 의미하지는 않음
				(mapPropsToStyleNames && props !== nextProps && !_.isEqual(_this.styleNames, styleNames))
			) {
				let resolvedStyle = {}
				if (genealStyleNames) {
					const getOrSetStylesInCache = path => {
						if (themeCache && themeCache[path.join(">")]) return themeCache[path.join(">")]
						const resolvedStyle = resolveStyle()
						if (Object.keys(themeCache).length < 10000) themeCache[path.join(">")] = resolvedStyle
						return resolvedStyle
					}
					resolvedStyle = getOrSetStylesInCache([...genealStyleNames, componentStyleName, ...styleNames])
				} else {
					resolvedStyle = resolveStyle()
					themeCache[componentStyleName] = resolvedStyle
				}

				const concreteStyle = getConcreteStyle(_.merge({}, resolvedStyle))

				_this.finalStyle = _.isArray(style)
					? [concreteStyle, ...style]
					: typeof style == "number" || typeof style == "object"
					? [concreteStyle, style]
					: concreteStyle
				_this.style = props.style
				_this.styleName = styleName
				_this.theme = _this.styleNames = styleNames
			}

			const nextGenealStyleNames = !genealStyleNames
				? [componentStyleName]
				: [...genealStyleNames, componentStyleName, ...styleNames]

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
			const resolveConnectedComponentStyle = () => {
				const resolveStyleNames = () => {
					const styleNames = styleName ? styleName.split(/\s/g) : []
					if (!mapPropsToStyleNames) return styleNames
					// We only want to keep the unique style names
					return _.uniq(mapPropsToStyleNames(styleNames, props))
				}

				const styleNames = resolveStyleNames()
				return resolveStyle().componentStyle
			}

			// console.debug("StyledComponent", StyledComponent.displayName, nextGenealStyleNames)
			return (
				<WrappedComponent
					{...props}
					{..._addedProps}
					style={_this.finalStyle}
					ref={setWrappedInstance}
					// parentStyle: object,	// Provide the parent style to child components
					// resolveStyle: func,
					genealStyleNames={nextGenealStyleNames} // array
				/>
			)
		}

		if (__DEV__) {
			const { array, bool, func, number, object, oneOfType, string } = require("/utils/propTypes")
			StyledComponent.propTypes = {
				// Element style that overrides any other style of the component
				style: oneOfType([object, number, array]),
				// The style variant names to apply to this component, multiple variants may be separated with a space character
				styleName: string,
				// 가상요소는 부모스타일을 자녀에게 전파합니다. 즉, 자녀는 가상요소의 부모 바로 아래에 배치될 때 동작함
				virtual: bool,
				// The style inherited from the parent
				// parentStyle: object,
				genealStyleNames: array,
			}
		}
		StyledComponent.defaultProps = { virtual: options.virtual }
		StyledComponent.displayName = `Styled${componentDisplayName}`
		StyledComponent.WrappedComponent = WrappedComponent
		return hoistStatics(StyledComponent, WrappedComponent)
	}
}
exports.clearThemeCache = clearThemeCache
