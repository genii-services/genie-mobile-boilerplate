# 사용한 모듈에 대한 설명

## react-native-gesture-handler

react-native-router-flux에서 사용하고 있는 react-navigation이 업데이트되면서 Edage Swipe가 비활성화되었음.

Android에서 react-navigation-drawer의 Edge Swipe를 활성화하는 코드를 다음과 같이 추가

```js
import { gestureHandlerRootHOC } from "react-native-gesture-handler"

...

export default gestureHandlerRootHOC(App)
```

종속된 모듈 설치

```bash
yarn add \
	react-native-reanimated \
	react-native-gesture-handler \
	react-native-screens \

	react-native-safe-area-context \
	@react-native-community/masked-view
```

## react-native-firebase

[GitHub](https://github.com/invertase/react-native-firebase)

[Cloud Messagin Reference](https://invertase.io/oss/react-native-firebase/v6/messaging/reference/)
