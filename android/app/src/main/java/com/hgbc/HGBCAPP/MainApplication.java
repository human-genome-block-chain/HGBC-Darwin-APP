package com.hgbc.HGBCAPP;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.theweflex.react.WeChatPackage;
import codes.simen.IMEI.IMEI;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.github.yamill.orientation.OrientationPackage;
import com.hgbc.HGBCAPP.modules.AliVerifyPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new WeChatPackage(),
          new OrientationPackage(),
          new RCTCapturePackage(),
          new IMEI(),
          new AliVerifyPackage(),
          new SplashScreenReactPackage()
      );
    }

    public void setReactNativeHost(ReactNativeHost reactNativeHost) {
      mReactNativeHost = reactNativeHost;
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
