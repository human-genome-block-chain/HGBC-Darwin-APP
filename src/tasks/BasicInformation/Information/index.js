import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native'

import { ChooseButton, AppropriateInput, GradientButton, AndroidWhiteBar } from 'components/index'

import { connect } from 'react-redux'

import { baseInfo } from 'api/index'

import { goBack, setToastMsg, setTasks } from 'actions/index'

import qs from 'qs'

class Information extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '基础信息')
  })

  static defaultProps = {
    triggerClick: (e, goBack) => goBack()
  }

  constructor (props) {
    super(props)
    this.state = {
      clickFemale: false,
      clickMale: false,
      step: '1',
      bloodTypeA: false,
      bloodTypeB: false,
      bloodTypeAB: false,
      bloodTypeO: false,
      bloodTypeRH: false,
      bloodTypeUnknown: false,
      weifaxian: 0,
      huangan: 0,
      liandusu: 0,
      qingmeisu: 0,
      haixian: 0,
      maifu: 0,
      huafen: 0,
      huasheng: 0,
      qita: 0,
      smokingNever: false,
      smokingMore7: false,
      smokingLess7: false,
      smokingSecondhand: false,
      drinkingLess2: false,
      drinking3and4: false,
      drinkingMore5: false,
      sleepMore8: false,
      sleep6and8: false,
      sleepLess6: false,
      sex: '',
      birthday: '',
      nation: '',
      residence: '',
      blood: '',
      smoke: '',
      drink: '',
      sleep: '',
      race: '',
      familydisease: ''
    }

    this.timer = null
  }

  async _baseInfo (e) {
    const { sex, birthday, nation, residence, blood, weifaxian, huangan, liandusu, qingmeisu, haixian, maifu, huafen, huasheng, qita, smoke, drink, sleep, race,familydisease } = this.state

    const { goBack, triggerClick, setTasks } = this.props

    try {

      const allergy = qs.stringify({ weifaxian, huangan, liandusu, qingmeisu, haixian, maifu,  huafen, huasheng, qita })

      await baseInfo({
        sex,
        birthday,
        nation,
        residence,
        blood,
        allergy,
        smoke,
        drink,
        sleep,
        race,
        familydisease
      })

      this.timer = setTimeout (() => {
        setTasks({
          baseinfo: {
            is_finish: 0
          }
        })
        triggerClick(e, goBack)
      }, 1000)

    } catch (err) {
      this.props.setToastMsg(err)
    }
  }

  clickSex (button) {
    if (button === '女') {
      this.setState({
        clickFemale: true,
        clickMale: false,
        sex: button
      })
    } else {
      this.setState({
        clickFemale: false,
        clickMale: true,
        sex: button
      })
    }
  }

  clickBloodType (bloodType) {
    if (bloodType === 'A型') {
      this.setState({
        bloodTypeA: true,
        bloodTypeB: false,
        bloodTypeAB: false,
        bloodTypeO: false,
        bloodTypeRH: false,
        bloodTypeUnknown: false,
        blood: bloodType
      })
    } else if (bloodType === 'B型') {
      this.setState({
        bloodTypeA: false,
        bloodTypeB: true,
        bloodTypeAB: false,
        bloodTypeO: false,
        bloodTypeRH: false,
        bloodTypeUnknown: false,
        blood: bloodType
      })
    } else if (bloodType === 'AB型') {
      this.setState({
        bloodTypeA: false,
        bloodTypeB: false,
        bloodTypeAB: true,
        bloodTypeO: false,
        bloodTypeRH: false,
        bloodTypeUnknown: false,
        blood: bloodType
      })
    } else if (bloodType === 'O型') {
      this.setState({
        bloodTypeA: false,
        bloodTypeB: false,
        bloodTypeAB: false,
        bloodTypeO: true,
        bloodTypeRH: false,
        bloodTypeUnknown: false,
        blood: bloodType
      })
    } else if (bloodType === 'RH型') {
      this.setState({
        bloodTypeA: false,
        bloodTypeB: false,
        bloodTypeAB: false,
        bloodTypeO: false,
        bloodTypeRH: true,
        bloodTypeUnknown: false,
        blood: bloodType
      })
    } else {
      this.setState({
        bloodTypeA: false,
        bloodTypeB: false,
        bloodTypeAB: false,
        bloodTypeO: false,
        bloodTypeRH: false,
        bloodTypeUnknown: true,
        blood: bloodType
      })
    }
  }

  clickAllergy (allergy) {
    if (allergy === '未发现') {
      this.setState({
        weifaxian: 1,
        huangan: 0,
        liandusu: 0,
        qingmeisu: 0,
        haixian: 0,
        maifu: 0,
        huafen: 0,
        huasheng: 0,
        qita: 0
      })
    } else if (allergy === '磺胺') {
      if (this.state.huangan === 0) {
        this.setState({
          weifaxian: 0,
          huangan: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          huangan: 0,
        })
      }
    } else if (allergy === '链霉素') {
      if (this.state.liandusu === 0) {
        this.setState({
          weifaxian: 0,
          liandusu: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          liandusu: 0,
        })
      }
    } else if (allergy === '青霉素') {
      if (this.state.qingmeisu === 0) {
        this.setState({
          weifaxian: 0,
          qingmeisu: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          qingmeisu: 0,
        })
      }
    } else if (allergy === '海鲜') {
      if (this.state.haixian === 0) {
        this.setState({
          weifaxian: 0,
          haixian: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          haixian: 0,
        })
      }
    } else if (allergy === '麦麸') {
      if (this.state.maifu === 0) {
        this.setState({
          weifaxian: 0,
          maifu: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          maifu: 0,
        })
      }
    } else if (allergy === '花粉') {
      if (this.state.huafen=== 0) {
        this.setState({
          weifaxian: 0,
          huafen: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          huafen: 0,
        })
      }
    } else if (allergy === '花生') {
      if (this.state.huasheng === 0) {
        this.setState({
          weifaxian: 0,
          huasheng: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          huasheng: 0,
        })
      }
    } else {
      if (this.state.qita === 0) {
        this.setState({
          weifaxian: 0,
          qita: 1,
        })
      } else {
        this.setState({
          weifaxian: 0,
          qita: 0,
        })
      }
    }
  }

  clickSmoking (smokingHistory) {
    if (smokingHistory === '从不吸') {
      this.setState({
        smokingNever: true,
        smokingMore7: false,
        smokingLess7: false,
        smokingSecondhand: false,
        smoke: smokingHistory
      })
    } else if (smokingHistory === '吸烟>7年') {
      this.setState({
        smokingNever: false,
        smokingMore7: true,
        smokingLess7: false,
        smokingSecondhand: false,
        smoke: smokingHistory
      })
    } else if (smokingHistory === '吸烟≤7年') {
      this.setState({
        smokingNever: false,
        smokingMore7: false,
        smokingLess7: true,
        smokingSecondhand: false,
        smoke: smokingHistory
      })
    } else {
      this.setState({
        smokingNever: false,
        smokingMore7: false,
        smokingLess7: false,
        smokingSecondhand: true,
        smoke: smokingHistory
      })
    }
  }

  clickDrinking (drinking) {
    if (drinking === '每周≤2次') {
      this.setState({
        drinkingLess2: true,
        drinking3and4: false,
        drinkingMore5: false,
        drink: drinking
      })
    } else if (drinking === '每周3-4次') {
      this.setState({
        drinkingLess2: false,
        drinking3and4: true,
        drinkingMore5: false,
        drink: drinking
      })
    } else {
      this.setState({
        drinkingLess2: false,
        drinking3and4: false,
        drinkingMore5: true,
        drink: drinking
      })
    }
  }
  
  clickSleep (sleep) {
    if (sleep === '≥8h') {
      this.setState({
        sleepMore8: true,
        sleep6and8: false,
        sleepLess6: false,
        sleep: sleep
      })
    } else if (sleep === '6~8h') {
      this.setState({
        sleepMore8: false,
        sleep6and8: true,
        sleepLess6: false,
        sleep: sleep
      })
    } else {
      this.setState({
        sleepMore8: false,
        sleep6and8: false,
        sleepLess6: true,
        sleep: sleep
      })
    }
  }

  changeText(type, val) {
    this.setState({ [type]: val })
  }

  continueTo2 () {
    if (this.state.sex === '' || this.state.birthday=== '' || this.state.race === '' || this.state.nation === '') {
      this.props.setToastMsg('请完善您的信息')
    } else {
      this.setState({ step: '2' })
    }
  }

  continueTo3 () {
    if (this.state.residence === '' || this.state.blood=== '' || (this.state.weifaxian === 0 && this.state.huangan === 0 && this.state.liandusu === 0 && this.state.qingmeisu === 0 && this.state.haixian === 0 && this.state.maifu === 0 && this.state.huafen === 0 && this.state.huasheng === 0 && this.state.qita === 0 )) {
      this.props.setToastMsg('请完善您的信息')
    } else {
      this.setState({ step: '3' })
    }
  }

  finished (e) {
    if (this.state.smoke === '' || this.state.drink === '' || this.state.sleep === '') {
      this.props.setToastMsg('请完善您的信息')
    } else {
      this._baseInfo (e)
    }
  }

  render () {

    return (
      <SafeAreaView style={ styles.main }>
        <AndroidWhiteBar />
      { this.state.step === '1' ?
        <ScrollView style={styles.mainBox}>
          <View style={ styles.container }>
            <Text style={ styles.textTitle }>性别</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.sexButton, { backgroundColor: this.state.clickFemale ? '#31A6F3' : '#fff' }] }
                title="女"
                triggerClick={ () => this.clickSex('女') }
              />

              <ChooseButton
                style={ [styles.sexButton, { backgroundColor: this.state.clickMale ? '#31A6F3' : '#fff' }] }
                title="男"
                triggerClick={ () => this.clickSex('男') }
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>出生日期</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                textStyle={ styles.textInputText }
                placeholder={ '例如：1988-12-18' }
                onChangeText={ val => this.changeText('birthday', val) }
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>出生地（中国城市一级）</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                textStyle={ styles.textInputText }
                placeholder={ '例如：北京' }
                onChangeText={ val => this.changeText('race', val) }
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>民族（中国）</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                textStyle={ styles.textInputText }
                placeholder={ '例如：汉族' }
                onChangeText={ val => this.changeText('nation', val) }
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={ styles.gradientButtonBox }>
            <GradientButton
              style={ styles.gradientButton }
              title="继续"
              triggerClick={ () => this.continueTo2() }
            />
          </View>
        </ScrollView> :

      this.state.step === '2' ?
        <ScrollView style={styles.mainBox}>
          <View style={ styles.container }>
            <Text style={ styles.textTitle }>常住地（中国城市一级）</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                textStyle={ styles.textInputText }
                placeholder={ '例如：北京' }
                onChangeText={ val => this.changeText('residence', val) }
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>血型</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeA ? '#31A6F3' : '#fff' }] }
                title="A型"
                triggerClick={ () => this.clickBloodType('A型') }
              />

              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeB ? '#31A6F3' : '#fff' }] }
                title="B型"
                triggerClick={ () => this.clickBloodType('B型') }
              />

              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeAB ? '#31A6F3' : '#fff' }] }
                title="AB型"
                triggerClick={ () => this.clickBloodType('AB型') }
              />
            </View>

            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeO ? '#31A6F3' : '#fff' }] }
                title="O型"
                triggerClick={ () => this.clickBloodType('O型') }
              />

              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeRH ? '#31A6F3' : '#fff' }] }
                title="RH型"
                triggerClick={ () => this.clickBloodType('RH型') }
              />

              <ChooseButton
                style={ [styles.bloodTypeButton, { backgroundColor: this.state.bloodTypeUnknown ? '#31A6F3' : '#fff' }] }
                title="血型未知"
                triggerClick={ () => this.clickBloodType('血型未知') }
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>过敏源（可多选）</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.weifaxian === 1 ? '#31A6F3' : '#fff' }] }
                title="未发现"
                triggerClick={ () => this.clickAllergy('未发现') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.huangan === 1 ? '#31A6F3' : '#fff' }] }
                title="磺胺"
                triggerClick={ () => this.clickAllergy('磺胺') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.liandusu === 1 ? '#31A6F3' : '#fff' }] }
                title="链霉素"
                triggerClick={ () => this.clickAllergy('链霉素') }
              />
            </View>

            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.qingmeisu === 1 ? '#31A6F3' : '#fff' }] }
                title="青霉素"
                triggerClick={ () => this.clickAllergy('青霉素') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.haixian === 1 ? '#31A6F3' : '#fff' }] }
                title="海鲜"
                triggerClick={ () => this.clickAllergy('海鲜') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.maifu === 1 ? '#31A6F3' : '#fff' }] }
                title="麦麸"
                triggerClick={ () => this.clickAllergy('麦麸') }
              />
            </View>

            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.huafen ? '#31A6F3' : '#fff' }] }
                title="花粉"
                triggerClick={ () => this.clickAllergy('花粉') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.huasheng ? '#31A6F3' : '#fff' }] }
                title="花生"
                triggerClick={ () => this.clickAllergy('花生') }
              />

              <ChooseButton
                style={ [styles.allergyButton, { backgroundColor: this.state.qita ? '#31A6F3' : '#fff' }] }
                title="其他"
                triggerClick={ () => this.clickAllergy('其他') }
              />
            </View>
          </View>

          <View style={ styles.gradientButtonBox }>
            <GradientButton
              style={ styles.gradientButton }
              title="继续"
              triggerClick={ () => this.continueTo3() }
            />
          </View>
        </ScrollView> :

        <ScrollView style={styles.mainBox}>
          <View style={ styles.container }>
            <Text style={ styles.textTitle }>吸烟史（长期平均）</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.smokingHistoryButton, { backgroundColor: this.state.smokingNever ? '#31A6F3' : '#fff' }] }
                title="从不吸"
                triggerClick={ () => this.clickSmoking('从不吸') }
              />

              <ChooseButton
                style={ [styles.smokingHistoryButton, { backgroundColor: this.state.smokingMore7 ? '#31A6F3' : '#fff' }] }
                title="吸烟 > 7年"
                triggerClick={ () => this.clickSmoking('吸烟>7年') }
              />

              <ChooseButton
                style={ [styles.smokingHistoryButton, { backgroundColor: this.state.smokingLess7 ? '#31A6F3' : '#fff' }] }
                title="吸烟 ≤ 7年"
                triggerClick={ () => this.clickSmoking('吸烟≤7年') }
              />
            </View>

            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.smokingHistoryButton, { backgroundColor: this.state.smokingSecondhand ? '#31A6F3' : '#fff' }] }
                title="不吸，但接触二手烟"
                triggerClick={ () => this.clickSmoking('不吸，但接触二手烟') }
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>饮酒频率（长期平均）</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.drinkingButton, { backgroundColor: this.state.drinkingLess2 ? '#31A6F3' : '#fff' }] }
                title="每周 ≤ 2次"
                triggerClick={ () => this.clickDrinking('每周≤2次') }
              />

              <ChooseButton
                style={ [styles.drinkingButton, { backgroundColor: this.state.drinking3and4 ? '#31A6F3' : '#fff' }] }
                title="每周3-4次"
                triggerClick={ () => this.clickDrinking('每周3-4次') }
              />

              <ChooseButton
                style={ [styles.drinkingButton, { backgroundColor: this.state.drinkingMore5 ? '#31A6F3' : '#fff' }] }
                title="每周 ≥ 5次"
                triggerClick={ () => this.clickDrinking('每周≥5次') }
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>每日睡眠（长期平均）</Text>
            <View style={ styles.buttonBox }>
              <ChooseButton
                style={ [styles.sleepButton, { backgroundColor: this.state.sleepMore8 ? '#31A6F3' : '#fff' }] }
                title="≥8h"
                triggerClick={ () => this.clickSleep('≥8h') }
              />

              <ChooseButton
                style={ [styles.sleepButton, { backgroundColor: this.state.sleep6and8 ? '#31A6F3' : '#fff' }] }
                title="6~8h"
                triggerClick={ () => this.clickSleep('6~8h') }
              />

              <ChooseButton
                style={ [styles.sleepButton, { backgroundColor: this.state.sleepLess6 ? '#31A6F3' : '#fff' }] }
                title="≤6h"
                triggerClick={ () => this.clickSleep('≤6h') }
              />
            </View>
          </View>

          <View style={ styles.container }>
            <Text style={ styles.textTitle }>家族常见病（选填）</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                textStyle={ styles.textInputText }
                placeholder={ '例：糖尿病' }
                onChangeText={ val => this.changeText('familydisease', val) }
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={ styles.gradientButtonBox }>
            <GradientButton
              style={ styles.gradientButton }
              title="完成提交"
              triggerClick={ (e) => this.finished(e) }
            />
          </View>
        </ScrollView>
      }
      </SafeAreaView> 
    )
  }
}

export default connect(null, dispatch => ({
  setTasks: data => dispatch(setTasks(data)),
  goBack: () => dispatch(goBack()),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(Information)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  mainBox: {
    paddingLeft: 35,
    paddingTop: 35, 
    paddingRight: 35
  },
  container: {
    marginBottom: 40
  },
  textTitle: {
    fontSize: 15
  },
  buttonBox: {
    flexDirection: 'row'
  },
  sexButton: {
    width: 85,
    marginRight: 55,
    marginTop: 20
  },
  raceButton: {
    width: 50,
    marginRight: 30,
    marginTop: 20
  },
  bloodTypeButton: {
    width: 50,
    marginRight: 70,
    marginTop: 20
  },
  allergyButton: {
    width: 50,
    marginRight: 70,
    marginTop: 20
  },
  smokingHistoryButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 40,
    marginTop: 20
  },
  drinkingButton: {
    width: 85,
    marginRight: 26,
    marginTop: 20
  },
  sleepButton: {
    width: 65,
    marginRight: 53,
    marginTop: 20
  },
  textInputBox: {
    height: 45,
    borderBottomWidth: .5,
    borderBottomColor: '#595757'
  },
  textInput: {
    flex: 1,
    paddingTop: 12
  },
  textInputText: {
    fontSize: 13,
    color: '#000'
  },
  gradientButtonBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  gradientButton: {
    width: 300,
    height: 66,
    justifyContent: 'center',
  }
})