/**
 * react의 localStorage 처럼 사용하기 위한 유틸리티
 * 200519 global.localStorage가 없는 경우 AsyncStorage를 global.localStorage에 설정
 */
const localStorage = global.localStorage
if (!localStorage) global.localStorage = localStorage = require("@react-native-community/async-storage").default

module.exports = localStorage
