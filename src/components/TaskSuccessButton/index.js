import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { goBack } from 'actions/index'

class TaskSuccessButton extends Component{
  static defaultProps = {
    title: '已完成任务',
    activeOpacity: .6,
    triggerClick: (e, goBack) => goBack()
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    title: PropTypes.string,
    activeOpacity: PropTypes.number,
    triggerClick: PropTypes.func
  }

  render () {
    const { style, textStyle, title, activeOpacity, goBack, triggerClick } = this.props

    return (
      <TouchableOpacity
        onPress={ (e) => triggerClick(e, goBack) }
        style={ [styles.buttonsBox, style] }
        activeOpacity={ activeOpacity }
      >
        <View style={ styles.disableButton }>
          <Text style={ [styles.disableText, textStyle] }>{ title }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect(null, dispatch => ({
  goBack: () => dispatch(goBack())
}))(TaskSuccessButton)

const styles = StyleSheet.create({
  buttonsBox: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center'
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