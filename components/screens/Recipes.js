import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar } from 'react-native';
import RecipeCard from '../widgets/RecipeCard';
import { SearchBar } from 'react-native-elements';
import BeefService from '../../utilities/BeefService';
import { beefImages } from '../../data/BeefImages.js';

export default class RecipePage extends React.Component {

  constructor(props) {
    super(props);

    let recipeFilter = '';

    if (props.route.params) {
      recipeFilter = props.route.params.filter;
    }

    this.state = { search: recipeFilter };
  }

  SearchRecipes(text) {
    this.setState({
      search: text
    });
  }

  GetRecipeData() {
    const beefService = new BeefService();
    const recipes = beefService.getRecipes();

    return this.state.search === '' ? recipes : this.GetFilteredRecipeData(recipes);
  }

  GetFilteredRecipeData(recipes) {
    const recipeSearchText = this.state.search.toUpperCase();

    return recipes.filter(function(item) {
      const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
      return itemData.indexOf(recipeSearchText) > -1;
    });
  }

  GetRecipeCard(recipe) {
    const recipeImage = beefImages[recipe.Key];

    return <RecipeCard recipe={{
          Name: recipe.Name, 
          Description: recipe.Description, 
          Metrics: recipe.Metrics,
          Image: recipeImage,
          Link: recipe.Link
      }}></RecipeCard>
  }

  render() {
    return (
      <SafeAreaView style={styles.recipePage}>
        <View style={styles.recipeSearch}>
          <SearchBar
            containerStyle={styles.recipeSearchContainer}
            inputContainerStyle={styles.recipeSearchInput}
            searchIcon={{ size: 24 }}
            onChangeText={text => this.SearchRecipes(text)}
            onClear={text => this.SearchRecipes('')}
            placeholder="Search Recipes..."
            value={this.state.search}
          />
        </View>
        <FlatList style={styles.recipeList}
                  data={this.GetRecipeData()}
                  renderItem={({ item }) => this.GetRecipeCard(item)}
                  keyExtractor={item => item.Key}>

        </FlatList>
      </SafeAreaView>
    );
  }
}

const recipeListBackgroundColor = '#D8D8D8';

const styles = StyleSheet.create({
  recipePage: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: recipeListBackgroundColor,
  },
  recipeSearchContainer: {
    backgroundColor: recipeListBackgroundColor,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 18
  },
  recipeSearchInput: {
    backgroundColor: 'white',
    elevation: 8
  },
  recipeList: {
    flex: .9,
    padding: 18,
    paddingTop: 0,
    paddingBottom: 80,
    overflow: 'scroll',
  },
});
