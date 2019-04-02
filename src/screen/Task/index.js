import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { AndroidWhiteBar, TaskItems } from 'components/index'

import Banner from './Banner/index'

import { setTasks, setPower } from 'actions/index'

import { TaskImg } from 'images/index'

import { doDailyBouns } from 'api/index'

class Task extends Component {
  async signFn () {
    try {
      await doDailyBouns()

      this.props.setTasks({ daily_bonus: { is_finish: '0' } })
      this.props.setPower(1)
    } catch (e) {}
  }

  _taskStatus (data) {
    if (data.enable === '0') {
      return 'disabled'
    } else {
      if (data.is_finish === '0') return 'success'

      return 'activition'
    }
  }

  render () {
    const {
      WGS,
      WES,
      daily_bonus,
      invite,
      popularize,
      strategy,
      boundInvitationCode,
      baseinfo
    } = this.props

    return (
      <SafeAreaView style={ styles.mainBox }>
        <AndroidWhiteBar />
        <ScrollView 
          style={ styles.container }
          showsVerticalScrollIndicator={ false }
        >
          <View style={ styles.banner }>
            <Banner />
          </View>
          <View style={ styles.content }>
            <Text style={ styles.title }>固定任务</Text>
            <View style={ styles.taskBox }>
              {
                /*
                  <TaskItems
                style={ styles.taskList }
                source={ TaskImg.SignTesk }
                title="每日签到"
                buttonText="+1算力"
                status={ this._taskStatus(daily_bonus) }
                increaseClick={ () => this.signFn() }
                triggerClick={ () => this.props.navigation.navigate('SignIn') }
              >
                <Text style={ styles.instructions }>签到奖励 1算力</Text>
              </TaskItems>
                 */
              }
              <TaskItems
                style={ styles.taskList }
                source={ TaskImg.InvitationImg }
                title="邀请好友"
                status="activition"
                buttonText="+1算力"
                status={ invite.inviteCount >= 10 ? 'success' : 'disabled' }
                triggerClick={ () => this.props.navigation.navigate('Invitation', { type: 1, title: '邀请好友' }) }
              >
                <Text style={ styles.instructions }>已邀请{ invite.inviteCount }/10人</Text>
              </TaskItems>
              {/* <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Strategy }
                title="星球攻略"
                status={ strategy.is_finish <= 0 ? 'success' : 'disabled' }
                buttonText="+1算力"
                triggerClick={ () => this.props.navigation.navigate('Strategy') }
              >
                <Text style={ styles.instructions }>阅读攻略奖励 1算力</Text>
              </TaskItems> */}
              <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Promote }
                title="高级推广"
                buttonText="+10算力"
                triggerClick={ () => this.props.navigation.navigate('Invitation', { type: 2, title: '高级推广' }) }
              >
                <Text style={ styles.instructions }>已邀请 { popularize.inviteBoundCount }人</Text>
              </TaskItems>
              <TaskItems 
                style={ styles.taskList }
                source={ TaskImg.Activation }
                title="激活邀请码"
                status={ boundInvitationCode.is_finish <= 0 ? 'success' : 'disabled' }
                buttonText="+2算力"
                triggerClick={ () => this.props.navigation.navigate('Activate') }
              >
                <Text style={ styles.instructions }>奖励 2算力</Text>
              </TaskItems>
            </View>
          </View>
          <View style={ styles.content }>
            <Text style={ styles.title }>数据盒子</Text>
            <View style={ styles.taskBox }>
              <TaskItems 
                style={ styles.taskList }
                source={ TaskImg.BasicInformation }
                title="基础信息"
                status={ baseinfo.is_finish <= 0 ? 'success' : 'disabled' }
                buttonText="+3算力"
                triggerClick={ () => this.props.navigation.navigate('BasicInformation') }
              >
                <Text style={ styles.instructions }>奖励 3算力</Text>
              </TaskItems>
              <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Wgs }
                title="基因组数据"
                buttonText="+15~150算力"
                status={ WGS.simpleCount > 0 ? 'success' : 'disabled' }
                triggerClick={ () => this.props.navigation.navigate('Wgs') }
              >
                <Text style={ styles.instructions }>奖励 15~150算力</Text>
              </TaskItems>
              {/* <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Wes }
                title="全外显子组数据"
                buttonText="+30 算力"
                status={ WES.simpleCount > 0 ? 'success' : 'disabled' }
                triggerClick={ () => this.props.navigation.navigate('Wes') }
              >
                <Text style={ styles.instructions }>奖励 30算力</Text>
              </TaskItems> */}
              <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Medical }
                title="体检数据"
                buttonText="+N 算力"
                disabled={ true }
                activeOpacity={ 1 }
              >
                <Text style={ styles.instructions }>马上就来</Text>
              </TaskItems>
              <TaskItems
                style={ styles.taskList }
                source={ TaskImg.Equipment }
                title="可穿戴设备"
                buttonText="+N 算力"
                disabled={ true }
                activeOpacity={ 1 }
              >
                <Text style={ styles.instructions }>马上就来</Text>
              </TaskItems>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.tasks }), dispatch => ({
  setTasks: tasks => dispatch(setTasks(tasks)),
  setPower: power => dispatch(setPower(power))
}))(Task)

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  banner: {
    height: 200,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  content: {
    backgroundColor: '#FFF',
    marginTop: 11,
    paddingTop: 16,
    paddingBottom: 30
  },
  title: {
    color: '#323232',
    width: 125,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 6,
    marginBottom: 26,
    fontWeight: '600'
  },
  taskBox: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  taskList: {
    marginBottom: 26
  },
  instructions: {
    fontSize: 11,
    color: '#9B9B9B',
    marginTop: 8
  }
})