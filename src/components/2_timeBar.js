import React from 'react';

class DateTimeBox extends React.Component{
    //시간과 날짜 불러오는 변수와 함수
    state={
        date : new Date()
    };
    callTime(){
        setInterval(()=>{
            this.setState({date : new Date()});
        },1000)
    }
    //요일 불러우는 함수
    getToday(){
        var today = this.state.date.getDay();
        var week = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
        return week[today]
    }

    render(){
        var boxStyle = {
            display:"flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent:"center",
            lineHeight: "40%",
            fontSize: "0.7em"
        }
        return(
            <div style={boxStyle}> 
                <p style={{fontWeight:'bold', color:'gray'}}>{this.state.date.toLocaleDateString()}</p>
                <p style={{fontWeight:'bold', color:'#c4c4c4'}}>{this.getToday()}</p>
                <p style={{fontWeight:'bold', color:'white'}}>{this.state.date.toLocaleTimeString()}</p>
                {this.callTime()}
            </div>

        );
    }
}

export default DateTimeBox