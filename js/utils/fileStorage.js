/**
 * @file fs utils
 * @module fs
 * @version 1.5.0
 * @author appcreatier@gmail.com
 * @copyright appcreatier 2017
 *
 * 200311 exports.documentPath 추가, debug 관련 정리
 */
const NAME = "fileStorage"
console.debug("utils/" + NAME)

const async = require("async")
// const FileSystem = require("react-native-fs")	// 이 모듈은 처리 속도가 떨어짐
const fs = require("rn-fetch-blob/fs").default

const { itsIOS } = require("./device")
const path = require("./path")

/*
FileSystem.exists(dataPath).then(bool => {
	if (!bool) {
		FileSystem.mkdir(dataPath)
			.then(() => {
				console.debug(this, "Created Directory", dataPath)
			})
			.catch(err => {
				console.debug(this, err.message)
				dataPath = documentPath
			})
	}
})
*/

const documentPath = itsIOS ? fs.dirs.DocumentDir : fs.dirs.SDCardApplicationDir

function clear() {
	return new Promise((resolve, reject) => {
		console.debug([NAME, "clear"])
		try {
			fs.ls(documentPath + "data/*.json").then(files => {
				console.debug(this, files)
				async.each(
					files,
					(file, next) =>
						fs
							.unlink(path.join(documentPath, "data", file))
							.then(() => next())
							.catch(err => next(err)),
					err => (err ? reject(err) : resolve(null))
				)
			})
		} catch (err) {
			reject(err)
		}
	})
}

function getItem(key) {
	return new Promise((resolve, reject) => {
		console.debug([NAME, "getItem"])
		try {
			const filePath = path.join(documentPath, "data", key + ".json")
			fs.readFile(filePath, "utf8")
				.then(data => resolve(data))
				.catch(err => {
					if (err.code == "ENOENT") resolve("{}")
					else reject(err)
				})
		} catch (err) {
			reject(err)
		}
	})
}

function removeItem(key) {
	return new Promise((resolve, reject) => {
		console.debug([NAME, "removeItem"])
		try {
			let filePath = path.join(documentPath, "data", key + ".json")
			fs.unlink(filePath)
				.then(() => resolve())
				.catch(err => reject(err))
		} catch (err) {
			reject(err)
		}
	})
}

function setItem(key, value) {
	return new Promise((resolve, reject) => {
		console.debug([NAME, "setItem"])
		try {
			let filePath = path.join(documentPath, "data", key + ".json")
			fs.writeFile(filePath, value, "utf8")
				.then(() => resolve())
				.catch(err => reject(err))
		} catch (err) {
			reject(err)
		}
	})
}

module.exports = {
	NAME,
	documentPath,
	clear,
	getItem,
	removeItem,
	setItem,
}
