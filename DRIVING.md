## 修改记录

- android 添加网络权限（NetInfo）
路径：android/app/src/main/AndroidManifest.xml

```
添加：<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

- 修复android与ios下浮动元素顶起问题
路径：android/app/src/main/AndroidManifest.xml

```
修改前：android:windowSoftInputMode="adjustResize"
修改后：android:windowSoftInputMode="stateAlwaysHidden|adjustResize"
```


## 用到的第三方插件
- react-native-easy-toast toast组件
- react-native-animatable 动画组件
- react-native-fileupload 文件上传
- react-native-image-picker 图片选择器
- react-native-refreshable-listview 可刷新列表
- react-native-swiper 轮播
- react-native-splash-screen 启动白屏
- react-native-storage 持久化存储
- react-native-barcodescanner 二维码扫描
- react-native-gifted-listview 下拉刷新相关
- React-Native-TextInputLayout input动效插件
- react-native-image-progress 图片加载动效
- react-native-collapsible 折叠效果
- redux 集中化状态管理
- react-redux
- redux-promise redux异步处理
- redux-thunk thunk
- prop-types 验证props类型
- react-native-storage 集中化管理
- react-native-linear-gradient 添加渐变功能
- react-native-program-stylesheet 适配
- react-native-orientation 横竖屏控制 https://www.cnblogs.com/maoyazhi/p/5411754.html