import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { TextButton } from 'components/index'


export default class PopUp extends Component{
  visiblefdse (){
    this.props.navigation.navigate('ResetPwdUserName')
  }

  reacdsyfg (){
    this.props.navigation.navigate('ForgetUsernames')
  }

  render () {
    const { visible, close } = this.props

    return (
      visible ?
      <View style={ styles.podhdYudn }>
        <View style={ styles.holdingThe }>
            <TextButton
            style={ styles.theUserName }
            textStyle={ styles.buttonButText }
            activeOpacity={ .8 }
            location="center"
            triggerClick={ () => {
              close()
              this.reacdsyfg()} }
          >找回用户名</TextButton>
          <TextButton
            style={ styles.resetPassword }
            textStyle={ styles.buttonButText }
            activeOpacity={ .8 }
            location="center"
            triggerClick={ () => {
              close()
              this.visiblefdse()} }
          >重置登录密码</TextButton>
        </View>
        <TextButton
          style={ styles.buttonBut }
          textStyle={ styles.buttonButText }
          activeOpacity={ .8 }
          location="center"
          triggerClick={ close }
        >取消</TextButton>
      </View> : null
    )
  }
}

const styles = StyleSheet.create({
  podhdYudn:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 20,
    backgroundColor: 'rgba(0,0,0,.2)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBut :{
    backgroundColor: 'white',
    height: 46,
    borderRadius: 20,
    marginTop: 10,
    width: 320
  },
  buttonButText: {
    fontSize: 20,
    color:'#000',
    marginTop: 15
  },
  theUserName :{
    height: 56,
    width: 320,
    borderBottomWidth: .3,
    borderColor: '#ccc'
  },
  resetPassword :{
    height: 56,
    width: 320,
  },
  holdingThe :{
    borderBottomWidth: .3,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: 'white'
  }
})
