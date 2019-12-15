import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import themes from '../../utils/theme'
import Complains from '../../service/Complain';
import Sender from './CameraFooter';
import SubCategories from './SubCategories';
import ImageResizer from 'react-native-image-resizer'

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
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
})

export default class extends Component {
    constructor(props) {
        super(props);
        // const {state} = props.navigation;
        this.state = {
            location: {},
            loading: false,
            categoryId: 1,
            subCategoryValue: 0,
            subCategories: [
                {
                    id: 1,
                    name: 'category 1'
                },
                {
                    id: 2,
                    name: 'category 2'
                },
                {
                    id: 3,
                    name: 'category 3'
                },
            ]
        }
    }
    componentDidMount() {
        this.findCoordinates();
    }
    callBack(index) {
        this.setState({ subCategoryValue: index })
    }
    findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {                    
				this.setState({ location: position })
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
    categories() {
        switch(this.state.categoryId) {
            case 1:
                return [
                    {
                        "id": 1,
                        "name": "traffic light"
                    },
                    {
                        "id": 2,
                        "name": "traffic signgs"
                    },
                    {
                        "id": 3,
                        "name": "traffic marks"
                    }
                ];
            case 2:
                return [
                    {
                        "id": 4,
                        "name": "Natural"
                    },
                    {
                        "id": 5,
                        "name": "Rubbish"
                    },
                    {
                        "id": 6,
                        "name": "Others"
                    }
                ];
            case 3:
                return [
                    {
                        "id": 7,
                        "name": "Electric city"
                    },
                    {
                        "id": 8,
                        "name": "Water"
                    },
                    {
                        "id": 9,
                        "name": "Others"
                    }
                ];
            case 4:
                return [
                    {
                        "id": 10,
                        "name": "breaking pipes"
                    },
                    {
                        "id": 11,
                        "name": "Gass suply"
                    },
                    {
                        "id": 12,
                        "name": "Others"
                    }
                ];
            default:
                return [];          
        }
    }
    async submit(comment) {
        if(this.camera) {
            // this.setState({ loading: true })
            const photo = await this.camera.takePictureAsync(0.1);
            const token = await AsyncStorage.getItem('token');
            const body = new FormData();
            body.append('categoryId', this.state.categoryId);
            body.append('subCategoryId', this.state.subCategoryValue);
            body.append('lat', this.state.location.coords.latitude);
            body.append('long', this.state.location.coords.longitude);
            body.append('comment', comment)
            body.append('image', {
                type: 'image/jpeg',
                uri: photo.uri,
                name: 'complain.jpeg'
            });
            Complains.submit(body, token)
            .then(() => {
                this.props.navigation.navigate('Home')
            })
            .catch(err => {
                alert(JSON.stringify(err));
            })
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <Camera
                    style={styles.flex}
                    ref = {ref => this.camera = ref}
                    type={Camera.Constants.Type.back}>
                        <KeyboardAvoidingView style={styles.container} behavior='height'>
                            {
                                this.state.subCategoryValue ?
                                    <Sender {...this.state} submit={text => this.submit(text)}/>
                                    : <SubCategories categories={this.categories()} {...this.state} callBack={index => this.callBack(index)}/>
                            }
                        </KeyboardAvoidingView>
                </Camera>
          </View>
        )
    }
}