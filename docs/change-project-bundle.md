# 패키지와 번들 이름 변경

## react-native-rename-next 이용하여 변경

[react-native-rename-next 배포 사이트](https://www.npmjs.com/package/react-native-rename-next)

### 설치

```bash
npm i -g react-native-rename-next
```

### 변경 방법

```bash
react-native-rename-next MyPackageName -b com.company.project
```

## vscode에서 추가 변경 작업

다음 항목을 전체 검색 후 변경

### services.genii.geniemobileboilerplate

어플리케이션 ID로 사용

### genie-mobile-boilerplate

패키지 이름 또는 어플리케이션 이름으로 주로 사용

### Genie Mobile Boilerplate

표시 이름으로 사용

### services/genii/geniemobileboilerplate

안드로이드 네이티브 소스 경로 변경

### GenieMobileBoilerplate

IOS 네이티브 소스 경로 변경
