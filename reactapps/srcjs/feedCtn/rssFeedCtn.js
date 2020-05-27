
import React from 'react'; 
import './rssFeedCtn.css'
import RssFeedCtnRbar from './rssFeedCtnRBar';
import rssFeedCtnShare from  './rssFeedCtnShare'


export default class RssFeedCtn   extends React.Component{
    constructor(prop){
        super(prop)       
        this.viewRbar = null;  
        this.setupListener()
        rssFeedCtnShare.rssFeedCtn = this;
    }

    setupListener(){ 
        this.clickListeners = {
            menubut : ()=>{  

                if(this.viewRbar == null){
                    this.viewRbar = <RssFeedCtnRbar/>
                } else {
                    this.viewRbar = null;
                }
                this.forceUpdate()
            }
        }
    } 

    render(){
        return (
            <div id="feedctn" ref={rssFeedCtnShare.elemFeedCtn}>
                {this.viewRbar}
                <div className="topbar">                    
                    <span className="icon-fire licon"></span> Rss Feed
                    <div className="menubut" onClick={this.clickListeners.menubut}>
                        <span className="icon-list"></span>
                    </div>
                </div>
            </div>
        )
    }
}