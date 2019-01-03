import React from 'react';

import './App.css';
const Favorite = (props) => {
    return (

        <div>
           <input type="text" onChange={props.nameChanged} value = {props.name} ></input>
           <input type="text" onChange={props.categoryChanged} value = {props.category}></input>
           <input type="text" onChange={props.distanceChanged} value = {props.distance}></input>
           <button onClick={props.delete}>Delete</button>
        </div>
    );
}

export default Favorite;