import React from 'react';

const Favorite = (props) => {
    const style = {
        backgroundColor: 'lightblue',
        font: 'inherit',
        border: '1x solid blue',
        width: '77px',
        float: 'left',
        paddingBottom: '2px',
        paddingLeft: '3px',
    };
    const styleFields = {
        paddingBottom: '2px',
    };

    const test = {
        width: '302px'
    }

    const labels = {
        backgroundColor: 'lightblue',
        width: '100px',
        left: 0,
    }

    const deleteDiv = {
        backgroundColor: 'lightblue',
        width: '277px',
        left: 0,
        float: 'left'
    }


    const nameOfSearch = {
        backgroundColor: 'lightblue',

    }

    const abstandOben = {
        paddingTop: '23px',
    }

    const Delete = {
        backgroundColor: 'lightblue',
        float: 'right'
    }


    return (

        <div style={test}>
            <div style={abstandOben}>
                <div style={deleteDiv}>
                    <input type="text"
                        style={nameOfSearch}
                        onChange={props.favoriteNameChanged}
                        value={props.faveName}>
                    </input>
                    <button style={Delete} onClick={props.delete}>X</button>
                </div>
            </div>

            <div>
                <div style={labels}>
                    <label style={style} >Name:</label>
                    <label style={style} >Category:</label>
                    <label style={style} >Distance:</label>
                </div>

                <input type="text" style={styleFields}
                    onChange={props.nameChanged}
                    value={props.name} >
                </input>

                <input type="text" style={styleFields}
                    onChange={props.categoryChanged}
                    value={props.category}>
                </input>

                <input style={styleFields} type="text"
                    onChange={props.distanceChanged}
                    value={props.distance}>
                </input>

            </div>
        </div>
    );
}

export default Favorite;