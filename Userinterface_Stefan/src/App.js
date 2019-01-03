import React, { Component } from 'react';
import './App.css';
import Done from './Done';
import FillSearch from './Search';
import Favorite from './favorites';
import Buttons from './Buttons';

//import ApolloClient from 'apollo-boost';





class App extends Component {
  state = {
    persons: [
      { name: 'enter name', category: 'enter category', poid: '1', distance: '100', id: '1' }
    ],
    favorites: [{ name: '', category: '', poid: '', id: '1' }],
    showEditor: false,
    showSearch: true
  }


  searchNameChangedHandler = (event) => {
    this.setState({
      persons: [{
        name: event.target.value,
        category: this.state.persons[0].category,
        distance: this.state.persons[0].distance
      }]
    })
  }

  searchCategoryChangedHandler = (event) => {
    this.setState({
      persons: [{ name: this.state.persons[0].name, category: event.target.value, distance: this.state.persons[0].distance}]
    })
  }

  changedDistanceHandler = (event) => {
    this.setState({
    persons: [{ name: this.state.persons[0].name,  category: this.state.persons[0].category,   distance: event.target.value }]
  })
  }



  createCookie = (name, favorites) => {

    console.log(favorites)
    var expires;
    document.cookie = name + "=" + favorites + "; path=/";
  }

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



  toggleFavoriteEditorHandler = (event, favorites) => {
    console.log(favorites);
    
    var json_str = this.getCookie('mycookie');
    if(json_str != ""){
    var fave = JSON.parse(json_str);
    this.setState({ favorites: fave })
    console.log("cookie", fave);
  }
    let showEditorBool = this.state.showEditor;
   
    this.setState({ showEditor: !showEditorBool })
    this.setState({ showSearch: showEditorBool })
  }


  toggleDoneHandler = (event, favorites) => { 

    var json_str = JSON.stringify(favorites);
    this.createCookie('mycookie', json_str);
    console.log("jsonstr",json_str);

    var json_str = this.getCookie('mycookie');
    var fave = JSON.parse(json_str);
    console.log("cookie", fave);

    let showEditorBool = this.state.showEditor;
    this.setState({ favorites: fave })
    this.setState({ showEditor: !showEditorBool })
    this.setState({ showSearch: showEditorBool })
  }


  toggleFavoriteSaveHandler = (event, favorites, FaveToSave) => {
   
    console.log("FAVE TO SAVE",FaveToSave.name);
    var fave = favorites;
    var id;
    id = favorites.length+1;
    
    var compare = fave[id-2].id;
    while(id <= compare )
    {
      ++id;
      if(id <= favorites.lengt){
        break;
      }
    }
    fave.push({name : FaveToSave.name, category: FaveToSave.category, poid : FaveToSave.poid, distance: FaveToSave.distance,id : id.toString() });
    console.log("FAVE TO SAVE",fave);
    this.setState({ favorites: fave })

    var json_str = JSON.stringify(favorites);
    this.createCookie('mycookie', json_str);


  }
  deleteFavoriteHandler = (favoriteIndex) => {
    console.log(favoriteIndex);
    const favorites = [...this.state.favorites];
    favorites.splice(favoriteIndex, 1);
    this.setState({ favorites: favorites });

  }


  //the event handlers to input the searchdata
  FavoriteNameChangedHandler = (event, id) => {
    { console.log(id) }
   

    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });
    { console.log(favoritesIndex) }

    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    { console.log(favorite) }
    { console.log(event.target.value) }
    favorite.name = event.target.value;

    const favorites = [...this.state.favorites];
    { console.log(favorites) }

    favorites[favoritesIndex] = favorite;
    { console.log("favorites[faveorited index]:: ") }
    { console.log(favorites[favoritesIndex]) }
    this.setState({ favorites: favorites })
  }


  FavoriteCategoryChangedHandler = (event, id) => {
    { console.log(id) }
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });

    { console.log("index", favoritesIndex) }

    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    { console.log(favorite) }
    { console.log(event.target.value) }
    favorite.category = event.target.value;

    const favorites = [...this.state.favorites];
    { console.log(favorites) }

    favorites[favoritesIndex] = favorite;
    { console.log("favorites[faveorited index]:: ") }
    { console.log(favorites[favoritesIndex]) }
    this.setState({ favorites: favorites })
  }


  FavoriteDistanceChangedHandler = (event, id) => {
    { console.log(id) }
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.id === id;
    });

    { console.log("index", favoritesIndex) }

    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    { console.log(favorite) }
    { console.log(event.target.value) }
    favorite.distance = event.target.value;

    const favorites = [...this.state.favorites];
    { console.log(favorites) }

    favorites[favoritesIndex] = favorite;
    { console.log("favorites[faveorited index]:: ") }
    { console.log(favorites[favoritesIndex]) }
    this.setState({ favorites: favorites })
  }




  //"renders the content to the Display"
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
            name={this.state.persons[0].name}
            category={this.state.persons[0].category}
            key={this.state.persons[0].id}
            poid={this.state.persons[0].poid}
            distance = {this.state.persons[0].distance}
            
            searchDistanceChanged = {this.changedDistanceHandler}
            searchNameChanged={this.searchNameChangedHandler}
            searchCategoryChanged={this.searchCategoryChangedHandler}>
           </FillSearch>
          <button style={style} >Search</button>

          <br />
          
          <Buttons
            saveFavorite={(event) => this.toggleFavoriteSaveHandler(event, this.state.favorites, this.state.persons[0])}
            editFavorites={(event) => this.toggleFavoriteEditorHandler(event, this.state.favorites)}
          ></Buttons>
          {console.log("favorite", this.state.favorites)}
        </div>
      )
    }


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
              distance ={favorites.distance}
              nameChanged={(event) => this.FavoriteNameChangedHandler(event, favorites.id)}
              categoryChanged={(event) => this.FavoriteCategoryChangedHandler(event, favorites.id)}
              distanceChanged={(event) => this.FavoriteDistanceChangedHandler(event, favorites.id)}
              delete={(event) => this.deleteFavoriteHandler(index)}>
            </Favorite>
            
          })}
         { console.log("tsetsetsetset")}
         <Done
            done={(event) => this.toggleDoneHandler(event, this.state.favorites)}
          ></Done>
         
        </div>
      );
    }
    return (
      <div className="App">
        {display_search}
        {display_favorites_editor}
      </div>

    );
  }
}

export default App;


// click={() => this.deleteFavoriteHandler(Index)}
  //  <button style={style} onClick={this.toggleFavoriteEditorHandler}>Done</button>

  //<h1>edit your Favorites</h1>
  //{console.log("testtest")}
  //<button >Delete</button>
  //changed={(event) => this.FavoriteChangedHandler(event, favorite.id)}/>