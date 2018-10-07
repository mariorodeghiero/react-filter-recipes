import React, {Component} from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: '',
      recipes: recipes,
      newRecipes: '',
      isSearch: false,
      notFound: ''
    };
    this.filterRecipe = this
      .filterRecipe
      .bind(this)
  }

  notFound(item) {
    console.log("falha", item.length)
    if (item.length > 0) {
      this.setState({notFound: false})
    } else {
      this.setState({notFound: true})
    }
  }

  filterRecipe(event) {
    const searchString = event.target.value;
    const keysSearch = Object.keys(this.state.recipes.results);
    const result = keysSearch.map((key) => this.state.recipes.results[key])
    const newRecipes = result.filter(item => {
      let test;
      if (item.title.toUpperCase().indexOf(searchString.toUpperCase()) > -1 || item.ingredients.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
        test = item;
      }
      return test;
    })
    this.notFound(newRecipes);
    this.setState({newRecipes, isSearch: true, searchString: event.target.value})
    event.preventDefault();
  }

  render() {
    const result = Object.keys(this.state.recipes.results);
    const newResult = this.state.newRecipes;

    return (
      <div className="App">
        <Navbar search={this.state.searchString} filter={this.filterRecipe}/>
        <div className="container mt-10">
          <div className="row">
            {this.state.isSearch && (newResult.map((key, index) => <RecipeItem
              key={index}
              title={key.title}
              ingredients={key.ingredients}
              thumbnail={key.thumbnail}/>))}
            {!this.state.isSearch && (result.map((key, index) => <RecipeItem
              key={index}
              title={this.state.recipes.results[key].title}
              ingredients={this.state.recipes.results[key].ingredients}
              thumbnail={this.state.recipes.results[key].thumbnail}/>))}
          </div>
          {this.state.notFound && <h2 className="pt-5">No Results to show</h2>}
        </div>
      </div>
    );
  }
}

export default App;
