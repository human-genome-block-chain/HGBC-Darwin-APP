import React, { Component } from 'react'

import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native'

import { getStoreList } from 'api/index'

import { AndroidWhiteBar } from 'components/index'
export default class ApplyPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '')
  })

  constructor (props) {
    super(props)
    this.state = {
      investcode: ' ',
      inviteCount: 0,
      powerSum: 0,
      boundSampleCount: 0,
      list: []
    }

    this.filter = this.props.navigation.getParam('filter', '')
  }

  componentDidMount () {
    this._getList ()
  }

  async _getList () {
    try {
      const result = await getStoreList(this.filter)

      this.setState({ 
        list: result.data
      })
    } catch (e) {}
  }

  render () {
    console.log(this.state.list)

    return (
      <SafeAreaView style={ styles.ApplyPage }>
        <AndroidWhiteBar />
        <ScrollView showsVerticalScrollIndicator={ false }>
          {
            this.state.list.length === 0 ? 
            <View>
              <Text style={ styles.textInfo }>^_^ 暂无已购应用</Text>
            </View> :
            this.state.list.map((item, j) => (
              <TouchableOpacity
                style={ styles.container }
                activeOpacity={ .8 }
                key={ j }
                onPress={ () => this.props.navigation.navigate('ApplyDetail', { title: item.title, appid: item.appid}) }
              >
                <View style={ styles.content }>
                  <Image
                    source={{ uri: item.logo }}
                    style={ styles.img }
                    resizeMode="cover"
                  />
                  <View style={ styles.main }>
                    <Text style={ styles.title }>{ item.title }</Text>
                    <Text style={ styles.message }>{ item.desc }</Text>
                  </View>
                  <View style={ styles.infoBox }>
                    {
                      item.tags.map((i, index) => (
                        <Text key={ index } style={ styles.info }>{ i }</Text>
                      ))
                    }
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  ApplyPage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  textInfo: {
    flex: 1,
    color: '#9B9B9B',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 60,
  },
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