import React from 'react';


const Buttons = (props) => {
    return (

        <div>
           <button onClick={props.saveFavorite}>Save as Favorite</button>
           <button onClick={props.editFavorites}>Edit Favorites</button>
        </div>
    );
}

export default Buttons;