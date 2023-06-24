import React, { useState, } from 'react';
import { StyleSheet, Text, Animated, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SplashScreen({navigation}) {

  const [iconFadeInAnimation] = useState(new Animated.Value(0));
  const [iconTopAnimation] = useState(new Animated.Value(300));
  const [photoButtonFadeInAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(iconFadeInAnimation, {
        toValue: 1,
        duration: 1000
      }),
      Animated.timing(iconTopAnimation, { 
          toValue: 80,
          duration: 500
      }),
      Animated.timing(photoButtonFadeInAnimation, {
        toValue: 1,
        duration: 500
      })
    ]).start();
  }, [])

  return (
    <Animated.View style={{width: '100%', height: '100%', backgroundColor: '#190202'}}>
        <ImageBackground source={require('../../assets/SteakPhone.jpg')} style={{...styles.backgroundImage}} imageStyle={{opacity:0.2, resizeMode: 'cover'}}>
          <Animated.Image source={require('../../assets/BeefCommissionLogo.jpg')} style={{...styles.beefIcon, opacity: iconFadeInAnimation, top: iconTopAnimation}}/>
              <Animated.View style={{...styles.pictureButtonContainer, opacity: photoButtonFadeInAnimation}}>
                  <Icon.Button backgroundColor="transparent" name="camera" style={styles.pictureButton} onPress={() => navigation.navigate('Camera')}>
                      <Text style={styles.pictureButtonText}>
                          Take Picture
                      </Text>
                  </Icon.Button>
                  <Icon.Button backgroundColor="transparent" name="eye" style={{...styles.pictureButton, marginTop: 24}} onPress={() => navigation.navigate('Recipes')}>
                      <Text style={styles.pictureButtonText}>
                          View Recipes
                      </Text>
                  </Icon.Button>
              </Animated.View>
              <Text style={styles.splashScreenFundingLabel}>
                Funded by the North Dakota State Board of Agricultural Research and Education
              </Text>
          </ImageBackground>
    </Animated.View>
  );
}

SplashScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      alignItems: 'center'
  },
  beefIcon: {
    width: 240,
    resizeMode: 'contain',
    alignItems: 'center',
    borderRadius: 4,
  },
  pictureButtonContainer: {
    textAlign: 'center',
    bottom: 100,
    position: 'absolute'
  },
  pictureButton: {
    fontSize: 20,
    width: 240,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    borderWidth: .5,
    borderColor: 'white',
    borderRadius: 8
  },
  pictureButtonText: {
    fontSize: 16,
    marginLeft: 16,
    color: 'white'
  },
  splashScreenFundingLabel: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 24,
    marginTop: 24
  }
});