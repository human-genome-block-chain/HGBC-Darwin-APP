package com.hgbc.HGBCAPP.wxapi;

import android.os.Bundle;
import com.theweflex.react.WeChatModule;
import android.app.Activity;

/** 微信客户端回调activity示例 */
public class WXEntryActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		WeChatModule.handleIntent(getIntent());
		finish();
	}
}
