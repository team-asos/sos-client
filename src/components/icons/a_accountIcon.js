import React from 'react';

import * as HiIcon from "react-icons/hi"

import '../../assets/styles/IconStyle.css'

class AccountIcon extends React.Component{
   render(){
        return(    
            <div className="icon-box">
                <HiIcon.HiUserCircle className="icon" size={35}/>
                <p className="text">나의 계정</p>
            </div> 
        );
    }
}

export default AccountIcon