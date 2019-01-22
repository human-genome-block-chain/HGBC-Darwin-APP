import React from 'react'
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

import { HeaderLeft, HeaderRight } from 'components/index'

const defaultConfig = {
  transitionConfig: () => ({
    screenInterpolater: CardStackStyleInterpolator.forHorizontal,
  }),
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#fff', 
      borderBottomWidth: 0,
      height: 44,
      elevation: 0
    },
    headerTitleStyle: {
      flex:1,
      textAlign:'center',
      color: '#333',
      fontSize: 17,
      fontWeight: '400'
    },
    headerLeft: (<HeaderLeft triggerBack={ () => navigation.goBack() } />),
    headerRight: <HeaderRight />,
    headerBackTitle: null
  })
}

export default StackNavigationConfig = (options={}) => ({ ...defaultConfig, ...options })