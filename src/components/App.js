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
      recipes: recipes
    };
  }

  render() {
  const keys = Object.keys(this.state.recipes.results);
    return (
      <div className="App">
        <Navbar/>
        <div className="container mt-10">
          <div className="row">
          </div>
          {keys.map(key => (
            <RecipeItem recipe={this.state.recipes.results[key]} key={key} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
