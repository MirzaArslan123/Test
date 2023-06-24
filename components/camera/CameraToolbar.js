import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { SimpleLineIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default({onTakePhoto}) => (
  <View style={styles.cameraView}>
      <TouchableOpacity style={styles.cameraButtons} onPress={onTakePhoto} >
      <Icon name="camera" style={styles.cameraTakeButton} />
          {/* <SimpleLineIcons name="camera" style={styles.cameraTakeButton} /> */}
      </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
    cameraView: {
      flex: 1,
      flexDirection: 'row',
    },
    cameraButtons: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      padding: 24
    },
    cameraTakeButton: {
      color: '#000',
      fontSize: 48
    }
})