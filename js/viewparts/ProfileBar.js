require("react")
const _ = require("lodash")
const { Left, Item, Icon, Text, Button } = require("/elements")

const { yyyymmddhhmm } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { IdPhoto } = require(".")

const ProfileBar = (props) => {
	const router = useRouter()
	const { data = {}, style, textStyle, onChanged } = props

	const backgroundColor = (style && style.backgroundColor) || stylez.profileArea.backgroundColor
	const photoURL = `${data.photoURL1}?at=${data.touchedAt || yyyymmddhhmm()}` // hash로는 안됨
	const title = data.displayName
	return (
		<Item
			style={[stylez.profileArea, style]}
			backgroundColor={backgroundColor}
			// onPress={() => router.push("settings")}
			// onPress={() => router.push("userDetail", { item: data, title: "내 정보" })}
		>
			<IdPhoto style={stylez.photo} id={data.userID} source={photoURL} />
			<Left>
				{props.nameDisplayType === 0 ? (
					<Text style={[stylez.text1, textStyle]}>
						{data.userName}
						<Text style={[stylez.text, { fontSize: 14 }, textStyle]}> 님</Text>
					</Text>
				) : (
					<Text style={[stylez.text1, textStyle]} note>
						{`${data.userName} ${data.titleName}`}
					</Text>
				)}
				<Text style={[stylez.text2, textStyle]} note>
					{title}
				</Text>
			</Left>
			<Button style={{ marginRight: -8 }} transparent onPress={() => router.push("settings")}>
				<Icon style={[stylez.icon, textStyle]} name="ios-settings" />
			</Button>
		</Item>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	ProfileBar.propTypes = {
		name: string,
		title: string,
		backgroundColor: string,
		nameDisplayType: number,
	}
}

ProfileBar.getDefaultStyle = require("/styles/viewparts/ProfileBar")

module.exports = ProfileBar
