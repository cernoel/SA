import React from "react";
import Favorite from './favorites_components/Favorites';
import Buttons from './favorites_components/Buttons';
import { CookiesProvider } from 'react-cookie';

class Favorites extends React.Component {

  //initilise necessary Components



  state = {

    search_array: [
      {
        favorite_name: 'Enter Identifier',
        name: 'enter name',
        category: 'enter category',
        poid: '',
        distance: '100',
        id: '1'
      }
    ],
    favorites: [{key: '', text: 'Favorite 1', name: '', value: '', category: '', poid: '' }]

  }


  //------------------------------------------------------------------

  //gets the Favorite from local Storage at start 
  componentWillMount() {
    var fave = JSON.parse(localStorage.getItem("favorites"));
    console.log(fave)
    if (fave != null) {
      this.setState({ favorites: fave })
    }
  }




  //Saves the Content of the to the Favorites Array 
  //Save the Favorite Array as Cookie
  newFaveHandler = (event, favorites) => {

    var fave = favorites;
    var key = favorites.length + 1;
    if (favorites.key != null) {
      var compare = fave[key - 2].key;
      while (key <= compare) {

        if (key <= favorites.lengt) {
          break;
        }

      }
    }
    console.log("key", key);
    var temp = Date.now();

    fave.push({
      text: 'Favorite ' + key.toString(),
      name: "enter the name",
      value: temp,
      category: "enter the category",
      poid: "poid",
      distance: "100",
      key: temp,
    });


    console.log("add", fave)
    this.setState({ favorites: fave })


    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  //Deletes Favorite from Favorite Array
  deleteFavoriteHandler = (text) => {

    const favoriteIndex = this.state.favorites.findIndex(f => {
      return f.text === text;
    });



    const favorites = [...this.state.favorites];
    favorites.splice(favoriteIndex, 1);
    this.setState({ favorites: favorites });

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }


  //to change a name in the Favorites Array
  FavoriteNameChangedHandler = (event, key) => {

    const favoriteIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });

    const favorite = {
      ...this.state.favorites[favoriteIndex]
    };
    favorite.name = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoriteIndex] = favorite;
    this.setState({ favorites: favorites })

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }

  //to change a Category in the Favorites Array
  FavoriteCategoryChangedHandler = (event, key) => {

    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.category = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;
    this.setState({ favorites: favorites })

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }


  //to change a Distance in the Favorites Array
  FavoriteDistanceChangedHandler = (event, key) => {
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.key ===  key;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.distance = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;

    this.setState({ favorites: favorites })
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }


  FavoriteFavoriteNameChangedHandler = (event, key) => {
    
    console.log("key ", key)
    
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });
    console.log("name changed index", favoritesIndex)

    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.text = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;

    this.setState({ favorites: favorites })
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }






  render() {

    let display_favorites_editor = null;
    display_favorites_editor = (
      <div>

        <Buttons
          new={(event) => this.newFaveHandler(event, this.state.favorites)}
        />

        {this.state.favorites.map((favorites, index) => {

          return <Favorite
            faveName={favorites.text}
            name={favorites.name}
            category={favorites.category}
            key={favorites.key}
            poid={favorites.poid}
            distance={favorites.distance}

            
            favoriteNameChanged={(event) => this.FavoriteFavoriteNameChangedHandler(event, favorites.key)}
            nameChanged={(event) => this.FavoriteNameChangedHandler(event, favorites.key)}
            categoryChanged={(event) => this.FavoriteCategoryChangedHandler(event, favorites.key)}
            distanceChanged={(event) => this.FavoriteDistanceChangedHandler(event, favorites.key)}
            delete={(event) => this.deleteFavoriteHandler(favorites.key)}>
          </Favorite>
        })}


      </div>
    );



    return (
      <div>
        {display_favorites_editor}
      </div>
    );
  }
}
export default Favorites;


