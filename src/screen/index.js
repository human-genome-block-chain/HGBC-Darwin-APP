module.exports = {
  // 权限判断
  get AuthLoading () { return require('./AuthLoading/index').default },
  // 登录
  get Login () { return require('./Login/index').default },
  // 注册 =》注册主要页面
  get Registered () { return require('./Registered/index').default },
  // 注册 =》验证码流程
  get Verification () { return require('./Verification/index').default },
  // 重置密码=》用户名流程页面
  get ResetPwdUserName () { return require('./ResetPwdUserName/index').default },
  // 重置密码=》发送验证码流程
  get ResetPwdCode () { return require('./ResetPwdCode/index').default },
  // 重置密码=》重置密码
  get ResetPwd () { return require('./ResetPwd/index').default },
  // 首页
  get Home () { return require('./Home/index').default },
  // 个人中心
  get Mine () { return require('./Mine/index').default },
  // 任务盒子
  get Task () { return require('./Task/index').default },
  // token积分详情
  get Integral () { return require('./Integral/index').default },
  // 算力详情
  get CalculateForce () { return require('./CalculateForce/index').default },
  // 收资记录
  get PaymentDetails () { return require('./PaymentDetails/index').default },
  // 设置
  get Settings () { return require('./Settings/index').default },
  // 数据资产
  get Assets () { return require('./Assets/index').default },
  // 我的基础信息详情
  get BaseInfoDetail () { return require('./Assets/BaseInfoDetail/index').default },
  // 全基因组数据
  get WGSInfoDetail () { return require('./Assets/WGSInfoDetail/index').default },
  // 全基因收录进展
  get WGSIncluded () { return require('./Assets/WGSIncluded/index').default },
  // 数据确权
  get RegistrationRight () { return require('./Assets/RegistrationRight/index').default },
  // 全外显子组数据
  get WESInfoDetail () { return require('./Assets/WESInfoDetail/index').default },
  // 全外显子收录进展
  get WESIncluded () { return require('./Assets/WESIncluded/index').default },  
  // 问题反馈
  get Feedback () { return require('./Feedback/index').default },
  // 加入我们
  get JoinUs () { return require('./JoinUs/index').default },
  // 认识星球
  get Know () { return require('./Know/index').default },
  // 消息中心 
  get Message () { return require('./Message/index').default },
  // 消息详情
  get MessageDetail() { return require('./Message/MessageDetail/index').default },
  // 隐私协议
  get PrivacyAgreement () { return require('./PrivacyAgreement/index').default },
  // 用户协议
  get UserAgreement () { return require('./UserAgreement/index').default },
  // 网络状态
  get BrokenNet () { return require('./BrokenNet/index').default },
  // 二维码扫描
  get Scanning () { return require('./Scanning/index').default },
  // 设置交易密码
  get Trading () { return require('./Trading/index').default },
   // 设置交易密码
  get TradingThan () { return require('./TradingThan/index').default },
   // 设置交易密码
  get VerificaCode () { return require('./VerificaCode/index').default },
  // 重置交易密码
  get ToReset () { return require('./ToReset/index').default },
  // 重置交易密码=>忘记密码
  get ForgetPwd () { return require('./ForgetPwd/index').default },
  // 重置交易密码=>忘记密码
  get TradingPwd () { return require('./TradingPwd/index').default },
  // 重置交易密码=>忘记密码
  get TradingthanPwd () { return require('./TradingthanPwd/index').default },
  // 提现
  get Withdrawal () { return require('./Withdrawal/index').default },
  // 钱包地址
  get WalletAddres () { return require('./WalletAddres/index').default },
  // 新增钱包地址
  get AddressThe () { return require('./AddressThe/index').default },
  // 提现详情
  get DealDetailsdls () { return require('./DealDetailsdls/index').default },
  // 提现详情
  get TheOrderDetails () { return require('./TheOrderDetails/index').default },
  // 找回用户名
  get ForgetUsernames () { return require('./ForgetUsernames/index').default },
  // 找回用户名=>消息
  get RetrieveName () { return require('./RetrieveName/index').default },
  // 数据应用列表
  get Application () { return require('./Application/index').default },
  // 数据应用详情
  get ApplyDetail () { return require('./ApplyDetail/index').default },
  // 数据应用
  get ApplyPage () { return require('./Application/ApplyPage/index').default },
  // 位点信息
  get ApplySiteList () { return require('./ApplyDetail/ApplySiteList/index').default },
  // 报告
  get Report () { return require('./ApplyDetail/Report/index').default }
}