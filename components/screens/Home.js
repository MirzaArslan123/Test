import React from 'react';
import SplashScreen from './SplashScreen';
import { View } from 'react-native';

export default class Home extends React.Component {
    render() {
        return (
            <View>
                <SplashScreen navigation={this.props.navigation} />
            </View>
        );
    }
}