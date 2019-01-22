import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Clipboard,
  StyleSheet,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import { BackgroundPicture, GradientButton, AndroidWhiteBar } from 'components/index'

import { TaskImg } from 'images/index'

import platformDiff from 'util/platformDiff'

import TabItems from './TabItems/index'
import Rules from './Rules/index'

import { getInviteData } from 'api/index'

import { setToastMsg, setTasks } from 'actions/index'

class SignIn extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '邀请好友'),
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      investcode: ' ',
      inviteCount: 0,
      powerSum: 0,
      boundSampleCount: 0
    }

    this.isAndroid = platformDiff.isAndroid
    this.type = this.props.navigation.getParam('type', 1)
  }

  componentDidMount () {
    this._getInviteData()
    StatusBar.setBarStyle('dark-content')
    this.isAndroid && StatusBar.setBackgroundColor('#fff')
    this.isAndroid && StatusBar.setTranslucent(false)
  }

  async _getInviteData () {
    try {
      const result = await getInviteData()

      this.setState({...result.data})
      this.props.setTasks({ ...result.data })
    } catch (e) {}
  }

  copy () {
    Clipboard.setString(this.state.investcode)

    this.props.setToastMsg('复制成功')
  }

  render () {

    return (
      <SafeAreaView style={ styles.box }>
        <AndroidWhiteBar />
        <ScrollView
          style={ styles.container }
          showsVerticalScrollIndicator={ false }
        >
          <BackgroundPicture
            source={ TaskImg.Invitation }
            style={ styles.bgMain }
          >
            <Text style={ styles.title }>我的邀请</Text>
            <Text style={ styles.inviteCode }>
              { this.state.investcode }
            </Text>
            <TouchableOpacity
              onPress={ (e) => this.copy() }
              style={ styles.buttonBox }
              activeOpacity={ .8 }
            >
              <Text style={ styles.button }>复制</Text>
            </TouchableOpacity>
          </BackgroundPicture>
          <View style={ styles.content }>
            <View style={ styles.tab }>
              <TabItems
                number={ this.state.inviteCount }
                introduction="邀请好友"
              />
              <TabItems
                number={ this.state.powerSum }
                introduction="增加算力"
              />
            </View>
          </View>
          <Rules type={ this.type } />
        </ScrollView>
        <View style={ styles.gradientBox }>
          <GradientButton
            style={ styles.gradientButton }
            title="生成邀请卡"
            triggerClick={ () => this.props.navigation.navigate('QRCode') }
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text)),
  setTasks: data => dispatch(setTasks(data))
}))(SignIn)

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    backgroundColor: '#fff'
  },
  bgMain: {
    height: 308,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginTop: 46
  },
  inviteCode: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 56,
    marginBottom: 12
  },
  buttonBox: {
    borderColor: '#fff',
    borderWidth: .3,
    borderRadius: 34,
    width: 100,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: '#fff',
    fontSize: 16
  },
  content: {
    marginTop: -80,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingBottom: 25
  },
  tab: {
    flexDirection: 'row'
  },
  gradientBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientButton: {
    width: 300,
    height: 60
  }
})
