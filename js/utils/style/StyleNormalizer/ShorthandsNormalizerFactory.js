const _ = require("lodash")

const createShorthand = (name, type) => ({ name, type: _.isUndefined(type) ? name : type })

const SIDES = createShorthand("Sides", "")
const CORNERS = createShorthand("Corners", "")
const HORIZONTAL = createShorthand("Horizontal")
const VERTICAL = createShorthand("Vertical")

const LEFT = "Left"
const RIGHT = "Right"
const TOP = "Top"
const BOTTOM = "Bottom"
const TOP_RIGHT = "TopRight"
const BOTTOM_RIGHT = "BottomRight"
const TOP_LEFT = "TopLeft"
const BOTTOM_LEFT = "BottomLeft"

// Shorthands normalizers creators.
// This creators provide standard normalizer used in most cases.
// When style property has any of this shorthands, use this creators
// to create shorthand normalizer.

class ShorthandsNormalizerFactory {
	constructor() {
		this.createNormalizersMap = {
			[SIDES.name]: this.createAllSidesNormalizer,
			[CORNERS.name]: this.createAllCornersNormalizer,
			[HORIZONTAL.name]: this.createHorizontalSidesNormalizer,
			[VERTICAL.name]: this.createVerticalSidesNormalizer,
		}
	}

	createAllSidesNormalizer(prop, shorthand, suffix = "") {
		return val => ({
			[prop + LEFT + suffix]: val,
			[prop + RIGHT + suffix]: val,
			[prop + TOP + suffix]: val,
			[prop + BOTTOM + suffix]: val,
		})
	}

	createAllCornersNormalizer(prop, shorthand, suffix = "") {
		return val => ({
			[prop + BOTTOM_LEFT + suffix]: val,
			[prop + BOTTOM_RIGHT + suffix]: val,
			[prop + TOP_LEFT + suffix]: val,
			[prop + TOP_RIGHT + suffix]: val,
		})
	}

	createHorizontalSidesNormalizer(prop) {
		return val => ({
			[prop + LEFT]: val,
			[prop + RIGHT]: val,
		})
	}

	createVerticalSidesNormalizer(prop) {
		return val => ({
			[prop + TOP]: val,
			[prop + BOTTOM]: val,
		})
	}

	getNormalizerCreator(shorthand) {
		return this.createNormalizersMap[shorthand.name]
	}

	createNormalizer(prop, shorthand, suffix) {
		const normalizerCreator = this.getNormalizerCreator(shorthand)
		return normalizerCreator(prop, shorthand, suffix)
	}
}

exports = module.exports = new ShorthandsNormalizerFactory()
exports.SIDES = SIDES
exports.CORNERS = CORNERS
exports.HORIZONTAL = HORIZONTAL
exports.VERTICAL = VERTICAL

exports.LEFT = LEFT
exports.RIGHT = RIGHT
exports.TOP = TOP
exports.BOTTOM = BOTTOM
exports.TOP_RIGHT = TOP_RIGHT
exports.BOTTOM_RIGHT = BOTTOM_RIGHT
exports.TOP_LEFT = TOP_LEFT
exports.BOTTOM_LEFT = BOTTOM_LEFT
