//*.for react-native 0.61.5, checked at 2020-02-17

package services.genii.geniemobileboilerplate;

import com.facebook.react.ReactActivity;
//*.react-native-orientation-locker
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

	/**
	* Returns the name of the main component registered from JavaScript. This is used to schedule
	* rendering of the component.
	*/
	@Override
	protected String getMainComponentName() {
		return "GenieMobileBoilerplate";
	}

	//*.react-native-orientation-locker
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		Intent intent = new Intent("onConfigurationChanged");
		intent.putExtra("newConfig", newConfig);
		this.sendBroadcast(intent);
	}
}
