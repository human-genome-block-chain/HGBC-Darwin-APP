import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Platform } from 'react-native'

const isAndroid = Platform.OS==='android'

export default class AndroidTranslucentBar extends Component {
  
  componentWillMount () {
    StatusBar.setBarStyle('light-content')
    isAndroid && StatusBar.setBackgroundColor('rgba(0,0,0,0)')
    isAndroid && StatusBar.setTranslucent(true)
  }

  render () {
    return (
      <View style={ styles.container }>
        { isAndroid &&
          <StatusBar
            backgroundColor="rgba(0,0,0,0)"
            translucent={true}
            barStyle="light-content"
          />
        }
        
        { this.props.children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      paddingTop: isAndroid ? StatusBar.currentHeight : 0
  }
})
