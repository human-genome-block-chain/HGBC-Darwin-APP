import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Ticker from 'react-native-ticker'
import { connect } from 'react-redux'

import { GraphicButton } from 'components/index'
import { HomeImg } from 'images/index'


class Amount extends Component {
  render () {
    const { power, token } = this.props
    
    return (
      <View style={ styles.footer }>
        <GraphicButton
            source={ HomeImg.Token }
            triggerClick={ () => this.props.navigation.navigate('Integral') }
          >
            <Ticker textStyle={styles.text} rotateTime={200}>
              { token.toFixed(2) }
            </Ticker>
          </GraphicButton>
          <GraphicButton
            style={ styles.amountRight }
            source={ HomeImg.Calculate }
            triggerClick={ () => this.props.navigation.navigate('CalculateForce') }
          >
            <Ticker textStyle={styles.text} rotateTime={200}>
              { power.toString() }
            </Ticker>
          </GraphicButton>
      </View>
    )
  }
}

export default connect(state => ({
  power: state.home.power_count,
  token: state.home.token_count
}))(Amount)

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    paddingLeft: 19,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 18
  },
  amountRight: {
    justifyContent: 'flex-end'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500'
  }
})