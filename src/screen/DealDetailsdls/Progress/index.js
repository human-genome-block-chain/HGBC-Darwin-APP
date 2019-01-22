import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { DashLine } from 'components/index'

import { Assets } from 'images/index'

export default class Progress extends Component {
  static defaultProps = {
    title: '',
    info: '',
    size: 90,
    isLine: true,
    progress: 'unfinished'
  }

  static propTypes = {
    title: PropTypes.string,
    info: PropTypes.string,
    size: PropTypes.number,
    isLine: PropTypes.bool,
    progress: PropTypes.string
  }

  _progress () {
    switch (this.props.progress) {
      case 'unfinished':
        return {
          img: Assets.Unfinished,
          color: '#333',
          text: ''
        }
      case 'ongoing':
        return {
          img: Assets.Ongoing,
          color: '#333',
          text: '（进行中）'
        }
      case 'complete':
        return {
          img: Assets.Complete,
          color: '#40B1FF',
          text: '（完成）'
        }
      case 'error':
        return {
          img: Assets.ErrorImg,
          color: '#F37979',
          text: '（失败）'
        }
      default: 
        return {
          img: Assets.Unfinished,
          color: '#333',
          text: ''
        }
    }
  }

  render () {
    const { title, isLine, size, children }  = this.props

    let progress = this._progress()

    return (
      <View style={ styles.container }>
        <View style={ styles.lineBox }>
          {
            isLine ? 
            <DashLine
              style={ styles.line }
              color="#CED8DD"
              width={ 3 }
              height={ 6 }
              size={ size }
            />:
            null
          }
          <Image
            source={ progress.img }
            style={ styles.image }
            resizeMode="cover"
          />
        </View>
        <View style={ styles.main }>
          <Text style={ [styles.title, { color: progress.color }] }>{ title }</Text>
          { children }
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
  image: {
    position: 'absolute',
    left: -8,
    top: 0,
    width: 19,
    height: 19
  },
  dashed: {
    width: 0,
    height: 100,
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 6,
    fontWeight: '600'
  }
})