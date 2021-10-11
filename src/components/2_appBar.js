import React from 'react';

import AccountIcon from '../components/icons/a_accountIcon';
import MemberIcon from '../components/icons/a_memberIcon';
import NotificationIcon from '../components/icons/a_notificationIcon';
import SeatIcon from '../components/icons/a_seatIcon';
import SettingIcon from '../components/icons/a_settingIcon';

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