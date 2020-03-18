#!/usr/bin/env bash
##############################################################################
##
##  Clear script for UN*X V1.5
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  수정일: 2019-07-29
##
##	사용법:
##	yarn clear			기본적인 정리
##	yarn clear cache	기본적인 정리에 더하여 yarn cache까지 정리
##
##############################################################################

cd android
./gradlew clean
cd ..

rm -rf ios/build
rm -rf android/build
rm -rf android/app/build

watchman watch-del-all
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-react-native-*
rm -rf node_modules
if [ "$1" = "cache" ] ; then
	yarn cache clean
fi

yarn
