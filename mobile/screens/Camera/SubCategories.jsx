import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    container: {
        flex: 1,
        height: hp('10%'),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10
    }
})

export default ({callBack, categories}) => (
    <View style={[styles.container, styles.center, styles.row]}>
        {
            categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => callBack(category.id)}
                    style={[styles.button, styles.center]}>
                    <Text style={{ color: 'white' }}>{category.name}</Text>
                </TouchableOpacity>
            ))
        }
    </View>
)