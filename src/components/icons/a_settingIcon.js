import React from 'react';

import * as AiIcon from "react-icons/ai"

import '../../assets/styles/IconStyle.css'

class SettingIcon extends React.Component{

    render(){
        return(  
            <div className="icon-box">
                <AiIcon.AiFillSetting className="icon" size={35}/>
            <p className="text">환경 설정</p>
            </div> 
        );
    }
}

export default SettingIcon