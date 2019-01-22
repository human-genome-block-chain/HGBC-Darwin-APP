/**
 * Created by evilcode on 23/03/2017.
 * 网络状态的处理

 Android可获取的状态比较多，上面的status可能有如下的值，直接把文档贴出来了：
 + NONE - 设备处于离线状态
 + BLUETOOTH - 蓝牙数据连接
 + DUMMY - 模拟数据连接
 + ETHERNET - 以太网数据连接
 + MOBILE - 移动网络数据连接
 + MOBILE_DUN - 拨号移动网络数据连接
 + MOBILE_HIPRI - 高优先级移动网络数据连接
 + MOBILE_MMS - 彩信移动网络数据连接
 + MOBILE_SUPL - 安全用户面定位（SUPL）数据连接
 + VPN - 虚拟网络连接。需要Android5.0以上
 + WIFI - WIFI数据连接
 + WIMAX - WiMAX数据连接
 + UNKNOWN - 未知数据连接

 IOS端网络状态
 none - 设备处于离线状态。
 wifi - 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
 cell - 设备是通过Edge、3G、WiMax或是LTE网络联网的。
 unknown - 发生错误，网络状况不可知

  *** 存在问题:
    step 1：
    NetInfo.isConnected.fetch().then().done((network_state) => {
         this.network_state = network_state   //ios下总是返回unknown
      });

    step 2:
    NetInfo.isConnected.addEventListener('change', (network_state) => {
        this.network_state = network_state
    });

    iOS
        step1总是返回unknown，且step1、step2的执行顺序不确定：
        结果1： step1="unknown" step2="wifi"  覆盖后结果 => wifi
        结果2： step2="wifi" step1="unknown"  覆盖后结果 => unknown
    android
        android下，step1正常返回结果WIFI，step2的addEventListener不会被调用

    所以这里采用比较取巧的做法:
     NetInfo.isConnected.fetch().then().done(() => {
        NetInfo.isConnected.addEventListener('change', dispatchConnected);
      });
 */
import { NetInfo } from 'react-native'

import Platform from 'Platform'

export default class UtilsNetwork {
  /**
   * 注册网络的状态变化监听
   * @param cb_network_state (network_state) => { ... } 直接获取网络的状态
   * @param cb_network_state_change (network_state) => { ... } 网络状态改变时进入的回调
   */
  static registNetworkStateListener(cb_network_state, cb_network_state_change) {
    NetInfo.fetch().done(net_state => {
      if (cb_network_state) {
        cb_network_state(net_state);
      }

      NetInfo.addEventListener("change", net_state => {
        if (cb_network_state) {
          cb_network_state(net_state);
        }

        if (cb_network_state_change) {
          cb_network_state_change(net_state);
        }
      });
    });
  }

  /**
   * 当前手机网络连接状态  NetInfo状态 'none'、'wifi'、'cell'、'unknown'
   * http://reactnative.cn/docs/0.40/netinfo.html#content
   * @returns {boolean|*}
   */
  static isNetworkConnected(network_state) {
    if (!network_state) return false;

    let ns = network_state.toUpperCase();

    if (Platform.OS === "ios") {
      if (ns == "WIFI" || ns == "CELL") return true;
    } else if (Platform.OS == "android") {
      let no_network = {
        NONE: 1,
        UNKNOWN: 1,
        BLUETOOTH: 1
      };

      if (no_network[ns]) return false;
      else return true;
    }
    return false;
  }

  /**
   * 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
   * @param network_state {string} 网络状态
   * @returns {boolean}
   */
  static isNetworkWifi(network_state) {
    if (!network_state) return false;

    let ns = network_state.toUpperCase()
    return ns == "WIFI"
  }

  /**
  * 设备是通过Edge、3G、WiMax或是LTE网络联网的。
    Android下
    + MOBILE - 移动网络数据连接
    + MOBILE_DUN - 拨号移动网络数据连接
    + MOBILE_HIPRI - 高优先级移动网络数据连接
    + MOBILE_MMS - 彩信移动网络数据连接
    + MOBILE_SUPL - 安全用户面定位（SUPL）数据连接

  * @param network_state {string} 网络状态
  * @returns {boolean}
  */
  static isNetworkCell() {
    if (!network_state) return false;

    let ns = network_state.toUpperCase();

    if (Platform.OS === "ios") {
      return ns == "CELL";
    } else if (Platform.OS == "android") {
      return ns.contains("MOBILE");
    }

    return false;
  }
}