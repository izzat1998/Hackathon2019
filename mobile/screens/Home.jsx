import React, { Component } from 'react';
import theme from '../utils/theme';
import { View, StyleSheet, Animated, AsyncStorage, Dimensions } from 'react-native';
import Auth from '../service/Auth';
import * as Permissions from 'expo-permissions';
import Complains from '../service/Complain';
import Cards from './Cards';
import Header from './Header';

const { height } = Dimensions.get('window');

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
});

export default class extends Component {
    constructor() {
        super();
        this.state = {
            localPermission: false,
            user: {},
            allComplains: [],
            allRejected: [],
            allAccepted: [],
        }
    }
    async askPermissionCAMERA() {
        const Camera = await Permissions.askAsync(Permissions.CAMERA);
        const Location = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ localPermission: (Camera.status === 'granted' && Location.status === 'granted')});
    }
    async getData() {
        const token = await AsyncStorage.getItem('token');
        Promise.all([
            Auth.details(token),
            Complains.getAll(token),
            Complains.getAccepted(token),
            Complains.getRejected(token),
        ])
        .then(async result => {
            const [user,  allComplains, allRejected, allAccepted] = result;
            await this.setState({ user, allComplains, allRejected, allAccepted})
            await this.askPermissionCAMERA();
            if(!this.state.localPermission) {
                await this.askPermissionCAMERA();
            }
        }).catch(async err => {
            await AsyncStorage.removeItem('token');
            alert(JSON.stringify(err));
            this.props.navigation.navigate('Auth');
        })
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        if(!this.state.localPermission) {
            return <View></View>
        }
        return (
            <View style={[styles.flex, { backgroundColor: theme.white }]}>
                <Header navigate={this.props.navigation.navigate} {...this.state}/>
                <Cards navigate={this.props.navigation.navigate}/>
            </View>
        )
    }
}