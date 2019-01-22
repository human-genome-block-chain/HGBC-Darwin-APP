import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Assets, CommonImg } from 'images/index'
import { getDataInfo } from 'api/index'

export default class AssetsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statistics: {},
      baseinfo: {},
      wgsinfo: {},
      wesinfo: {}
    }
  }

  componentDidMount () {
    this._getDataInfo()
  }

  async _getDataInfo () {
    try {
      const result = await getDataInfo()

      this.setState({
        statistics: result.data.statistics,
        baseinfo: result.data.baseinfo,
        wgsinfo: result.data.wgsinfo,
        wesinfo: result.data.wesinfo
      })
    } catch (e) {}
  }

  render () {
    const { statistics, baseinfo, wgsinfo, wesinfo } = this.state

    return (
      <ScrollView style={ styles.main } showsVerticalScrollIndicator={ false }>
        <View style={ styles.Box }>
          <Text style={ styles.title }>数据资产统计</Text>
          <Text style={ styles.title }>{ statistics.datasize } M</Text>
          <View style={ styles.iconBox }>
            <Image
              source={ Assets.Link }
              resizeMode="cover"
            ></Image>
            <Text style={ styles.linkText }>区块链持续保障数据私密和安全</Text>
          </View>
          <View style={ styles.statisticsMain }>
            <View style={ styles.statisticsMainBox }>
              <Text style={ styles.statisticsMainBoxTitle }>{ statistics.storetime }</Text>
              <Text>增值存储(天)</Text>
            </View>
            <View style={ styles.statisticsMainBox }>
              <Text style={ styles.statisticsMainBoxTitle }>{ statistics.types }</Text>
              <Text>数据类型(种)</Text>
            </View>
            <View style={ styles.statisticsMainBox }>
              <Text style={ styles.statisticsMainBoxTitle }>{ statistics.sharetimes }</Text>
              <Text>授权(次)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={ styles.Box }
          activeOpacity={ .8 }
          onPress={ () => this.props.navigation.navigate('Task') }
        >
          <View style={ styles.iconBox }>
            <Image
              source={ Assets.LightBulb }
              resizeMode="cover"
            ></Image>
            <Text style={ styles.LightBulbText }>收录更多的健康数据，增加自己的数据资产。</Text>
          </View>
        </TouchableOpacity>

        {baseinfo.isfinish ?
          <View style={ styles.baseinfoBox }>
            <View style={ styles.baseInfoHeader }>
              <Text style={ styles.title }>我的基础信息</Text>
              <TouchableOpacity
                style={ styles.baseInfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('BaseInfoDetail') }
              >
                <Text style={ styles.baseInfoHeaderRightText }>查看详情</Text>
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View> 
            <View>
              <View style={ styles.baseInfoTextBox }>
                <View style={ styles.baseInfoTextButton }>
                  <Text style={ styles.baseInfoText }>{ baseinfo.sex }</Text>
                </View>
                <View style={ styles.baseInfoTextButton }>
                  <Text style={ styles.baseInfoText }>{ baseinfo.age }</Text>
                </View>
                <View style={ styles.baseInfoTextButton }>
                  <Text style={ styles.baseInfoText }>{ baseinfo.nation }</Text>
                </View>
              </View>
              <View style={ styles.baseInfoTextBox2 }>
                <View style={ styles.baseInfoTextButton2 }>
                  <Text style={ styles.baseInfoText }>{ baseinfo.race }</Text>
                </View>
                <View style={ styles.baseInfoTextButton2 }>
                  <Text style={ styles.baseInfoText }>{ baseinfo.blood }</Text>
                </View>
              </View>
            </View>
          </View> : 

          <View style={ styles.baseinfoBox }>
            <View style={ styles.baseInfoHeader }>
              <Text style={ styles.title }>我的基础信息</Text>
              <TouchableOpacity
                style={ styles.baseInfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('BasicInformation') }
              >
                <Text style={ styles.baseInfoHeaderRightText }>去收录</Text>
                <Image
                  style={ styles.icon }
                  source={ Assets.Icon }
                  resizeMode="cover"
                />
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.baseInfoHeaderMainText}>无数据</Text>
          </View>
        }

        {wgsinfo.isfinish ?
          <View style={ styles.wgsinfoBox }>
            <View style={ styles.wgsinfoHeader }>
              <Text style={ styles.title }>全基因组数据</Text>
              <TouchableOpacity
                style={ styles.wgsinfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('WGSInfoDetail') }
              >
                <Text style={ styles.wgsinfoHeaderRightText }>查看详情</Text>
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={ styles.wgsinfoMainTitle }>数据编号</Text>
              <View style={ styles.wgsinfoMainBox }>
                <Text style={ styles.wgsinfoMainText }>{ wgsinfo.scode }</Text>
                { wgsinfo.onchain ?
                  <View></View> :
                  <TouchableOpacity style={ styles.wgsinfoMainButton } onPress={ () => this.props.navigation.navigate('RegistrationRight', { scode: wgsinfo.scode, samtype: wgsinfo.samtype }) }>
                    <Text style={ styles.wgsinfoMainButtonText }>去确权</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View> : 

          <View style={ styles.wgsinfoBox }>
            <View style={ styles.wgsinfoHeader }>
              <Text style={ styles.title }>全基因组数据</Text>
              <TouchableOpacity
                style={ styles.wgsinfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('Wgs') }
              >
                <Text style={ styles.wgsinfoHeaderRightText }>去收录</Text>
                <Image
                  style={ styles.icon }
                  source={ Assets.Icon }
                  resizeMode="cover"
                />
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.wgsinfoHeaderMainText}>无数据</Text>
          </View>
        }

        {wesinfo.isfinish ?
          <View style={ styles.wesinfoBox }>
            <View style={ styles.wesinfoHeader }>
              <Text style={ styles.title }>全外显子组数据</Text>
              <TouchableOpacity
                style={ styles.wesinfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('WESInfoDetail') }
              >
                <Text style={ styles.wesinfoHeaderRightText }>查看详情</Text>
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={ styles.wesinfoMainTitle }>数据编号</Text>
              <View style={ styles.wesinfoMainBox }>
                <Text style={ styles.wesinfoMainText }>{ wesinfo.scode }</Text>
                { wesinfo.onchain ?
                  <View></View> :
                  <TouchableOpacity style={ styles.wesinfoMainButton } onPress={ () => this.props.navigation.navigate('RegistrationRight', { scode: wesinfo.scode, samtype: wesinfo.samtype }) }>
                    <Text style={ styles.wesinfoMainButtonText }>去确权</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View> : 

          <View style={ styles.wesinfoBox }>
            <View style={ styles.wesinfoHeader }>
              <Text style={ styles.title }>全外显子组数据</Text>
              <TouchableOpacity
                style={ styles.wesinfoHeaderRight }
                activeOpacity={ .8 }
                onPress={ () => this.props.navigation.navigate('Wes') }
              >
                <Text style={ styles.wesinfoHeaderRightText }>去收录</Text>
                <Image
                  style={ styles.icon }
                  source={ Assets.Icon }
                  resizeMode="cover"
                />
                <Image
                  source={ CommonImg.Arrow }
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.wesinfoHeaderMainText}>无数据</Text>
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20
  },
  Box: {
    backgroundColor: '#6AD3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    color: '#9496A0',
    fontSize: 13,
    marginLeft: 5
  },
  statisticsMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  statisticsMainBox: {
    alignItems: 'center',
    marginRight: 35
  },
  statisticsMainBoxTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  LightBulbText: {
    fontSize: 14,
    marginLeft: 5
  },
  baseinfoBox: {
    backgroundColor: '#6AD3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    height: 135
  },
  baseInfoHeader: {
    flexDirection: 'row',
    position: 'relative'
  },
  baseInfoHeaderRight: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 2
  },
  baseInfoHeaderRightText: {
    fontSize: 14,
    marginRight: 5,
    alignItems: 'center'
  },
  baseInfoHeaderMainText: {
    fontSize: 18,
    color: '#9496A0',
    marginTop: 20,
    marginLeft: 120
  },
  baseInfoTextBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  baseInfoTextBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  baseInfoTextButton: {
    borderWidth: .3,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 20,
    marginLeft: 30
  },
  baseInfoTextButton2: {
    borderWidth: .3,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    marginLeft: 65
  },
  baseInfoText: {
    fontSize: 12,
  },
  wgsinfoBox: {
    backgroundColor: '#6AD3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    height: 135
  },
  wgsinfoHeader: {
    flexDirection: 'row',
    position: 'relative'
  },
  wgsinfoHeaderRight: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 2
  },
  wgsinfoHeaderRightText: {
    fontSize: 14,
    marginRight: 5,
    alignItems: 'center'
  },
  wgsinfoHeaderMainText: {
    fontSize: 18,
    color: '#9496A0',
    marginTop: 20,
    marginLeft: 120
  },
  wgsinfoMainTitle: {
    color: '#9496A0',
    fontSize: 14,
    marginBottom: 10
  },
  wgsinfoMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  wgsinfoMainText: {
     color: '#9496A0',
    fontSize: 24
  },
  wgsinfoMainButton: {
    borderWidth: .3,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    position: 'absolute',
    right: 0,
    top: 0
  },
  wgsinfoMainButtonText: {
    fontSize: 12
  },
  icon: {
    marginRight: 10
  },
  wesinfoBox: {
    backgroundColor: '#6AD3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    height: 135
  },
  wesinfoHeader: {
    flexDirection: 'row',
    position: 'relative'
  },
  wesinfoHeaderRight: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 2
  },
  wesinfoHeaderRightText: {
    fontSize: 14,
    marginRight: 5,
    alignItems: 'center'
  },
  wesinfoHeaderMainText: {
    fontSize: 18,
    color: '#9496A0',
    marginTop: 20,
    marginLeft: 120
  },
  wesinfoMainTitle: {
    color: '#9496A0',
    fontSize: 14,
    marginBottom: 10
  },
  wesinfoMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  wesinfoMainText: {
     color: '#9496A0',
    fontSize: 24
  },
  wesinfoMainButton: {
    borderWidth: .3,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    position: 'absolute',
    right: 0,
    top: 0
  },
  wesinfoMainButtonText: {
    fontSize: 12
  },
})