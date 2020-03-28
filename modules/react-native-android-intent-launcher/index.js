// import { NativeModules } from 'react-native'
// export { default as IntentConstant } from './IntentConstant'
// export default NativeModules.IntentLauncher
const { NativeModules }  = require('react-native')
exports = module.exports = NativeModules.IntentLauncher
exports.IntentConstant  = require('./IntentConstant')