import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

export default function Value({route, navigation, header, text}) {
    return (
        <View style={styles.valueContainer}>
            <View style={styles.valueValueContainer}>
                <Text style={styles.valueValue}>
                    {header}
                </Text>
            </View>
            <View style={styles.valueLabelContainer}>
                <Text style={styles.valueLabel}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const valueFontColor = 'black';
const valueBorderRadius = 4;

const styles = StyleSheet.create({
    valueContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8,
        borderRadius: valueBorderRadius,
        borderWidth: .3,
        borderColor: '#A7A7A7',
        backgroundColor: 'white',
        elevation: 2
    },
    valueValueContainer: {
        flex: .6,
        justifyContent: 'center',
        borderTopLeftRadius: valueBorderRadius,
        borderTopRightRadius: valueBorderRadius
    },
    valueValue: {
        color: valueFontColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    valueLabelContainer: {
        flex: .4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderBottomLeftRadius: valueBorderRadius,
        borderBottomRightRadius: valueBorderRadius
    },
    valueLabel: {
        color: '#5F5F5F',
        fontSize: 14,
        fontWeight: 'bold'
    }
});