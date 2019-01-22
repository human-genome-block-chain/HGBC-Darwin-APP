
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast'
import { setToastMsg } from 'actions/index'

class GToast extends Component{
  constructor() {
    super()

    this.timer = null
  }

  componentDidUpdate() {
    clearTimeout(this.timer)
    this.timer = setTimeout(this.props.close, 2000)
  }

  render() {
    const msg = this.props.msg

    return (
      <Toast
        visible={ !!msg }
        position={ -60 }
        duration={ Toast.durations.LONG }
        shadow={ true }
        animation={ true }
        hideOnPress={ true }
      >{ msg }</Toast>
    )
  }
}

export default connect(state => ({ ...state.toast }), dispatch => ({
  close: () => dispatch(setToastMsg('')) 
}))(GToast)