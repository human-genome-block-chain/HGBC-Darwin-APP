import { createStackNavigator } from 'react-navigation'

import StackNavigatorConfig from './connfig/StackNavigatorConfig'

import MainTab from './MainTab/index'

import {
  Task,
  Integral,
  CalculateForce,
  PaymentDetails,
  Assets,
  BaseInfoDetail,
  WGSInfoDetail,
  WESInfoDetail,
  WGSIncluded,
  WESIncluded,
  RegistrationRight,
  Feedback,
  JoinUs,
  Know,
  Settings,
  Message,
  MessageDetail,
  Login,
  Registered,
  Verification,
  ResetPwdUserName,
  ResetPwdCode,
  ResetPwd,
  PrivacyAgreement,
  UserAgreement,
  AuthLoading,
  BrokenNet,
  Scanning,
  Trading,
  TradingThan,
  VerificaCode,
  ToReset,
  ForgetPwd,
  TradingPwd,
  TradingthanPwd,
  Withdrawal,
  WalletAddres,
  AddressThe,
  DealDetailsdls,
  TheOrderDetails,
  ForgetUsernames,
  RetrieveName,
  ApplyDetail,
  ApplyPage,
  ApplySiteList,
  Report
} from 'screen/index'

import {
  Invitation,
  BasicInformation,
  Information,
  QRCode,
  SignIn,
  Strategy,
  Wgs,
  Wes,
  WesCollectionProcess,
  Activate,
  Myscene,
  Incentive
} from 'tasks/index'

const RootRouter = {
  AuthLoading: {
    screen: AuthLoading,
    navigationOptions: () => ({
      header: null,
      gesturesEnable: false
    })
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
      gesturesEnable: false
    })
  },
  Registered: {
    screen: Registered,
    navigationOptions: () => ({
      header: null,
      gesturesEnable: false
    })
  },
  Verification: {
    screen: Verification,
    navigationOptions: () => ({
      header: null,
      gesturesEnable: false
    })
  },
  ResetPwdUserName: {
    screen: ResetPwdUserName,
    navigationOptions:() => ({
      title: '修改密码'
    })
  },
  ResetPwdCode: {
    screen: ResetPwdCode,
    navigationOptions:() => ({
      title: '修改密码'
    })
  },
  ResetPwd: {
    screen: ResetPwd,
    navigationOptions:() => ({
      title: '修改密码'
    })
  },
  PrivacyAgreement: {
    screen: PrivacyAgreement,
    navigationOptions:() => ({
      title: '隐私协议'
    })
  },
  UserAgreement: {
    screen: UserAgreement,
    navigationOptions:() => ({
      title: '用户协议'
    })
  },
  BrokenNet: {
    screen: BrokenNet,
    navigationOptions:() => ({
      header: null
    })
  },
  MainTab: {
    screen: MainTab,
    navigationOptions: () => ({
      header: null
    })
  },
  Task: {
    screen: Task,
    navigationOptions: () => ({
      title: '算力加速'
    })
  },
  Invitation: {
    screen: Invitation
  },
  BasicInformation: { // 基础信息
    screen: BasicInformation,
    navigationOptions: () => ({
      title: '基础信息'
    })
  },
  Information: { // 我的基础信息
    screen: Information,
    navigationOptions: () => ({
      title: '基础信息'
    })
  },
  QRCode: {
    screen: QRCode,
    navigationOptions: () => ({
      header: null
    })
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: () => ({
      title: '每日签到'
    })
  },
  Strategy: {
    screen: Strategy,
    navigationOptions: () => ({
      title: '攻略'
    })
  },
  Activate: {
    screen: Activate,
    navigationOptions: () => ({
      title: '激活邀请码'
    })
  },
  Integral: {
    screen: Integral,
    navigationOptions:() => ({
      title: 'HGBC碱基'
    })
  },
  Wgs: {
    screen: Wgs,
    navigationOptions:() => ({
      header: null
    })
  },
  Wes: { // 全外显子
    screen: Wes,
    navigationOptions:() => ({
      header: null
    })
  },
  WesCollectionProcess: {
    screen: WesCollectionProcess,
    navigationOptions:() => ({
      title: '数据收录流程'
    })
  },
  Myscene: {
    screen: Myscene,
    navigationOptions:() => ({
      title: '全基因组数据'
    })
  },
  CalculateForce: {
    screen: CalculateForce,
    navigationOptions:() => ({
      title: '算力'
    })
  },
  PaymentDetails: {
    screen: PaymentDetails
  },
  Assets: {
    screen: Assets
  },
  BaseInfoDetail: { // 我的基础信息
    screen: BaseInfoDetail,
    navigationOptions:() => ({
      title: '我的基础信息'
    })
  },
  WGSInfoDetail: { // 全基因组数据
    screen: WGSInfoDetail,
    navigationOptions:() => ({
      title: '全基因组数据'
    })
  },
  WESInfoDetail: { // 全外显子组数据
    screen: WESInfoDetail,
    navigationOptions:() => ({
      title: '全外显子组数据'
    })
  },
  WGSIncluded: { // 全基因组数据
    screen: WGSIncluded,
    navigationOptions:() => ({
      title: '全基因组数据'
    })
  },
  WESIncluded: { // 全外显子组数据
    screen: WESIncluded,
    navigationOptions:() => ({
      title: '全外显子组数据'
    })
  },
  RegistrationRight: { // 数据确权
    screen: RegistrationRight,
    navigationOptions: () => ({
      title: '上链确权'
    })
  },
  Feedback: {
    screen: Feedback,
    navigationOptions:() => ({
      title: '问题反馈'
    })
  },
  JoinUs: {
    screen: JoinUs,
    navigationOptions:() => ({
      title: '加入我们'
    })
  },
  Know: {
    screen: Know,
    navigationOptions:() => ({
      title: '认识星球'
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions:() => ({
      title: '账户设置'
    })
  },
  Message: {
    screen: Message,
    navigationOptions:() => ({
      title: '消息'
    })
  },
  MessageDetail: {
    screen: MessageDetail,
    navigationOptions:() => ({
      title: '消息详情'
    })
  },
  Scanning: {
    screen: Scanning,
    navigationOptions:() => ({
      title: '扫描'
    })
  },
  Incentive: {
    screen: Incentive,
    navigationOptions:() => ({
      title: '测序早鸟计划'
    })
  },
  Trading: {
    screen: Trading,
    navigationOptions:() => ({
      title: '设置交易密码'
    })
  },
  TradingThan: {
    screen: TradingThan,
    navigationOptions:() => ({
      title: '设置交易密码'
    })
  },
  VerificaCode: {
    screen: VerificaCode,
    navigationOptions:() => ({
      title: '设置交易密码'
    })
  },
  ToReset: {
    screen: ToReset,
    navigationOptions:() => ({
      title: '重置交易密码'
    })
  },
  ForgetPwd: {
    screen: ForgetPwd,
    navigationOptions:() => ({
      title: '重置交易密码'
    })
  },
  TradingPwd: {
    screen: TradingPwd,
    navigationOptions:() => ({
      title: '忘记交易密码'
    })
  },
  TradingthanPwd: {
    screen: TradingthanPwd,
    navigationOptions:() => ({
      title: '忘记交易密码'
    })
  },
  Withdrawal: {
    screen: Withdrawal,
    navigationOptions:() => ({
      title: null
    })
  },
  WalletAddres: {
    screen: WalletAddres,
    navigationOptions:() => ({
      header: null
    })
  },
  AddressThe: {
    screen: AddressThe,
    navigationOptions:() => ({
      title: null
    })
  },
  DealDetailsdls: {
    screen: DealDetailsdls,
    navigationOptions:() => ({
      title: '订单状态'
    })
  },
  TheOrderDetails: {
    screen: TheOrderDetails,
    navigationOptions:() => ({
      title: '提现订单'
    })
  },
  ForgetUsernames: {
    screen: ForgetUsernames,
    navigationOptions:() => ({
      title: '找回用户名'
    })
  },
  RetrieveName: {
    screen: RetrieveName,
    navigationOptions:() => ({
      title: '找回用户名'
    })
  },
  ApplyDetail: {
    screen: ApplyDetail
  },
  ApplySiteList: {
    screen: ApplySiteList,
    navigationOptions:() => ({
      title: '位点信息列表'
    })
  },
  ApplyPage: {
    screen: ApplyPage
  },
  Report: {
    screen: Report,
    navigationOptions:() => ({
      title: '报告'
    })
  }
}

export default createStackNavigator(RootRouter, StackNavigatorConfig({initialRouteName: 'AuthLoading'}))