# GIT 관련 정보

## git 로컬저장소가 먼저 존재하고 원격저장소를 지정해야 할 경우

리모트 저장소를 추가하는 방법은 기존 워킹 디렉토리에 새 리모트 저장소를 쉽게 추가할 수 있는데
git remote add <단축이름> <url> 명령을 사용한다.

```bash
git remote add origin https://github.com/genii-services/genii-mobile-boilerplate.git
```

## git 원격저장소 확인

```bash
git remote -v
```

## 리모트 저장소에 Push 하기

프로젝트를 공유하고 싶을 때 Upstream 저장소에 Push 할 수 있다. 이 명령은 git push <리모트 저장소 이름> <브랜치 이름>으로 단순하다. (((git commands, push))) master 브랜치를 origin 서버에 Push 하려면(다시 말하지만 Clone 하면 보통 자동으로 origin 이름이 생성된다) 아래와 같이 서버에 Push 한다.

```bash
git push origin master
```

이 명령은 Clone 한 리모트 저장소에 쓰기 권한이 있고, Clone 하고 난 이후 아무도 Upstream 저장소에 Push 하지 않았을 때만 사용할 수 있다. 다시 말해서 Clone 한 사람이 여러 명 있을 때, 다른 사람이 Push 한 후에 Push 하려고 하면 Push 할 수 없다. 먼저 다른 사람이 작업한 것을 가져와서 Merge 한 후에 Push 할 수 있다.

## git 강제 푸시

```bash
git push -u origin +master
```
