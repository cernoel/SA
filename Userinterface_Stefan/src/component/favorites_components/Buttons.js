import React from 'react';


const Buttons = (props) => {
    const add_button = {
        width: '277px',
        backgroundColor: 'lightgreen',

    }
    
    return (

        <div>
           <button style={add_button} onClick={props.new}>Add</button>
        </div>
    );
}

export default Buttons;