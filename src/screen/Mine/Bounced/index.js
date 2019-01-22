import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet
} from 'react-native'

import {
  GradientButton,
  BouncedButton,
  BackgroundPicture
} from 'components/index'

import { WithdraWal } from 'images/index.js'

export default class Bounced extends Component{

  render () {
    const { visible, transparent,close } = this.props
    return (
      <Modal
        visible={ visible }
        transparent={ transparent }
        onRequestClose={() => {}}
        animationType="fade"
      >
        
        <View style={ styles.poshd}>
          <BackgroundPicture
            style={ styles.podhdYudn }
            source={ WithdraWal.BouncedBkguar }
          >
            <Text style={ styles.podhdTxt }>为保障数字资产安全</Text>
            <Text style={ styles.podhdTxts }>请您先完成以下步骤</Text>
            <Text style={ styles.podhmi}>设置交易密码</Text>
            <View style={ styles.nextBox }>
              <GradientButton
                style={ styles.next }
                title="去完成"
                source={ WithdraWal.Button }
                triggerClick={ () => {
                  close()
                  this.props.navigation.navigate('Trading')
                } }
              />
            </View>
          </BackgroundPicture>
          <BouncedButton
            style={ styles.buttonBut }
            textStyle={ styles.buttonButText }
            activeOpacity={ .8 }
            location="center"
            triggerClick={ close }
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  poshd:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  podhdYudn:{
    width: 280,
    height: 300,
    paddingBottom: 30,
    paddingTop: 12,
    borderRadius: 16
  },
  nextBox: {
    alignItems: 'center'
  },
  next :{
    width: 190,
    height: 50,
    marginTop: 26
  },
  podhdTxt: {
    fontSize: 20,
    color:'#2DB7E6',
    marginTop: 50,
    marginLeft: 50,
  },
  podhdTxts: {
    fontSize: 20,
    color:'#2DB7E6',
    marginTop: 10,
    marginLeft: 50,
  },
  podhmi :{
    fontSize: 20,
    color:'#4A4A4A',
    marginTop: 44,
    marginLeft:78,
  },
  buttonBut :{
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 40,
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 40
  },
  buttonButText: {
    fontSize: 20
  },

})