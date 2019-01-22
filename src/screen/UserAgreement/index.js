import React, { Component } from 'react' 
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

export default class PrivacyAgreement extends Component {
  render () {
    return (
      <SafeAreaView style={ styles.mainBox }>
        <ScrollView 
          style={ styles.container }
          showsVerticalScrollIndicator={ false }
        >
          <AndroidWhiteBar />
          <Text style={ styles.title }>达尔文星球用户服务协议</Text>
          <Text style= { styles.synopsis }>HGBC 尊敬的用户，你好。欢迎使用 “达尔文星球 ”服务（以下简称：本服务），本服务是HGBC 团队（以下简称 “达尔文星球 ”）基于区块链技术为用户 (以下或称 “您 ”)提供的创建达尔文星球 身份、使用 “达尔文星球 ”平台等相关服务。 为了保障您的权益，请在使用本服务前，详细阅读本协议的所有内容，特别是加粗部分。当您通过网络页面点击确认并进行下一步操作时，即视为您已充分理解并同意接受本协议及其项下规则。</Text>
          <Text style= { styles.deal }>本协议构成您与达尔文星球达成的协议，具有法律效力。</Text>
          <Text style= { styles.first }>第一条   定义</Text>
          <Text style= { styles.one }>1、达尔文星球服务：指由达尔文星球基于区块链技术为您提供的创建星球身份、加密储存数字资产和健康数据资产等服务。</Text>
          <Text style= { styles.two }>2、HGBC 健康积分：指达尔文星球平台下基于区块链技术的发行的原生数字资产。健康积分的产生总数是恒定的，每日发放数量恒定，逐年衰减30%。</Text>
          <Text style= { styles.three }>3、算力：是指用户获取HGBC 健康积分的能力，算力越高，获得的HGBC 健康积分越多。</Text>
          <Text style= { styles.second }>第二条    服务规则</Text>
          <Text style= { styles.one }>1、您明确知悉， 本服务涉及达尔文星球相关软件包括但不限于所有权、知识产权等一切权利归HGBC 团队所有。用户在享受本服务时，应当受本协议以及软件及服务相关的具体服务条款、操作规则的约束。</Text>
          <Text style= { styles.two }>2、用户资格：</Text>
          <Text style= { styles.satisfy }>仅当您符合下列条件之一时，才能申请成为达尔文星球用户并使用本服务：</Text>
          <Text style= { styles.two_child }>1 ）年满十八周岁，并具有完全民事权利能力和完全民事行为能力的自然人；</Text>
          <Text style= { styles.two_child }>2 ）未满十八周岁，但其法定监护人予以书面同意的自然人；</Text>
          <Text style= { styles.two_child }>3 ）根据中华人民共和国或设立地法律、法规和 / 或规章成立并合法存在的公司、社团组织和其他组织。</Text>
          <Text style= { styles.look }>无民事行为能力人、限制民事行为能力人以及无经营或特定经营资格的组织不当注册为本服务用户或超过其民事权利或行为能力范围使用本服务的，其与本服务之间的协议自始无效，达尔文星球一经发现，有权立即注销该用户使用达尔文星球及相关服务的资格且无需承担任何责任，并有权追究其（或其法定监护人）使用本服务所产生的相关法律责任。</Text>
          <Text style= { styles.three }>3、注册：</Text>
          <Text style= { styles.three_child }>1）您在使用 “达尔文星球 ”之前，必须先行注册，并填写注册资料，取得达尔文星球账号、密码。 </Text>
          <Text style= { styles.three_child }>2）达尔文星球账号注册资料包括但不限于您的账号名称、头像、密码、注册或更新达尔文星球账号时输入的所有信息。您在注册达尔文星球账号时承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线，不得在达尔文星球账号注册资料中出现违法和不良信息，且您保证在注册和使用账号时， 不得有以下情形： </Text>
          <Text style= { styles.three_childs }>  （ 1 ）违反宪法或法律法规规定的； </Text>
          <Text style= { styles.three_childs }>  （ 2 ）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； </Text>
          <Text style= { styles.three_childs }>  （ 3 ）损害国家荣誉和利益的，损害公共利益的； </Text>
          <Text style= { styles.three_childs }>  （ 4 ）煽动民族仇恨、民族歧视，破坏民族团结的； </Text>
          <Text style= { styles.three_childs }>  （ 5 ）破坏国家宗教政策，宣扬邪教和封建迷信的； </Text>
          <Text style= { styles.three_childs }>  （ 6 ）散布谣言，扰乱社会秩序，破坏社会稳定的 </Text>
          <Text style= { styles.three_childs }>  （ 7 ）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的； </Text>
          <Text style= { styles.three_childs }>  （ 8 ）侮辱或者诽谤他人，侵害他人合法权益的； </Text>
          <Text style= { styles.three_childs }>  （ 9 ）含有法律、行政法规禁止的其他内容的。 </Text>
          <Text style= { styles.three_childs }>  （ 5 ）破坏国家宗教政策，宣扬邪教和封建迷信的； </Text>
          <Text style= { styles.three_child }>3）您成功注册达尔文星球账号以后。根据相关法律、法规规定以及考虑到达尔文星球产品服务的重要性，您同意：</Text>
          <Text style= { styles.three_childs }>  （ 1 ）在注册达尔文星球账号时或注册成功后提交有效身份信息进行实名认证； </Text>
          <Text style= { styles.three_childs }>  （ 2 ）提供及时、详尽及准确的账户注册资料； </Text>
          <Text style= { styles.three_childs }>  （ 3 ）不断更新注册资料，符合及时、详尽准确的要求，除法律法规规定外，对注册达尔文星球账号时或注册成功后填写的身份证件信息不能随意修改。 </Text>
          <Text style= { styles.three_child }>4 ）如果您提供任何不真实、不准确、不完整或不能反映当前情况的资料的，或达尔文星球公司有合理理由怀疑该等资料不真实、不准确、不完整或不能反映当前情况的，达尔文星球公司保留停止您使用本服务的权利，如因您资料的不真实、不准确、不完整或不能反映当前情况而给达尔文星球公司或其关联公司造成损失的，您应负责赔偿。若您以虚假信息骗取账号注册或账号头像、个人简介等注册资料存在违法和不良信息的，达尔文星球有权采取通知限期改正、暂停使用、注销登记等措施。对于冒用关联机构或社会名人注册账号名称的，达尔文星球公司有权注销该账号，并向政府主管部门进行报告。达尔文星球有权对您的达尔文星球账户进行安全性管理，包括但不限于采取限制、冻结、注销用户账户措施。</Text>
          <Text style= { styles.four }>4、本服务为达尔文星球基于迅雷区块链技术向您提供的技术服务，达尔文星球将采取合理技术措施保证达尔文星球的正常运行及安全保障。 您应确保在使用达尔文星球服务过程中不得违反任何法律、法规及相关规定或侵害任何第三人的合法权益，达尔文星球对您使用达尔文星球服务所产生的任何后果不承担任何责任。</Text>
          <Text style= { styles.five }>5、达尔文星球有权制定或调整HGBC 健康积分的使用规则，具体HGBC 健康积分的发放、获取、兑换等相关规则以达尔文星球页面展示为准。</Text>
          <Text style= { styles.six }>6、用户可通过本服务提供的区块链加密技术记录并保护用户的健康数据资产，同时达尔文星球可以帮助您提供相关健康数据资产的查询功能，您可根据自身意愿将个人数字健康数据资产开放给其他达尔文星球用户进行查询。为鼓励用户更好的保护个人数字健康数据资产，发现并拓展个人健康数据资产的价值，达尔文星球会根据相关服务规则对您的数据信息保存及共享查询行为奖励算力值、HGBC 健康积分或其他收益奖励。 您通过达尔文星球保存并加密的健康数据资产归您本人所有，除非经您明确授权，达尔文星球不会收集、储存或使用您的任何健康数据资产，亦不对您向任何第三方提供个人健康数据资产所产生的后果承担责任。</Text>
          <Text style= { styles.seven }>7、您不得利用HGBC 健康积分进行融资或从事HGBC 健康积分与法定货币、 “ 虚拟货币 ” 相互之间的兑换业务，不得买卖或作为中央对手方买卖HGBC 健康积分，不得为HGBC 健康积分提供定价、信息中介等法律法规、监管政策禁止的任何活动，否则达尔文星球有权不经用户同意，立即单方注销该用户的达尔文星球账户并停止向用户继续提供服务，因此而给用户造成的任何损失，由该用户自行承担。</Text>
          <Text style= { styles.eight }>8、 达尔文星球有权就本服务向您收取一定的手续费或服务费，具体以达尔文星球页面公示为准。</Text>
          <Text style= { styles.nine }>9、 您同意达尔文星球有权基于司法、监管部门、监督机构的要求或自身业务原因，暂停、中断或终止向您提供全部或者部分本服务。</Text>
          <Text style= { styles.thirdly }>三、法律责任与免责</Text>
          <Text style= { styles.thirdly_child }>1、达尔文星球对其所有服务将尽力维护其安全性及方便性，但对服务中非因达尔文星球过错所产生的信息（包括但不限于用户发布 / 储存的信息、账户地址、数字资产数量、健康数据资产等）删除或储存失败不承担任何责任。</Text>
          <Text style= { styles.thirdly_child }>2、使用本服务涉及到互联网服务，可能会受到各个环节不稳定因素的影响，存在因不可抗力 ( 包括但不限于战争、地震、雷击、水灾、火灾、政府行为、电信部门技术管制 ) 、计算机病毒、黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何网络、技术、通信线路等原因造成的服务中断或不能满足用户要求的风险，用户须明白并自行承担以上风险，达尔文星球不承担任何责任。</Text>
          <Text style= { styles.thirdly_child }>3、用户因第三方如电信运营商部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力 ( 包括但不限於战争、地震、雷击、水灾、火灾、政府行为、电信部门技术管制 ) 原因而遭受的经济损失，达尔文星球不承担任何责任。</Text>
          <Text style= { styles.thirdly_child }>4、因用户违反本协议或相关的服务条款的规定，导致或产生达尔文星球或其合作公司、关联方遭受任何第三方主张的任何索赔、要求或损失的（包括合理的诉讼费用和律师费用），您应承担赔偿责任。</Text>
          <Text style= { styles.thirdly }>5.请保证达尔文星球上除账户信息外所有跟人体相关的数据属于同一个人。若数据所属不一致，对数据应用结果或其他方面产生的不利影响，达尔文星球不承担任何责任。</Text>
          <Text style= { styles.fifth }>五、其他</Text>
          <Text style= { styles.fifth_child }>1、您同意，达尔文星球有权随时对本协议内容进行调整和补充，达尔文星球将以网页公告等方式对该等变更予以公布。变更后的条款自公布之日起生效。若您在本协议变更的条款生效后，仍继续使用本服务的，则视为接受该等变更，若您不同意的，您有权终止本协议并停止使用本服务。</Text>
          <Text style= { styles.fifth_child }>2、本协议适用中华人民共和国法律并据其解释。</Text>
          <Text style= { styles.fifth_child }>3、因本协议引起的或与本协议有关的争议，达尔文星球可与您协商解决。</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#333333',
    marginTop: 10,
    marginBottom: 10
  },
  synopsis: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  suggest: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  deal: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  first: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  one: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  two: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  three: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  satisfy: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  two_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  second: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  look: {
    marginTop: 10,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  three_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  three_childs: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  four: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  five: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  six: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  seven: {
    marginTop: 30,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  eight: {
    marginTop: 30,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  nine: {
    marginTop: 30,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  thirdly: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  thirdly_child: {
    marginTop: 30,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fifth: {
    marginTop: 15,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fifth_child: {
    marginTop: 30,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  }
})