import React from 'react';
import RssInfo from './reuse/rssinfo';
import './feedCompCtn.css'
import RssContent from './reuse/rsscontent';
import MyComponent from './reuse/mycomponent';


export default class FeedCompCtn extends MyComponent{
    constructor(props){
        super(props)

        var my = this;
        this.reacfun = {
            ctnclick  : function(rssinfo){
                return function(){
                    my.clickContent(rssinfo)
                }
            } ,
            openClick : function(rssinfo){
                return function(){
                    my.clickOpen(rssinfo)
                }
            }
        }
    }

    /**  @param {RssContent} rssinfo  */
    clickContent(rssinfo){

        window.openBrowserWindow()
        
        // var w = window.open("contentviewer.html","purchaseWin2", "location=0,status=0,scrollbars=0,width=400,height=700");
    
        // var f = function(){ 
        //     w.postMessage(rssinfo,window.location.href)
        //     window.removeEventListener("message",f) 
        // }

        // window.addEventListener("message",f)       
         
    }

    /**  @param {RssContent} rssinfo  */
    clickOpen(rssinfo){
        window.openLinkExternal(rssinfo.Link);
    }

    calcTimeToAgo(tnow,time){
        var second = (tnow - time) / 1000;
        if(second >= 3600){
            var jam = (second / 3600).toFixed(0)
            if(jam <= 24){
                return jam + " hours ago"
            }

            var hari = (jam / 24).toFixed(0)
            return hari + " days ago"
        } 
        var menit = (second / 60).toFixed(0);
        return menit + " minutes ago"
    }

    /**
     * 
     * @param {RssContent} rsscontent 
     */
    saveToOld(rsscontent){
        this.AppCtx.saveAsOldContent(rsscontent)
        this.forceUpdate()
    }
    
    render(){ 
        var elemenContent = [];

        var curdate = new Date().getTime();

        /** @type {RssInfo} */
        var rssinfo = this.props.rssinfo;
        rssinfo.rssContents.forEach((e,i)=>{

            var timeinword = this.calcTimeToAgo(curdate,e.PubdateParsed);

            var newCtnclas = ""
            var mouseEnterFunc = null;
            if(e.NewContent){
                newCtnclas = "newctn"
                mouseEnterFunc = ()=>{
                    this.saveToOld(e);
                }
            }
            elemenContent.push(
                <div className="item" onMouseEnter={mouseEnterFunc} key={i}>
                    <div className={"itemtitle " + newCtnclas}>{e.Title}</div>
                    <div className="itemdesc">{e.ShortDescription }</div>
                    
                    <div className="itembtn tbframe">
                        <div className="tc tcvm tcnwrap">
                            <div className="itempublisher">{rssinfo.title}</div>
                        </div>
                        <div className="tc tcvm tcnwrap itempubdate">{timeinword}</div>
                        <div className="tc tcvm tcnwrap">
                            <div  onClick={this.reacfun.ctnclick(e)} className="btn-xsm btn-primary">preview</div>
                            <div  onClick={this.reacfun.openClick(e)} className="btn-xsm btn-danger">open</div>
                        </div> 
                    </div>
                </div>
            )
        })

        return(
            <div id={"feedframe" + this.props.elemid} className="feedcompctn">
                <div className="urltitle">{rssinfo.title}</div>
                {elemenContent}
            </div>
        )
    }
}