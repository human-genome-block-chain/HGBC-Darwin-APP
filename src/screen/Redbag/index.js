import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Animated,
  DeviceEventEmitter,
  WebView,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native'

import { RedbagImg, CommonImg } from 'images/index.js'

import { AppropriateInput, KeyboardSpacer } from 'components/index'

import { addPacket, getShareImage } from 'api/index'

import { connect } from 'react-redux'
import { setToastMsg, deleteToken } from 'actions/index'

import *as wechat from 'react-native-wechat'
const { width, height } = Dimensions.get("window")

class Redbag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: 0,
      number: 0,
      mark: '大吉大利',
      tradePass: '',
      PopUp: false,
      editable: true,
      pageUrl: '',
      offsetY: new Animated.Value(height),
      shareShow: false
    }
  }

  show () {
    this.state.tradePass = ''
    if (this.state.amount > 10000 || this.state.amount < 500) {
      this.props.setToastMsg('请输入正确的金额')
    } else if (this.state.amount%1 !== 0) {
      this.props.setToastMsg('碱基数量必须为整数')
    } else if (this.state.number < 1 || this.state.number > 100) {
      this.props.setToastMsg('请输入正确的红包个数')
    } else if (this.state.number%1 !== 0) {
      this.props.setToastMsg('红包个数必须为整数')
    } else {
      this.setState({
        PopUp: true,
        editable: false
      })
    }
  }

  cancel () {
    this.setState({
      PopUp: false,
      editable: true
    })
  }

  async _submit () {
    const { amount, number, mark, tradePass } = this.state

    if (tradePass === '') {
      this.props.setToastMsg('请输入正确的交易密码')
    } else {
      try {
        const result = await addPacket({ amount, number, mark, tradePass })

        this.setState({
          pageUrl: result.data,
          PopUp: false,
          shareShow: true
        })

        this.props.deleteToken(parseFloat(this.state.amount || 0))

        DeviceEventEmitter.emit('ShareReport');
      } catch (e) {}
    }
  }

  async getShareImage () {
    try {
      const result = await getShareImage({pageName:'redpacket',pageUrl:this.state.pageUrl})
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

  shareCancel () {
    Animated.timing(this.state.offsetY, {duration: 100,toValue: height}).start();
    this.setState({
      shareShow: false
    })
  }

  render () {
    const { navigation, isSetTradePass, token } = this.props

    return (
      <SafeAreaView style={ styles.redbag }>
        <ImageBackground
          style={ styles.backgroundImage }
          source={ RedbagImg.Background }
          style={{width: '100%', height: '100%'}}
        >
          <ScrollView>
            <View style={ styles.container }>
              <View style={ styles.box }>
                <View style={ styles.list }>
                  <Text stye={ styles.title }>总金额</Text>
                  <TextInput
                    style={ styles.input }
                    placeholder={ '500～10000' }
                    keyboardType='numeric'
                    returnKeyType="next"
                    maxLength={ 5 }
                    underlineColorAndroid="transparent"
                    editable={ this.state.editable }
                    onChangeText={ val => this.setState({ amount: val }) }
                  />
                  <Text style={ styles.info }>碱基</Text>
                </View>
                <Text style={ styles.lastToken }>余额：{ token.toFixed(2) } 碱基</Text>
                <View style={ styles.list }>
                  <Text stye={ styles.title }>红包个数</Text>
                  <TextInput
                    style={ styles.input2 }
                    placeholder={ '1～100' }
                    keyboardType='numeric'
                    returnKeyType="next"
                    maxLength={ 3 }
                    underlineColorAndroid="transparent"
                    editable={ this.state.editable }
                    onChangeText={ val => this.setState({ number: val }) }
                  />
                  <Text style={ styles.info }>个</Text>
                </View>
                <View style={ styles.list }>
                  <TextInput
                    style={ styles.input3 }
                    placeholder={ '大吉大利' }
                    editable={ this.state.editable }
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    onChangeText={ val => this.setState({ mark: val }) }
                  />
                </View>
                <TouchableOpacity
                  style={ styles.btnBox }
                  activeOpacity={ .8 }
                  onPress={ ()=> this.show() }
                >
                  <ImageBackground
                    style={ styles.btn }
                    source={ RedbagImg.Btn }
                    >
                      <Text style={ styles.btnText }>包个红包</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={ styles.infoMessage }>未被领取的红包，24小时后退回</Text>
                <Text style={ styles.infoMessage2 }>红包记录可在碱基收支明细中查询</Text>
              </View>
            </View>
          </ScrollView>

          {
            this.state.PopUp ? 
            <KeyboardSpacer>
              <View style={ styles.popUp }>
                <Text style={ styles.popClose } onPress={ ()=> this.cancel() }>取消</Text>
                <View style={ styles.popUpBox }>
                  <AppropriateInput
                    style={ styles.popUpInput }
                    placeholder={ '请输入交易密码' }
                    onChangeText={ val => this.setState({ tradePass: val }) }
                    returnKeyType="send"
                    maxLength={ 18 }
                    secureTextEntry={ true }
                    placeholderTextColor="#4A4A4A"
                    triggerClick={ () => this._submit() }
                  />
                  <View style={ styles.popUpInfo }>
                    <Text style={ styles.popUpInfoMessgae1 }>还没设置？</Text>
                    <Text style={ styles.popUpInfoMessgae2 } onPress={ () => navigation.navigate(isSetTradePass ? 'ToReset' : 'Trading') }>去设置</Text>
                  </View>
                  <ImageBackground
                    style={ styles.popBtn }
                    source={ RedbagImg.Btn }
                  >
                    <Text style={ styles.popBtnText } onPress={ () => this._submit() }>确定</Text>
                  </ImageBackground>
                </View>
              </View>
            </KeyboardSpacer> : null
          }

          {
            this.state.shareShow ?
            <View style={{flex:1}}>
              <WebView
                source={{uri: this.url}}
                bounces={ true }
                domStorageEnabled={ true }
                scalesPageToFit={ true }
              />
              <Animated.View style={{transform: [{translateY: this.state.offsetY}],backgroundColor:'rgba(52,52,52,0.5)',position: "absolute",bottom:0,left:0}}>
                <TouchableOpacity style={{width:width,height:height,alignItems:'flex-end',justifyContent:'flex-end'}} activeOpacity={1.0} onPress={()=>{
                  this.shareCancel()
                }}>
                  <View style={{backgroundColor:'#fff',width:width,height:160,alignSelf:'flex-end',flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1,justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{
                      wechat.shareToSession({
                        type: 'imageUrl',
                        mediaTagName: undefined,
                        messageAction: undefined,
                        messageExt: undefined,
                        imageUrl: this.shareImageURL
                      });
                      this.shareCancel()
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
                      this.shareCancel()
                    }}>
                      <Image source={CommonImg.PyqLogo} style={{width:64,height:64,alignSelf:'center'}}/>
                      <Text style={{fontSize:16,color:'#333333',alignSelf:'center',marginTop:15}}>微信朋友圈</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View> : null
          }
        </ImageBackground>
      </SafeAreaView>
      
    )
  }
}

export default connect(state => ({
  token: state.home.token_count,
  isSetTradePass: state.userInfo.is_setTradePass > 0
}), dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg)),
  deleteToken: token => dispatch(deleteToken(token))
}))(Redbag)

const styles = StyleSheet.create({
  redbag: {
    flex: 1,
  },
  backgroundImage: {
    position: 'relative'
  },
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
  },
  box: {
    backgroundColor: '#fff',
    width: 310,
    height: 380,
    borderRadius: 20,
    padding: 40
  },
  list: {
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderColor:'#EFEFEF',
    position: 'relative'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: 130,
    padding: 0,
    position: 'absolute',
    right: 40
  },
  input2: {
    width: 130,
    padding: 0,
    position: 'absolute',
    right: 25
  },
  info: {
    position: 'absolute',
    right: 0,
    fontSize: 14,
    color: '#333'
  },
  lastToken: {
    color: '#9B9B9B',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 40
  },
  input3: {
    marginTop: 40,
    fontSize: 16,
    color: '#9B9B9B'
  },
  btnBox: {
    width: 104,
    height: 33,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35
  },
  btn: {
    width: 104,
    height: 33
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 33,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  infoMessage: {
    color: '#9B9B9B',
    fontSize: 10,
    marginTop: 25,
    textAlign: 'center'
  },
  infoMessage2: {
    color: '#9B9B9B',
    fontSize: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  popUp: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: 170,
    paddingRight: 20,
    paddingTop: 20
  },
  popClose: {
    textAlign: 'right',
    fontSize: 14
  },
  popUpBox: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  popUpInput: {
    paddingBottom: 5,
    paddingLeft: 0,
    borderBottomWidth: 0.3,
    borderColor:'#EFEFEF',
  },
  popUpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  popUpInfoMessgae1: {
    color: '#9B9B9B',
    fontSize: 12
  },
  popUpInfoMessgae2: {
    fontSize: 12
  },
  popBtn: {
    width: 104,
    height: 33,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  popBtnText: {
    textAlign: 'center',
    lineHeight: 33,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }
})