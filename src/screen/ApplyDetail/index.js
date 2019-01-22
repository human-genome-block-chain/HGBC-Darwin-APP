import React, { Component } from 'react'

import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Linking
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import PopUp from './PopUp/index'
import platformDiff from 'util/platformDiff'

import { getAppletInfo, getAppletState, checkTradePass, buyApplet } from 'api/index' 

import { connect } from 'react-redux'

import { deleteToken } from 'actions/index'

import { ApplicationImg } from 'images/index'

class ApplyDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '')
  })
  
  constructor (props) {
    super(props)
    this.state = {
      walletAddress:'',
      amount: '',
      visible: false,
      transparent: true,
      errorText: '',
      isDisabled: true,
      isSuccessfully: false,
      isFire: true,
      message: {},
      items: [],
      locs: [],
      amount: 0,
      stateList: {},
      state: '',
      appid: 0,
      sign: '',
      url: '',
      canbuy: ''
    }

    this.id = props.navigation.getParam('appid', 0)
  }

  componentDidMount () {
    this._getAppletInfo()
    this._getStateList()
  }

  async _getAppletInfo () {
    try {
      const result = await getAppletInfo(this.id)

      this.setState({
        message: result.data,
        items: result.data.details,
        locs: result.data.locs,
        amount: result.data.price,
        appid: result.data.appid
      })
    } catch (e) {}
  }

  async _getStateList () {
    try {
      const result = await getAppletState(this.id)
      
      this.setState({
        stateList: result.data,
        state: result.data.state,
        sign: result.data.sign,
        url: result.data.url,
        canbuy: result.data.canbuy
      })
    } catch (e) {}
  }

  async _next (tradePass) {
    const { amount } = this.state

    const appid = this.id

    try {
      const result = await buyApplet({
        appid,
        amount,
        tradePass
      })
      
      this.setState({
        visible: false,
        transparent: true,
        isSuccessfully: true,
        isFire: true,
        state: result.data.state
      })

      platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')

      this.props.deleteToken(parseFloat(this.state.amount || 0))

    }catch (err) {
      this.setState({
        errorText: err,
        isFire: true
      })

      return false
    }
  }

  async validation (tradePass) {
    this.setState({ isFire: false })

    try {

      await checkTradePass({ tradePass })
     
      this._next(tradePass)
      
    }catch (e) {
      this.setState({
        errorText: e,
        isFire: true
      })
    }
  }

  open () {
    this.setState({ visible: true, errorText: '' })
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#ccc')
  }

  close () {
    this.setState({ visible: false })
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')
  }

  _detail() {
    return this.state.items.map( (item, index) => (
      <Image
        key={ index }
        style={ styles.image }
        width={ parseInt(Dimensions.get('window').width) }
        height={ parseInt(item.height*Dimensions.get('window').width/750) }
        source={{ uri: item.url }}
        resizeMode="contain"
      />
    ))
  }

  render() {
    return (
      <SafeAreaView style={styles.box}>
        <AndroidWhiteBar />
        <ScrollView style={ styles.imageBox} showsVerticalScrollIndicator={ false }>
          { this._detail() }
        </ScrollView>
        <View style={ styles.gradientBox }>
          {
            (this.state.state === '0' && this.state.canbuy === '0') ?
              <TouchableOpacity
                style={ styles.gradientButton1 }
                activeOpacity={ .8 }
                onPress={ ()=> Linking.openURL('http://qr07.cn/FU9IVG') }>
                <View style={ styles.buttonLeft }>
                  <Text style={ styles.buttonLeftText }>{ this.state.stateList.leftinfo }</Text>
                </View>
                <View style={ styles.buttonRight }>
                  <Text  style={ styles.buttonRightText }>获得基因数据</Text>
                </View>
              </TouchableOpacity> :
            (this.state.state === '1' && this.state.canbuy === '1') ?
              <TouchableOpacity
                style={ styles.gradientButton1 }
                activeOpacity={ .8 }
                onPress={ ()=> this.open() }>
                <View style={ styles.buttonLeft }>
                  <Text style={ styles.buttonLeftText }>{ this.state.stateList.leftinfo }</Text>
                </View>
                <View style={ styles.buttonRight }>
                  <Text  style={ styles.buttonRightText }>购买</Text>
                </View>
              </TouchableOpacity> :
            (this.state.state === '2' && this.state.canbuy === '0') ?
              <View style={ styles.gradientButton2 }>
                <Text style={ styles.buttonText }>{ this.state.stateList.leftinfo }</Text>
              </View> :
            (this.state.state === '3' && this.state.canbuy === '0') ?
              <ImageBackground
                style={ styles.backgroundImage }
                source={ ApplicationImg.Btn }>
                <TouchableOpacity
                  onPress={ () => this.props.navigation.navigate('Report', { sign: this.state.sign, url: this.state.url }) }
                  activeOpacity={ .8 }
                  style={ styles.gradientButton3 }>
                  <Text style={ styles.buttonText }>{ this.state.stateList.leftinfo }</Text>
                </TouchableOpacity>
              </ImageBackground> :
              <View style={ styles.gradientButton4 }>
                <View style={ styles.buttonLeft4 }>
                  <Text style={ styles.buttonLeftText }>{ this.state.stateList.leftinfo }</Text>
                </View>
                <View style={ styles.buttonRight4 }>
                  <Text  style={ styles.buttonRightText }>购买</Text>
                </View>
              </View>
          }
        </View>
        <PopUp 
            visible={ this.state.visible }
            transparent={ this.state.transparent }
            errorText={ this.state.errorText }
            triggerClick={ tradePass => this.validation(tradePass) }
            close={ () => this.close() }
            navigation={ this.props.navigation }
            isFire={ this.state.isFire }
            locs={ this.state.locs }
            price={ this.state.amount }
            stateList={ this.state.stateList }
            appid={ this.state.appid }
          />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  token: state.home.token_count
}), dispatch => ({
  deleteToken: token => dispatch(deleteToken(token))
}))(ApplyDetail)

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageBox: {
    flex: 1,
    marginBottom: 20
  },
  image: {
    width: Dimensions.get('window').width,
    height: 1
  },
  gradientBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientButton1: {
    width: 375,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonLeft: {
    width: 240,
    height: '100%',
    justifyContent: 'center',
    borderColor: '#40B1FF',
    borderStyle: 'solid',
    borderWidth: 1
  },
  buttonLeftText: {
    textAlign: 'center',
    color: '#9B9B9B',
    fontSize: 16
  },
  buttonRight: {
    width: 140,
    height: '100%',
    backgroundColor: '#40B1FF',
    justifyContent: 'center'
  },
  buttonRightText: {
    textAlign: 'center',
    color: '#F9FAFC',
    fontSize: 16
  },
  gradientButton2: {
    width: 375,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#40B1FF'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  backgroundImage: {
    height: 60,
    width: 375
  },
  gradientButton3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientButton4: {
    width: 375,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonLeft4: {
    width: 240,
    height: '100%',
    justifyContent: 'center',
    borderColor: '#CDEBFF',
    borderStyle: 'solid',
    borderWidth: 1
  },
  buttonRight4: {
    width: 140,
    height: '100%',
    backgroundColor: '#CDEBFF',
    justifyContent: 'center'
  }
});