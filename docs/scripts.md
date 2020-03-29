# 작업용 스크립트 목록

## 공통

### 버전 업데이트

```sh
react-native-version -b
```

### 파일 배포

#### 빌드 파일 복사

Servers: HCGWPT01, HCGWPT02, HCGWPT03
File Path: D:\PnP\Mobile\Download

#### 버전 정보 DB 업데이트

Server: HCGWSQLV
Password: qwer1234!
Database: GWIF
Table: MOBILE_APP
ContentMenu: 상위 200개 편집

## Android

### 그래들 초기화

gradlew clean

### 릴리즈 모드 빌드 및 ADB를 통한 설치

```sh
cd android
./gradlew assembleRelease
mkdir "/Users/ace/Public/Drop Box/hanilmgw-release/$(date +%Y%m%d-%H)"
cp -p -f -v app/build/outputs/apk/hanilmgw-release.apk "/Users/ace/Public/Drop Box/hanilmgw-release/$(date +%Y%m%d-%H)/hanilmgw.apk"
cd ..

adb uninstall com.hanil.mobilegw
adb install "/Users/ace/Public/Drop Box/mobilegw-release/$(date +%Y%m%d-%H)/mobilegw.apk"
adb shell am start -n com.hanil.mobilegw/com.hanil.mobilegw.MainActivity
react-native log-android


adb install ./android/app/build/outputs/apk/mobilegw-armeabi-v7a-release.apk

```

### 디버그 모드 빌드

```sh
cd android
./gradlew assembleDebug
cd ..
```

### 디버그 모드 재설치

```sh
adb uninstall com.hanil.mobilegw
adb install ./android/app/build/outputs/apk/mobilegw-armeabi-v7a-debug.apk
```

### 릴리즈 모드 재설치

```sh
adb uninstall com.hanil.mobilegw
adb install "/Users/ace/Public/Drop Box/hanilmgw-release/$(date +%Y%m%d-%H)/hanilmgw.apk"
adb shell am start -n com.hanil.mobilegw/com.hanil.mobilegw.MainActivity
```

## IOS

### 릴리즈 모드 빌드

```sh
cd ios
xcodebuild clean -project mobilegw.xcodeproj -configuration Release -alltargets
xcodebuild archive -project mobilegw.xcodeproj -scheme mobilegw -archivePath build/mobilegw.xcarchive
xcodebuild -exportArchive -archivePath build/mobilegw.xcarchive -exportPath build/outputs -exportOptionsPlist exportPlist.plist
mkdir "/Users/ace/Public/Drop Box/hanilmgw-release/$(date +%Y%m%d-%H)"
cp -p -f -v build/outputs/mobilegw.ipa "/Users/ace/Public/Drop Box/hanilmgw-release/$(date +%Y%m%d-%H)/hanilmgw.ipa"
cd ..
```

## 개발 작업

### 인터페이스 문서를 이용한 config 데이터 생성

정규식 치환
인터페이스설계서 모바일 전자결재
^\s(._)\s(\d_?)\s(._?)\s(._?)$
\t{ label:'$1',\tfieldKey:'$2',\tfieldType:'$3',\tnote:'\$4' },

옵션용

## script 작성 후 실행 권한 부여 방법

```bash
chmod +x ./scripts/my_script.sh
```
