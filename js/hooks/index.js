/**
 * hooks
 * 200331
 */
const React = require("react")

exports.forwardRef = React.forwardRef
exports.useEffect = React.useEffect
exports.useRef = React.useRef
exports.useState = React.useState

exports.useStore = require("./store/useStore")
exports.globalStore = require("./store/globalStore")
const dataHook = require("react-data-hooks")
exports.createRest = dataHook.createRestHook
exports.clearRestStore = dataHook.clearStore

exports.createCtx = require("./createCtx")
exports.useInput = require("./useInput")
exports.useRefs = require("./useRefs")
exports.useThis = require("./useThis")

exports.createCoordinator = require("./coordinator/createCoordinator")
exports.useCoordinator = require("./coordinator/useCoordinator")

exports.createAnimatedComponent = require("./createAnimatedComponent")
