import React from 'react';
import AccountIcon from './icons/AccountIcon';
import MemberIcon from './icons/MemberIcon';
import NotificationIcon from './icons/NotificationIcon';
import SeatIcon from './icons/SeatIcon';
import SettingIcon from './icons/SettingIcon';

class AppBox extends React.Component{
    render(){
        return(  
            <div>
                <AccountIcon/>
                <MemberIcon/>
                <SeatIcon/>
                <NotificationIcon/>
                <SettingIcon/>
            </div> 
        );
    }
}

export default AppBox