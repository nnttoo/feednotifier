
import React from 'react'; 
import MyComponent from './reuse/mycomponent'; 
import FeedCompCtn from './feedCompCtn';
import './feedCompFrame.css'

export default class FeedCompFrame extends MyComponent{ 
    constructor(props){
        super(props)
        this.AppCtx.cbRsschanged = this.callRefreshData.bind(this);
        this.AppCtx.classInit.FeedCompFrame = this;
    }

    callRefreshData(){
        this.forceUpdate()
    }

    componentDidMount(){ 
    } 

    componentWillUnmount(){

    }

    scrollTo(feedid){ 
        $('.listItemParent').animate({
            scrollTop:  $('.listItemParent').scrollTop() + $("#feedframe" + feedid).offset().top 
        }, "slow");
    }

    render(){
        var listEcontent = []
        this.AppCtx.listfeed.forEach((rssinfo,i)=>{
            listEcontent.push(
                <FeedCompCtn elemid={i} key={i} rssinfo={rssinfo}/>
            )
        })

        return (
            <div className="listItemParent">
                {listEcontent}
            </div>
        )
    }
}   