//*.for react-native 0.61.5, checked at 2020-02-17

package services.genii.geniemobileboilerplate;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

	private final ReactNativeHost mReactNativeHost =
		new ReactNativeHost(this) {
			@Override
			public boolean getUseDeveloperSupport() {
				return BuildConfig.DEBUG;
			}

			@Override
			protected List<ReactPackage> getPackages() {
				@SuppressWarnings("UnnecessaryLocalVariable")
				List<ReactPackage> packages = new PackageList(this).getPackages();
				//*.자동 링크 할수 없는 패키지는 하단에 수동으로 추가
				// Packages that cannot be autolinked yet can be added manually here, for example:
				// packages.add(new MyReactNativePackage());
				return packages;
			}

			@Override
			protected String getJSMainModuleName() {
			return "index";
			}
		};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);	//*.@react-native-firebase/messaging background message 처리할 때 꼭 필요
		initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
	}

	/**
	* Loads Flipper in React Native templates. Call this in the onCreate method with something like
	* initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
	*
	* @param context
	* @param reactInstanceManager
	*/
	private static void initializeFlipper(
		Context context, ReactInstanceManager reactInstanceManager) {
			if (BuildConfig.DEBUG) {
			try {
				/*
				We use reflection here to pick up the class that initializes Flipper,
				since Flipper library is not available in release mode
				*/
				Class<?> aClass = Class.forName("services.genii.geniemobileboilerplate.ReactNativeFlipper");
				aClass
					.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
					.invoke(null, context, reactInstanceManager);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}
}
