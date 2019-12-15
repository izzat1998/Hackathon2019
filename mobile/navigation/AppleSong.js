import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/AppleSong';

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
}, {
  initialRouteName: 'Home',
});
