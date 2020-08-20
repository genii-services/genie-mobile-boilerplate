# React Native를 수작업으로 버전 업그레이드하는 방법

## 최신 React Native Project 만들기

```bash
react-native init NewRN
```

## React Native Rename Next로 기존 Bundle 이름으로 변경

```bash
react-native-rename-next OldRN -b com.rn.old
```

## Project 폴더 이름 변경

### 기존 Project 폴더 백업

폴더 전체를 압축하고 압축파일 이름 뒤에 오늘날짜를 붙여서 보관한다

### 기존 Project 폴더 삭제

### 기존 Project 폴더 이름으로 변경

```bash
mv NewRN OldRN
```
