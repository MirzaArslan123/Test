import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Metric({ Metric }) {
    return (<View style={styles.metricContainer}>
        <View>
            <Icon name={Metric.Icon} style={styles.metricIcon}/>
        </View>
        <Text style={styles.metricDescription}>{Metric.Value}</Text>
        <Text style={styles.metricUnit}>
            {Metric.Unit}
        </Text>
    </View>);
}

const styles = StyleSheet.create({
    metricContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 'auto',
        flex: 1
    },
    metricIcon: {
        color: 'black',
        fontSize: 28,
        paddingBottom: 8,
        fontWeight: 'bold'
    },
    metricDescription: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    metricUnit: {
        fontSize: 12
    }
});