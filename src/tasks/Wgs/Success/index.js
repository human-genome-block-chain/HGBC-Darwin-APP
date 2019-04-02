import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { AndroidWhiteBar, TaskSuccessButton } from 'components/index'
import { TaskImg } from 'images/index'

class Success extends Component{
  render () {
    return (
      <View style={ styles.container }>
        <AndroidWhiteBar />
        <View style={ styles.main }>
          <View style={ styles.imageBox }>
            <Image 
              source={ TaskImg.Success }
              resizeMode="cover"
            />
            <Text style={ styles.success }>绑定成功</Text>
            <Text style={ styles.title }>唾液采集器编号</Text>
            <Text style={ styles.scode }>{ this.props.text }</Text>
            <Text style={ styles.title }>已增加{ this.props.add_power }算力</Text>
          </View>
        </View>
        <TaskSuccessButton />
      </View>
    )
  }
}

export default connect(state => ({ ...state.home }))(Success)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  main: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 30
  },
  imageBox: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 20
  },
  buttonsBox: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center'
  },
  disableButton: {
    borderColor: '#2AC8D9',
    borderWidth: .3,
    borderRadius: 44,
    width: 300,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disableText: {
    fontSize: 15,
    color: '#40B1FF'
  },
  success: {
    fontSize: 26,
    color: '#40B1FF',
    marginBottom: 50,
    marginTop: 14
  },
  scode: {
    fontSize: 20,
    color: '#40B1FF',
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    color: '#474B5C',
    marginBottom: 10
  }
})