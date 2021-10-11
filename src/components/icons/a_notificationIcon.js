import React from 'react';

import * as HiIcon from "react-icons/hi"

import '../../assets/styles/IconStyle.css'

class NotificationIcon extends React.Component{
    render(){
        return(  
            <div className="icon-box">
                <HiIcon.HiBell className="icon" size={35}/>
                <p className="text">알림</p>
            </div> 
        );
    }
}

export default NotificationIcon