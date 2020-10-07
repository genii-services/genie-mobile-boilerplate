/** 공통 라이브러리
 * @file fs utils
 * @module fs
 * @version 1.5.0
 * @author appcreatier@gmail.com
 * @copyright appcreatier 2017
 * @license
 */
const MODULE_NAME$ = "utils/fs"
console.debug(MODULE_NAME$)

const async = require("async")
const _ = require("lodash")
const FetchBlob = require("rn-fetch-blob").default
// const FileSystem = require("react-native-fs")	// 이 모듈은 처리 속도가 떨어짐
const Share = require("react-native-share")
// const { Share } = require("react-native")	// 이 모듈은 기능에 제한됨
// const RNShareFile = require("react-native-share-file")	// 이 모듈은 react-native 버전임

const { STRING, FUNCTION } = require("/constants")
const { parseJson } = require("/utils")
const path = require("./path")
const { appID, itsAndroid, isIOS, itsTablet } = require("./device")
const { whoami, trace } = require("./debug")
const { toMoment } = require("./moment")
const Url = require("./url")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const internalStorage = require("/interactors/internalStorage")
const rest = require("/interactors/rest")

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

const { android, fs } = FetchBlob

// fs.dirs.DocumentDir : fs.dirs.DownloadDir
// fs.dirs.CacheDir `${fs.dirs.CacheDir}/${appID}`
// const documentPath = isIOS ? FileSystem.DocumentDirectoryPath : FileSystem.ExternalDirectoryPath,
const documentPath = isIOS ? fs.dirs.DocumentDir : fs.dirs.SDCardApplicationDir

function prepairDirPath(...dirs) {
	return new Promise((resolve, reject) => {
		let dirPath = path.join.apply(undefined, dirs)
		fs.exists(dirPath).then((isExists) => {
			console.debug("fs.prepairDirPath", dirPath, isExists)
			if (isExists) resolve(dirPath)
			mkdir(dirPath, () => resolve(dirPath))
		})
	})
}

function prepairFilePath(...paths) {
	return new Promise((resolve, reject) => {
		let filePath = path.join.apply(undefined, paths) // path.join을 사용하면 path.normalize할 필요없음
		let dirPath = path.dirname(filePath)
		fs.exists(dirPath).then((isExists) => {
			console.debug("fs.prepairFilePath", dirPath, isExists)
			if (isExists) resolve(filePath)
			mkdir(dirPath, () => resolve(filePath))
		})
	})
}

/**
 * make main. Check README.md
 *
 * @exports mkdir
 * @function mkdir
 * @param {String} root - pathname
 * @param {Number} mode - directories mode, see Node documentation
 * @param {Function} callback - next callback
 */
function mkdir(root, mode, callback) {
	if (typeof mode === FUNCTION) {
		callback = mode
		mode = null
	}
	if (typeof root !== STRING) throw new Error("missing root")
	else if (typeof callback !== FUNCTION) throw new Error("missing callback")

	let chunks = root.split(path.sep) // split in chunks
	let chunk
	if (path.isAbsolute(root) === true) {
		// build from absolute path
		chunk = chunks.shift() // remove "/" or C:/
		if (!chunk) chunk = path.sep // add "/"
	} else {
		chunk = path.resolve() // build with relative path
	}

	console.debug("fs.mkdir")
	_mkdirRecursive(chunk, chunks, mode, callback)
}

/**
 * make directory recursively
 *
 * @function _mkdirRecursive
 * @param {String} root - absolute root where append chunks
 * @param {Array} chunks - directories chunks
 * @param {Number} mode - directories mode, see Node documentation
 * @param {Function} callback - next callback
 */
function _mkdirRecursive(root, chunks, mode, callback) {
	let chunk = chunks.shift()
	if (!chunk) return callback(undefined)
	root = path.join(root, chunk)
	fs.exists(root).then((exists) => {
		console.debug("_mkdirRecursive", root, exists)
		if (exists)
			// already done
			return _mkdirRecursive(root, chunks, mode, callback)

		fs.mkdir(root, mode)
			.then(() => {
				_mkdirRecursive(root, chunks, mode, callback) // let's magic
			})
			.catch((err) => {
				// if (err && err.code !== "EEXIST") return callback(err)
				callback(err)
			})
	})
}

/**
 * remove main. Check README.md
 *
 * @exports rmdir
 * @function rmdir
 * @param {String} root - pathname
 * @param {Function} callback - next callback
 */
function rmdir(root, callback) {
	if (typeof root !== STRING) throw new Error("missing root")
	else if (typeof callback !== FUNCTION) throw new Error("missing callback")

	var chunks = root.split(path.sep) // split in chunks
	var chunk = path.resolve(root) // build absolute path
	// remove "/" from head and tail
	if (chunks[0] === "") chunks.shift()

	if (chunks[chunks.length - 1] === "") chunks.pop()

	console.debug("fs.rmdir")
	return _rmdirRecursive(chunk, chunks, callback)
}

/**
 * remove directory recursively
 *
 * @function _rmdirRecursive
 * @param {String} root - absolute root where take chunks
 * @param {Array} chunks - directories chunks
 * @param {Function} callback - next callback
 */
function _rmdirRecursive(root, chunks, callback) {
	let chunk = chunks.pop()
	if (!chunk) return callback(null)

	let pathname = path.join(root, "..") // backtrack

	return fs.exists(root).then((exists) => {
		if (!exists) {
			// already done
			return _rmdirRecursive(root, chunks, callback)
		}
		fs.unlink(root)
			.then(() => {
				_rmdirRecursive(pathname, chunks, callback) // let's magic
			})
			.catch((err) => {
				callback(err)
			})
	})
}

const fileTypez = {
	gif: { type: "image" },
	jpg: { type: "image" },
	jpeg: { type: "image" },
	png: { type: "image" },
	tif: { type: isIOS ? "image" : "doc", mime: "image/tiff" }, // android에서는 tif를 열수 없다...
	bmp: { type: "image" },

	pdf: { type: "doc", mime: "application/pdf" },
	doc: { type: "doc", mime: "application/msword" },
	docx: { type: "doc", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
	ppt: { type: "doc", mime: "application/vnd.ms-powerpoint" },
	pptx: { type: "doc", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
	xls: { type: "doc", mime: "application/vnd.ms-excel" },
	xlsx: { type: "doc", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
	hwp: { type: "doc", mime: "application/vnd.hancom.hwp" },
	zip: { name: "ZIP archive", type: "zip", mime: "application/zip" },
	"7z": { name: "7-zip 아카이브", type: "7z", mime: "application/x-7z-compressed" },
}

const defaultMime = "application/octet-stream"

let downloadPathz
internalStorage.getItem("downloadPathz").then((value) => (downloadPathz = value || {}))

function download(url, optionz) {
	const METHOD_NAME$ = "fs.download"
	return new Promise((resolve, reject) => {
		if (downloadPathz[url]) return resolve(downloadPathz[url].localFilePath)

		setOptionz(url, optionz)
		let { fileName, localFilePath } = optionz

		console.debug(METHOD_NAME$, fileName, localFilePath)

		// if(!localFilePath) localFilePath =
		prepairFilePath(localFilePath).then((filePath) => {
			if (!filePath) {
				let msg = "GenerateFilePath error!"
				console.warn(msg)
				reject(msg)
				return
			}
			try {
				FetchBlob.config({
					//fileCache : true,									// 임시 파일 경로를 사용할 경우 응답 데이터를 파일로 저장하는 옵션. 켜면 약간의 성능 저하가 발생
					path: localFilePath,
					type: "application/octet",
				})
					.fetch("GET", url, rest.getAuthHeader())
					.then((res) => {
						//let path = res.path()								// 임시 파일 경로를 사용할 경우
						console.debug(this, "The file saved to ", localFilePath)
						downloadPathz[url] = { localFilePath }
						resolve(localFilePath)
					})
					.catch((e) => {
						console.warn(e.message, fileName, url, localFilePath)
						reject(e)
					})
			} catch (e) {
				console.error("download", e)
				reject(e)
			}
		})
	})
}

function share(url, optionz = {}) {
	const METHOD_NAME$ = "fs.share"
	return new Promise((resolve, reject) => {
		try {
			setOptionz(url, optionz)
			let { title, fileName, localFilePath, drmUsable } = optionz

			console.debug(METHOD_NAME$, localFilePath)

			let ext = _.toLower(fileName.substr(fileName.lastIndexOf(".") + 1))
			let fileType = fileTypez[ext]
			if (fileType && fileType.type === "image" && !optionz.forced) {
				router.push("viewImages", {
					title: fileName,
					source: {
						uri: url,
						headers: {
							"X-HanilMobile-Header": rest.getAuthHeader(),
						},
					},
				})
				return
			}

			if (localFilePath) {
				fs.exists(localFilePath).then((isExist) => {
					if (!isExist)
						return download(url, optionz)
							.then(_share())
							.catch((err) => reject(err))
				})
			} else {
				localFilePath = downloadPathz[url]
				if (!localFilePath) {
					return download(url, optionz)
						.then(_share())
						.catch((err) => reject(err))
				}
			}
			_share()

			function _share() {
				let type = optionz.type || ext

				if (isIOS || optionz.forced) {
					console.debug(this, localFilePath)
					// RNShareFile.share({ url: localFilePath, itsTablet })
					Share.open({ url: localFilePath, itsTablet })
						.then((res) => {
							console.debug(res)
							resolve(res)
						})
						.catch((err) => {
							err && console.warn(err)
							reject(err)
						})
				} else if (itsAndroid) {
					console.debug(METHOD_NAME$, "drmUsable=" + drmUsable)
					let msg = `다운로드 폴더에 ${fileName} 파일이 다운로드되어 있습니다.`

					if (fileType && fileType.mime === "image/tiff") {
						android
							.actionViewIntent(localFilePath, fileType.mime)
							.then((success) => {
								console.debug(this, "success:" + success)
								popup(msg)
								resolve(success)
							})
							.catch((err) => {
								console.debug(this, "err:" + err)
								popup(msg)
								reject(err)
							})
					} else if (drmUsable) {
						popup(`모바일 문서보안 앱을 실행합니다.\n잠시만 기다려 주십시요.`)
						router.launch("drm", undefined, { key_filename: localFilePath })
						let opt = {
							subject: fileName,
							url: localFilePath,
							type,
						}
						console.debug(this, opt)
						// RNShareFile.share(opt)
						// console.debug(this, NativeModules)
						resolve()
					} else {
						// 문서app 선택 창 활성화
						android
							.actionViewIntent(localFilePath, fileType ? fileType.mime : defaultMime)
							.then((success) => {
								console.debug(this, "success:" + success)
								popup(msg)
								resolve(success)
							})
							.catch((err) => {
								popup(actionViewIntentErrorz[err.code] || msg)
								console.debug(this, "err:" + err)
								reject(err)
							})
					}
				} else {
					let opt = {
						title: title || "파일 공유", // "첨부파일 공유"
						//message: fileName,					// "10012018143252.pdf"
						url: "file://" + localFilePath, // "file:///var/mobile/Containers/Data/Application/904C61B7-B38F-45C4-AA99-FAD06858B545/Documents/10012018143252.pdf"
						type: "*/*", // "application/pdf"
					}
					console.debug(this, opt)
					Share.share(opt)
						.then((result) => {
							console.debug(this, result)
							resolve(result)
						})
						.catch((err) => {
							trace(whoami(this, arguments), err)
							reject(err)
						})
				}
			}
		} catch (err) {
			console.error(err)
			reject(err)
		}
	})
}

const actionViewIntentErrorz = {
	EUNSPECIFIED: "다운로드 폴더에 다운로드되었습니다. 해당 파일을 볼 수 있는 앱을 설치하세요.", //"No Activity found to handle Intent"
}

function deleteSimilarFiles(fileName) {
	const METHOD_NAME$ = "fs.deleteSimilarFiles"
	console.debug(METHOD_NAME$, fileName)
	prepairDirPath()
		.then((localFilePath) => fs.ls(localFilePath))
		.then((files) => {
			let re = new RegExp(fileName)
			_.forEach(files, (file) => {
				if (re.test(file)) {
					fs.unlink(`${localFilePath}${file}`)
				}
			})
		})
		.catch((e) => {
			if (!localFilePath) {
				return console.warn("GenerateFilePath error!")
			}
		})
}

function setOptionz(url, optionz = {}) {
	let { fileName, localDirPath, localFilePath } = optionz
	if (fileName && localDirPath && localFilePath) return

	const { pathname } = Url.parse(url)
	if (!fileName) optionz.fileName = path.basename(pathname)
	if (!localDirPath) optionz.localDirPath = path.join(documentPath, path.dirname(pathname)) // path.join을 사용하면 path.normalize할 필요없음
	if (!localFilePath) optionz.localFilePath = path.join(optionz.localDirPath, optionz.fileName)
}

function stat(path) {
	return new Promise((resolve, reject) => {
		fs.stat(path)
			.then((stats) => resolve(stats))
			.catch((err) => resolve())
	})
}

function readData(path, encoding) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, encoding)
			.then((data) => {
				try {
					let json = parseJson(data)
					resolve(json)
				} catch (err) {
					console.debug(err)
					reject(err)
				}
			})
			.catch((err) => reject(err))
	})
}

function loadData(url, optionz = {}) {
	return new Promise((resolve, reject) => {
		setOptionz(url, optionz)
		let { fileName, remoteParentPath = path.dirname(url) } = optionz
		fetch(remoteParentPath)
			.then((response) => {
				if (response.status != 200) throw "exit"
				return response.text()
			})
			.then((text) => {
				const re = /<br>(\d.*?)\s{2,}(\d{1,}).*?"(.*?)">(.*?)</gm
				let results, fileInfo
				while ((results = re.exec(text))) {
					if (results[4] === fileName) {
						let lastModified = toMoment(results[1]).valueOf()
						fileInfo = {
							url: results[3],
							name: results[4],
							lastModified,
							// updatedAt: toMoment(results[1]),
							size: parseInt(results[2]),
						}
						break
					}
				}
				console.debug(this, fileInfo)
				optionz.fileInfo = fileInfo

				return stat(optionz.localFilePath)
			})
			.then((stats) => {
				let { lastModified, size } = optionz.fileInfo
				if (stats && stats.lastModified >= lastModified && stats.size === size)
					readData(stats.path)
						.then((data) => resolve(data))
						.catch((err) => reject(err))
				else
					download(url, optionz)
						.then((localFilePath) => {
							readData(localFilePath)
								.then((data) => resolve(data))
								.catch((err) => reject(err))
						})
						.catch((err) => reject(err))
			})
			.catch((err) => {
				console.debug(this, err)
				reject(err)
			})
	})
}

module.exports = {
	MODULE_NAME$,
	documentPath,

	prepairDirPath,
	prepairFilePath,

	writeFile: fs.writeFile,
	readFile: fs.readFile,

	mkdir,
	rmdir,

	stat,
	download,
	share,
	loadData,
	readData,
	deleteSimilarFiles,
}

//*. WevView용
// prepairDirPath("/cache/WebView/Crashpad")
