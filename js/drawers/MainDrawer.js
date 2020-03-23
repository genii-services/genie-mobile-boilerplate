console.debug(MainDrawer)

const React = require("react")
const { useState } = React
const _ = require("lodash")
const { Platform, View } = require("react-native")
const IconFA = require("react-native-vector-icons/FontAwesome")
const parseColor = require("color-parse")

const { displayName } = require("/../app.json")
const { WHITE, PC100 } = require("/constants/style")
const { appVersion, buildNumber } = require("/utils/device")
const { exitApp } = require("/utils/app")
const { rgbaToHex } = require("/utils/color")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { Button, Container, Icon, Left, List, ListItem, LocalImage, Right, Text } = require("/elements")
const { ProfileBar } = require("/viewparts")
const { useAuth, useStyle } = require("/coordinators")
const menuItems = require("/data/menuItems")
/**
 * 메인 드로워
 */
const MainDrawer = props => {
	/* HOOKS */
	const router = useRouter()

	const [_spreadz, set_spreadz] = useState({})
	const [_userID, set_userID] = useState()

	const { getStyle } = useStyle()
	const style = getStyle(MainDrawer)

	const { authToken, userInfo } = useAuth()

	/* RENDERERS */

	const renderForGuest = () => {
		return (
			<View style={style.guest_container}>
				<View style={style.guest_container_view}>
					<Text style={style.guest_container_text1}>{displayName}</Text>
					<Text style={style.guest_container_text2}>
						Version {appVersion}.{buildNumber}
					</Text>
				</View>
				<View style={style.guest_container_view2}>
					<Text style={style.guest_container_text3}>종료하시겠습니까?</Text>
					<Button small onPress={exitApp}>
						<Text>종료</Text>
					</Button>
				</View>
			</View>
		)
	}

	const renderList = (items, subStyle) => {
		// console.debug("MainDrawer.renderList", items)
		let changedStyle
		if (!subStyle) {
			changedStyle = props.subStyle
		} else {
			let { subStyleDeltaz } = props
			changedStyle = _.mapValues(subStyle, (v, k) => {
				switch (k) {
					case "backgroundColor": {
						const c = parseColor(v)
						if (c.space != "rgb") return v
						const deltas = subStyleDeltaz[k]
						const r = rgbaToHex(
							c.values[0] + deltas[0],
							c.values[1] + deltas[1],
							c.values[2] + deltas[2],
							c.alpha + deltas[3]
						)
						return r
					}
					default: {
						return v + subStyleDeltaz[k]
					}
				}
			})
		}
		const emptiedStyle = !subStyle && items && items.length && { height: PC100 }
		return (
			<List
				style={[style.list, changedStyle, emptiedStyle]} // 메뉴가 안나올 경우 Pull to refresh를 위해 공간 확보
				data={items}
				extraData={state.spreadz}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => renderItem(item, changedStyle)}
				// onRefresh={menu.reload}
			/>
		)
	}

	const renderItem = (item, changedStyle) => {
		let leftItem = (
			<Left style={{ marginVertical: 8 }}>
				{item.iconName ? (
					<IconFA name={item.iconName} style={{ color: WHITE, fontSize: 24 }} />
				) : (
					<LocalImage style={style.listItemImage} name={item.imageName} square />
				)}
				<Text style={style.listItemText}> {item.title}</Text>
			</Left>
		)
		// console.debug(`_spreadz[${item.key}] is`, !!_spreadz[item.key])
		if (item.children) {
			return (
				<View>
					<ListItem style={style.listItem} button onPress={() => goto(item)}>
						{leftItem}
						<Right>
							<Button transparent onPress={() => toggleSpread(item.key)}>
								<Icon
									style={{ fontSize: 18, color: "#c0c0c0" }}
									name={!!_spreadz[item.key] ? "ios-arrow-up" : "ios-arrow-down"}
								/>
							</Button>
						</Right>
					</ListItem>
					{!!_spreadz[item.key] && renderList(item.children, changedStyle)}
				</View>
			)
		}
		if (0 <= _.indexOf(item.exclusions, Platform.OS)) return
		return (
			<ListItem style={style.listItem} button onPress={() => goto(item)}>
				{leftItem}
			</ListItem>
		)
	}

	const toggleSpread = key => {
		const spreadz = { ..._spreadz }
		spreadz[key] = !spreadz[key] ? true : false
		set_spreadz(spreadz)
	}

	const goto = item => {
		if (!item) return
		// let nativeModules = require('NativeModules')
		switch (item.actionType) {
			case "launch": {
				router.launch(item.action, item.title)
				return router.closeDrawer()
			}
			case "url": {
				router.browse(item.action)
				return router.closeDrawer()
			}
			default: {
				if (item.action) {
					router.popTo("home")
					return router.navigate(item, item.paramz)
				}
			}
		}
		if (item.children) toggleSpread(item.key)
	}

	const changeMenu = userID => {
		set_userID(userID)
		router.closeDrawer()
		router.popTo("home")
	}

	console.debug(MainDrawer, "render")
	if (!authToken) return renderForGuest()
	return (
		<Container style={style.container}>
			<ProfileBar
				style={style.profile}
				textStyle={style.profileText}
				backgroundColor="#1a66a8"
				data={userInfo}
				onChanged={({ userID }) => changeMenu(userID)}
			/>
			{renderList(_list)}
		</Container>
	)
}
MainDrawer.defaultProps = {
	// ...Container.defaultProps,
	subStyle: {
		paddingLeft: 0,
		backgroundColor: "#134a7a",
	},
	subStyleDeltaz: {
		paddingLeft: +20,
		backgroundColor: [-10, -10, -10, 0],
	},
}
MainDrawer.getDefaultStyle = require("/styles/screens/MainDrawer")

module.exports = MainDrawer
