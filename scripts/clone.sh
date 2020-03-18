#!/usr/bin/env bash
#################################################################################
##
##	새로운 폴더에 프로젝트 복사 (미완성)
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  수정일: 2019-07-29
##
##	사용법:
##	yarn new folder
##
################################################################################

PROJECT_NAME=vim-cury-mobile
APPLICATION_ID=com.mbrainworks.vim-cury-mobile
TEMP_NAME="RNApp$(date +%Y%m%d%H%M)"
TEMP_PATH=../$TEMP_NAME
PRJ_PATH=../$1

cd ..
react-native init $TEMP_NAME --version 0.59

cp .vscode $TEMP_PATH
cp scripts $TEMP_PATH
cp .git* $TEMP_PATH
cp js $TEMP_PATH
cp docs $TEMP_PATH
cp logs $TEMP_PATH
cp images $TEMP_PATH

mv $TEMP_PATH $PRJ_PATH
cd $PRJ_PATH

react-native-rename $PROJECT_NAME -b $APPLICATION_ID

if false; then

react-native init Nabium59 --version react-native@0.59

mv Nabium59 vim-cury-mobile-59
cd vim-cury-mobile-59
cp -R ../vim-cury-mobile/.vscode .
cp -R ../vim-cury-mobile/scripts .
cp -R ../vim-cury-mobile/.git* .
cp -R ../vim-cury-mobile/js .
cp -R ../vim-cury-mobile/docs .
cp -R ../vim-cury-mobile/logs .
cp -R ../vim-cury-mobile/images .

react-native-rename vim-cury-mobile -b com.mbrainworks.vim-cury-mobile

fi
