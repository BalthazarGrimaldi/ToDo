import React from 'react';
import { GoogleLogin } from 'react-google-login-component';

class LoginComponent extends React.Component{
    
    
    responseGoogle(googleUser){
        var id_token = googleUser.getAuthResponse().id_token;
        var access_token= googleUser.getAuthResponse().access_token;
        this.props.updateInfo(googleUser.getBasicProfile(), id_token, access_token);
    }
    
    render(){
        return(
            <div>
                <GoogleLogin 
                    socialId="927723414099-pqq7gbi2jfguo1oe012376skc5t6coe8.apps.googleusercontent.com"
                    className="google-login"
                    scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                    fetchBasicProfile={true}
                    responseHandler={this.responseGoogle.bind(this)}>
                    Login with google
                </GoogleLogin>
            </div>      
        );
    }
     
};

export default LoginComponent;