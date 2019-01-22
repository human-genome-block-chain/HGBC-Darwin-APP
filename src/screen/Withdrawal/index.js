import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  TextButton,
  TaskSuccessButton
} from 'components/index'

import { isAddress } from 'util/validation'

import { addOrder,checkTradePass } from 'api/index'

import { setToastMsg, deleteToken } from 'actions/index'
import { CommonImg, WithdraWal } from 'images/index'
import platformDiff from 'util/platformDiff'

import Rules from './Rules/index'
import PopUp from './PopUp/index'

class Withdrawal extends Component {
   static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TextButton
        style={ styles.routerBreaks }
        textStyle={ styles.routerBreakText }
        activeOpacity={ .8 }
        location="center"
        triggerClick={ () => navigation.navigate('TheOrderDetails') }
      >订单</TextButton>
    )
  })
  
  constructor (props) {
    super(props)
    this.state = {
      walletAddress:'',
      amount: '',
      visible: false,
      transparent: true,
      errorText: '',
      isDisabled: true,
      isSuccessfully: false,
      isFire: true
    }
  }

  open () {
    this.setState({ visible: true, errorText: '' })
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#ccc')
  }

  changeText (type, val) {
    this.setState({ [type]: val, errorText: ''}, () => this._audit())
  }

  close () {
    this.setState({ visible: false })
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')
  }

  changeText (type, val) {
    this.setState({ [type]: val }, () => this._audit())
  }

  addressValidation () {
    if (this.state.walletAddress && !isAddress(this.state.walletAddress)) this.props.setToastMsg('无效的二维码')
  }

  qrCodeVerification (qrCode, err) {
    if (err || !isAddress(qrCode)) {
      this.props.setToastMsg('无效的二维码')

      return false
    }

    this.changeText('walletAddress', qrCode)
  }

  _audit () {
    const { walletAddress, amount } = this.state

    try {
      if (!walletAddress) throw '地址不能为空'

      if (!isAddress(walletAddress)) throw '钱包地址不正确'

      if (!amount) throw '数量不能为空'

      if (amount > parseFloat(this.props.token.toFixed(2))) throw '数量不正确'

    } catch (e) {

      this.setState({ isDisabled: true })

      return false
    }

    this.setState({ isDisabled: false })
  }

  async validation (tradePass) {
    this.setState({ isFire: false })

    try {

      await checkTradePass({ tradePass })
     
      this._next(tradePass)
      
    }catch (e) {
      this.setState({
        errorText: e,
        isFire: true
      })
    }
  }

  async _next (tradePass) {
    const { walletAddress, amount } = this.state

    try {
      await addOrder({
        walletAddress,
        amount,
        tradePass
      })
      
      this.setState({
        visible: false,
        transparent: true,
        isSuccessfully: true,
        isFire: true
      })

      platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')

      this.props.deleteToken(parseFloat(this.state.amount || 0))
    }catch (err) {
      this.setState({
        errorText: err,
        isFire: true
      })

      return false
    }
  }

  _receive (data) {
    this.changeText('walletAddress', data.walletaddress)
  }

  render () {
    return (
      <SafeAreaView style={ styles.content }>
      {
        !this.state.isSuccessfully ? 
        <View style={ styles.content }>
          <ScrollView
            style={ styles.container }
            showsVerticalScrollIndicator={ false }
          >
            <View style={ styles.titleView }>
              <Text style={ styles.title }>碱基提现</Text>
            </View>
            <View style={ styles.titlest }>
              <Text style={ styles.titleText }>钱包地址</Text>
              <GradientButton
                style={ [styles.cancelButton, styles.arrow]}
                source={ CommonImg.Flickingsa }
                triggerClick={ () => this.props.navigation.navigate('Scanning', { 
                  callback: this.qrCodeVerification.bind(this), 
                  type: 'wallet'
                }) }
              />
              <GradientButton
                style={ [styles.cancelButton,styles.arrowsd]}
                source={ CommonImg.Management }
                triggerClick={ () => this.props.navigation.navigate('WalletAddres', { 
                  callback: this._receive.bind(this),
                  isGoBack: true
                }) }
              />
              <View style={ styles.textInputBox }>
                <AppropriateInput
                  style={ styles.textInput }
                  defaultValue={ this.state.walletAddress }
                  placeholder={ '请输入钱包地址' }
                  maxLength={ 70 }
                  onBlurCallback={ () => this.addressValidation() }
                  returnKeyType="next"
                  onChangeText={ val => this.changeText('walletAddress', val) }
                />
              </View>
            </View>
            <View style={ styles.titlest }>
              <Text style={ styles.titleText }>数量</Text>
              <View style={ styles.inputContainer }>
                <View style={ styles.textInputBox }>
                  <AppropriateInput
                    style={ styles.textInput }
                    placeholder={ '请输入数量' }
                    defaultValue={ this.state.amount }
                    onChangeText={ val => this.changeText('amount', val) }
                    returnKeyType="send"
                    clearButtonMode="never"
                    keyboardType="numeric"
                    maxLength={ 20 }
                    triggerSubmit={ () => this.open() }
                  />
                </View>
                {/* <TextButton
                  style={ styles.forgotPasswordBox }
                  textStyle={ styles.forgotPasswordText }
                  location="right"
                  triggerClick={ () => this.changeText('amount', this.props.token.toFixed(2)) }
                >全部</TextButton> */}
                <Text style={ styles.hgbcPosition }>碱基</Text>
              </View>
              <View style={ styles.amountBox }>
                <Text style={ styles.amount }>总量：{ this.props.token.toFixed(2) } 碱基</Text>
                <Text style={ styles.amount }>可提：{ (this.props.token > 3000) ?  (this.props.token - 3000).toFixed(2) : 0 } 碱基</Text>
              </View>
            </View>
            <View style={ styles.titlest }>
              <Text style={ styles.poundage }>手续费</Text>
              <Text style={ styles.hgbc }>10 碱基</Text>
            </View>
            <Rules />
            <View style={ styles.block } />
          </ScrollView>
          <View style={ styles.gradientBox }>
            {
              this.state.isDisabled ? 
              <View style={ styles.disabledButton }>
                <Text style={ styles.disableText }>提现</Text>
              </View>:
              <GradientButton
                style={ styles.gradientButton }
                title="提现"
                triggerClick={ ()=> this.open() }
              />
            }
          </View>
          <PopUp 
            visible={ this.state.visible }
            transparent={ this.state.transparent }
            errorText={ this.state.errorText }
            triggerClick={ tradePass => this.validation(tradePass) }
            close={ () => this.close() }
            isFire={ this.state.isFire }
          />
        </View>:
        <View style={ styles.content }>
            <View style={ [styles.titleView, styles.paddingLeft] }>
              <Text style={ styles.title }>碱基提现</Text>
            </View>
            <View style={ styles.imgBox }>
              <Image
                source={ WithdraWal.NoAddress }
              />
              <Text style={ styles.successfully }>提现申请已提交</Text>
              <TaskSuccessButton title="完成"/>
            </View>
        </View>
      }
      </SafeAreaView>
    )
  }
}

export default connect(state => ({
  token: state.home.token_count
}), dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg)),
  deleteToken: token => dispatch(deleteToken(token))
}))(Withdrawal)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 25
  },
  paddingLeft: {
    paddingLeft: 25
  },
  titleView:{
    paddingTop: 5
  },
  title :{
    fontSize: 26,
    fontWeight: '600',
    color:'#000'
  },
  titlest :{
    paddingTop: 22,
    marginRight: 24
  },
  titleText :{
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A'
  },
  cancelButton: {
    width: 19,
    height: 19
  },
  arrow: {
    position: 'absolute',
    top: 22,
    right: 44
  },
  arrowsd: {
    position: 'absolute',
    top: 22,
    right: 14
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row'
  },
  textInputBox: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderBottomWidth: .5,
    borderBottomColor: '#DADBDC'
  },
  forgotPasswordBox: {
    width: 38
  },
  forgotPasswordText: {
    lineHeight: 46,
    fontSize: 14
  },
  hgbcPosition: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    fontSize: 14,
    color: '#2D2D2D',
    lineHeight: 40
  },
  textInput: {
    flex: 1,
    paddingTop: 12
  },
  titleQbu: {
    fontSize: 14,
    color: '#40B1FF',
    flex: 1
  },
  amountBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  amount: {
    fontSize: 14,
    color:'#2D2D2D',
    paddingTop: 10,
    marginRight: 10
  },
  poundage: {
    fontSize: 18,
    color: '#000',
    paddingTop: 8
  },
  hgbc: {
    fontSize: 15,
    color: '#40B1FF',
    marginTop: 12
  },
  gradientBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientButton: {
    width: 300,
    height: 60
  },
  headerRight: {
    width: 20,
    flex: 1
  },
  routerBreaks: {
    width: 70,
    height: 44
  },
  routerBreakText: {
    lineHeight: 44,
    fontSize: 14
  },
  block: {
    height: 120
  },
  disabledButton: {
    width: 280,
    height: 48,
    borderRadius: 48,
    backgroundColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disableText: {
    color: '#fff',
    fontSize: 15
  },
  imgBox: {
    marginTop: 106,
    alignItems: 'center',
  },
  successfully: {
    fontSize: 17,
    color: '#8b98a1',
    marginTop: 23,
    marginBottom: 45
  }
})