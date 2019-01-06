import React from "react";
import Favorite from "./favorites_components/Favorites";
import Buttons from "./favorites_components/Buttons";
import { Dropdown } from "semantic-ui-react";
import Slider from "./slider";

class Favorites extends React.Component {
  //initilise necessary Components

  state = {
    search_array: [
      {
        favorite_name: "Enter Identifier",
        name: "enter name",
        category: "enter category",
        poid: "",
        distance: "100",
        id: "1"
      }
    ],
    favorites: [
      {
        key: "1",
        text: "tesdt",
        name: "dfasdf",
        value: "test",
        category: "einkauf",
        poid: "Billa"
      }
    ],

    favoritesDropdown: [
      {
        key: "1",
        text: "test",
        name: "sdfasd",
        value: "test",
        category: "",
        poid: ""
      }
    ]
  };

  //------------------------------------------------------------------

  //gets the Favorite from local Storage at start
  /*componentWillMount() {
     
    //dann natürlich categorys
    {console.log("this.favoritesDropdown" , this.favoritesDropdown)}
    if (typeof (localStorage.getItem("favorites")) != 'undefined') {
      var favoritesDropdown = JSON.parse(localStorage.getItem("favorites"));
    }



    if (typeof (localStorage.getItem("favorites")) != 'undefined') {
      var fave = JSON.parse(localStorage.getItem("favorites"));
    }
    console.log(fave)
    if (fave != null) {
      this.setState({ favorites: fave })
    }
    
  }

*/

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
      text: "Favorite ",
      name: "enter the name",
      value: temp,
      category: "enter the category",
      poid: "poid",
      distance: "100",
      key: temp
    });

    console.log("add", fave);
    this.setState({ favorites: fave });

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  //Deletes Favorite from Favorite Array
  deleteFavoriteHandler = text => {
    const favoriteIndex = this.state.favorites.findIndex(f => {
      return f.text === text;
    });

    const favorites = [...this.state.favorites];
    favorites.splice(favoriteIndex, 1);
    this.setState({ favorites: favorites });

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

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
    this.setState({ favorites: favorites });

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

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
    this.setState({ favorites: favorites });

    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  //to change a Distance in the Favorites Array
  FavoriteDistanceChangedHandler = (event, key) => {
    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });
    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.distance = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;

    this.setState({ favorites: favorites });
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  FavoriteFavoriteNameChangedHandler = (event, key) => {
    console.log("key ", key);

    const favoritesIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });
    console.log("name changed index", favoritesIndex);

    const favorite = {
      ...this.state.favorites[favoritesIndex]
    };
    favorite.text = event.target.value;
    const favorites = [...this.state.favorites];
    favorites[favoritesIndex] = favorite;

    this.setState({ favorites: favorites });
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  onChange = (e, key) => {
    const favoriteIndex = this.state.favorites.findIndex(f => {
      return f.key === key;
    });
    const { name, value } = e.target;

    const favorite = {
      ...this.state.favorites[favoriteIndex]
    };

    favorite.category = value;
    const favorites = [...this.state.favorites];
    favorites[favoriteIndex] = favorite;
    this.setState({ favorites: favorites });
    console.log("favorites", this.state.favorites);
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
  };

  render() {
    let display_favorites_editor = null;
    display_favorites_editor = (
      <div>
        <Buttons
          new={event => this.newFaveHandler(event, this.state.favorites)}
        />

        {this.state.favorites.map((favorites, index) => {
          return (
            <div>
              <Favorite
                faveName={favorites.text}
                name={favorites.name}
                category={favorites.category}
                key={favorites.key}
                poid={favorites.poid}
                distance={favorites.distance}
                favoriteNameChanged={event =>
                  this.FavoriteFavoriteNameChangedHandler(event, favorites.key)
                }
                nameChanged={event =>
                  this.FavoriteNameChangedHandler(event, favorites.key)
                }
                categoryChanged={event =>
                  this.FavoriteCategoryChangedHandler(event, favorites.key)
                }
                distanceChanged={event =>
                  this.FavoriteDistanceChangedHandler(event, favorites.key)
                }
                delete={event => this.deleteFavoriteHandler(favorites.key)}
              />
              {console.log("fave text", favorites.text)}
              {console.log(
                "this.favoritesDropdown",
                this.state.favoritesDropdown
              )}
              <Dropdown
                key={this.state.favoritesDropdown}
                name="favorites.category"
                value={favorites.text}
                placeholder="select category"
                fluid
                onChange={event => this.onChange(event, favorites.key)}
                search
                selection
                options={this.state.favoritesDropdown}
              />
              {console.log("favorites.text", favorites.text)}
              {console.log(
                "favorites.key string ",
                JSON.stringify(favorites.key)
              )}
            </div>
          );
        })}
      </div>
    );

    return <div>{display_favorites_editor}</div>;
  }
}
export default Favorites;
