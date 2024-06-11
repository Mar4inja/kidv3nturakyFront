import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Profile.module.css"
import Navbar from '../../components/navbar/Navbar';

const Profile = ({ name, bio, profilePicture }) => {
  return (
    <div className={styles["profile-container"]}>
      <Navbar/>
      <div className={styles["avatar"]}>
        <img src={profilePicture} alt={`${name}'s profile`} className={styles["profile-picture"]} />
      </div>
      <div className={styles["profile-info"]}>
        <h1 className={styles["profile-name"]}>{name}</h1>
        <p className={styles["profile-bio"]}>{bio}</p>
      </div>
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  profilePicture: PropTypes.string.isRequired
};

Profile.defaultProps = {
  bio: 'Nav biogrāfijas informācijas'
};

export default Profile;
