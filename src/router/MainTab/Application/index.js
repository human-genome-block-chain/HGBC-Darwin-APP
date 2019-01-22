import { createStackNavigator } from 'react-navigation'

import { Application } from 'screen/index'

export default createStackNavigator({
  Application: {
    screen: Application,
    navigationOptions:() => ({
      title: '数据应用',
      headerTitleStyle:{
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F8FA'
      }
    })
  }
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#F7F8FA',
      borderBottomWidth: 0,
      height: 44,
      elevation: 0
    }
  }
})
