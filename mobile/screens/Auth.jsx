import React, { Component } from 'react';
import theme from '../utils/theme'
import { View, Text, Animated, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Dimensions, AsyncStorage, Keyboard } from 'react-native';
import { Svg, ClipPath, Circle, Image } from 'react-native-svg';
import * as Font from 'expo-font';
import Auth from '../service/Auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    parent: {
        backgroundColor: theme.white,
        justifyContent: 'flex-end'
    },
    buttonHolder: {
        height: height / 3,
        justifyContent: 'center',
    },
    image: {
        width: null,
        height: null
    },
    button: {
        zIndex: 2,
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 1,
        borderColor: theme.white,
        height: 65,
        borderRadius: 65,
        backgroundColor: theme.white
    },
    shadow: {
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    buttonContent: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    signInContainer: {
        position: 'absolute',
        height: height/3 + 25,
        ...StyleSheet.absoluteFill,
        top: null,
    },
    closeContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: -22.5,
        width: 45,
        height: 45,
        borderRadius: 64,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeContent: {
        fontSize: 18,
        transform: [{ rotate: '45deg' }]
    },
    authContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 25,
        fontSize: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0, 0.4)',
    }
})

export default class extends Component {
    constructor() {
        super();
        this.btnOpacity = new Animated.Value(1);
        this.keyboardHeight = new Animated.Value(0);
        this.closeTransform = this.btnOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height / 3],
            extrapolate: 'clamp'
        });
        this.bgY = this.btnOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-height/3 - 50, 0],
            extrapolate: 'clamp'
        });
        this.regY = this.btnOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height/3],
            extrapolate: 'clamp'
        });
        this.btnY = this.btnOpacity.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [height/3, height/12, 0],
            extrapolate: 'clamp',
        });
        this.state ={
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        Font.loadAsync({
            'andadasc-bold': require('../assets/fonts/Andada-Bold.otf'),
            'andadasc-regular': require('../assets/fonts/Andada-Regular.otf'),
        });
    }

    signIn() {
        Animated.timing(
            this.btnOpacity,
            {
                toValue: 0,
                duration: 1000
            }
        ).start()
    }
    close() {
        Animated.timing(
            this.btnOpacity,
            {
                toValue: 1,
                duration: 1000
            }
        ).start()
    }
    logIn() {
        Auth.login(this.state)
        .then(async ({token}) => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.setItem('token', token);
            this.props.navigation.navigate('Home')
        })
        .catch(err => alert(err))
    }
    
    render() {
        return (
            <KeyboardAvoidingView
                style={[styles.flex, styles.parent]}
                enabled={false}
                behavior="height">
                    <Animated.View style={[{...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }]}]}>
                        <Svg height={height + 70} width={width}>
                            <ClipPath id='circled'>
                                <Circle r={height + 70} cx={width / 2}/>
                            </ClipPath>
                            <Image        
                                clipPath="url(#circled)"
                                width={width}
                                height={height + 70}
                                preserveAspectRatio="xMidYMid slice"
                                href={require('../assets/bg.jpeg')}
                            />
                        </Svg>
                    </Animated.View>
                    <View style={styles.buttonHolder}>
                        <Animated.View style={[styles.button, styles.shadow, { opacity: this.btnOpacity, transform: [{ translateY: this.btnY }] }]}>
                            <TouchableOpacity style={[styles.flex, styles.center]} onPress={() => this.signIn()}>
                                <Text style={styles.buttonContent}>SIGN IN</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={[styles.signInContainer, {transform: [{ translateY: this.regY }]}]}>
                            <Animated.View style={[styles.closeContainer, { transform: [{ translateY: this.closeTransform }]}]}>
                                <TouchableOpacity onPress={() => this.close()} style={[styles.close, styles.shadow]}>
                                    <Text style={styles.closeContent}>+</Text>
                                </TouchableOpacity>
                            </Animated.View>
                            <View style={[styles.authContainer]}>
                                <TextInput
                                    onChangeText={username => this.setState({ username })}
                                    style={[styles.textInput]}
                                    placeholder='Username'/>
                                <TextInput
                                    onChangeText={password => this.setState({ password })}
                                    style={styles.textInput}
                                    placeholder='Password'/>
                                <TouchableOpacity style={[styles.center, styles.button, styles.shadow, { marginTop: 10 }]} onPress={() => this.logIn()}>
                                    <Text style={styles.buttonContent}>SIGN IN</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
            </KeyboardAvoidingView>
        )
    }
}