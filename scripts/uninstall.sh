#!/usr/bin/env bash
########################################################################################
##
##	Uninstall app script for UN*X
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  V3.0 2019-11-20 applcationId와 appcationName을 app.json으로 빼서 범용스크립트로 만듬
##
##	사용법:
##	yarn u		연결되어 있는 모든 안드로이드와 IOS 단말에서 언인스톨
##	yarn u apk	연결되어 있는 모든 안드로이드 단말에서 언인스톨
##	yarn u ipa	연결되어 있는 모든 IOS 단말에서 언인스톨
##
########################################################################################

#PROJECT_NAME=${_PWD##/*/}
PROJECT_NAME=$(grep "applicationName" app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
APPLICATION_ID=$(grep "applicationId" app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
_PWD=`pwd`

if [ "$1" = "" -o "$1" = "apk" ] ; then
	echo Uninstall $PROJECT_NAME to all Android Devices
	APK_PATH=android/app/build/outputs/apk/release/$PROJECT_NAME-release.apk

	for SERIAL in $(adb devices | grep -v List | cut -f 1); do
		echo Uninstall $PROJECT_NAME app on $SERIAL device
		adb -s $SERIAL uninstall $APPLICATION_ID;
	done
	#adb uninstall $APPLICATION_ID
	#adb install "$APK_PATH"
fi

if [ "$1" = "" -o "$1" = "ipa" ] ; then
	echo Uninstall $PROJECT_NAME to all IOS Devices
	IPA_PATH="ios/build/outputs/$PROJECT_NAME.ipa"
	cfgutil -f remove-app "$IPA_PATH"
fi
