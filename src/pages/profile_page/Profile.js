import React from 'react';
import PropTypes from 'prop-types';
import './Profile.css'; // Pieņemsim, ka šeit ir jūsu CSS stils

const Profile = ({ name, bio, profilePicture }) => {
  return (
    <div className="profile-container">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <h1>{name}</h1>
      <p>{bio}</p>
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
