import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { TextButton, HeaderLeft } from 'components/index'

import platformDiff from 'util/platformDiff'

export default class Headers extends Component{
  static defaultProps = {
    title: ' ',
    isWgs: false,
    prompt: () => {}
  }

  static propTypes = {
    title: PropTypes.string,
    isWgs: PropTypes.bool,
    prompt: PropTypes.func
  }

  render () {
    const { title, isWgs, prompt, navigation, isBind } = this.props
    return (
      <View style={ styles.routerBox }>
        <HeaderLeft
          buttonStyle={ styles.routerBack }
          triggerBack={ () => navigation.goBack() }
        />
        <Text style={ styles.routerTitle } >{ title }</Text>
        {
          isWgs && !isBind ?
          <TextButton
            style={ styles.routerBreak }
            textStyle={ styles.routerBreakText }
            triggerClick={ prompt }
          >更多</TextButton> : 
          <View style={ styles.routerBreak } />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  routerBox: {
    height: 44,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...ifIphoneX({
      marginTop: 44,
    },{
      marginTop: platformDiff.isAndroid ? 0 : 20
    })
  },
  routerBack: {
    width: 56,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 44,
    zIndex: 9999
  },
  routerTitle: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 44,
    color: '#333',
    fontSize: 17,
    fontWeight: '400'
  },
  routerBreak: {
    width: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    height: 44,
    zIndex: 999
  },
  routerBreakText: {
    lineHeight: 44,
    textAlign: 'right',
    color: '#40B1FF',
    fontWeight: '600'
  }
})