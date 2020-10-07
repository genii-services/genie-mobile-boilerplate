# 디버깅

## Flipper

플리퍼와 Visual Studio Code를 함께 사용하여 코딩 및 디버깅을 하려면
실행 중인 플리퍼 인스턴스에 연결하여 Visual Studio Code에서 디버깅할 수 있습니다.

우선 Visual Studio Code에서 `Debugger for Chrome` Extension을 설치합니다.

그런 다음 디버깅을 시작하려면
VSCode에서 Flipper 저장소의 `desktop`폴더을 열고 터미널에서 `yarn start`를 실행하여 개발모드에서 Flipper를 시작하고
`Debug and Run` 탭을 선택한 다음 `Attach to Running Renderer` 작업을 실행합니다.
기본적으로 이 태스크는 첫번째 태스크로 설정되어 있으므로 `F5` 키를 눌러 실행할 수 있습니다.

![실행 화면](https://fbflipper.com/img/debugging-from-vscode.png)
