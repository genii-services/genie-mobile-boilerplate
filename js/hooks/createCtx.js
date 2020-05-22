/**
 * createCtx
 * 200331 by appcreatier@gmail.com
 */
const { createContext, useContext } = require("react")
const { getName } = require("/utils")

function createCtx(substitute) {
	// 항상 수행하는 정의되지 않은 검사를 하지 않고 defaultValue 없이 컨텍스트를 생성
	const Ctx = createContext()
	const useCtx = (requestor) => {
		const ctx = useContext(Ctx)
		if (!ctx) {
			// throw new Error("useCtx must be inside a Coordinator or Provider with a value")
			console.warn(
				getName(requestor || arguments.callee.caller),
				'"useCtx must be inside a Coordinator or Provider with a value"'
			)
			return substitute || {}
		}
		return ctx
	}
	// 정의되지 않은 typeScript를 집합체로 유추하여 합쳐진 형태의 배열이 아닌,
	// defaultValue 없는 컨텍스트를 만듦
	return [useCtx, Ctx.Provider]
}

module.exports = createCtx
