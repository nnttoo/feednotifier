
import React from 'react'; 
import MyComponent from './reuse/mycomponent'; 
import FeedCompCtn from './feedCompCtn';
import './feedCompFrame.css'

export default class FeedCompFrame extends MyComponent{ 
    constructor(props){
        super(props)
        this.AppCtx.cbRsschanged = this.callRefreshData.bind(this);
    }

    callRefreshData(){
        this.forceUpdate()
    }

    componentDidMount(){ 
    } 

    componentWillUnmount(){

    }

    render(){
        var listEcontent = []
        this.AppCtx.listfeed.forEach((rssinfo,i)=>{
            listEcontent.push(
                <FeedCompCtn key={i} rssinfo={rssinfo}/>
            )
        })

        return (
            <div className="listItemParent">
                {listEcontent}
            </div>
        )
    }
}   