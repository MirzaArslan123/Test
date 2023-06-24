import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
// import { Camera } from 'expo-camera';
import * as Permissions from 'react-native-permissions';
import CameraToolbar from './CameraToolbar';
import { request, PERMISSIONS } from 'react-native-permissions';
import BeefService from '../../utilities/BeefService';
import ImagePicker from 'react-native-image-crop-picker';

class BeefCameraPage extends React.Component {
  camera = null;

  constructor(props) {
    super(props);

    this.state = {
      hasPermissionToUseCamera: null,
      capturing: null,
      hasResults: false,
      results: null
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
     await this.requestCameraPermission();
    // const camera = await Permissions.askAsync(Permissions.CAMERA);
   

    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );

    // this.setState({ hasPermissionToUseCamera });
  };
  requestCameraPermission = async () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      console.log(result);
      var hasPermissionToUseCamera = (result === 'granted');
      this.setState({ hasPermissionToUseCamera });
      // setPermissionResult(result)

      // refRBSheet?.current?.close();
      // console.log('Permission for camera ', result);
      // if (result === 'granted') {
      //   openCamera();
      // } else {
      // }
    });
  };
  takePhoto = async () => {
    this.setState({ capturing: true });
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      const photoInfo = image
      console.log(photoInfo);
      const pathSegments = photoInfo?.path.split("/");

    // Extract the last segment (file name)
      const fileName = pathSegments[pathSegments.length - 1];
      // const photoInfo = this.getPhotoInformation(image);
      const beefService = new BeefService();

      beefService.getBeefData(fileName, photoInfo.path, photoInfo.mime)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const resultObject = JSON.parse(result);

          if (resultObject.prediction && resultObject.confidence_actual > 0.5) {
            this.props.navigation.navigate("CameraCapture", { capture: image, beefData: resultObject });
          } else {
            this.promptError();
          }

          this.setState({ capturing: false });
        })
        .catch(error => {
          console.log("ERR");
          this.promptError();
          this.setState({ capturing: false });
        });
    } catch (error) {
      console.log('Error while capturing photo:', error);
      this.setState({ capturing: false });
    }
  };
  // takePhoto = async () => {
  //   this.setState({ capturing: true });

  //   const photoData = await this.camera.takePictureAsync({
  //      skipProcessing: true
  //   });

  //   const photoInfo = this.getPhotoInformation(photoData);
  //   const beefService = new BeefService();

  //   beefService.getBeefData(photoInfo.Name, photoInfo.Path, photoInfo.FileType)
  //     .then(response => response.text())
  //     .then(result => {

  //       const resultObject = JSON.parse(result);

  //       if (resultObject.prediction && resultObject.confidence_actual > .5) {
  //         this.props.navigation.navigate("CameraCapture", { capture: photoData, beefData: resultObject } );
  //       }
  //       else {
  //         this.promptError();
  //       }

  //       this.setState({ capturing: false });
  //     })
  //     .catch(error => {
  //       this.promptError();
  //       this.setState({ capturing: false });
  //     });
  // };

  promptError() {
    Alert.alert(
      'Unable to process image', 
      'We were unable to process the steak in your image. For best results, please do the following:\n\n- Align the edges of your camera with the edges of the steak\n- Try to reduce glare on packaging\n- Ensure the photo is looking straight down on the steak'
    );
  }

  getPhotoInformation(photoData) {
    const photoPath = photoData.uri;
    const photoPathFolders = photoPath.split("/");
    const photoName = photoPathFolders[photoPathFolders.length - 1].trim();

    const photoPathParts = photoPath.split(".");
    const photoFileType = photoPathParts[photoPathParts.length - 1];

    return {
      Path: photoPath,
      Name: photoName,
      FileType: photoFileType
    };
  }

  renderCameraProcessingOverlay() {
    return (
      <View>
        <ActivityIndicator size="large" color="#d5001c"/>
        <Text style={styles.cameraCapturingText}>
          Processing...
        </Text>
      </View> 
    );
  }

  renderCameraSuggestion() {
    return (
      <Text style={styles.cameraNotice}>
        For best results, rotate the camera horizontally and align the edges of the steak with the edges of the photo
      </Text>
    );
  }

  renderCamera() {
    if (this.state.hasPermissionToUseCamera === null || this.state.hasPermissionToUseCamera === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    else {
      return (
        <>
          <View style={styles.cameraNoticeContainer}>
            {this.state.capturing ? this.renderCameraProcessingOverlay() : this.renderCameraSuggestion()}
          </View>
          <CameraToolbar onTakePhoto={this.takePhoto} />
        </>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.cameraContainer}>
         { this.renderCamera() }
      </SafeAreaView>
    )
  }
}

export default BeefCameraPage;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  camera: {
    flex: 1,
    padding: 0
  },
  cameraCapturing: {
    flex: 1,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  cameraNoticeCapturing: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'rgba(0,0,0,.8)',
    height: '100%',
    display: 'flex'
  },
  cameraNoticeContainer: {
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  cameraNotice: {
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center'
  },
  cameraCapturingText: {
    color: 'white',
    fontSize: 20,
    marginTop: 18,
    alignItems: 'center',
    textAlign: 'center'
  },
  cameraToolbarContainer: {
    transform: [{ rotate: '90deg' }],
    flex: .4,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }
});