import React from "react";
import styles from './dropdown.module.css';


const DropdownProfile = () => {
    return (
        <div className={styles.dropdownProfile}>
        <div className={styles.profileMenu}>
          
        </div>
        <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
    
    )
}

export default DropdownProfile;
