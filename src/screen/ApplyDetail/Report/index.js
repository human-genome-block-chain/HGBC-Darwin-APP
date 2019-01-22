import React, { Component } from 'react'
import { WebView,Text,Image,TouchableOpacity,DeviceEventEmitter,Dimensions,Animated,View} from 'react-native'
import *as wechat from 'react-native-wechat'
import { CommonImg } from 'images/index'
const { width, height } = Dimensions.get("window")
import { getShareImage } from 'api/index'
export default class report extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      'title': '报告',
      headerRight: (
        <TouchableOpacity style={{marginRight:15,padding:10}}  onPress={()=>{
          DeviceEventEmitter.emit('ShareReport');
        }} activeOpacity={0.8}>
          <Text style={{fontSize:16,color:'#333333'}}>分享</Text>
        </TouchableOpacity>
      )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      offsetY: new Animated.Value(height),
    }
    this.sign = props.navigation.getParam('sign', '')
    this.url = props.navigation.getParam('url', '')
  }
  async getShareImage () {
    try {
      const result = await getShareImage({pageName:'report',pageUrl:this.url})
      this.shareImageURL = result.data.imgUrl
      Animated.timing(this.state.offsetY, {duration: 100,toValue: 0}).start();
    } catch (e) {}
  }
  componentDidMount(){
    this.subscription = DeviceEventEmitter.addListener('ShareReport', () => {
      this.getShareImage()
    })
  }
  componentWillUnmount() {
    this.subscription.remove();
  }
  render () {
    return (
      <View style={{flex:1}}>
          <WebView
            source={{uri: this.url}}
            bounces={ true }
            domStorageEnabled={ true }
            scalesPageToFit={ true }
          />
          <Animated.View style={{transform: [{translateY: this.state.offsetY}],backgroundColor:'rgba(52,52,52,0.5)',position: "absolute",bottom:0,left:0}}>
            <TouchableOpacity style={{width:width,height:height,alignItems:'flex-end',justifyContent:'flex-end'}} activeOpacity={1.0} onPress={()=>{

              Animated.timing(this.state.offsetY, {duration: 100,toValue: height}).start();
            }}>
              <View style={{backgroundColor:'#ffffff',width:width,height:160,alignSelf:'flex-end',flexDirection:'row'}}>
                <TouchableOpacity style={{flex:1,justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
                  wechat.shareToSession({
                    type: 'imageUrl',
                    mediaTagName: undefined,
                    messageAction: undefined,
                    messageExt: undefined,
                    imageUrl: this.shareImageURL
                  });
                  Animated.timing(this.state.offsetY, {duration: 100,toValue: height}).start();
                }}>
                  <Image source={CommonImg.WeiXinLogo} style={{width:50,height:50,alignSelf:'center'}}/>
                  <Text style={{fontSize:16,color:'#333333',alignSelf:'center',marginTop:15}}>微信好友</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
                  wechat.shareToTimeline({
                    type: 'imageUrl',
                    mediaTagName: undefined,
                    messageAction: undefined,
                    messageExt: undefined,
                    imageUrl: this.shareImageURL
                  });
                  Animated.timing(this.state.offsetY, {duration: 100,toValue: height}).start();
                }}>
                  <Image source={CommonImg.PyqLogo} style={{width:64,height:64,alignSelf:'center'}}/>
                  <Text style={{fontSize:16,color:'#333333',alignSelf:'center',marginTop:15}}>微信朋友圈</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
