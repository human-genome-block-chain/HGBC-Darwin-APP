import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Image
} from 'react-native'

import {
  AppropriateInput,
  GradientButton,
  TextButton,
  KeyboardSpacer,
  JumpList
} from 'components/index'

import platformDiff from 'util/platformDiff'

import { ApplicationImg } from 'images/index'

export default class PopUp extends Component{
  constructor (props) {
    super(props)

    this.state = {
      tradePass: '',
      keyboardHeight: 0,
      bottom: 0
    }
  }

  render () {
    const { visible, transparent, errorText, triggerClick, close, isFire, locs, price, stateList, appid } = this.props

    return (
      <Modal
        visible={ visible }
        transparent={ transparent }
        onRequestClose={() => {}}
        animationType="fade"
      >
        <KeyboardSpacer>
          <View style={ styles.poshd}>
          <KeyboardAvoidingView style={styles.podhdYudn2} behavior={platformDiff.isAndroid ? null : 'position'}>
            <View style={ [styles.podhdYudn] }>
              <View style={ styles.honde }>
                <Text style={ styles.qDing}>数据授权与支付</Text>
                <TextButton
                  style={ styles.buttonBut }
                  textStyle={ styles.buttonButText }
                  activeOpacity={ .8 }
                  location="right"
                  triggerClick={ close }
                >取消</TextButton>
              </View>
              <JumpList
                style={ styles.textLiTitle }
                title="授权数据"
                isArrow={ false }
              >
                <Text style={ styles.textLiText }>{ stateList.scode }</Text>
              </JumpList>
              <JumpList
                style={ styles.textLiTitle }
                title="位点信息："
                isArrow={ false }
                triggerClick={ () => { 
                  close()
                  this.props.navigation.navigate('ApplySiteList', {appid}) }}
              >
                <Text style={ styles.textLiLeftText }>{locs[0]}  {locs[1]}  {locs[2]}</Text>
                <Image
                  source={ ApplicationImg.More }
                  style={ styles.textLiMoreImg }
                />
              </JumpList>
              <JumpList
                style={ styles.textLiTitle }
                title="需要支付"
                isArrow={ false }
              >
                <Text style={ styles.textLiText }>{price} HGBC</Text>
              </JumpList>
              <View style={ styles.textInputBox }>
                <AppropriateInput 
                  style={ styles.textInput }
                  placeholder={ '请输入交易密码' }
                  onChangeText={ val => this.setState({ tradePass: val }) }
                  returnKeyType="send"
                  maxLength={ 18 }
                  secureTextEntry={ true }
                  placeholderTextColor="#4A4A4A"
                  onBlurCallback={ () => this.setState({ bottom: 0 }) }
                  triggerSubmit={ () => triggerClick(this.state.tradePass) }
                />
              </View>
              <View>
                <Text style={ styles.colorRed }>{ errorText }</Text>
              </View>
              <View style={ styles.nextBox }>
                {
                  isFire ?
                  <GradientButton
                    style={ styles.next }
                    title="确定"
                    triggerClick={ () => triggerClick(this.state.tradePass) }
                  />:
                  <View style={ styles.disableButtonBox }>
                    <ActivityIndicator size="small" color="#000" />
                    <Text style={ styles.disabledText }>请稍后...</Text>
                  </View>
                }
              </View>
            </View>
            </KeyboardAvoidingView>
          </View>
        </KeyboardSpacer>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  poshd:{
    flex: 1
  },
  podhdYudn:{
    height: 380,
    backgroundColor: 'white',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 28,
    paddingBottom: 30,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  podhdYudn2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  honde :{
    flexDirection: 'row'
  },
  qDing :{
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    flex: 1
  },
  buttonBut :{
    flex: 1
  },
  buttonButText: {
    fontSize: 20
  },
  textLiTitle: {
    flexDirection: 'row'
  },
  textLiText: {
    flex: 1,
    lineHeight: 44,
    textAlign: 'right'
  },
  textLiLeftText: {
    flex: 1,
    lineHeight: 44,
    textAlign: 'left',
    color: '#444'
  },
  textLiMoreImg: {
    marginTop: 10
  },
  textInputBox: {
    flexDirection: 'row',
    height: 45,
    borderBottomWidth: .5,
    borderBottomColor: '#DADBDC'
  },
  textInput: {
    flex: 1,
    paddingTop: 12
  },
  colorRed :{
    color: '#F37979',
    fontSize: 13,
    height: 36,
    lineHeight: 36
  },
  nextBox: {
    alignItems: 'center'
  },
  next :{
    width: 300,
    height: 60
  },
  disableButtonBox: {
    width: 280,
    height: 48,
    backgroundColor: '#ccc',
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  disabledText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333'
  }
})