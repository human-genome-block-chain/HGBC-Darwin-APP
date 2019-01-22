module.exports = {
  // 邀请页面
  get Invitation () { return require('./Invitation/index').default },
  // 邀请二维码页面
  get QRCode () { return require('./QRCode/index').default },
  // 签到
  get SignIn () { return require('./SignIn/index').default },
  // 攻略
  get Strategy () { return require('./Strategy/index').default },
  // 基因矿机
  get Wgs () { return require('./Wgs/index').default },
  // 邀请码任务
  get Activate () { return require('./Activate/index').default },
  // 基因组数据
  get Myscene () { return require('./Myscene/index').default },
  // 奖励计划
  get Incentive () { return require('./Incentive/index').default },
  // 基础信息
  get BasicInformation () { return require('./BasicInformation/index').default },
  // 我的基础信息
  get Information () { return require('./BasicInformation/Information/index').default },
  // 全外显子
  get Wes () { return require('./Wes/index').default },
  // 全外显子数据收录流程
  get WesCollectionProcess () { return require('./Wes/CollectionProcess/index').default }
}