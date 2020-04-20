#!/usr/bin/env bash
##############################################################################
##
##  Clear script for UN*X V1.6
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  V1.5	2019-07-29
##	V1.6	기본 클리닝 작업에 yarn cache까지 포함
##
##	사용법:
##	yarn clear			기본적인 정리
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
yarn cache clean

yarn
