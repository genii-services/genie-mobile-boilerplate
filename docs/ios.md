# IOS Native Module 관련

## @react-native-community/push-notification-ios

공식 사이트 설명은 무시
[https://github.com/react-native-community/react-native-push-notification-ios](https://github.com/react-native-community/react-native-push-notification-ios)

pod install 하면 자동으로 처리됨

`AppDelegate.m`

```objective-c
#import <RNCPushNotificationIOS.h>
// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}
```

처리 코드 참조

https://github.com/Naturalclar/react-native-push-notification-ios/tree/chore/updateExample

`registrationError` 에서 `응용 프로그램을 위한 유효한 ‘apsenvironment’ 인타이틀먼트 문자열을 찾을- 수 없습니다` 오류가 나오는 경우

[응용-프로그램을-위한-유효한-‘apsenvironment’-인타이틀먼트-문자열을-찾을-수-없습니다](https://naitas.tistory.com/entry/%EC%9D%91%EC%9A%A9-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%9C%A0%ED%9A%A8%ED%95%9C-%E2%80%98apsenvironment%E2%80%99-%EC%9D%B8%ED%83%80%EC%9D%B4%ED%8B%80%EB%A8%BC%ED%8A%B8-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%9D%84-%EC%B0%BE%EC%9D%84-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4)

## pod 관련 오류

#### pod install을 할 때 다음과 같은 오류가 나오면

[!] Unable to find a specification for SDWebImageWebPCoder (~> 0.2.3) depended upon by RNFastImage

```bash
pod repo update
```

### Debug Build 관련 오류

#### xcrun: error: unable to find utility "simctl", not a developer tool or in PATH

Xcode > Preferences > Locations

And assigning the Command Line Tools

## XCode 10.3 on High Sierra

[High Sierra에서 Xcode 10.2 설치](https://codewithchris.com/xcode-update/)

XCode 10.2 설치 방법을 설명하고 있는데, 10.3도 동일하게 설치 가능하다.
