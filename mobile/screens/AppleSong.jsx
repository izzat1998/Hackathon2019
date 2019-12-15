import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, Image, PanResponder} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        height
    },
    imageContainer: {
        marginLeft: 10
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    playPauseContainer: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center' ,
        borderTopColor: 'rgba(0,0,0,0.3)',
        borderTopWidth: 1,
    }
});

export default class extends Component {
    componentWillMount() {
        // height - 80
        const app = new Animated.ValueXY({ x: 0, y: height - 90 });
        
        this.panresponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            
            onPanResponderGrant(event, gestureState) {
                app.extractOffset();
            },
            onPanResponderMove(event, gestureState) {
                app.setValue({ x: 0, y: gestureState.dy })
            },
            onPanResponderRelease(event, gestureState) {
                if(gestureState.moveY > height - 120 || gestureState.moveY < 120) {
                    Animated.spring(
                        app.y,
                        {
                            toValue: 0,
                            tension: 1,
                        }
                    ).start()
                } 
                else if (gestureState.dy > 0) {
                    // Should minimize
                    Animated.spring(
                        app.y,
                        {
                            toValue: height - 90,
                            tension: 1,
                        }
                    ).start()
                } else {
                    // Should maximize
                    Animated.spring(
                        app.y,
                        {
                            toValue: -height + 90,
                            tension: 1,
                        }
                    ).start()
                }
            }
        })
        this.animation = app;
    }

    render() {

        // * Animate Flex direction to 'column'
        // * imageContainer width and height to 250
        // * height to full
        const imageSize = this.animation.y.interpolate({
            inputRange: [0, height - 90],
            outputRange: [250, 64],
            extrapolate: 'clamp'
        });

        const marginTop = this.animation.y.interpolate({
            inputRange: [0, height - 90],
            outputRange: [height / 2 - 125, 0],
            extrapolate: 'clamp'
        });

        const marginLeft = this.animation.y.interpolate({
            inputRange: [0, height - 90],
            outputRange: [width / 2 - 125, 0],
            extrapolate: 'clamp'
        });

        const opacity = this.animation.y.interpolate({
            inputRange: [0, height - 90],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return (
            <Animated.View style={styles.parent}>
                <Animated.View style={[{ transform: this.animation.getTranslateTransform() }, styles.container]}>
                    <Animated.View {...this.panresponder.panHandlers} style={styles.playPauseContainer}>
                        <View style={{ flexDirection: 'row', flex: 4, alignItems: 'center' }}>
                            <Animated.View style={[styles.imageContainer, {
                                width: imageSize,
                                height: imageSize,
                                marginTop,
                                marginLeft,
                            }]}>
                                <Image source={require('../assets/icon.png')} style={styles.image} />
                            </Animated.View>
                            <Animated.Text style={{ paddingLeft: 10, fontSize: 18, opacity }}>Hotel California(Live)</Animated.Text>
                        </View>
                        <Animated.View style={{ flexDirection: 'row', opacity, justifyContent: 'space-around', flex: 1 }}>
                                <Ionicons name='md-pause' size={32}/>
                                <Ionicons name='md-play' size={32}/>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        )
    }
}