import React, { Component } from 'react';
import theme from '../utils/theme';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    card: {
        width: wp('30'),
        backgroundColor: theme.primary,
        height: hp('20'),
        borderRadius: 10
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
});

export default class extends Component{
    constructor(props) {
        super(props);
    }
    openCamera(index) {
        this.props.navigate('Camera', { categoryId: index });
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 50, }}>
                <View style={[styles.row, { marginTop: hp(15), justifyContent: 'space-around' }]}>
                    <TouchableOpacity style={styles.card} onPress={() => this.openCamera(1)}>
                        <View style={[styles.card,styles.center,styles.shadow]}>
                            <FontAwesome style={{ color: theme.white }} name='road' size={hp('8%')}/>
                            <Text style={{ color: theme.white }}>Roads</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => this.openCamera(2)}>
                        <View style={[styles.card, styles.center,styles.shadow]}>
                            <MaterialIcons style={{ color: theme.white }} name='nature-people' size={hp('8%')}/>
                            <Text style={{ color: theme.white }}>Polution</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { marginTop: hp(5), justifyContent: 'space-around' }]}>
                    <TouchableOpacity style={styles.card} onPress={() => this.openCamera(3)}>
                        <View style={[styles.card, styles.center,styles.shadow]}>
                        <MaterialCommunityIcons style={{ color: theme.white }} name='city-variant' size={hp('8%')}/>
                            <Text style={{ color: theme.white }}>Electry city</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => this.openCamera(4)}>
                        <View style={[styles.card, styles.center,styles.shadow]}>
                            <MaterialCommunityIcons style={{ color: theme.white }} name='gas-station' size={hp('8%')}/>
                            <Text style={{ color: theme.white }}>Gass</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}