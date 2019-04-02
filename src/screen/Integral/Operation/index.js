import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { BackgroundPicture } from 'components/index'
import { IntegralImg } from 'images/index'

class Operation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentDidMount () {
    this._startTimer()
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  _startTimer () {
    this.interval && clearInterval(this.interval)

    this.interval = setInterval(() => {
      // 获取当前时间戳
      const nowTime = new Date().getTime() / 1000
      // 获取某个时间格式的时间戳
      const otherTime = this.props.available_time
      
      if (parseFloat(nowTime) >= parseFloat(otherTime)) {

        this.interval && clearInterval(this.interval)

        this.setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      } else {
        const date3 = otherTime - nowTime;

        // 天 
        const day = Math.floor(date3 / (24 * 3600));
        // 时
        const leave1 = date3 % (24 * 3600);
        const hour = Math.floor(leave1 / (3600));
        // 分
        const leave2 = leave1 % (3600);
        const minute = Math.floor(leave2 / (60));
        // 秒
        const leave3 = leave2 % (60);
        const second = Math.round(leave3);

        this.setState({
          days: day,
          hours: hour,
          minutes: minute,
          seconds: second
        })
      }
    }, 1000)
  }

  render () {
    return (
      <View style={ styles.container }>
        <BackgroundPicture
          style={ styles.backgroundBox}
          source={ IntegralImg.Operation }
        >
          <TouchableOpacity
            onPress={ () => this.props.navigation.navigate('PaymentDetails', { title: '收支明细', type: 1 }) }
            style={ styles.button }
            activeOpacity={ .9 }
          >
            <Image 
              style={ styles.detailImage }
              source={ IntegralImg.Detail }
              resizeMode="cover"
            />
            <Text style={ styles.buttonText }>
              收支明细
            </Text>
          </TouchableOpacity>
          <View style={ styles.assetsBox }>
            <Text style={ styles.assetsTitle }>总数字资产</Text>
            <View  style={ styles.assetsNumberBox }>
              <Text style={ styles.assetsNumber }>{ this.props.token_count.toFixed(4) }</Text>
              <Text style={ styles.assetsHgbc }>碱基</Text>
            </View>
            {
              this.props.available_time === 0 ? '' :
              <Text style={ styles.time } onPress={ () => this.props.navigation.navigate('TimeDetail') }>
                { this.state.days }天{ this.state.hours }时{ this.state.minutes }分{ this.state.seconds }秒 后销毁
              </Text>
            }
          </View>
            <TouchableOpacity
              onPress={ () => this.props.withdrawal() }
              style={ styles.buttonBottom }
              activeOpacity={ .9 }
            >
              <Image
                style={ styles.walletImage }
                source={ IntegralImg.Wallet }
                resizeMode="cover"
              />
              <Text style={ [styles.buttonText, styles.buttonTextBottom] }>提现到链克口袋</Text>
            </TouchableOpacity>
          
          <View style={ styles.buttonBottom } />
        </BackgroundPicture>
      </View>
    )
  }
}

export default connect(state => ({ ...state.home }))(Operation)

const styles = StyleSheet.create({
  container: {
    height: 218,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBox: {
    width: 343,
    height: 218,
    paddingTop: 20,
    paddingLeft: 38,
    paddingRight: 38,
    paddingBottom: 30,
    justifyContent:'space-around'
  },
  button: {
    width: 86,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 4
  },
  detailImage: {
    width: 14,
    height: 15
  },
  assetsBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  assetsTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  assetsNumberBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  assetsNumber: {
    fontSize: 24,
    color: '#fff'
  },
  assetsHgbc: {
    fontSize: 21,
    color: '#fff',
    marginLeft: 8
  },
  buttonBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextBottom: {
    fontSize: 16
  },
  walletImage: {
    width: 15,
    height: 14
  },
  time: {
    fontSize: 18,
    color: '#e43937',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5
  }
})