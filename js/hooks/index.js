const React = require("react")

exports.useEffect = React.useEffect
exports.useRef = React.useRef
exports.useState = React.useState

exports.useStore = require("use-store")
const dataHook = require("react-data-hooks")
exports.createRest = dataHook.createRestHook
exports.clearRestStore = dataHook.clearStore

exports.createCtx = require("./createCtx")
exports.useInput = require("./useInput")
exports.useRefs = require("./useRefs")
exports.useThis = require("./useThis")

exports.createAnimatedComponent = require("./createAnimatedComponent")
