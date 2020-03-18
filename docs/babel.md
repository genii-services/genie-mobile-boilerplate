# babel 관련 설정

## transform-remove-console

Production Build 시에 console 로그 일괄 제거를 위한 설정
현재 Debug 시에 문제가 있어서 제외

```json
	"devDependencies": {
		"babel-plugin-transform-remove-console": "^6.9.4",
		...
	}
```

```json
	"babel": {
		"env": {
			"production": {
				"plugins": [
					"transform-remove-console",
					{
						"exclude": [
							"debug",
							"warn"
						]
					}
				]
			}
		}
	},
```
