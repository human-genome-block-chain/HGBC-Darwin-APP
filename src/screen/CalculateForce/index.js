import React, { Component } from 'react'
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native'

import { GradientButton, AndroidWhiteBar,TextButton} from 'components/index'

import Personal from './Personal/index'
import Ranking from './Ranking/index'

import { CommonImg } from 'images/index'
import { getPowerKing } from 'api/index'

export default class CalculateForce extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TextButton
        style={ styles.routerBreaks }
        textStyle={ styles.routerBreakText }
        activeOpacity={ .8 }
        triggerClick={ () => navigation.navigate('PaymentDetails', { title: '算力记录', type: 2 }) }
      >算力记录</TextButton>
    )
  })

  constructor(props){
    super(props)

    this.state = {
      my_power_count: 0,
      power_all: '',
      my_king: {},
      king_list: []
    }
  }

  componentDidMount() {
    this._getPowerKing()
  }

  async _getPowerKing () {
    try {
      const result = await getPowerKing()

      this.setState({ ...result.data })
    } catch (e) {}
  }

  _tableData () {
    let list = [...this.state.king_list]
    let myKing = {...this.state.my_king}
    let aar = []

    if (myKing.index > 20) list.push(myKing)

    list.forEach(item => {
      const { index, nickname, power, token } = item

      aar.push([index, nickname, power, token.toFixed(0)])
    })

    return aar
  }

  render () {
    const {
      my_power_count,
      power_all,
      my_king
    } = this.state
      
    return (
      
      <SafeAreaView style={ styles.container}>
        <View style={ styles.routerBox }>
          
        </View>
        <ScrollView 
          style={ styles.scrollView }
          showsVerticalScrollIndicator={ false }
        >
          <AndroidWhiteBar />
          <Personal
            power={ my_power_count }
            powerAll={ power_all }
            myKing={ my_king }
          />
          <Ranking
            kings={ this._tableData() }
          />
        </ScrollView>
        <View style={ styles.bottonBox }>
          <GradientButton
            style={ styles.button }
            title="立即去增加算力"
            textStyle={ styles.text }
            source={ CommonImg.LangButton }
            triggerClick={ () => this.props.navigation.navigate('Task') }
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20
  },
  bottonBox: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor:'#F9FAFC'
  },
  button: {
    width: 300,
    height: 52
  },
  headerRight: {
    width: 20,
    flex: 1
  },
  routerBreaks: {
    width: 70,
    height: 44
  },
  routerBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
  routerBreakText: {
    lineHeight:44,
    fontSize: 14
  }
})