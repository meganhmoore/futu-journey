import Alert from "react-s-alert";
import _ from 'lodash';
import React, {useState} from 'react';
import ProfileCard from 'components/profile';

const LinkedinLogin: React.FC = () => {
    const [isAuthorized, setAuthorized] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileURL, setProfileURL] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    const  componentDidMount=() =>{
        window.addEventListener('message', handlePostMessage);
    }

    const handlePostMessage = (event: any) => {
        if (event.data.type === "profile") {
            updateProfile(event.data.profile);
            Alert.success(`Login successful: ${event.data.profile.localizedFirstName}`,{position:'top'});
          }
    }

    const updateProfile = (profile: any) => {
        console.log(profile)
        setAuthorized(true);
        setFirstName(_.get(profile,'localizedFirstName',''))
        setLastName(_.get(profile,'localizedLastName',''))
        setProfileURL(`https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`)
        setPictureURL(_.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier',''))
        //   this.setState({
        //     isAuthorized: true,
        //     firstName: _.get(profile,'localizedFirstName',''),
        //     lastName: _.get(profile,'localizedLastName',''),
        //     profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        //     pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
        //   })
      }
    
    const requestProfile = () => {
        console.log(`ENV: ${process.env}`);
        console.log(`CLIENT: ${process.env.NEXT_PUBLIC_CLIENT_ID}`)
        //var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.LINKEDIN_REDIRECT}`
        var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT}`
        var width = 450,
          height = 730,
          left = window.screen.width / 2 - width / 2,
          top = window.screen.height / 2 - height / 2;
    
        window.open(
          oauthUrl,
          "Linkedin",
          "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
            width +
            ", height=" +
            height +
            ", top=" +
            top +
            ", left=" +
            left
        );
        window.close();
      };

    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT}` 
    const redirect = `document.location.href=${oauthUrl}`
    return(
        <div>
        <header>
          <h1 className="flex justify-center">React Linkedin Login</h1>
          <p className="flex justify-center">A demo page for Linkedin login</p>
          <Alert />
        </header>
        <div>
          <a className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"href={oauthUrl}>Linkedin Login</a>
          {isAuthorized &&
            (
              <ProfileCard
                firstName={firstName}
                lastName={lastName}
                profileURL={profileURL}
                pictureURL={pictureURL}
              />
            )}
        </div>
      </div>
    );
}

export default LinkedinLogin;