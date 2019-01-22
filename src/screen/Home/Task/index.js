import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { TaskItems, TextButton } from 'components/index'
import { TaskImg } from 'images/index'
import { setTasks, setPower } from 'actions/index'

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
    const { WGS, daily_bonus, invite, strategy } = this.props

    return (
      <View style={ [ styles.main, this.props.style ] }>
        <View style={ styles.header }>
          <Text style={ styles.title }>算力加速</Text>
          <TextButton
            style={ styles.moreBox }
            textStyle={ styles.moreText }
            location="right"
            triggerClick={ () => this.props.navigation.navigate('Task') }
          >
            <Text style={ styles.more }>更多</Text>
          </TextButton>
        </View>
        <View style={ styles.container }>
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
          ></TaskItems>
             */
          }
          <TaskItems
            style={ styles.taskList }
            source={ TaskImg.Wgs }
            title="全基因组数据"
            buttonText="+150算力"
            status={ WGS.simpleCount > 0 ? 'success' : 'disabled' }
            triggerClick={ () => this.props.navigation.navigate('Wgs') }
          ></TaskItems>
          <TaskItems
            style={ styles.taskList }
            source={ TaskImg.InvitationImg }
            title="邀请好友"
            buttonText="+1算力"
            status={ invite.inviteCount >= 10 ? 'success' : 'disabled' }
            triggerClick={ () => this.props.navigation.navigate('Invitation', { type: 1, title: '邀请好友' }) }
          ></TaskItems>
          <TaskItems
            style={ styles.taskList }
            source={ TaskImg.Strategy }
            title="星球攻略"
            status={ strategy.is_finish <= 0 ? 'success' : 'disabled' }
            buttonText="+1算力"
            triggerClick={ () => this.props.navigation.navigate('Strategy') }
          >
          </TaskItems>
        </View>
      </View>
    )
  }
}

export default connect(state => ({ ...state.tasks }), dispatch => ({
  setTasks: tasks => dispatch(setTasks(tasks)),
  setPower: power => dispatch(setPower(power))
}))(Task)

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flexDirection: 'row'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#333',
    paddingLeft: 25
  },
  moreBox: {
    width: 60,
    marginRight: 25
  },
  moreText: {
    fontSize: 20,
    color: '#97A2AD',
    textAlign: 'center'
  },
  taskList: {
    alignItems: 'center'
  }
})