import React from 'react'

import '../assets/styles/3a_notificationPage.css'

import NavBox from '../components/2a_navBox';
import MessageBox from '../components/3a_messageBox';

class NotificationPage extends React.Component{
    render(){
        return(
            <div className="notificationPage">
                <div><NavBox/></div>
                <div><MessageBox/></div>
            </div>
        );
    }
}

export default NotificationPage