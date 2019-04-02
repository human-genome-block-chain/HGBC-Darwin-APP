import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import platformDiff from 'util/platformDiff'
import { TaskImg } from 'images/index'

export default class Options extends Component{
  static defaultProps = {
    isShow: false,
    close: () => {}
  }

  static propTypes = {
    isShow: PropTypes.bool,
    close: PropTypes.func
  }

  render () {
    const { isShow, close, navigation } = this.props

    return (
      isShow ? <TouchableWithoutFeedback onPress={ close }>
        <View style={ styles.optionsBox }>
          <Image
            style={ styles.triangle }
            source={ TaskImg.Triangle }
          />
          <View style={ styles.options }>
            <Text
              style={ styles.optionsText }
              onPress={ () => {
                close()
                navigation.navigate('Myscene')
              } }
            >基因组数据</Text>
            {/* <Text
              style={ styles.optionsText }
              onPress={ () => {
                close()
                navigation.navigate('Incentive')
              } }
            >测序奖励</Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback> : null
    )
  }
}

const styles = StyleSheet.create({
  optionsBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
    zIndex: 9999
  },
  options: {
    position: 'absolute',
    width: 100,
    right: 15,
    backgroundColor: '#fff',
    ...ifIphoneX({
      top: 88
    },{
      top: platformDiff.isAndroid ? 44 : 64
    }),
    borderRadius: 6,
    paddingTop: 19,
    paddingBottom: 7
  },
  optionsText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center'
  },
  triangle: {
    position: 'absolute',
    width: 14,
    height: 9,
    right: 29,
    ...ifIphoneX({
      top: 80
    },{
      top: platformDiff.isAndroid ? 36 : 56
    })
  }
})