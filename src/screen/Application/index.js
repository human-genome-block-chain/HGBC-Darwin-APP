import React, { Component } from 'react'

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView
} from 'react-native'

import ApplyList from './ApplyList/index'

import { getStoreList } from 'api/index'

import { ApplicationImg } from 'images/index'

import Swiper from 'react-native-swiper'

import { AndroidWhiteBar } from 'components/index'

export default class Application extends Component {
  constructor (props) {
    super(props)

    this.state = {
      list: [],
      tab: 'tab1',
      filter: ''
    }
  }

  componentDidMount () {
    this._getStoreList ('newest')
  }

  async _getStoreList (filter) {
    try {
      const result = await getStoreList(filter)

      this.setState({ 
        list: result.data
      })
    } catch (e) {}
  }

  _mapApplyList () {
    return this.state.list.map(item => (
      <ApplyList navigation={ this.props.navigation } key={ item.appid } data={ item }>{ item }</ApplyList>
    ))
  }

  tabChoose (tab) {
    if (tab === 'tab1') {
      this.setState({
        tab: 'tab1'
      })
      this._getStoreList ('newest')
    } else if (tab === 'tab2') {
      this.setState({
        tab: 'tab2'
      })
      this._getStoreList ('inlife')
    } else {
      this.setState({
        tab: 'tab3'
      })
      this._getStoreList('indisease')
    }
  }

  open (url) {
    Linking.openURL(url)
  }

  render () {
    return (
      <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
        <ScrollView showsVerticalScrollIndicator={ false }>
          <View>
            <Swiper
              height={160}  
              dot={<View style={ styles.dot }/>}
              activeDot={<View style={ styles.activeDot }/>}
              paginationStyle={ styles.pagination }
              autoplay={ true }
              autoplayTimeout={ 2 }
            >
              <TouchableOpacity
                activeOpacity={ .8 } 
                onPress={ () => Linking.openURL('https://bihu.com/article/1789710369') }>
                <Image
                  source={ ApplicationImg.Banner2 }
                  style={ styles.bannerImg }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={ .8 }
                onPress={ () => this.open('https://mp.weixin.qq.com/s/3_-JneHlr_6GT6Mx4ORm-Q') } >
                <Image
                  source={ ApplicationImg.Banner1 }
                  style={ styles.bannerImg }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={ .8 }
                onPress={ () => this.open('https://mp.weixin.qq.com/s/s4yLtLNj147zWh28y59xBw') }>
                <Image
                  source={ ApplicationImg.Banner3 }
                  style={ styles.bannerImg }
                />
              </TouchableOpacity>
            </Swiper>
          </View>
          
          <View style={ styles.box2 }>
            <TouchableOpacity
              activeOpacity={ .8 }
              onPress={ () => {
                this.props.navigation.navigate('ApplyPage', { title: '所有应用', filter: 'all' })} }
            >
              <Image
                source={ ApplicationImg.AllApplication }
                style={ styles.box2Img }
                resizeMode="cover"
              />
              <Text>所有应用</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={ .8 }
              style={ styles.box2Box2 }
              onPress={ () => {
                this.props.navigation.navigate('ApplyPage', { title: '已购应用', filter: 'hasbuy' })} }
            >
              <Image
                source={ ApplicationImg.AlreadyBoughtApplication }
                style={ styles.box2Img }
                resizeMode="cover"
              />
              <Text>已购应用</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ .8 } onPress={ () => Linking.openURL('http://qr07.cn/FU9IVG') }>
              <Image
                source={ ApplicationImg.GetData }
                style={ styles.box2Img }
                resizeMode="cover"
              />
              <Text>获取数据</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.box3 }>
            <View style={ styles.tabBox }>
              <TouchableOpacity style={ [styles.tab, this.state.tab === 'tab1' ? styles.choose : ''] } onPress={ () => this.tabChoose('tab1') } activeOpacity={ .8 }><Text style={ styles.tabText }>最新</Text></TouchableOpacity>
              <TouchableOpacity style={ [styles.tab, this.state.tab === 'tab2' ? styles.choose : ''] } onPress={ () => this.tabChoose('tab2') } activeOpacity={ .8 }><Text style={ styles.tabText }>生活</Text></TouchableOpacity>
              <TouchableOpacity style={ [styles.tab, this.state.tab === 'tab3' ? styles.choose : ''] } onPress={ () => this.tabChoose('tab3') } activeOpacity={ .8 }><Text style={ styles.tabText }>健康</Text></TouchableOpacity>
            </View>
              <View>
                { this._mapApplyList () }
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  pagination: {
    bottom: 10
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#D6D6D6',
    marginLeft: 3,
    marginRight: 3
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#31A4F4'
  },
  box2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  box2Img: {
    marginBottom: 15
  },
  box2Box2: {
    marginLeft: 80,
    marginRight: 80
  },
  box3: {
    padding: 20,
    backgroundColor: '#F8FCFF'
  },
  tabBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderStyle: 'solid',
    borderColor: '#D6D6D6'
  },
  tab: {
    marginRight: 17,
    paddingBottom: 5
  },
  choose: {
    borderBottomWidth: .5,
    borderStyle: 'solid',
    borderColor: '#979797'
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  }
})