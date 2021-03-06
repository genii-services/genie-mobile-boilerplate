const MODULE_NAME$ = "ItemElement"
console.debug(MODULE_NAME$)

/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
const { Children, createElement } = require("react")
const { TouchableOpacity, Animated, Platform, View } = require("react-native")
const { isArray, remove } = require("lodash")

const { ABSOLUTE, COLUMN, ROW } = require("/constants/style")
const { deviceWidth, itsIOS } = require("/utils/device")
const { computeProps } = require("/utils/props")
const { forwardRef, useEffect, useState, useThis } = require("/hooks")
const { useStyle } = require("/coordinators")

const Icon = require("./Icon")
const Input = require("./Input")
const Label = require("./Label")
const Thumbnail = require("./Thumbnail")

const ItemElement = (props) => {
	const _this = useThis()
	const [_isFocussed, set_isFocussed] = useState(true)
	const [_text, set_text] = useState("")
	const [_topAnim] = useState(() => new Animated.Value(18))
	const [_opacAnim] = useState(() => new Animated.Value(1))

	const { rounded } = props
	const { stylez } = useStyle(MODULE_NAME$, { rounded }, (defaultStyle) => ({
		root: {
			borderWidth: rounded && defaultStyle.borderWidth * 2,
			borderRadius: rounded && defaultStyle.inputGroupRoundedBorderRadius,
		},
	}))

	useEffect(() => {
		if (props.floatingLabel && _this.inputProps) {
			_this.inputProps.value && floatUp(-16)
			_this.inputProps.getRef && _this.inputProps.getRef(_this._inputRef)
		}
	}, [])

	const getPlacholderValue = (inputProps) =>
		isArray(props.children) && props.children[0].props.children ? null : inputProps.placeholder

	const floatBack = (e) => {
		Animated.timing(_topAnim, { toValue: e || 18, duration: 150 }).start()
		Animated.timing(_opacAnim, { toValue: 1, duration: 150 }).start()
	}

	const floatUp = (e) => {
		Animated.timing(_topAnim, { toValue: e || -22, duration: 150 }).start()
		Animated.timing(_opacAnim, { toValue: 0.7, duration: 150 }).start()
	}

	// Temporary fix to avoid the crash.
	// To be refactored to getDerivedStateFromProps.

	const childrenArray = Children.toArray(props.children)

	remove(childrenArray, (item) => {
		if (item.type.displayName !== "StyledInput") return null
		_this.inputProps = item.props
		return item
	})
	if (props.floatingLabel) {
		if (_this.inputProps && _this.inputProps.value) {
			set_isFocused(true)
			floatUp(-16)
		}
		if (_this.inputProps && _this.inputProps.getRef) _this.inputProps.getRef(_this._inputRef)
	}

	const renderChildren = () => {
		const newChildren = []
		const childrenArray = Children.toArray(props.children)

		let label = []
		let labelProps = {}
		label = remove(childrenArray, (item) => {
			if (item.type === Label) {
				labelProps = item.props
				return item
			}
			return null
		})

		let inputProps = {}
		remove(childrenArray, (item) => {
			if (item.type === Input) {
				inputProps = item.props
				_this.inputProps = item.props
				return item
			}
			return null
		})

		let icon = []
		let iconProps = {}
		icon = remove(childrenArray, (item) => {
			if (item.type === Icon) {
				iconProps = item.props
				return item
			}
			return null
		})

		let image = []
		image = remove(childrenArray, (item) => (item.type === Thumbnail ? item : null))

		if (props.floatingLabel && icon.length) {
			let flag = true
			let itsIcon = false

			const animatedViewStyle = {
				position: ABSOLUTE,
				left: props.last && itsIcon ? 40 : props.last ? 15 : itsIcon ? 26 : 0,
				right: 0,
				top: _topAnim,
				opacity: _opacAnim,
				paddingTop: itsIOS && undefined,
				paddingBottom: !itsIOS && 12,
			}

			for (let i = 0; i < props.children.length; i++) {
				if (props.children[i].props.name && props.children[i].type.displayName !== "StyledInput") {
					itsIcon = true
					newChildren.push(<Icon key={[i]} {...props.children[i].props} />)
				}

				if ((props.children[i].props.children || props.children[i].props.placeholder) && flag) {
					flag = false

					newChildren.push(
						<Animated.View key="float" style={animatedViewStyle}>
							<Label {...labelProps}>{renderLabel(label, labelProps)}</Label>
						</Animated.View>
					)

					newChildren.push(
						<Input
							ref={(c) => (_this._inputRef = c)}
							key="l2"
							{...inputProps}
							placeholder={getPlacholderValue(inputProps)}
							onFocus={() => {
								set_isFocused(true)
								inputProps.onFocus && inputProps.onFocus()
							}}
							onBlur={(e) => {
								set_isFocused(!!inputProps.value)
								inputProps.onBlur && inputProps.onBlur(e)
							}}
							onChangeText={(text) => {
								set_text(text)
								inputProps.onChangeText && inputProps.onChangeText(text)
							}}
						/>
					)
				}
			}
		} else if (props.floatingLabel && image.length) {
			let isImage = false
			const animatedViewStyle = {
				position: ABSOLUTE,
				left: props.last && isImage ? 57 : props.last ? 15 : isImage ? 42 : 0,
				right: 0,
				top: _topAnim,
				opacity: _opacAnim,
				paddingTop: itsIOS && undefined,
				paddingBottom: itsIOS ? undefined : 12,
			}
			for (let i = 0; i < props.children.length; i++) {
				if (props.children[i].type.displayName === "StyledThumbnail") {
					isImage = true
					newChildren.push(
						<Thumbnail
							small
							key={[i]}
							{...props.children[i].props}
							style={{
								right: 10,
								left: i === props.children.length - 1 ? undefined : 0,
							}}
						/>
					)
				}

				if (props.children[i].props.children) {
					newChildren.push(
						<Animated.View key="float" style={animatedViewStyle}>
							<Label {...labelProps}>{renderLabel(label, labelProps)}</Label>
						</Animated.View>
					)
					const handleOnFocus = () => {
						set_isFocused(true)
						inputProps.onFocus && inputProps.onFocus()
					}
					const handleOnBlur = (e) => {
						inputProps.value ? set_isFocused(true) : !_text.length && set_isFocused(false)
						inputProps.onBlur && inputProps.onBlur(e)
					}
					const handleOnChangeText = (text) => {
						set_text(text)
						inputProps.onChangeText && inputProps.onChangeText(text)
					}
					const inputStyle = {
						left: props.last && isImage ? 10 : props.last ? 4 : isImage ? 10 : 0,
						marginRight: 12,
					}
					newChildren.push(
						<Input
							ref={(c) => (_this._inputRef = c)}
							key="l2"
							{...inputProps}
							placeholder={getPlacholderValue(inputProps)}
							onFocus={handleOnFocus}
							onBlur={handleOnBlur}
							onChangeText={handleOnChangeText}
							style={inputStyle}
						/>
					)
				}
			}
		} else if (props.floatingLabel) {
			const animatedViewStyle = {
				position: ABSOLUTE,
				left: props.last ? 15 : 0,
				right: 0,
				top: _topAnim,
				opacity: _opacAnim,
				paddingTop: itsIOS && undefined,
				paddingBottom: itsIOS ? undefined : 12,
			}
			newChildren.push(
				<Animated.View key="float" style={animatedViewStyle}>
					<Label {...labelProps}>{renderLabel(label, labelProps)}</Label>
				</Animated.View>
			)

			const handleOnFocus = () => {
				set_isFocused(true)
				inputProps.onFocus && inputProps.onFocus()
			}
			const handleOnBlur = (e) => {
				inputProps.value ? set_isFocused(true) : !_text.length && set_isFocused(false)
				inputProps.onBlur && inputProps.onBlur(e)
			}
			const handleOnChangeText = (text) => {
				set_text(text)
				inputProps.onChangeText && inputProps.onChangeText(text)
			}

			newChildren.push(
				<Input
					ref={(c) => (_this._inputRef = c)}
					value={_text}
					key="l2"
					{...inputProps}
					placeholder={getPlacholderValue(inputProps)}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					onChangeText={handleOnChangeText}
				/>
			)
		} else if (props.stackedLabel && icon.length) {
			const viewStyle = {
				flexDirection: ROW,
				flex: 1,
				width: deviceWidth - 15,
			}
			newChildren.push(
				<View key="s" style={viewStyle}>
					<Icon key="s1" {...iconProps} />
					<View style={{ flexDirection: COLUMN }}>
						<Label key="s2" {...labelProps} />
						<Input key="s3" {...inputProps} style={{ width: deviceWidth - 40 }} />
					</View>
				</View>
			)
		} else {
			return props.children
		}
		return newChildren
	}

	const renderLabel = (label, labelProps) => {
		const newLabel = []
		const labelStyle = StyleSheet.flatten([{ fontSize: 15, lineHeight: 30 }, labelProps.style])
		if (props.floatingLabel) {
			if (_isFocused) {
				newLabel.push(createElement(Label, { ...labelProps, key: "newFLabel", float: true, style: labelStyle }))
				floatUp(-16)
			} else {
				newLabel.push(label)
				floatBack(labelProps.floatBack)
			}
		} else {
			newLabel.push(createElement(Label, { ...labelProps, key: "newLabel" }))
		}
		return newLabel
	}

	return (
		<TouchableOpacity {...props} style={stylez.root} activeOpacity={1}>
			{renderChildren()}
		</TouchableOpacity>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType } = require("/utils/propTypes")
	ItemElement.propTypes = {
		...TouchableOpacity.propTypes,
		style: oneOfType([object, number, array]),
		inlineLabel: bool,
		floatingLabel: bool,
		stackedLabel: bool,
		fixedLabel: bool,
		success: bool,
		error: bool,
	}
}

ItemElement.displayName = "Item"

// const { connectStyle } = require("/utils/style")
module.exports = ItemElement //connectStyle(ItemElement, "ItemElement")
