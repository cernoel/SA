import React from 'react';
import Dropdown from 'react-simple-dropdown';


const Dropdowns = () => {
   
 
    var DropdownTrigger = Dropdown.DropdownTrigger;
    var DropdownContent = Dropdown.DropdownContent;


    return (
        <Dropdown>
            <DropdownTrigger>Profile</DropdownTrigger>
            <DropdownContent>
                
                <ul>
                    <li>
                        <a href="/profile">Profile</a>
                    </li>
                    <li>
                        <a href="/favorites">Favorites</a>
                    </li>
                    <li>
                        <a href="/logout">Log Out</a>
                    </li>
                </ul>
            </DropdownContent>
        </Dropdown>
    );
}

export default Dropdown;


  