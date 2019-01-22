import { createStackNavigator } from 'react-navigation'

import { Mine } from 'screen/index'

export default createStackNavigator({
  Mine: {
    screen: Mine,
    navigationOptions:() => ({
      title: '',
      headerTitleStyle:{
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }
    })
  }
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      height: 44,
      elevation: 0
    }
  }
})