/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
const React = require("react")
const { Animated, TouchableWithoutFeedback, FlatList, StyleSheet, View } = require("react-native")

const { useState, useStore } = require("/hooks")
const variable = require("/styles/themes/default")

const Text = require("./Text")
const Icon = require("./Icon")

const DefaultHeader = props => {
	const [theme] = useStore("theme")
	const { expanded, expandedIcon, expandedIconStyle, headerStyle, icon, iconStyle, title } = props
	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return (
		<View
			style={[
				// eslint-disable-next-line no-use-before-define
				styles.defaultHeader,
				headerStyle || { backgroundColor: variables.headerStyle },
			]}>
			<Text> {title}</Text>
			<Icon
				style={[
					{ fontSize: variables.accordionIconFontSize },
					expanded
						? expandedIcon && expandedIconStyle
							? expandedIconStyle
							: { color: variables.expandedIconStyle }
						: icon && iconStyle
						? iconStyle
						: { color: variables.iconStyle },
				]}
				name={expanded ? expandedIcon || "ios-arrow-up" : icon || "ios-arrow-down"}
			/>
		</View>
	)
}

const DefaultContent = props => {
	const [theme] = useStore("theme")
	const { content, contentStyle } = props
	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return (
		<Text style={[{ padding: variable.accordionContentPadding }, contentStyle || { backgroundColor: variables.contentStyle }]}>
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
	render() {
		const { props } = this
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
				{expanded ? (
					<AccordionSubItem>
						{renderContent ? renderContent(item) : <DefaultContent content={item.content} contentStyle={contentStyle} />}
					</AccordionSubItem>
				) : null}
			</View>
		)
	}
}

const Accordion = props => {
	const [theme] = useStore("theme")
	const [_selected, set_selected] = useState(props.expanded)

	const setSelected = index => set_selected(_selected != index ? index : undefined)

	const {
		contentStyle,
		dataArray,
		expandedIcon,
		expandedIconStyle,
		headerStyle,
		icon,
		iconStyle,
		onAccordionClose,
		onAccordionOpen,
		renderContent,
		renderHeader,
		style,
	} = props

	const variables = theme ? theme["@@shoutem.theme/themeStyle"].variables : variable
	return (
		<FlatList
			data={dataArray}
			extraData={_selected}
			style={[
				{
					borderColor: variables.accordionBorderColor,
					borderWidth: variables.borderWidth,
				},
				style,
			]}
			keyExtractor={(item, index) => String(index)}
			renderItem={({ item, index }) => (
				<AccordionItem
					key={String(index)}
					contentStyle={contentStyle}
					expanded={_selected === index}
					expandedIcon={expandedIcon}
					expandedIconStyle={expandedIconStyle}
					headerStyle={headerStyle}
					icon={icon}
					iconStyle={iconStyle}
					index={index}
					item={item}
					renderContent={renderContent}
					renderHeader={renderHeader}
					onAccordionOpen={onAccordionOpen}
					onAccordionClose={onAccordionClose}
					setSelected={i => setSelected(i)}
				/>
			)}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	defaultHeader: {
		flexDirection: "row",
		padding: variable.accordionContentPadding,
		justifyContent: "space-between",
		alignItems: "center",
	},
})

module.exports = Accordion
