#!/usr/bin/env bash
########################################################################################
##
##	Build releases script for UN*X V2.1
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  V2.0 2019-07-29
##  V3.0 2019-11-20 applcationId와 appcationName을 app.json으로 빼서 범용스크립트로 만듬
##
##	사용법:
##	yarn build				apk와 ipa를 모두 빌드
##	yarn build apk			안드로이드용 apk만 빌드
##	yarn build apk run		apk를 빌드 후 연결되어 있는 안드로이드 단말에서 실행
##	yarn build ipa			IOS용 ipa 빌드
##	yarn build ipa install	apk를 빌드 후 연결되어 있는 IOS 단말 전체에 설치
##
########################################################################################

## PROJECT_NAME=${_PWD##/*/}
PROJECT_NAME=$(grep "applicationName" app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
APPLICATION_ID=$(grep "applicationId" app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
PUBLISH_ROOT_PATH="$HOME/Public/Drop Box/$PROJECT_NAME-release"
_PWD=`pwd`

echo Project Name is $PROJECT_NAME
echo Application ID is $APPLICATION_ID

if [ "$1" = "" -o "$1" = "apk" -o "$1" = "android" ] ; then
	BUILD_FILE_PATH="app/build/outputs/apk/release/$PROJECT_NAME-release.apk"
	echo Build $BUILD_FILE_PATH for Android
	cd android
	rm -f $BUILD_FILE_PATH
	./gradlew assembleRelease

	if [ -f $BUILD_FILE_PATH ]; then
		PUBLISH_PATH="$PUBLISH_ROOT_PATH/$(date +%Y%m%d-%H)"
		PUBLISH_FILE_PATH="$PUBLISH_PATH/$PROJECT_NAME.apk"
		echo Pubish to $PUBLISH_FILE_PATH
		mkdir -p "$PUBLISH_PATH"
		cp -p -f -v "$BUILD_FILE_PATH" "$PUBLISH_FILE_PATH"
		if [ "$2" = "run" ] ; then
			echo Run App
			adb uninstall $APPLICATION_ID
			adb install "$PUBLISH_FILE_PATH"
			adb shell am start -n $APPLICATION_ID/$APPLICATION_ID.MainActivity
			react-native log-android
		fi
	fi
	cd ..
fi

if [ "$1" = "" -o "$1" = "ipa" -o "$1" = "ios" ] ; then
	echo Build IOS
	cd ios
	xcodebuild clean -project $PROJECT_NAME.xcodeproj -configuration Release -alltargets
	xcodebuild archive -project $PROJECT_NAME.xcodeproj -scheme $PROJECT_NAME -archivePath build/$PROJECT_NAME.xcarchive
	xcodebuild -exportArchive -archivePath build/$PROJECT_NAME.xcarchive -exportPath build/outputs -exportOptionsPlist exportOptions.plist

	if [ -f build/outputs/$PROJECT_NAME.ipa ]; then
		PUBLISH_PATH="$PUBLISH_ROOT_PATH/$(date +%Y%m%d-%H)"
		mkdir -p "$PUBLISH_PATH"
		cp -p -f -v build/outputs/$PROJECT_NAME.ipa "$PUBLISH_PATH/$PROJECT_NAME.ipa"
		if [ "$2" = "install" ] ; then
			cfgutil -f install-app build/outputs/$PROJECT_NAME.ipa
		fi
	fi
	cd ..
fi
