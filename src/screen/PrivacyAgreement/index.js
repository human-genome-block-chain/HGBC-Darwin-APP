
import React, { Component } from 'react' 
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

export default class UserAgreement extends Component {
  render () {
    return (
      <SafeAreaView style={ styles.mainBox }>
        <ScrollView 
          style={ styles.container }
          showsVerticalScrollIndicator={ false }
        >
          <AndroidWhiteBar />
          <Text style={ styles.title }>达尔文星球隐私政策</Text>
          <Text style={ styles.intro }>HGBC 团队（以下简称“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，您使用“达尔文星球”时，我们将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。</Text>
          <Text style={ styles.suggest }>我们建议您在使用本产品（以下简称“达尔文星球”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与 《达尔文星球服务协议》保持一致。</Text>
          <Text style={ styles.keep }>本政策可由我们在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用达尔文星球，您继续使用达尔文星球将被视为接受修改后的政策。经修改的政策一经在达尔文星球上公布，立即自动生效。</Text>
          <Text style={ styles.first }>第一条       我们收集您的哪些信息</Text>
          <Text style={ styles.know }>请您知悉，我们收集您的以下信息是出于满足您在达尔文星球服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您知悉，若您不提供我们服务所需的相关信息，您在达尔文星球的服务体验可能因此而受到影响。</Text>
          <Text style={ styles.first }></Text>
          <Text style={ styles.first_child }>1、我们将收集您的移动设备信息、操作记录、交易记录、钱包地址等个人信息。</Text>
          <Text style={ styles.first_child }>2、为满足您的特定服务需求，我们将收集您的手机号码、邮件地址等信息。</Text>
          <Text style={ styles.first_child }>3.除上述内容之外，您知悉在您使用达尔文星球特定功能时，我们将在收集您的个人信息前向您作出特别提示，要求向您收集更多的个人信息。如您选择不同意，则视为您放弃使用达尔文星球该特定功能。</Text>
          <Text style={ styles.first_child }>4、在法律法规允许的范围内，我们可能会在以下情形中收集并使用您的个人信息无需征得您的授权同意：</Text>
          <Text style={ styles.first_childs }>（1）与国家安全、国防安全有关的； </Text>
          <Text style={ styles.first_childs }>（2）与公共安全、公共卫生、重大公共利益有关的；</Text>
          <Text style={ styles.first_childs }>（3）与犯罪侦查、起诉、审判和判决执行等有关的；</Text>
          <Text style={ styles.first_childs }>（4）所收集的个人信息是您自行向社会公众公开的；</Text>
          <Text style={ styles.first_childs }>（5）从合法公开披露的信息中收集您的个人信息，如合法的新闻报道，政府信息公开等渠道； </Text>
          <Text style={ styles.first_childs }>（6）用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障；  </Text>
          <Text style={ styles.first_childs }>（7）法律法规规定的其他情形。</Text>
          <Text style={ styles.first_child }>5、我们收集信息的方式如下：</Text>
          <Text style={ styles.first_childs }>（1）您向我们提供信息。例如，您在注册达尔文星球时提供的手机号码，发布内容时提供的地理位置，或在反馈问题时提供邮件地址，或在使用我们的特定服务时，您额外向我们提供。（1）您向我们提供信息。例如，您在注册达尔文星球时提供的手机号码，发布内容时提供的地理位置，或在反馈问题时提供邮件地址，或在使用我们的特定服务时，您额外向我们提供。</Text>
          <Text style={ styles.first_childs }>（2）我们在您使用达尔文星球的过程中获取信息，包括您移动设备信息以及您对达尔文星球的操作记录等信息；</Text>
          <Text style={ styles.first_childs }>（3）我们通过区块链系统，拷贝您全部或部分的交易记录。但交易记录以区块链系统的记载为准。</Text>
          <Text style={ styles.second  }>第二条       我们如何使用您的信息</Text>
          <Text style={ styles.second_child  }>1、我们将向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更。</Text>
          <Text style={ styles.second_child  }>2、我们通过收集您公开的钱包地址和提供的移动设备信息来处理您向我们提交的反馈。</Text>
          <Text style={ styles.second_child  }>3、我们收集您的个人信息进行内部审计、数据分析和研究等，以期不断提升我们的服务水平。</Text>
          <Text style={ styles.second_child  }>4、依照《达尔文星球服务协议》及其他有关规定，我们将利用用户信息对用户的使用行为进行管理及处理。</Text>
          <Text style={ styles.second_child  }>5、法律法规规定及与监管机构配合的要求。</Text>
          <Text style={ styles.thirdly  }>第三条       您如何控制自己的信息</Text>
          <Text style={ styles.have }>您在达尔文星球中拥有以下对您个人信息自主控制权：</Text>
          <Text style={ styles.thirdly_child }>1、您知悉当我们出于特定目的向您收集信息时，我们会提前给予您通知，您有权选择拒绝。但同时您知悉，当您选择拒绝提供有关信息时，即表示您放弃使用达尔文星球的有关服务。</Text>
          <Text style={ styles.thirdly_child }>2、您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。</Text>
          <Text style={ styles.thirdly_child }>3、您有权要求我们更新、更改、删除您的有关信息。</Text>
          <Text style={ styles.thirdly_child }>4、您知悉我们可以根据本政策第一条第4款的要求收集您的信息而无需获得您的授权同意。</Text>
          <Text style={ styles.fourthly  }>第四条       我们可能分享或传输您的信息</Text>
          <Text style={ styles.fourthly_child  }>1、未经您事先同意，我们不会将您的个人信息向任何第三方共享或转让，但以下情况除外：</Text>
          <Text style={ styles.fourthly_childs  }>  （1）事先获得您明确的同意或授权； </Text>
          <Text style={ styles.fourthly_childs  }>  （2）所收集的个人信息是您自行向社会公众公开的； </Text>
          <Text style={ styles.fourthly_childs  }>  （3）所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；  </Text>
          <Text style={ styles.fourthly_childs  }>  （4）与达尔文星球的关联方共享，我们只会共享必要的用户信息，且受本隐私条款中所声明的目的的约束；  </Text>
          <Text style={ styles.fourthly_childs  }>  （5）根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供；  </Text>
          <Text style={ styles.fourthly_childs  }>  （6）在涉及合并、收购时，如涉及到个人信息转让 我们将要求个人信息接收方继续接受本政策的约束。  </Text>
          <Text style={ styles.fifth }>第五条       我们如何保护您的信息</Text>
          <Text style={ styles.fifth_child }>1、如达尔文星球停止运营，我们将及时停止继续收集您个人信息的活动，将停止运营的通知公告在达尔文星球上，并对所持有的您的个人信息在合理期限内进行删除或匿名化处理。</Text>
          <Text style={ styles.fifth_child }>2、为了保护您的个人信息，我们将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。</Text>
          <Text style={ styles.fifth_child }>3、我们将在达尔文星球“消息中心”中向您发送有关信息安全的消息。</Text>
          <Text style={ styles.sixth }>第六条       对未成年人的保护</Text>
          <Text style={ styles.sixth_child }>我们对保护未满18周岁的未成年人做出如下特别约定：</Text>
          <Text style={ styles.sixth_child }>1、未成年人应当在父母或监护人指导下使用达尔文星球相关服务。</Text>
          <Text style={ styles.sixth_child }>2、我们建议未成年人的父母和监护人应当在阅读本政策、《达尔文星球服务协议》及我们的其他有关规则的前提下，指导未成年人使用达尔文星球。</Text>
          <Text style={ styles.sixth_child }>3、达尔文星球将根据国家相关法律法规的规定保护未成年人的个人信息的保密性及安全性。</Text>
          <Text style={ styles.seventh }>第七条       免责声明</Text>
          <Text style={ styles.seventh_child }>我们将在现有技术水平条件下尽可能采取合理的安全措施来保护您的个人信息，以避免信息的泄露、篡改或者毁损。达尔文星球会利用无线方式传输数据，因此，我们无法确保通过无线网络传输数据的隐私性和安全性。</Text>
          <Text style={ styles.eighth }>第八条       其他</Text>
          <Text style={ styles.eighth_child }>1、如您是中华人民共和国以外的用户，您需全面了解并遵守您所在司法辖区与使用达尔文星球服务所有相关法律、法规及规则。</Text>
          <Text style={ styles.eighth_child }>2、您在使用达尔文星球服务过程中，如遇到任何有关个人信息使用的问题，您可以通过在达尔文星球提交反馈等方式联系我们。</Text>
          <Text style={ styles.eighth_child }>3、您可以在达尔文星球中查看本政策及其他服务规则。我们鼓励您在每次访问达尔文星</Text>
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
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50
  },
  content: {
    
   
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#333333',
    marginTop: 10,
    marginBottom: 10
  },
  intro: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  suggest:{
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  keep: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25,
    marginBottom: 25
  },
  first: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  know: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  first_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  first_childs: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  second: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  second_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  thirdly: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  have: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  thirdly_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fourthly: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fourthly_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fourthly_childs: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fifth: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  fifth_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  sixth: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  sixth_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  seventh: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  seventh_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  eighth: {
    marginTop: 20,
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  },
  eighth_child: {
    fontSize: 14,
    color: '#474B5C',
    lineHeight: 25
  }
})