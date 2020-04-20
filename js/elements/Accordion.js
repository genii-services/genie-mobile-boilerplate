/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
const React = require("react")
const { Animated, TouchableWithoutFeedback, FlatList, View } = require("react-native")

const { BLACK, CENTER, ROW, SPACE_BETWEEN } = require("/constants/style")
const { useState, useStore } = require("/hooks")
const { useStyle } = require("/coordinators")

const Text = require("./Text")
const Icon = require("./Icon")

const defaultThemeStyle = {
	accordionBorderColor: "#d3d3d3",
	accordionContentPadding: 10,
	accordionIconFontSize: 18,
	contentStyle: "#f5f4f5",
	expandedIconStyle: BLACK,
	headerStyle: "#edebed",
	iconStyle: BLACK,
}

const DefaultHeader = ({ expanded, expandedIcon, expandedIconStyle, headerStyle, icon, iconStyle, title }) => {
	const { stylez } = useStyle(
		DefaultHeader,
		{ expanded, expandedIcon, expandedIconStyle, headerStyle, icon, iconStyle },
		(defaultStyle) => ({
			view: [
				// eslint-disable-next-line no-use-before-define
				defaultHeaderStyle,
				headerStyle || { backgroundColor: defaultStyle.headerStyle },
			],
			icon: [
				{ fontSize: defaultStyle.accordionIconFontSize },
				expanded
					? expandedIcon && expandedIconStyle
						? expandedIconStyle
						: { color: defaultStyle.expandedIconStyle }
					: icon && iconStyle
					? iconStyle
					: { color: defaultStyle.iconStyle },
			],
		})
	)
	return (
		<View style={stylez.view}>
			<Text> {title}</Text>
			<Icon style={stylez.icon} name={expanded ? expandedIcon || "ios-arrow-up" : icon || "ios-arrow-down"} />
		</View>
	)
}

const DefaultContent = ({ content, contentStyle }) => {
	const { stylez } = useStyle(DefaultContent, { contentStyle }, (defaultStyle) => ({
		text: [{ padding: defaultThemeStyle.accordionContentPadding }, contentStyle || { backgroundColor: defaultStyle.contentStyle }],
	}))
	return <Text style={stylez.text}>{content}</Text>
}

const AccordionSubItem = ({ children, style }) => {
	const [_fadeAnim, set_fadeAnim] = useState(() => new Animated.Value(0.3))
	useEffect(() => {
		Animated.timing(_fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start()
	}, [])
	return <Animated.View style={{ ...style, opacity: _fadeAnim }}>{children}</Animated.View>
}

const AccordionItem = ({
	contentStyle,
	expanded,
	expandedIcon,
	expandedIconStyle,
	headerStyle,
	icon,
	iconStyle,
	index,
	item,
	onAccordionClose,
	onAccordionOpen,
	renderContent,
	renderHeader,
	setSelected,
}) => {
	const handleOnPress = () => {
		onAccordionOpen && !expanded && onAccordionOpen(item, index)
		onAccordionClose && expanded && onAccordionClose(item, index)
		setSelected(index)
	}
	return (
		<View>
			<TouchableWithoutFeedback onPress={handleOnPress}>
				<View>
					{renderHeader(item, expanded) || (
						<DefaultHeader
							expanded={expanded}
							expandedIcon={expandedIcon}
							expandedIconStyle={expandedIconStyle}
							headerStyle={headerStyle}
							icon={icon}
							iconStyle={iconStyle}
							title={item.title}
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
			{expanded && (
				<AccordionSubItem>
					{renderContent(item) || <DefaultContent content={item.content} contentStyle={contentStyle} />}
				</AccordionSubItem>
			)}
		</View>
	)
}

const AccordionElement = ({
	contentStyle,
	expandedIcon,
	expandedIconStyle,
	headerStyle,
	icon,
	iconStyle,
	renderContent,
	renderHeader,
	onAccordionClose,
	onAccordionOpen,

	dataArray,
	style,
	...props
}) => {
	const [_selected, set_selected] = useState(props.expanded)

	const { stylez } = useStyle((defaultStyle) => {
		list: [
			{
				borderColor: defaultStyle.accordionBorderColor,
				borderWidth: defaultStyle.borderWidth,
			},
			style,
		]
	})

	const setSelected = (index) => set_selected(_selected != index && index)

	return (
		<FlatList
			data={dataArray}
			extraData={_selected}
			style={stylez.list}
			keyExtractor={(item, index) => String(index)}
			renderItem={({ item, index }) => (
				<AccordionItem
					contentStyle={contentStyle}
					expandedIcon={expandedIcon}
					expandedIconStyle={expandedIconStyle}
					headerStyle={headerStyle}
					icon={icon}
					iconStyle={iconStyle}
					renderContent={renderContent}
					renderHeader={renderHeader}
					onAccordionOpen={onAccordionOpen}
					onAccordionClose={onAccordionClose}
					key={String(index)}
					expanded={_selected === index}
					index={index}
					item={item}
					setSelected={setSelected}
				/>
			)}
			{...props}
		/>
	)
}

const defaultHeaderStyle = {
	flexDirection: ROW,
	padding: defaultThemeStyle.accordionContentPadding,
	justifyContent: SPACE_BETWEEN,
	alignItems: CENTER,
}

module.exports = AccordionElement
