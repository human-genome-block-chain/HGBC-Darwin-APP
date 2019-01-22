import React, { Component } from 'react'
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'

export default class Options extends Component {
  render () {
    return (
      <TouchableOpacity
        style={ [styles.container, this.props.style] }
        onPress={ this.props.triggerClick.bind(this) }
        activeOpacity={ .8 }
      >
        <Text style={ styles.title }>{ this.props.title }</Text>
        <Image
          style={ styles.img }
          source={ this.props.source }
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 14,
    color: '#777',
    marginRight: 6
  },
  img: {
    width: 14,
    height: 14
  }
})