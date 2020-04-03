import React from 'react';
import SettingPage from './settingpage'; 
export default class SettingBut extends React.Component{ 
    constructor(props){
        super(props)  
        this.settingpage = null
    }

    butonClick(){
        if(this.settingpage == null){
            this.settingpage = <SettingPage  />;  
        } else {
           this.settingpage = null;
        } 

        this.setState({})
    }
    render(){
        return (
            <div>
                <div onClick={this.butonClick.bind(this)} className="settingbutton icon-cog"> 
                </div>
                {this.settingpage} 
            </div>
        )
    }
}