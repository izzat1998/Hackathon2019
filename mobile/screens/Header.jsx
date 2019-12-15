import React, { Component } from 'react';
import theme from '../utils/theme';
import { FontAwesome } from '@expo/vector-icons'
import { View, Animated, Text, StyleSheet, Dimensions, Image, TouchableOpacity , AsyncStorage} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
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
    header: { 
        height: hp('30%'),
        backgroundColor: theme.primary
    },
    headerContent: {
        top: hp('20%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        left: wp('12.5%')
    },
    imageHolder: {
        width: 130,
        height: 130,
        borderRadius: 130,
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: theme.white,
        zIndex: 11
    },
    text: { fontSize: hp('2%'), color: theme.homeInfoText },
})

export default class extends Component{
    constructor(props) {
        super(props)
        this.state = {
            headerY: new Animated.Value(-hp('40%')),
            headerBorderRadius: new Animated.Value(0),
            imageX: new Animated.Value(width)
        }
    }
    async logOut() {
        await AsyncStorage.removeItem('token');
        this.props.navigate('Auth');
    }
    launch() {
        Animated.sequence([
            Animated.timing(
                this.state.headerY,
                {
                    toValue: 0,
                    duration: 500
                }
            ),
            Animated.spring(
                this.state.imageX,
                {
                    toValue: 0,
                    tension: 1
                }
            ),
            Animated.timing(
                this.state.headerBorderRadius,
                {
                    toValue: height / 4,
                    duration: 250
                }
            )
        ]).start()
    }
    componentDidMount() {
        this.launch()
    }
    render() {
        const {
            user,
            allComplains,
            allAccepted,
            allRejected} = this.props;
        const {
            headerBorderRadius,
            imageX,
            headerY} = this.state;

        const imageOpacity = imageX.interpolate({
            inputRange: [0, width],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        return (
            <View style={{ backgroundColor: theme.white }}>
                <TouchableOpacity onPress={() => this.logOut()} style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    top: 20,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }}>
                    <FontAwesome style={{ color: 'rgba(255,0,0,0.2)' }} name="power-off" size={50}/>
                </TouchableOpacity>
                <Animated.View style={[styles.header, { transform: [{ translateY: headerY }], borderBottomLeftRadius: headerBorderRadius }]}>
                    <Animated.View style={[styles.headerContent, { transform: [{ translateX: imageX }], opacity: imageOpacity }]}>
                        <View style={[styles.imageHolder, styles.shadow]}>
                            <Image
                                style={{ flex: 1, width: null, height: null }}
                                source={{ uri: user.image }}/>
                        </View>
                        <View style={
                            { 
                                height: hp('16'),
                                marginLeft: 20,
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'}}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp('3%'), color: theme.white }}>{user.firstName}</Text>
                                <Text style={{ fontSize: hp('2%'), color: theme.white }}>{user.secondName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.column, styles.center]}>
                                    <Text style={[styles.text,]}>{allComplains.length}</Text>
                                    <Text style={[styles.text]}>All</Text>
                                </View>
                                <View style={[styles.column, styles.center, { marginLeft: 20, }]}>
                                    <Text style={[styles.text]}>{allAccepted.length}</Text>
                                    <Text style={[styles.text]}>Accepted</Text>
                                </View>
                                <View style={[styles.column, styles.center, { marginLeft: 20, }]}>
                                    <Text style={[styles.text]}>{allRejected.length}</Text>
                                    <Text style={[styles.text]}>Rejected</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        )
    }
}