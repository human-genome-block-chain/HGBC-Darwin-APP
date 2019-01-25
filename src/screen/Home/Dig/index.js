import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  AppState,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import { setCells, setEmpty } from 'actions/index'

import { getReward } from 'api/index'
import Floating from './Floating/index'
import Amount from './Amount/index'

import { RedbagImg } from 'images/index.js'

class Dig extends Component {
  constructor () {
    super()

    this.state = {
      isPresent: false,
      width: 0,
      height: 0,
      power_count: '0',
      token_count: '0',
      item: []
    }

    this.initialItem = []

    this._onAppState = this._onAppState.bind(this)
  }

  componentDidMount() {
    this._getReward()
    AppState.addEventListener('change', this._onAppState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._onAppState)
  }

  containerSize (e) {
    this.setState({width: e.layout.width, height: e.layout.height})
  }

  complete () {
    this.setState({item: this.initialItem.shift() || []})
  }

  _onAppState (appState) {
    if (appState === 'active') this._getReward()
  }

  async _getReward () {
    try {
      const result = await getReward()

      const item = this._processData([...result.data])

      this.props.setEmpty(result.data.length <= 0 ? true : false)

      this.initialItem = item

      this.setState({item: this.initialItem.shift() || [], isPresent: true})

    } catch (e) {}
  }

  _processData (aar) {
    let retult = []

    if (aar.length <= 8) {
      retult.push(aar)
    } else {
      let i = 0
      let len = aar.length

      for (; i < Math.ceil(len / 8); i++) {
        let start = i * 8
        let end = start + 8

        retult.push(aar.slice(start, end))
      }
    }

    return retult
  }

  render () {
    const { width, height, isPresent, item} = this.state

    return (
      <View style={ [styles.container, this.props.style] }>
        <Text style={ styles.title }>达尔文星球</Text>
        <TouchableOpacity
          style={ styles.redbag }
          activeOpacity={ .8 }
          onPress={ () => this.props.navigation.navigate('Redbag') }
        >
          <Image style={ styles.redbagImg } source={RedbagImg.RedbagBtn}/>
        </TouchableOpacity>
        <View style={ styles.content } onLayout={({ nativeEvent })=> this.containerSize(nativeEvent)}>
          {
            isPresent ? 
            <Floating
              size={ { width, height } }
              list={ item }
              complete={ () => this.complete() }
            />:
            null
          }
        </View>
        <Amount navigation={ this.props.navigation } />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCells: data => dispatch(setCells(data)),
  setEmpty: bool => dispatch(setEmpty(bool))
})

export default connect(state => ({
  item: state.cells.item
}), mapDispatchToProps)(Dig)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  redbag: {
    width: 10
  },
  redbagImg: {
    height: 50
  },
  content: {
    flex: 1,
    paddingTop: 10
  },
  footer: {
    flexDirection: 'row',
    paddingLeft: 19,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 18
  },
  amountBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  amountRight: {
    justifyContent: 'flex-end'
  },
  icon: {
    width: 30,
    height: 30
  },
  amountText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 9
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500'
  }
})