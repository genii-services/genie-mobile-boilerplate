const { StyleSheet } = require("react-native")
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

class _ShorthandsNormalizerFactory {
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

const ShorthandsNormalizerFactory = new _ShorthandsNormalizerFactory()

/**
 * Style Normalizer uses ShorthandsNormalizerCreators to creates different normalizers
 * specific to properties.
 */
class StyleNormalizer {
	constructor() {
		this.normalizers = {}
		this.createNormalizers("margin", [HORIZONTAL, VERTICAL, SIDES])
		this.createNormalizers("padding", [HORIZONTAL, VERTICAL, SIDES])
		this.createNormalizers("border", [SIDES], "Width")
	}

	createNormalizers(prop, shorthands, suffix = "") {
		shorthands.forEach(shorthand => {
			const propName = prop + shorthand.type + suffix
			if (this.normalizerExists(propName)) throw Error(`Normalizer for '${propName}' shorthand already exists`)
			this.normalizers[propName] = ShorthandsNormalizerFactory.createNormalizer(prop, shorthand, suffix)
		})
	}

	normalizerExists(normalizerName) {
		return !!this.normalizers[normalizerName]
	}

	canNormalize(prop) {
		return this.normalizerExists(prop)
	}

	normalize(prop, val) {
		return this.normalizers[prop](val)
	}
}

const styleNormalizer = new StyleNormalizer()

/**
 * Normalize style properties shorthands.
 *
 * @param style
 * @returns {*}
 */
module.exports = function normalizeStyle(style) {
	return _.reduce(
		style,
		(normalizedStyle, val, prop) => {
			/* eslint-disable no-param-reassign */
			if (_.isPlainObject(val)) {
				normalizedStyle[prop] = normalizeStyle(val)
			} else if (styleNormalizer.canNormalize(prop)) {
				normalizedStyle = {
					...normalizedStyle,
					...styleNormalizer.normalize(prop, val),
				}
			} else {
				normalizedStyle[prop] = val
			}
			/* eslint-enable no-param-reassign */
			return normalizedStyle
		},
		{}
	)
}
