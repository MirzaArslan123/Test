import React from 'react'
import { Image, Text, View, StyleSheet, Button, Linking } from 'react-native';
import Metric from './Metric';

export default function RecipeCard({recipe}) {
    return (
        <View style={styles.recipeCardContainer} key={recipe.Name}>
            <View style={styles.recipeHeader}>
                <View style={styles.recipeHeaderTitle}>
                    <Text style={styles.recipeTitle}>{recipe.Name}</Text>
                </View>
                <View style={styles.recipeHeaderImage}>
                    <Image
                        style={styles.recipeImage}
                        source={recipe.Image}>
                    </Image>
                </View>
            </View>
            <View style={styles.recipeBody}>
                <Text style={styles.recipeDescription}>{recipe.Description}</Text>
            </View>
            <View style={styles.recipeMetrics}>
                <Metric Metric={{Icon: "clock", Value: recipe.Metrics.Minutes, Unit: recipe.Metrics.TimeUnit}}></Metric>
                <Metric Metric={{Icon: "heart", Value: recipe.Metrics.Calories, Unit: "calories"}}></Metric>
                <Metric Metric={{Icon: "pie-chart", Value: recipe.Metrics.Servings, Unit: "servings"}}></Metric>
                <Metric Metric={{Icon: "shield", Value: recipe.Metrics.Protein + " g", Unit: "protein"}}></Metric>
            </View>
            <View style={styles.recipeFooter}>
                <Button title="View Online" color="rgb(60,0,0)" style={styles.viewRecipesButton} onPress={ ()=>{ Linking.openURL(recipe.Link)}}>
                    
                </Button>
            </View>
        </View>
    )
};

const recipeCardBorderRadius = 6;

const styles = StyleSheet.create({
    recipeCardContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: recipeCardBorderRadius,
        flexDirection: 'column',
        borderWidth: .3,
        borderColor: 'rgba(0, 0, 0, .1)',
        elevation: 4,
        marginBottom: 24
    },
    recipeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 18,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderTopLeftRadius: recipeCardBorderRadius,
        borderTopRightRadius: recipeCardBorderRadius,
        borderBottomColor: 'rgba(255, 255, 255, .2)'
    },
    recipeHeaderTitle: {
        flex: .65,
    },
    recipeHeaderImage: {
        flex: .35,
    },
    recipeBody: {
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    recipeFooter: {
        padding: 16,
        marginTop: 'auto',
        borderRadius: 8
    },
    recipeImage: {
        height: 60,
        width: '100%',
        borderRadius: 4
    },
    recipeTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textAlignVertical: 'center',
        paddingRight: 16
    },
    recipeDescription: {
        color: 'black',
        fontSize: 14,
    },
    recipeMetrics: {
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        paddingLeft: 12,
        paddingRight: 12,
        flexGrow: 1,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,.2)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.2)',
        backgroundColor: 'rgba(0,0,0,.02)'
    },
    viewRecipesButton: {
        fontSize: 20, 
        padding: 8,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'red',
        borderRadius: 16
    }
});