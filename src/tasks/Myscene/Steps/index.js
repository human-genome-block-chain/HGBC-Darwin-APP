import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { DashLine } from 'components/index'

export default class Steps extends Component {
  static defaultProps = {
    content: '',
    steps: '',
    isLine: true
  }

  static propTypes = {
    content: PropTypes.string,
    steps: PropTypes.string,
    isLine: PropTypes.bool
  }

  render () {
    const { content, steps, isLine }  = this.props

    return (
      <View style={ styles.container }>
        <View style={ styles.lineBox }>
          {
            isLine ? 
            <DashLine
              color="#232323"
              width={ 2 }
              height={ 6 }
              size={ 28 }
            />:
            null
          }
          <View style={ styles.steps }>
            <Text style={ styles.stepsText }>{ steps }</Text>
          </View>
        </View>
        <View style={ styles.main }>
          <Text style={ styles.content }>{ content }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  lineBox: {
    width: 30,
    position: 'relative'
  },
  main: {
    flex: 1,
  },
  steps: {
    position: 'absolute',
    left: -9,
    top: 0,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#40B1FF',
    borderWidth: 2,
    borderColor: '#2D2D2D',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepsText: {
    fontSize: 14,
    color: '#fff'
  },
  content: {
    fontSize: 15,
    color: '#5D616E'
  }
})