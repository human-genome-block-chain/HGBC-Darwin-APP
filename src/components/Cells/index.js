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
import * as Animatable from 'react-native-animatable'

import { HomeImg } from 'images/index'

export default class Cells extends Component {
  static defaultProps = {
    isEmpty: false,
    number: '0',
    activeOpacity: .6,
    isClosed: false,
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    isEmpty: PropTypes.bool,
    number: PropTypes.string,
    isClosed: PropTypes.bool,
    activeOpacity: PropTypes.number,
    triggerClick: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      isClosed: false
    }

    this.random = 0

    this.animate = {
      from: { 
        translateY: 0,
      },
      to: {
        translateY: -10,
      }
    }

    this.closed = {
      from: { 
        translateY: 0,
      },
      to: {
        translateY: -1000,
      }
    }
  }

  _randomColor () {
    let random = 0

    if (this.random === 0) {
      random = Math.round(Math.random() * (10 - 1) + 1)

      this.random = random
    } else {
      random = this.random
    }

    if (random < 3) {
      return HomeImg.PinkCells
    } else if (random < 6) {
      return HomeImg.BlueCells
    } else {
      return HomeImg.YellowCells
    }
  }

  render () {
    const { isEmpty, number, activeOpacity, triggerClick, style } = this.props

    return (
      <Animatable.View
        style={ [styles.container, isEmpty ? null : styles.margin, style] }
        animation={ !this.state.isClosed ? this.animate: this.closed }
        iterationCount={ !this.state.isClosed ? "infinite" : 1 }
        direction="alternate"
        easing="ease-in-out"
        useNativeDriver
      >
        {
          isEmpty ?
          <View style={ styles.main }>
            <Image
              style={ styles.image }
              source={ HomeImg.GrayCells }
              resizeMode="cover"
            />
            <Text style={ styles.text }>挖矿中</Text>
          </View>
          :
          <TouchableOpacity
            style={ styles.packaging }
            activeOpacity={ activeOpacity }
            onPress={ () => {
              this.setState({isClosed: true})
              triggerClick()
            } }
          >
            <Image
              style={ styles.image }
              source={ this._randomColor() }
              resizeMode="cover"
            />
            <Text style={ styles.text }>{ number }</Text>
          </TouchableOpacity>
        }
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 60,
    height: 70
  },
  margin: {
    marginLeft: -30,
    marginTop: -35
  },
  packaging: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  main: {
    flex: 1,
    alignItems: 'center'
  }
})