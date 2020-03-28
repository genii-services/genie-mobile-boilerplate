//*.for react-native 0.61.5, checked at 2020-02-17

package services.genii.geniemobileboilerplate;

import android.app.Activity;

import android.os.Bundle;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
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

	public static class AuthActivityDelegate extends ReactActivityDelegate{
		private Bundle mInitialProps = null;
        private final @Nullable Activity mActivity;
		public AuthActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

		@Override
        protected void onCreate(Bundle savedInstanceState) {
			Bundle bundle = mActivity.getIntent().getExtras();
			if( bundle != null && bundle.containsKey("appId")){
				mInitialProps = new Bundle();
				mInitialProps.putString("appId", bundle.getString("appId"));
			}
			super.onCreate(savedInstanceState);
		}

		@Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }
	};

	@Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new AuthActivityDelegate(this, getMainComponentName());
    }

}
