import React from 'react';
import {logout} from '../services/authentification';

class UserComponent extends React.Component {
   
    logout(){
        logout();
        window.location.reload(); 
    }
    
    render() { 
        return (
            <div className="userInfo">
                <img src={this.props.userInfo.Paa} alt="avatar"/>
                <span>{this.props.userInfo.ig}</span>
                <a onClick={this.logout.bind(this)} href="#deco" >déconnection</a>
            </div>
        );
    }
};

export default UserComponent;
