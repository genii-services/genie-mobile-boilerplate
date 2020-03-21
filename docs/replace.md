# 소스 변경 방법

## native-base

"native-base": "^2.13.8",

## Repalce

### 모듈시스템을 ES6에서 CommonJs로 변경

#### CommonJs의 이점

1. dynamic loading을 할 수 있다
   조건문 안에 넣어서 필요한 시점에 필요한 모듈만 사용할 수 있다.
   **DEV**를 판단하여 디버깅 모드에서만 로딩하게 할 수도 있다.
2. 디버깅시 ES6는 package에 따라 변수명에 고유한 접두어가 붙어서 혼선이 있고 불편한데, CommonJs는 변수명과 동일하다!
3. synchronous: 여러게를 require하면 순차적으로 처리

#### 변경 방법

vscode 전체 바꾸기에서

```search
import \{ (.*?) \} from (.*?);
exports.$1 = require($2).\$1

import (.*?) from (.*?)$
const $1 = require(\$2)

export default
exports = module.exports =
```
