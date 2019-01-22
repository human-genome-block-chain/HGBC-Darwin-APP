import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import {
  GradientButton,
  AndroidWhiteBar,
  AppropriateInput
} from 'components/index'

import { addWalletAddress, updateWalletAddress } from 'api/index'
import { CommonImg } from 'images/index'
import { isAddress } from 'util/validation'
import { setToastMsg } from 'actions/index'

class AddressThe extends Component {
  constructor (props) {
    super(props)

    const data = props.navigation.getParam('data', {walletName: '', walletAddress: '', id: 0})

    this.state = {
      walletName: data.walletname,
      walletAddress: data.walletaddress,
      id: data.id
    }

    this.timer = null
  }

  changeText (type, val) {
    this.setState({ [type]: val })
  }

  qrCodeVerification (qrCode, err) {
    if (err || !isAddress(qrCode)) {
      this.props.setToastMsg('无效的二维码')

      return false
    }

    this.changeText('walletAddress', qrCode)
  }

  validation () {
    try {
      if (!isAddress(this.state.walletAddress)) '无效的二维码'
    }catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this.props.navigation.getParam('isEdit', false) ? this._edit() : this._add()
  }

  async _add () {
    const { navigation, setToastMsg } = this.props

    const { walletName, walletAddress } = this.state

    try {
      await addWalletAddress({walletName, walletAddress})

      setToastMsg('添加成功')
      
      navigation.getParam('callback', () => {})()
      this.timer = setTimeout (() => {
        navigation.goBack()
      }, 1000)
    }catch (e) {}
  }

  async _edit () {
    const { navigation, setToastMsg } = this.props

    try {
      await updateWalletAddress({...this.state})

      setToastMsg('修改成功')

      navigation.getParam('callback', () => {})()
      this.timer = setTimeout (() => {
        navigation.goBack()
      }, 1000)
    }catch (e) {}
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  
  render() {
    return (
       <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
          <ScrollView
            style={ styles.main }
            showsVerticalScrollIndicator={ false }
          >
            <View>
              <Text style={ styles.title }>{ this.props.navigation.getParam('type', '新增钱包地址') }</Text>
              <Text style={ styles.oneaddress }>地址名称</Text>
            </View>
            <View style={ styles.textInputBox }>
            <AppropriateInput
                style={ styles.textInput }
                placeholder={ '地址名称' }
                maxLength={ 30 }
                defaultValue={ this.state.walletName }
                returnKeyType="next"
                placeholderTextColor="#000"
                onChangeText={ val => this.changeText('walletName', val) }
              />
            </View>
            <View>
              <Text style={ styles.oneaddress }>钱包地址 </Text>
              <GradientButton
                style={ [styles.cancelButton, styles.arrow]}
                source={ CommonImg.Flickingsa }
                triggerClick={ () => this.props.navigation.navigate('Scanning', { 
                  callback: this.qrCodeVerification.bind(this), 
                  type: 'wallet'
              }) }
            />
            </View>
            <View style={ styles.textInputBox }>
            <AppropriateInput
              style={ styles.textInput }
              placeholder={ '请输入钱包地址' }
              returnKeyType="send"
              maxLength={ 70 }
              placeholderTextColor="#000"
              defaultValue={ this.state.walletAddress }
              onChangeText={ val => this.changeText('walletAddress', val) }
              triggerSubmit={ this.validation.bind(this) }
            />
            </View>
            <View style={ styles.buttonBox }>
              <GradientButton
                style={ styles.next }
                title="保存"
                triggerClick={ this.validation.bind(this) }
              ></GradientButton>
            </View>
          </ScrollView>
           
      </SafeAreaView> 
    )
  }
}
export default connect(null, dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(AddressThe)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerRight: {
    width: 20,
    flex: 1
  },
  main: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor:'#fff',
  },
  cancelButton: {
    width: 19,
    height: 19
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    paddingLeft: 6
  },
  routerBreaks: {
    width: 70,
    height: 44
  },
  routerBreakText: {
    lineHeight:44,
    fontSize: 14
  },
  buttonBox: {
    alignItems: 'center'
  },
  next: {
    marginTop: 36,
    height: 66,
    width: 300
  },
  arrow :{
    position: 'absolute',
    top:24,
    right:38
  },
  oneaddress :{
    paddingTop: 10,
    paddingLeft:10,
    paddingBottom: 10,
    paddingRight:10,
    marginTop:16,
    borderRadius: 10,
    color:'#9496A0'
  },
  addressText :{
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    fontSize:18,
    color:'#444444'
  },
  addressCon :{
    paddingTop: 16,
    paddingBottom: 10,
    paddingRight:10,
    fontSize:14,
    color:'#9496A0',
    lineHeight: 20
  },
  adddressTa :{
    paddingTop: 18
  },
  textInputBox: {
    borderBottomWidth: .5,
    borderBottomColor:'#DADBDC',
    marginRight: 30,
    marginLeft: 10
  },
  textInput: {
    flex:1,
  },
})