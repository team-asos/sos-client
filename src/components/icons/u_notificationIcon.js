import React from 'react';
import * as HiIcon from "react-icons/hi"

class NotificationIcon extends React.Component{
    constructor(){
        super();
        this.state = {text:''}
    }
    onMouseOver(e){
        this.setState({text: '알림'})
        e.target.style.color='#820101'
        //e.target.style.transform='scale(1.1)'
    }
    onMouseOut(e){
        this.setState({text:''})
        e.target.style.color='black'
    }
    render(){
        const {text}=this.state;
        return(  
            <div className="icon-box"
            onMouseEnter={this.onMouseOver.bind(this)} 
            onMouseLeave={this.onMouseOut.bind(this)}>
                <HiIcon.HiBell className="icon" size={35}/>
                <p className="text"> {text}</p>
            </div> 
        );
    }
}

export default NotificationIcon