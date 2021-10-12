import React from 'react';

import * as HiIcon from "react-icons/hi"

import '../../assets/styles/IconStyle.css'

class MemberIcon extends React.Component{
    render(){
        return(  
            <div className="icon-box">
                <HiIcon.HiUserGroup className="icon" size={35}/>
                <p className="text">사용자 관리</p>
            </div> 
        );
    }
}

export default MemberIcon