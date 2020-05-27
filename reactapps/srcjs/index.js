import "@babel/polyfill";

/**
 * import "@babel/polyfill";
 * add on the top for async wait work on your project
 */
 
import React from 'react';
import ReactDOM from 'react-dom';  
import './index.css'
import './table.css'  
import FeedCtn from "./feedCompCtn/feedCtn";

class App extends React.Component { 
    constructor(props){
        super(props)  
    }  
 

    render(){  
        
        return (
            <div>            
                <div id="leftBar">
                    <div className="lhead">
                        <img src="/icon.png"/>
                        <div>Upwork JobNotifier</div>
                    </div> 
                    <div className="vscroll">
                        <div className="item">
                            <span className="icon-fire licon"></span>
                            Rss Feed
                        </div>

                        <div className="item">
                            <span className="icon-stats-dots licon"></span>
                            Stats
                        </div>
                        <div className="item">
                            <span className="icon-cog licon"></span>
                            Setting
                        </div> 
                        <div className="item">
                            <span className="icon-user licon"></span>
                            About
                        </div> 
                    </div>
                </div>
                <div id="appctn"> 
                    <FeedCtn/>
                </div>              
            </div> 
        )
    } 
}; 
 
ReactDOM.render( 
    <App text="RSS Notifier" />,
    document.getElementById("app")
);  

 console.log("sssssss")