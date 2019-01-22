import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'
import *as wechat from 'react-native-wechat'
import platformDiff from 'util/platformDiff'
import { BackgroundPicture, HeaderLeft, AndroidTranslucentBar } from 'components/index'
import CreateCode from './CreateCode/index'
import { TaskImg, CommonImg } from 'images/index'
import { getShareImage } from 'api/index'
const { width, height } = Dimensions.get("window")
class QRCode extends Component{
  constructor (props) {
    super(props)
    this.state = {
      offsetY: new Animated.Value(height),
    }
  }
  back () {
    StatusBar.setBarStyle('dark-content')
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')
    platformDiff.isAndroid && StatusBar.setTranslucent(false)
    this.props.navigation.goBack()
  }
  componentDidMount(){
  }
  async getShareImage () {
    try {
      const result = await getShareImage({pageName:'invest',pageUrl:"invest"})
      this.shareImageURL = result.data.imgUrl
      Animated.timing(this.state.offsetY, {duration: 100,toValue: 0}).start();
    } catch (e) {}
  }
  render () {
    const { username, investcode, data } = this.props

    return (
      <BackgroundPicture
        source={ TaskImg.QrCodeBg }
        style={ styles.bgMain }
      >
        <AndroidTranslucentBar>
          <HeaderLeft
            triggerBack={ () => this.back() }
            buttonStyle={ styles.goBack }
            source={ CommonImg.WhiteBack }
          />
          <ScrollView
            style={ styles.container }
            showsVerticalScrollIndicator={ false }
          >
            <View style={ styles.main }>
              <Text style={ styles.title }>达尔文星球</Text>
              <Text style={ styles.introduction }>个人健康数据价值共享平台</Text>
            </View>
            <View style={ styles.content }>
              <Text style={ styles.label }>邀请码</Text>
              <Text style={ styles.code }>{ investcode }</Text>
              <Text style={ styles.invitation }>{ username }</Text>
              <Text style={ [styles.invitation, styles.invitationMargin] }>邀请你加入达尔文星球</Text>
              <Text style={ [styles.blueText, styles.fontWeightBlod] }>一起来瓜分180万碱基</Text>
              <Text style={ styles.blueText }>现在加入，额外赠送2挖矿算力</Text>
            </View>
            <View style={ styles.gray }>
              <CreateCode
                url={ data }
              />
              <Text style={ styles.holdDown }>长按识别去注册</Text>
            </View>
          </ScrollView>
        </AndroidTranslucentBar>
        <TouchableOpacity style={{position:'absolute',top:20,right:0,padding:15}}  onPress={()=>{
          console.log('12312312321');
          this.getShareImage()
        }} activeOpacity={0.8}>
          <Text style={{fontSize:16,color:'#ffffff'}}>分享</Text>
        </TouchableOpacity>
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
      </BackgroundPicture>
    )
  }
}

export default connect(state => ({ ...state.tasks }))(QRCode)

const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    ...ifIphoneX({
      paddingTop: 44
    },{
      paddingTop: 20
    })
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  goBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 54,
    height: 44,
    zIndex: 999
  },
  main: {
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    fontSize: 50,
    color: '#fff',
    fontWeight: '900',
    lineHeight: 73,
    marginBottom: 13
  },
  introduction: {
    fontSize: 16,
    color: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingTop: 28,
    paddingBottom: 25,
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: '#8B92AC'
  },
  code: {
    fontSize: 40,
    color: '#262626',
    lineHeight: 56
  },
  gradientButton: {
    width: 240,
    height: 50,
    marginTop: 17,
    marginBottom: 28
  },
  blueText: {
    color: '#595959',
    fontSize: 17
  },
  fontWeightBlod: {
    fontWeight: '600'
  },
  gray: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'
  },
  holdDown: {
    fontSize: 15,
    color: '#7B7F94',
    marginTop: 12
  },
  invitation: {
    color: '#40B1FF',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28
  },
  invitationMargin: {
    marginBottom: 20
  }
})
