import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { GradientButton } from 'components/index'
import { CommonImg } from 'images/index'

export default class TaskItems extends Component {
  static defaultProps = {
    source: null,
    title: '',
    status: 'disabled',
    disabled: false,
    activeOpacity: .8,
    buttonText: '',
    triggerClick: () => {},
    increaseClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    source: Image.propTypes.source,
    title: PropTypes.string,
    status: PropTypes.string,
    disabled: PropTypes.bool,
    activeOpacity: PropTypes.number,
    buttonText: PropTypes.string,
    triggerClick: PropTypes.func,
    increaseClick: PropTypes.func
  }

  _judgeState () {
    const { status, buttonText, increaseClick, activeOpacity, children } = this.props

    switch (status) {
      case 'success':
        return (
          <View style={ [
            styles.disableButton, 
            styles.successBotton, 
            children ? styles.marginTopBig : null
          ] }>
            <Text style={ [styles.disableText, styles.successText] }>已完成</Text>
          </View>
        )
      case 'disabled':
        return (
          <View style={ [
            styles.disableButton, 
            children ? styles.marginTopBig : null
          ] }>
            <Text style={ styles.disableText }>{ buttonText }</Text>
          </View>
        )
      case 'activition':
        return (
          <GradientButton
            style={ [
              styles.button, 
              children ? styles.marginTopSmall : null
            ] }
            title={ buttonText }
            source={ CommonImg.TeskButton }
            textStyle={ styles.text }
            triggerClick={ () => increaseClick() }
          />
        )
      default:
        return (
          <View style={ [
            styles.disableButton, 
            children ? styles.marginTopBig : null
          ] }>
            <Text style={ [styles.disableText, disabled ? null : null] }>{ buttonText }</Text>
          </View>
        )
    }
  }

  render () {
    const { style, source, title, activeOpacity, disabled, children } = this.props

    return (
      <View style={ [styles.container, style] }>
        <TouchableOpacity
          style={ styles.touchAble }
          activeOpacity={ activeOpacity }
          onPress={ (e) => this.props.triggerClick(e) }
        >
          <Image
            style={ styles.icons }
            source={ source }
            resizeMode='cover'
          />
          <Text style={ [styles.title, disabled ? styles.disabledTitle : null] }>{ title }</Text>
          { children }
        </TouchableOpacity>
        { this._judgeState() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 125,
    alignItems: 'center'
  },
  touchAble: {
    width: 125,
    alignItems: 'center'
  },
  icons: {
    width: 65,
    height: 65
  },
  title: {
    fontSize: 14,
    color: '#444',
    lineHeight: 18,
  },
  disabledTitle: {
    color: '#9496A0'
  },
  button: {
    width: 92,
    height: 44,
    marginTop: 12
  },
  text: {
    fontSize: 13
  },
  disableButton: {
    width: 78,
    height: 30,
    backgroundColor: '#E7ECF0',
    borderRadius: 30,
    marginTop: 19,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disableText: {
    fontSize: 13,
    color: '#97A2AD'
  },
  successBotton: {
    backgroundColor: '#fff',
    borderColor: '#40B1FF',
    borderWidth: .3,
  },
  successText: {
    color: '#40B1FF'
  },
  marginTopSmall: {
    marginTop: 0,
  },
  marginTopBig: {
    marginTop: 7,
  }
})