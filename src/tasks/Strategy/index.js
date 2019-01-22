import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { GradientButton, AndroidWhiteBar, TaskSuccessButton } from 'components/index'

import { TaskImg } from 'images/index'

import { setPower, setTasks } from 'actions/index'

import { readRecord } from 'api/index'

class SignIn extends Component{
  async receive () {
    try {
      await readRecord()
      this.props.setPower(1)
      this.props.setTasks({ strategy: { is_finish: 0 } })
    } catch (e) {}
  }

  render () {
    const isReceive = this.props.strategy.is_finish <= 0

    return (
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }
      >
        <AndroidWhiteBar />
        <View style={ styles.main }>
          <Text style={ styles.title }>星球攻略</Text>
          <Text style={ styles.content }>请保证达尔文星球上除账户信息外所有跟人体相关的数据属于同一个人。若数据所属不一致，可能会对数据应用结果产生很大的影响。</Text>
          {
            isReceive ?
            <View style={ styles.imageBox }>
              <Image 
                source={ TaskImg.SuccessSmall }
                resizeMode="cover"
              />
            </View> : null
          }
        </View>
        <View style={ styles.buttonsBox }>
          { 
            isReceive ?
            <TaskSuccessButton />
            : 
            <GradientButton
              style={ styles.button }
              title="我了解了"
              triggerClick={ () => this.receive() }
            />
          }
        </View>
      </ScrollView>
    )
  }
}

export default connect(state => ({ ...state.tasks }), dispatch => ({
  setPower: num => dispatch(setPower(num)),
  setTasks: data => dispatch(setTasks(data))
}))(SignIn)

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
  title: {
    fontSize: 20,
    color: '#323232',
    fontWeight: '600',
    marginBottom: 12
  },
  content: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 26
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
  button: {
    width: 300,
    height: 60
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
  }
})