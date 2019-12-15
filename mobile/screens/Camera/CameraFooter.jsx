import React, { Component, useState } from 'react';
import theme from '../../utils/theme';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

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
    sendContainer: {
        flex: 1,
        height: hp('10%'),
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textinput: { 
        flex: 1,
        color: 'white',
        padding: 10,
        borderColor: 'grey',
        borderWidth: 2,
        margin: 8, 
        borderRadius: 10
    },
    sendBtn: {
        height: hp('7%'),
        width: hp('7%'),
        backgroundColor: theme.primary,
        borderRadius: hp('10%')
    }
})

export default ({submit}) => {
    const [comment, setComment] = useState('');
    return (
        <View style={[styles.sendContainer, styles.row]}>
            <View style={[styles.column,{ flex: 5}]}>
                <TextInput onChangeText={text => setComment(text)} style={styles.textinput} placeholder='Add a caption'/>
            </View>
            <View style={[styles.flex, styles.center]}>
                <TouchableOpacity
                    onPress={() => submit(comment)}
                    style={[styles.sendBtn, styles.center]}>
                    <Ionicons
                        name="md-send"
                        style={{ marginRight: -hp('1%') }}
                        size={hp('3%')}
                        color={theme.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}