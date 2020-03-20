const React = require("react")
const _ = require("lodash")
const { Left, Item, Icon, Text, Button } = require("/elements")

const { yyyymmddhhmm } = require("/utils/moment")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")
const { IdPhoto } = require(".")

const ProfileBar = props => {
	const router = useRouter()
	const { data = {}, style, textStyle, onChanged } = props
	const backgroundColor = (style && style.backgroundColor) || styles.profileArea.backgroundColor
	const photoURL = `${data.photoURL1}?at=${data.touchedAt || yyyymmddhhmm()}` // hash로는 안됨
	const title = data.displayName
	return (
		<Item
			style={[styles.profileArea, style]}
			backgroundColor={backgroundColor}
			// onPress={() => router.push("settings")}
			// onPress={() => router.push("userDetail", { item: data, title: "내 정보" })}
		>
			<IdPhoto style={styles.photo} id={data.userID} source={photoURL} />
			<Left>
				{props.nameDisplayType === 0 ? (
					<Text style={[styles.text1, textStyle]}>
						{data.userName}
						<Text style={[styles.text, { fontSize: 14 }, textStyle]}> 님</Text>
					</Text>
				) : (
					<Text style={[styles.text1, textStyle]} note>
						{`${data.userName} ${data.titleName}`}
					</Text>
				)}
				<Text style={[styles.text2, textStyle]} note>
					{title}
				</Text>
			</Left>
			<Button style={{ marginRight: -8 }} transparent onPress={() => router.push("settings")}>
				<Icon style={[styles.icon, textStyle]} name="ios-settings" />
			</Button>
		</Item>
	)
}

if (__DEV__) {
	const PropTypes = require("prop-types")
	ProfileBar.propTypes = {
		name: PropTypes.string,
		title: PropTypes.string,
		backgroundColor: PropTypes.string,
		nameDisplayType: PropTypes.number,
	}
}

ProfileBar.getDefaultStyle = require("/styles/viewparts/ProfileBar")

module.exports = ProfileBar
