#!/usr/bin/env bash
#################################################################################
##
##	새로운 폴더에 프로젝트 복사 (미완성)
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  수정일: 2019-07-29
##
##	사용법:
##	yarn clone NewProject com.project.new
##
################################################################################

if [ "$1" = "" -o "$2" = "" ] ; then
echo 파라메터가 지정되지 않았습니다.
echo 사용법: yarn clone NewProject com.project.new
exit
fi

PROJECT_NAME=$1
APPLICATION_ID=$2

SRC_PATH=$PWD
TEMP_NAME="RNApp$(date +%Y%m%d%H%M)"
TEMP_PATH=../$TEMP_NAME
PRJ_PATH=../$1
echo $SRC_PATH

cd ..
npx react-native init $TEMP_NAME
mkdir $TEMP_NAME

mv $TEMP_NAME $PROJECT_NAME

cd $PROJECT_NAME

npx react-native-rename-next $PROJECT_NAME -b $APPLICATION_ID

cp -R $SRC_PATH/.git* .
cp -R $SRC_PATH/.vscode .
cp -R $SRC_PATH/js .
cp -R $SRC_PATH/docs .
cp -R $SRC_PATH/images .
cp -R $SRC_PATH/logs .
cp -R $SRC_PATH/modules .
cp -R $SRC_PATH/scripts .
cp -R $SRC_PATH/svgs .
cp -R $SRC_PATH/.eslintrc.js .
cp -R $SRC_PATH/.npmignore .
cp -R $SRC_PATH/.prettierignore .
cp -R $SRC_PATH/.prettierrc.js .
cp -R $SRC_PATH/babel.config.js .
cp -R $SRC_PATH/index.js .
cp -R $SRC_PATH/jsconfig.json .
cp -R $SRC_PATH/metro.config.js .
cp -R $SRC_PATH/react-native.config.js .
cp -R $SRC_PATH/README.md .
cp -R $SRC_PATH/tsconfig.json .

cp -R $SRC_PATH/app.json .
cp -R $SRC_PATH/package.json .

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

react-native-rename-next vim-cury-mobile -b com.mbrainworks.vim-cury-mobile

fi
