import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Value from '../widgets/Value'

export default function CameraCapture({route, navigation}) {
    const { capture } = route.params;
    const { beefData } = route.params;

    // Map quality results to UI terms
    const beefGrade = beefData.marbling === 'Low' ? 'Select'
                        : beefData.marbling === 'Medium' ? 'Choice'
                        : 'Prime';

    // Map tenderness results to UI terms
    const beefTenderness = beefData.quality === 'Choice' ? 'Fair'
                         : beefData.quality === 'Prime' ? 'Good'
                         : 'Excellent';

    // Some cut classifications aren't mapped very well onto recipe titles, so certain
    // cuts should be modified on search to better filter recipes
    const searchTerm = beefData.prediction === 'boneless ribeye steak' ? 'ribeye' : beefData.prediction;

    return (
        <View style={styles.cameraCaptureContainer}>
            <View style={styles.beefImageContainer}>
                <View style={styles.beefImageCard}>
                    <Image style={styles.cameraCaptureImage} source={{uri: capture.uri }} />          
                    <Text style={styles.beefResultsHeader}>
                        {beefData.prediction}
                    </Text>
                </View>
            </View>
            <View style={styles.beefResultsContainer}>
                <View style={styles.beefDataTopRow}>
                    <Value header={beefGrade} text="Grade"></Value>
                </View>
                <View style={styles.beefDataBottomRow}>
                    <Value header={beefData.marbling} text="Marbeling"></Value>
                    <Value header={beefTenderness} text="Tenderness"></Value>
                </View>
            </View>
            <View style={styles.beefDataFooter}>
                <Icon.Button backgroundColor="transparent" name="eye" style={styles.viewRecipesButton}
                    onPress={() => navigation.navigate('Recipes', { filter: searchTerm })}>
                    <Text style={styles.viewRecipesButtonContent}>
                        View Recipes
                    </Text>
                </Icon.Button>
            </View>
        </View>
    )
}

const beefDataBackgroundColor = '#FFFFFF';
const beefAppAccentColor = 'rgb(80, 0, 0)';

const styles = StyleSheet.create({
    cameraCaptureContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    beefImageContainer: {
        flex: .5,
        backgroundColor: beefAppAccentColor,
        alignItems: 'center',
        overflow: 'visible',
        elevation: 4
    },
    beefImageCard: {
        marginTop: '15%',
        padding: 12,
        height: '100%',
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 8
    },
    cameraCaptureImage: {
        flex: 1,
        borderWidth: .2,
        borderColor: 'black',
        borderRadius: 8
    },
    beefResultsHeader: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'white',
        paddingTop: 24,
        paddingBottom: 16,
        fontWeight: 'bold'
    },
    beefResultsContainer: {
        flex: .45,
        paddingLeft: 16,
        paddingRight: 16
    },
    beefDataTopRow: {
        marginTop: '25%',
        width: '100%',
        flexDirection: 'row',
        flex: .45,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16
    },
    beefDataBottomRow: {
        width: '100%',
        flexDirection: 'row',
        flex: .5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16
    },
    beefHeaderRow: {
        width: '100%',
    },
    beefDataFooter: {
        justifyContent: 'center',
        flex: .2,
        backgroundColor: beefDataBackgroundColor,
        paddingLeft: 24,
        paddingRight: 24
    },
    viewRecipesButton: {
        fontSize: 20, 
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#101010',
        elevation: 6
    },
    viewRecipesButtonContent: {
        fontSize: 16,
        marginLeft: 12,
        color: 'white'
    }
});