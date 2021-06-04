import React from 'react';

interface ProfileProps {
    firstName: string;
    lastName: string;
    profileURL: string;
    pictureURL: string;
}

const Profile: React.FC<ProfileProps> = ({firstName, lastName, profileURL, pictureURL, headline}) => {
    return(
        <div>
        <div>
          <img src={pictureURL} alt="" height="200px" width="200px"/>
          <h1><a href={profileURL} target="_blank" rel="noopener noreferrer">{firstName} {lastName}</a></h1>
        </div>
      </div>
    )
}

export default Profile