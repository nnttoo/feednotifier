
import React from 'react'; 
import MyComponent from './reuse/mycomponent'; 
import FeedCompFrame from './feedCompFrame';
import SettingBut from './settingBut';
import './feedCtn.css'
import { Mask } from './reuse/toast'; 

export default class FeedCtn extends MyComponent{
    constructor(p){
        super(p)
         
    }



    async componentDidMount(){ 
  
        var mask = Mask.StartLoding()
        await this.AppCtx.getListRss()
        await this.AppCtx.getAllRss()
        mask.remove()     
    }


    render(){
        return (
            <div  className="feedCtnParent">
                <FeedCompFrame/>
                <SettingBut /> 
            </div>
        )
    }
}