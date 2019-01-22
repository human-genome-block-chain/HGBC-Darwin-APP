import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import QRCode from 'react-native-qrcode'

import { loadingOpen, loadingClose } from 'actions/index'

class CreateCode extends Component{
  constructor (props) {
    super(props)
    this.props.loadingOpen()
  }

  componentDidMount () {
     this.props.loadingClose()
  }

  render () {
    return (
      <View style={ styles.img }>
        <QRCode
          value={ this.props.url }
          size={130}
          bgColor="#000"
          fgColor="#FFF"
        />
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  loadingOpen: () => dispatch(loadingOpen()),
  loadingClose: () => dispatch(loadingClose())
}))(CreateCode)

const styles = StyleSheet.create({
  img: {
    width: 130,
    height: 130
  }
})