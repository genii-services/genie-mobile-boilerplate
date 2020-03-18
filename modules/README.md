# 변경 내역

## metro 0.56.4

### src/lib/polyfills/require.js

순환참조 경고 무시

```js
function metroRequire(moduleId: ModuleID | VerboseModuleNameForDev): Exports {
  if (__DEV__ && typeof moduleId === 'string') {
    const verboseName = moduleId;
    moduleId = verboseNamesToModuleIds[verboseName];
    if (moduleId == null) {
      throw new Error(`Unknown named module: "${verboseName}"`);
    } else {
      /*. 순환참조 경고 무시
      console.warn(
        `Requiring module "${verboseName}" by name is only supported for ` +
          'debugging purposes and will BREAK IN PRODUCTION!',
      );
      */
    }
  }
```

## mobx-rest 5.0.6

### lib/index.js

method에 따라 다른 url 호출을 위한 확장

### src/Model.ts

method에 따라 다른 url 호출을 위한 확장

## react-native-orientaion

react-native-orientaion-locker로 대체

Fixes the following issues when building React Native 0.60 or later.

```console
WARNING: Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'.
It will be removed at the end of 2018. For more information see: http://d.android.com/r/tools/update-dependency-configurations.html
WARNING: The specified Android SDK Build Tools version (23.0.1) is ignored, as it is below the minimum supported version (28.0.3) for Android Gradle Plugin 3.4.2.
Android SDK Build Tools 28.0.3 will be used.
To suppress this warning, remove "buildToolsVersion '23.0.1'" from your build.gradle file, as each version of the Android Gradle Plugin now has a default version of the build tools.
```

### android/build.gradle

-   compileSdkVersion 23에서 28로 변경
-   buildToolsVersion 23.0.1에서 28.0.3으로 변경
-   minSdkVersion 16에서 19로 변경
-   targetSdkVersion 22에서 28로 변경
-   compile을 implementation로 변경

## react-navigation-stack 0.7.0

react-native-router-flux 4.2로 업그레이드하여 react-navigation-stack가 업데이트되었으므로,

다음 작업은 불필요해짐

### dist/views/Transitioner.js

다음 경고 해결

```console
Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.

Please update the following components: Transitioner
```
