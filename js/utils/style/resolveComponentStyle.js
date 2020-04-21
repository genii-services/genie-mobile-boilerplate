const _ = require("lodash")
const customMerge = require("./customMerge")

/**
 * 구성 요소에 적용할 수 있는 모든 스타일을 올바른 순서로 병합하여
 * 최종 구성 요소 스타일을 해결합니다.
 *
 * 이 함수는 테마의 해당 부분, 부모 및 요소 스타일을 추출하고
 * 구성 요소를 대상으로하는 스타일과 해당 스타일과 변형된 구성 요소을 병합하여
 * 최종 스타일을 얻습니다.
 *
 * 스타일은 다음 순서로 병합됩니다.
 * 인덱스가 높은 스타일은 스타일이 낮은 스타일보다 우선합니다.
 * 1. 테마 컴포넌트 스타일
 * 2. 상위 컴포넌트 스타일
 * 3. styleName을 통해 지정된 변형된 테마 스타일
 * 4. styleName을 통해 지정된 변형된 상위 스타일
 * 5. 스타일 속성을 통해 전달된 요소 스타일
 *
 * @param componentName The component name ('shoutem.ui.Text')
 * @param styleName Style names ('large rounded')
 * @param themeStyle The theme style that should include the theme and base component style
 * @param parentStyle The style rules inherited from the parent component
 * @param elementStyle The style passed through the style prop of the component
 * @returns {{componentStyle, childrenStyle}} The resolved component and children styles.
 */
module.exports = function resolveComponentStyle(componentName, styleNames = [], themeStyle = {}, parentStyle = {}) {
	// const mergedStyle = _.merge({},
	//   themeStyle,
	//   parentStyle['*'],
	//   parentStyle[componentName],
	//   ..._.map(styleNames, (sn) => themeStyle[`.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`*.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`${componentName}.${sn}`])
	// );

	let mergedStyle = customMerge(themeStyle, parentStyle[componentName])
	styleNames.forEach((sn, index) => {
		mergedStyle = customMerge(mergedStyle, themeStyle[`${sn}`])
	})

	styleNames.forEach((sn, index) => {
		mergedStyle = customMerge(mergedStyle, parentStyle[`${componentName}${sn}`])
	})

	// Phase 2: merge the component styles, this step is performed by using the
	// style from phase 1, so that we are sure that the final style variants are
	// applied to component style.
	// const resolvedStyle = _.merge({},
	//   mergedStyle,
	//   parentStyle['*'],
	//   parentStyle[componentName],
	//   ..._.map(styleNames, (sn) => mergedStyle[`.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`*.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`${componentName}.${sn}`])
	// );

	let resolvedStyle = customMerge(mergedStyle, parentStyle[componentName])

	styleNames.forEach((sn, index) => {
		resolvedStyle = customMerge(resolvedStyle, mergedStyle[`${sn}`])
	})

	styleNames.forEach((sn, index) => {
		resolvedStyle = customMerge(resolvedStyle, parentStyle[`${componentName}${sn}`])
	})

	return resolvedStyle
}
