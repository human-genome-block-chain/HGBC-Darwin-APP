import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet
} from 'react-native'

import { GradientButton } from 'components/index'

import { TaskImg} from 'images/index'

import { TaskSuccessButton } from 'components/index'

import { connect } from 'react-redux'

class BasicInformation extends Component{

  render () {
    const isBaseinfo = this.props.is_finish <=0

    return (
      <SafeAreaView style={ styles.main }>
        { isBaseinfo ?
          <View>
            <View style={ styles.finishImgBox }>
              <Image 
                source={ TaskImg.BasicInformationFinish }
                resizeMode="cover"
              />
              <Text style={ styles.finishText }>基础信息已收录</Text>
              <TaskSuccessButton/>
              <Text style={ styles.tost }>一年内无法修改</Text>
            </View>
          </View> :

          <View>
            <View style={ styles.imgBox }>
              <Image 
                source={ TaskImg.BasicInformationIcon }
                resizeMode="cover"
              />
            </View>
            <Text style={ styles.text }>个人基础信息是链上身份的基石</Text>
            <Text style={ styles.text }>个人基础信息填写完成后，一年内无法更改</Text>
            <Text style={ styles.text }>基础信息的准确性与基因健康应用的 结果密切相关</Text>
            <Text style={ styles.text }>请保证个人基础信息和基因健康数据 属于同一个人</Text>
            <View style={ styles.gradientButtonBox }>
              <GradientButton
                style={ styles.gradientButton }
                title="开始填写"
                triggerClick={ () => this.props.navigation.navigate('Information') }
              />
            </View>
          </View>
        }
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.tasks.baseinfo }))(BasicInformation)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  imgBox: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 20
  },
  finishImgBox: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  text: {
    paddingLeft: 70,
    paddingRight: 70,
    color: '#000',
    marginBottom: 20
  },
  finishText: {
    marginTop: 20
  },
  gradientButtonBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  gradientButton: {
    width: 300,
    height: 66,
    justifyContent: 'center',
  },
  tost: {
    color: '#DCDDDD',
    fontSize: 10
  }
})