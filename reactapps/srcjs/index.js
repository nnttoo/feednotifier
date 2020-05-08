import "@babel/polyfill";

/**
 * import "@babel/polyfill";
 * add on the top for async wait work on your project
 */

import React from 'react';
import ReactDOM from 'react-dom'; 
import "core-js";  
import SettingBut from './settingBut';
import './table.css'; 
import AppCtx from "./reuse/appctx";
import MyComponent from "./reuse/mycomponent";  
import FeedCompFrame from "./feedCompFrame";
import './index.css'
import { Mask } from "./reuse/toast";

class App extends MyComponent { 
    constructor(props){
        super(props)  
    }
 

    async componentDidMount(){ 

        var mask = Mask.StartLoding()
        await this.AppCtx.getListRss()
        await this.AppCtx.getAllRss()
        mask.remove() 
    }

    render(){  
        
        return (
            <div>
                <div className="appctn">
                    <FeedCompFrame/>
                </div> 
                <div className="bottombar">
                    FeedNotifier  
                </div>
                <SettingBut /> 
            </div> 
        )
    } 
}; 
 
ReactDOM.render( 
    <App text="RSS Notifier" />,
    document.getElementById("app")
);  

 