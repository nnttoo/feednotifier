import React from 'react';
import SettingPage from './settingpage'; 
import MyComponent from './reuse/mycomponent';
export default class SettingBut extends MyComponent{ 
    constructor(props){
        super(props)  
        this.settingpage = null
        this.AppCtx.classInit.settingBut = this;
    }

    removeSettingPage(){ 
        /** public access from  /settingpageAnimate.js */
        this.settingpage = null;
        this.setState({})
    }

    butonClick(){
        if(this.settingpage == null){
            this.settingpage = <SettingPage/>;  
            this.setState({})
        } else {
           this.removeSettingPage()
        } 

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