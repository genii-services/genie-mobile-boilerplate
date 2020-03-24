/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
const React = require("react")
const { Animated, TouchableWithoutFeedback, FlatList, StyleSheet, View } = require("react-native")

const { CENTER, ROW, SPACE_BETWEEN } = require("/constants/style")
const { useState, useStore } = require("/hooks")
const defaultThemeStyle = require("/styles/themes/default")

const Text = require("./Text")
const Icon = require("./Icon")

const DefaultHeader = props => {
	const [theme] = useStore("theme")
	const { expanded, expandedIcon, expandedIconStyle, headerStyle, icon, iconStyle, title } = props
	const style = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	return (
		<View
			style={[
				// eslint-disable-next-line no-use-before-define
				styles.defaultHeader,
				headerStyle || { backgroundColor: style.headerStyle },
			]}>
			<Text> {title}</Text>
			<Icon
				style={[
					{ fontSize: style.accordionIconFontSize },
					expanded
						? expandedIcon && expandedIconStyle
							? expandedIconStyle
							: { color: style.expandedIconStyle }
						: icon && iconStyle
						? iconStyle
						: { color: style.iconStyle },
				]}
				name={expanded ? expandedIcon || "ios-arrow-up" : icon || "ios-arrow-down"}
			/>
		</View>
	)
}

const DefaultContent = props => {
	const [theme] = useStore("theme")
	const { content, contentStyle } = props
	const style = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	return (
		<Text style={[{ padding: defaultThemeStyle.accordionContentPadding }, contentStyle || { backgroundColor: style.contentStyle }]}>
			{content}
		</Text>
	)
}

const AccordionSubItem = props => {
	const [_fadeAnim, set_fadeAnim] = useState(() => new Animated.Value(0.3))
	useEffect(() => {
		Animated.timing(_fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start()
	}, [])

	const { children, style } = props
	return <Animated.View style={{ ...style, opacity: _fadeAnim }}>{children}</Animated.View>
}

const AccordionItem = props => {
	const {
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
	} = props

	return (
		<View>
			<TouchableWithoutFeedback
				onPress={() => {
					onAccordionOpen && !expanded && onAccordionOpen(item, index)
					onAccordionClose && expanded && onAccordionClose(item, index)
					setSelected(index)
				}}>
				<View>
					{renderHeader ? (
						renderHeader(item, expanded)
					) : (
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
					{renderContent ? renderContent(item) : <DefaultContent content={item.content} contentStyle={contentStyle} />}
				</AccordionSubItem>
			)}
		</View>
	)
}

const Accordion = ({
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
	const [theme] = useStore("theme")
	const [_selected, set_selected] = useState(props.expanded)

	const setSelected = index => set_selected(_selected != index ? index : undefined)

	const defaultStyle = theme ? theme["@@shoutem.theme/themeStyle"].defaultStyle : defaultThemeStyle
	return (
		<FlatList
			data={dataArray}
			extraData={_selected}
			style={[
				{
					borderColor: defaultStyle.accordionBorderColor,
					borderWidth: defaultStyle.borderWidth,
				},
				style,
			]}
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

const styles = StyleSheet.create({
	defaultHeader: {
		flexDirection: ROW,
		padding: defaultThemeStyle.accordionContentPadding,
		justifyContent: SPACE_BETWEEN,
		alignItems: CENTER,
	},
})

module.exports = Accordion
