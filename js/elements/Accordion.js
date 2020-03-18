/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
const React = require("react")
const { Animated, TouchableWithoutFeedback, FlatList, StyleSheet, View } = require("react-native")

const variable = require("/styles/themes/default")

const Text = require("./Text")
const Icon = require("./Icon")

class DefaultHeader extends React.Component {
	render() {
		const { props } = this
		const { expanded, expandedIcon, expandedIconStyle, headerStyle, icon, iconStyle, title } = props

		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable

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
}

class DefaultContent extends React.Component {
	render() {
		const { props } = this
		const { content, contentStyle } = props
		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable
		return (
			<Text style={[{ padding: variable.accordionContentPadding }, contentStyle || { backgroundColor: variables.contentStyle }]}>
				{content}
			</Text>
		)
	}
}

class AccordionSubItem extends React.Component {
	state = {
		fadeAnim: new Animated.Value(0.3),
	}
	componentDidMount() {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}
	render() {
		const { props } = this
		const { children, style } = props
		const { fadeAnim } = this.state
		return <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>
	}
}

class AccordionItem extends React.Component {
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

class Accordion extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: props.expanded,
		}
	}

	setSelected(index) {
		if (this.state.selected === index) {
			this.setState({ selected: undefined })
		} else {
			this.setState({ selected: index })
		}
	}

	render() {
		const { props } = this
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

		const variables = this.context.theme ? this.context.theme["@@shoutem.theme/themeStyle"].variables : variable
		return (
			<FlatList
				data={dataArray}
				extraData={this.state}
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
						expanded={this.state.selected === index}
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
						setSelected={i => this.setSelected(i)}
					/>
				)}
				{...props}
			/>
		)
	}
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
