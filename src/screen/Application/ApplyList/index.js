import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default class Application extends Component {

  render () {
    const { style, data }  = this.props

    const { title, desc, appid, tags } =  data

    return (
      <TouchableOpacity
        style={ [styles.container, style] }
        activeOpacity={ .8 }
        onPress={ () => this.props.navigation.navigate('ApplyDetail', { title, appid}) }
      >
        <View style={ styles.content }>
          <Image
            source={{ uri: data.logo }}
            style={ styles.img }
            resizeMode="cover"
          />
          <View style={ styles.main }>
            <Text style={ styles.title }>{ title }</Text>
            <Text style={ styles.message }>{ desc }</Text>
          </View>
          <View style={ styles.infoBox }>
            {
              tags.map((item, i) => (
                <Text key={ i } style={ styles.info }>{ item }</Text>
              ))
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: .5,
    borderStyle: 'solid',
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderColor: '#CDEBFF'
  },
  main: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 13,
    color: '#000',
    marginBottom: 5
  },
  message: {
    fontSize: 10,
    color: '#8D8C8C'
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  info: {
    padding: 5,
    fontSize: 9,
    backgroundColor: '#CDEBFF',
    marginLeft: 10
  }
})