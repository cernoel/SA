import React from 'react';


const SearchFill = (props) => {

    return (

        <div>
           <p>Name: </p>
            <input type="Text" onChange={props.searchNameChanged} value = {props.name}></input>
            <p>Category: </p>
            <input type="Text" onChange={props.searchCategoryChanged} value={props.category}></input>
            <input type="Text" onChange={props.searchDistanceChanged} value={props.distance}></input>
            



            

        </div>
    );

}

export default SearchFill;


/*            <p onChange={props.searchNameChanged} onChange={props.searchCategoryChanged}>

                {props.name} <br />
                in Area: {props.category} </p>
          
*/