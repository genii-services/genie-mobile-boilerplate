#!/usr/bin/env bash
########################################################################################
##
##	'The end of this work' script for UN*X
##
##  작성자: YoonHo Kang appcreatier@gmail.com
##  V1.0 2020-04-14
##
##	사용법:
##	yarn bye
##
########################################################################################
echo Bye! $USER
date
adb shell input keyevent KEYCODE_POWER
git push origin master:master
echo 10초 후 맥을 재웁니다.
sleep 10
pmset displaysleepnow