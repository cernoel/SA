import React, { Component } from 'react';
import './App.css';
import Done from './Components/Done';
import FillSearch from './Components/Search';
import Favorite from './Components/Favorites';
import Buttons from './Components/Buttons';

//import ApolloClient from 'apollo-boost';





class App extends Component {
  
  //initilise necessary Components
  state = {
    search_array: [
      { name: 'enter name', category: 'enter category', poid: '', distance: '100', id: '1' }
    ],
    favorites: [{ name: '', category: '', poid: '', id: '1' }],
    showEditor: false,
    showSearch: true
  }


  //uptade the array if you change something in the textfield 
  searchNameChangedHandler = (event) => {
    this.setState({
      search_array: [{
        name: event.target.value,
        category: this.state.search_array[0].category,
        distance: this.state.search_array[0].distance
      }]
    })
  }

  searchCategoryChangedHandler = (event) => {
    this.setState({
      search_array: [{
        name: this.state.search_array[0].name,
        category: event.target.value,
        distance: this.state.search_array[0].distance
      }]
    })
  }


  changedDistanceHandler = (event) => {
    this.setState({
      search_array: [{
        name: this.state.search_array[0].name,
        category: this.state.search_array[0].category,
        distance: event.target.value
      }]
    })
  }
  //------------------------------------------------------------------

  //creates the Cookie 
  createCookie = (name, favorites) => {

    console.log(favorites)
    var expires;
    document.cookie = name + "=" + favorites + "; path=/";
  }

  //retrives the Cookie 
  getCookie = (c_name) => {
    let c_start = 0;
    let c_end = 0;
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }


  // changes View from Search to Favorites
  // and gets the Cookie and saves it into the array
  toggleFavoriteEditorHandler = (event, favorites) => {
    var json_str = this.getCookie('mycookie');
    if (json_str != "") {
      var fave = JSON.parse(json_str);
      this.setState({ favorites: fave })
    }
    let showEditorBool = this.state.showEditor;
    this.setState({ showEditor: !showEditorBool })
    this.setState({ showSearch: showEditorBool })
  }

  // changes View from Favorites to Search
  // and gets the Cookie and saves it into the array
  toggleDoneHandler = (event, favorites) => {
    var json_str = JSON.stringify(favorites);
    this.createCookie('mycookie', json_str);
    var json_str = this.getCookie('mycookie');
    var fave = JSON.parse(json_str);

    let showEditorBool = this.state.showEditor;
    this.setState({ favorites: fave })
    this.setState({ showEditor: !showEditorBool })
    this.setState({ showSearch: showEditorBool })
  }

  //Saves the Content of the to the Favorites Array 
  //Save the Favorite Array as Cookie
  toggleFavoriteSaveHandler = (event, favorites, FaveToSave) => {
    var fave = favorites;
    var id;
    id = favorites.length + 1;

    var compare = fave[id - 2].id;
    while (id <= compare) {
      ++id;
      if (id <= favorites.lengt) {
        break;
      }
    }
    fave.push({
      name: FaveToSave.name,
      category: FaveToSave.category,
      poid: FaveToSave.poid,
      distance: FaveToSave.distance,
      id: id.toString()
    });
    this.setState({ favorites: fave })
    var json_str = JSON.stringify(favorites);
    this.createCookie('mycookie', json_str);
  }

  //Deletes Favorite from Favorite Array
  deleteFavoriteHandler = (favoriteIndex) => {
    console.log(favoriteIndex);
    const favorites = [...this.state.favorites];
    favorites.splice(favoriteIndex, 1);
    this.setState({ favorites: favorites });

  }


  //to change a name in the Favorites Array
  FavoriteNameChangedHandler = (event, id) => {
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.name = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;
    this.setState({ favorites: favorites })
  }

  //to change a Category in the Favorites Array
  FavoriteCategoryChangedHandler = (event, id) => {
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.category = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;
    this.setState({ favorites: favorites })
  }

  //to change a Distance in the Favorites Array
  FavoriteDistanceChangedHandler = (event, id) => {
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.distance = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;
    this.setState({ favorites: favorites })
  }


  //"Builds the Search components or null"
  render() {
    const style = {
      backgroundColor: 'withe',
      font: 'inherit',
      border: '1x solid blue',
      padding: '4px',
      cursor: 'pointer'
    };
    const searchStyle = {
      width: '265px'
    }

    let display_search = null;
    if (this.state.showSearch) {
      display_search = (
        <div>
          <h1>Deine Webapp für die Shopsuche in Graz</h1>

          <FillSearch
            name={this.state.search_array[0].name}
            category={this.state.search_array[0].category}
            key={this.state.search_array[0].id}
            poid={this.state.search_array[0].poid}
            distance={this.state.search_array[0].distance}

            searchDistanceChanged={this.changedDistanceHandler}
            searchNameChanged={this.searchNameChangedHandler}
            searchCategoryChanged={this.searchCategoryChangedHandler}>
          </FillSearch>
          <button style={style} >Search</button>

          <br />

          <Buttons
            saveFavorite={(event) => this.toggleFavoriteSaveHandler(event, this.state.favorites, this.state.search_array[0])}
            editFavorites={(event) => this.toggleFavoriteEditorHandler(event, this.state.favorites)}
          ></Buttons>
          {console.log("favorite", this.state.favorites)}
        </div>
      )
    }

  {/*"Builds the Favorite Editor components or null"*/}
    let display_favorites_editor = null;
    if (this.state.showEditor) {
      display_favorites_editor = (
        <div>

          <span className="right">Name:</span>
          <span className="right">Category:</span>


          {this.state.favorites.map((favorites, index) => {

            return <Favorite
              name={favorites.name}
              category={favorites.category}
              key={favorites.id}
              poid={favorites.poid}
              distance={favorites.distance}
              nameChanged={(event) => this.FavoriteNameChangedHandler(event, favorites.id)}
              categoryChanged={(event) => this.FavoriteCategoryChangedHandler(event, favorites.id)}
              distanceChanged={(event) => this.FavoriteDistanceChangedHandler(event, favorites.id)}
              delete={(event) => this.deleteFavoriteHandler(index)}>
            </Favorite>

          })}

          <Done
            done={(event) => this.toggleDoneHandler(event, this.state.favorites)}
          ></Done>

        </div>
      );
    }

    //Actually displas the Builds/Content
    return (
      <div className="App">
        {display_search}
        {display_favorites_editor}
      </div>
    );
  }
}

export default App;

