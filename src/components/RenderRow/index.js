import React, { Component } from 'react'
import {
  View,
  Text,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class RenderRow extends Component {
  static defaultProps = {
    rowData: {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    rowData: PropTypes.object
  }

  render () {
    const data = this.props.rowData

    return (
      <View style={ [styles.container, this.props.style] }>
        <View style={ styles.content }>
          <View style={ styles.leftContent }>
            <Text style={ styles.title }> { data.reason } </Text>
            <Text style={ styles.time }> { moment(data.create_time).format("YYYY-MM-DD HH:mm:ss") } </Text>
          </View>
          <Text style={ styles.rightContent }> { data.amount >= 0 ? '+' : '' }{ data.amount } </Text>
        </View>
        { 
          /*
          data.address ?
          <Text style={ styles.bottomContent }>{ data.address }</Text>:
          null
          */
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 2
  },
  content: {
    flexDirection: 'row'
  },
  leftContent: {
    flex: 1
  },
  title: {
    fontSize: 15,
    color: '#333'
  },
  time: {
    fontSize: 13,
    color: '#98A0A5',
    marginTop: 6
  },
  rightContent: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    color: '#333',
    fontWeight: '600'
  },
  bottomContent: {
    flex: 1,
    color: '#666',
    fontSize: 12,
    marginTop: 12
  }
})