import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "react-navigation"

import { TabBarItem } from 'components/index'
import { MainTabImg } from 'images/index'

import { Home } from 'screen/index'
import Mine from './MineNav/index'
import Application from './Application/index'


export default MainTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions:() => ({
      header: null,
      headerTitle: '首页',
      headerStyle: styles.navigator,
      headerTitleStyle: styles.navigatorTitle,
      gesturesEnabled: true,
      tabBarVisible: true,
      tabBarLabel: '首页',
      tabBarIcon:(({ tintColor,focused }) => {
        return <TabBarItem
          tintColor={ tintColor }
          focused={ focused }
          normalImage={ MainTabImg.normalHome }
          selectedImage={ MainTabImg.selectedHome }
        />
      })
    })
  },
  Application: {
    screen: Application,
    navigationOptions:() => ({
      header: null,
      headerTitle: '应用',
      headerStyle: styles.navigator,
      headerTitleStyle: styles.navigatorTitle,
      gesturesEnabled: true,
      tabBarVisible: true,
      tabBarLabel: '应用',
      tabBarIcon:(({ tintColor,focused }) => {
        return <TabBarItem
          tintColor={ tintColor }
          focused={ focused }
          normalImage={ MainTabImg.normalApplication }
          selectedImage={ MainTabImg.selectedApplication }
        />
      }),
    })
  },
  Mine: {
    screen: Mine,
    navigationOptions:() => ({
      header: null,
      headerTitle: '我的',
      headerStyle: styles.navigator,
      headerTitleStyle: styles.navigatorTitle,
      gesturesEnabled: true,
      tabBarVisible: true,
      tabBarLabel: '我的',
      tabBarIcon:(({ tintColor,focused }) => {
        return <TabBarItem
          tintColor={ tintColor }
          focused={ focused }
          normalImage={ MainTabImg.normalMine }
          selectedImage={ MainTabImg.selectedMine }
        />
      }),
    })
  }
},
{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  initialRouteName: 'Home',
  backBehavior: 'none',
  tabBarOptions:{
    activeTintColor: '#333', 
    inactiveTintColor: '#9E9FA6',
    labelStyle: {
        fontSize: 12,
    },
    style: {
      backgroundColor: '#fff',
      height: 49,
      borderTopColor: '#E7ECF0'
    }
  }
})

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 17,
    color: 'white'
  },
  navigator: {
    backgroundColor: '#fff'
  }
})