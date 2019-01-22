package com.hgbc.HGBCAPP.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;


public class WXPayEntryActivity extends Activity {
//	private static final String TAG = WXPayEntryActivity.class.getName();
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		WeChatModule.handleIntent(getIntent());
		finish();
	}

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
	}

}
