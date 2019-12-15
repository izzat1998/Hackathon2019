import { createStackNavigator } from 'react-navigation-stack';
import { Animated, Easing } from 'react-native';
import Auth from '../screens/Auth';
import Home from '../screens/Home';
import Camera from '../screens/Camera/Camera';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, scene } = sceneProps;

    const thisSceneIndex = scene.index;

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return {
      opacity: translateX,
    };
  },
});

export default createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      header: null,
    },
  },
}, {
  initialRouteName: 'Auth',
  transitionConfig,
});
