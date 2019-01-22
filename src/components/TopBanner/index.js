import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import {
  BackgroundPicture,
  AndroidTranslucentBar,
  HeaderLeft
} from 'components/index'

import { goBack } from 'actions/index'

import { CommonImg } from 'images/index'

class TopBanner extends Component {
  render () {
    return (
      <BackgroundPicture style={ styles.backgroundBox }>
        <AndroidTranslucentBar>
          <HeaderLeft
            triggerBack={ () => this.props.goBack() }
            buttonStyle={ styles.goBack }
            source={ CommonImg.WhiteBack }
          />
          <SafeAreaView style={ styles.container }>
            { this.props.children }
          </SafeAreaView>
        </AndroidTranslucentBar>
      </BackgroundPicture>
    )
  }
}

export default connect(null, dispatch => ({
  goBack: () => dispatch(goBack())
}))(TopBanner)

const styles = StyleSheet.create({
  backgroundBox: {
    height: 220,
    ...ifIphoneX({
      paddingTop: 44
    },{
      paddingTop: 20
    })
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center'
  },
  goBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 54,
    height: 44,
    zIndex: 999
  }
})
