# Android을 위한 추가 설정

## android/app/build.gradle 파일 수정

다음 위치에 있는 applicationId를 .react-native/init에서 지정한 applicationId로 변경

```gradle
    defaultConfig {
        applicationId "com.project.mobile"
	}
```

## AppIcon 만들기

[App Icon Cenerator](https://appicon.co/) 사이트에 아이콘 이미지를 업로드한다.

AppIcons.zip을 다운로드 받아서 푼다

android 폴더 내 파일을 android/app/src/main/res 폴더 아래로 이동한다.

AppIcon 배경이 투명한 경우 Android는 문제없으나 IOS는 이상한 경우가 많으므로 흰색으로 배경색을 채워서 AppIcon.jpg를 만들도록 한다.

Android용 아이콘이 원형인 경우 ic_launcher.png를 ic_launcher_round.png로 바꿔서 저장한다.

Assets.xcassets/AppIcon.appiconset 폴더 내 파일을 ios/{ProjectName}/Images.xcassets/AppIcon.appiconset 폴더로 이동한다.

## react-native-firebase 설정

### android/app/google-services.json 생성
