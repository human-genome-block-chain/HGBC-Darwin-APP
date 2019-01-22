package com.hgbc.HGBCAPP.modules;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
//import com.google.gson.Gson;
import java.util.Map;
import com.alibaba.verificationsdk.ui.IActivityCallback;
import com.alibaba.verificationsdk.ui.VerifyActivity;
import com.alibaba.verificationsdk.ui.VerifyType;
import com.alibaba.wireless.security.jaq.SecurityVerification;
import com.alibaba.wireless.security.jaq.SecurityInit;
import com.alibaba.wireless.security.jaq.JAQException;
import android.content.Context;

public class AliVerifyModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String TAG = "ReactNativeJS";
    private Context reactContext;
    private Promise promise;
    public AliVerifyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

//    private Activity getRealActivity() {
//        if (getCurrentActivity() == null) {
//            return reactContext.getCurrentActivity();
//        } else {
//            return getCurrentActivity();
//        }
//    }


    /**
     * React Method
     **/
    @ReactMethod
    public void aliVerify(final Promise promise){
        this.promise = promise;
        Log.e(TAG, "reactContext: " +reactContext);
        VerifyActivity.startSimpleVerifyUI(this.reactContext, VerifyType.NOCAPTCHA, "0335", null, new IActivityCallback() {
            @Override
            public void onNotifyBackPressed() {

            }
            @Override
            public void onResult(int i, Map<String, String> code) {
                verifyDidFinishedWithResult(i,code);
            }
        });
    }

    /**
     * 验签回调功能函数
     * @param retInt 返回码
     * @param code 返回内容
     */
    public void verifyDidFinishedWithResult(int retInt, Map code) {
//        this.reactContext.removeActivityEventListener(this);
        switch (retInt) {
            case VerifyActivity.VERIFY_SUCC:
                WritableMap map = Arguments.createMap();
                map.putString("sessionId", (String) code.get("sessionID"));
                map.putString("code", (String) code.get("errorCode"));
                Log.e(TAG, "aaaaaaaaaaaaaaaaaaaaa:" +(String) code.get("errorMsg"));
                Log.e(TAG, "bbbbbbbbbbbbbbbbbbbbb:" + code.get("errorCode"));
                Log.e(TAG, "ddddddddddddddddddddd:" + code.get("sessionID"));
                this.promise.resolve(map);
                break;

            case VerifyActivity.VERIFY_FAILED:
                VerifyActivity.finishVerifyUI();
                break;
        }
    }
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//        this.reactContext.removeActivityEventListener(this);
    }

    @Override
    public void onNewIntent(Intent intent) {}

    @Override
    public String getName() {
        return "AliVerifyModule";
    }

}
