import React, { Component } from 'react'
import {
  View,
  Text,
  Linking,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { GradientButton } from 'components/index'

import { CommonImg } from 'images/index'

import { setUpdataStatus } from 'actions/index'

class Update extends Component{
  download () {
    Linking.openURL(this.props.newUrl)
  }
  
  render () {
    const {
      version,
      newState,
      newInformation,
      newVersion,
      newVersionName,
      setUpdataStatus
    } = this.props

    const isShow = version != newVersion && newVersion

    return (
      isShow ?
      <View style={ styles.background }>
        <View style={ styles.container }>
          <View style={ styles.main }>
            <Text style={ styles.title }>升级提醒</Text>
            <Text style={ styles.versionText }>最新版：{ newVersionName }</Text>
          </View>
          <View style={ styles.content }>
            <Text style={ styles.contentText }>
              【新增】
              <Text style={ styles.fontWeight }>
                { newInformation }
              </Text>
            </Text>
            <Text style={ styles.contentText }>
              【优化】
              <Text style={ styles.fontWeight }>
                优化部分Bug
              </Text>
            </Text>
          </View>
          {
            newState === 2 ?
            <GradientButton
              style={ styles.singleButton }
              title="前往下载"
              triggerClick={ () => this.download() }
            />:
            <View style={ styles.towButtons }>
              <GradientButton
                style={ styles.downloadButton }
                title="取消"
                source={ CommonImg.CancelButton }
                triggerClick={ () => {
                  setUpdataStatus({ newVersion: version })
                } }
              />
              <GradientButton
                style={ styles.cancelButton }
                title="前往下载"
                source={ CommonImg.TeskButton }
                triggerClick={ () => this.download() }
              />
            </View>
          }
        </View>
      </View>: null
    )
  }
}

export default connect(state => ({ ...state.userInfo, ...state.upload }), dispatch => ({
  setUpdataStatus: data => dispatch(setUpdataStatus(data))
}))(Update)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    zIndex: 9999,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 30
  },
  container: {
    height: 350,
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 29
  },
  main: {
    alignItems: 'center',
    marginBottom: 4
  },
  title: {
    fontSize: 33,
    color: '#2DB7E6'
  },
  versionText: {
    fontSize: 13,
    color: '#474B5C',
    marginTop: 12
  },
  content: {
    marginTop: 30,
    paddingLeft: 10,
    marginBottom: 45,
    height: 90
  },
  contentText: {
    fontSize: 15,
    color: '#4F5E6B',
    fontWeight: '300',
    marginBottom: 8
  },
  fontWeight: {
    color: '#333',
    fontWeight: 'bold'
  },
  singleButton: {
    height: 56
  },
  towButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelButton: {
    width: 120,
    height: 60,
  },
  downloadButton: {
    width: 130,
    height: 50,
    marginTop: 8,
    marginLeft: -2
  }
})