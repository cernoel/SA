import React from 'react';


const Done = (props) => {
    return (

        <div>
           <button onClick={props.done}>Done</button>
        </div>
    );
}

export default Done;