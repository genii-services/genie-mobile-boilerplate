require("react")

const ImageView = require("react-native-image-view")

const { screen } = require("/utils/device")
const { useRouter } = require("/coordinators") // const router = require("/utils/router")

const ImageViewer = props => {
	const router = useRouter()

	let { max } = screen
	let { width = max, height = max, source, title } = props
	console.debug(ImageViewer, source, width, height)
	let images = [{ source, title, width, height }]
	return (
		<ImageView
			images={images}
			isVisible={true}
			//resizeMode='contain' resizeMethod='auto'
			/* renderFooter={(currentImage) => (
				<View><Text>더블클릭으로 확대/축소하세요</Text></View>
			)}*/
			onClose={router.pop}
		/>
	)
}

module.exports = ImageViewer

// console.debug(ImagViewer)
