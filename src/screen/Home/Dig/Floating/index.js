import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { Cells } from 'components/index'
import { setToken } from 'actions/index'
import { fireReward } from 'api/index'

class Floating extends Component{
  constructor (props) {
    super(props)

    this.state = {
      count: 0,
      locations: [],
      item: []
    }

    this.locations = []
    this.item = []
    this.edge = 36
  }

  async clickCells (items) {

    try {
      this.item = this.item.filter(item => item !== items)

      if (this.item.length <= 0) this.props.complete()

      await fireReward(items.id)

      this.props.setToken(items.size)

    } catch (e) {}
  }

  _placeCells () {

    this.item = this.props.list
    this.locations = []

    return this.item.map(items => {
      let retult = {}

      try {
        retult = this._randomLocation()
      } catch (err) {
        retult = this._coordinates()
      }

      return (
        <Cells
          key={ items.id }
          number={ items.size.toFixed(2) }
          triggerClick={ e => this.clickCells (items)}
          style={ [styles.cells, { left: retult.x, top: retult.y }] }
        />
      )
      // <View key={ items.id } style={ [styles.cells, { left: retult.x, top: retult.y,width: 60,height:70, backgroundColor: 'yellow', }] }></View>
    })
  }

  _randomLocation () {
    const coordinates = this._coordinates()

    const result = this.locations.every(item => {
      return this._overlay(item, coordinates)
    })

    if (result) {

      this.locations.push(coordinates)
      
      return coordinates
    } else {
      return this._randomLocation()
    }
  }

  _coordinates () {
    const { width, height } = this.props.size
    const edge = this.edge

    const randomX = this._intervalRandom(edge, width - edge)
    const randomY = this._intervalRandom(edge, height - edge)

    return { x: randomX, y: randomY }
  }

  _overlay (pointA, pointB) {
    const xGap = Math.abs(pointA.x - pointB.x)
    const yGap = Math.abs(pointA.y - pointB.y)
    const distance = Math.sqrt(xGap * xGap + yGap * yGap)

    return distance >= 80
  }

  _intervalRandom (begin, end) {
    return Math.round(Math.random() * (end - begin) + begin)
  }

  render () {
    return (
      !this.props.list.length ?
      <View style={ styles.emptyContainer }>
        <Cells
          isEmpty={ true }
          style={ styles.noData }
        />
      </View>:
      <View style={ styles.container }>
        { this._placeCells() }
      </View>
    )
  }
}

export default connect(state=> ({ ...state.cells }), dispatch => ({
  setToken: token => dispatch(setToken(token))
}))(Floating)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  cells: {
    position: 'absolute'
  },
  noData: {
    margin: 0
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})