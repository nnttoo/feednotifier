///<reference path="../../output/views/jquery-3.3.1.min.js"/>
import React from 'react';
import ReactDOM from 'react-dom'; 
import './settingpage.css'
import { Mask, ToastDeft } from './reuse/toast';
import ServerCall from './reuse/server_call';
import RssInfo from './reuse/rssinfo';
import MyComponent from './reuse/mycomponent';
import SettingAnimate from './settingpageAnimate';



export default class SettingPage extends MyComponent{
    constructor(props){ 
        super(props);   
        this.elsettingElem = React.createRef();

        var my = this;
        this.jsxfunc = { 
            addbut : this.butClickAddrss.bind(this),
            iptmax : this.iptMaxChange.bind(this),
            iptrefesh : this.iptRefeshChange.bind(this),
            tslowdown : this.testSlowdown.bind(this)
        }

            /** @type {RssInfo[]} */
        this.listurl = this.AppCtx.listfeed
        this.needtosaveconfig = false;
        this.state = {} 
        this.spageAnimate = new SettingAnimate() 
        this.spageAnimate.appctx = this.AppCtx;
    } 

    async testSlowdown(){
        var mask = Mask.StartLoding();

        var myajax = ServerCall.getServerAjax()
        myajax.datas.atype = "testslowdon"
        await myajax.callPromise()
        mask.remove()

    }

    /**
     * 
     * @param {RssInfo} rssinfo 
     */
    contextMenuShow(rssinfo){ 
        var mymenu = Menu.buildFromTemplate([
            {
                label: 'Copy Url',
                click: ()=>{
                    clipboard.writeText(rssinfo.url)
                } 
            }
        ])

        mymenu.popup(remote.getCurrentWindow())
    }

    componentWillUnmount(){
         if(this.needtosaveconfig){             
            this.AppCtx.saveConfig()
         }

         this.spageAnimate.unMount()
    }

    componentDidMount(){
        this.spageAnimate.mount(this.elsettingElem.current) 
    } 

    iptMaxChange(event){
        var val = event.target.value;
        this.AppCtx.config.maxfeed = Number(val)
        this.needtosaveconfig = true;
        this.forceUpdate()
    }

    iptRefeshChange(event){
        var val = event.target.value;
        this.AppCtx.config.refreshtime = Number(val)
        this.needtosaveconfig = true;
        this.forceUpdate()
    }


    /**  @param {*} url  */
    listContains(url){
        for(var i=0;i < this.listurl.length;i++){
            var curinfo = this.listurl[i]
            if(curinfo.url == url){
                return true
            }
        }
    }

    getRssTitle(url){
        var scall = ServerCall.getServerAjax()
        scall.datas.atype = "checkurl"
        scall.datas.arg = url;
        return scall.callPromise();
    }

    async butClickdeleteRss(id){ 
        this.listurl.splice(id,1);
        this.setState({})

        var mask = Mask.StartLoding()
        await this.AppCtx.saveListRss()

        this.needtosaveconfig = true;
        mask.remove()

    }

    async butClickAddrss(event){ 
        var target = $(this.elsettingElem.current).find('.addinput')
        var val = target.val();
        target.val("")
 


        if(val.length < 3){
            ToastDeft.sendSimpleToast("rss url too short");
            return;
        }
        if(this.listContains(val)){
            ToastDeft.sendSimpleToast("url has been added");
            return;
        }        

        var mask = Mask.StartLoding();
        var title = await this.getRssTitle(val)

        if(title == ""){
            ToastDeft.sendSimpleToast("Cant parse rss");
            mask.remove();
            return;
        }

        var nRssInfo = new RssInfo();
        nRssInfo.title = title;
        nRssInfo.url = val;

        this.listurl.push(nRssInfo)
 

        this.setState({})
        
        await this.AppCtx.saveListRss()
        this.needtosaveconfig = true;
        mask.remove()
    }

    /**
     * 
     * @param {RssInfo} rssinfo 
     * @param {string} id 
     */
    clickOpenFeedContent(id,rssinfo){
        this.AppCtx.openNewCtn(id,rssinfo)
        this.AppCtx.classInit.settingBut.removeSettingPage()
    }
    render(){  
        var elemlist = []; 
        this.listurl.forEach((element,i) => {
            var notifelem = null;
            var countNewContent = element.countNewContent()
            if(countNewContent >0){
                notifelem = (
                <div className="notif">
                    <div className="notifnumber">{countNewContent}</div>
                </div>)
            }

            elemlist.push(
            <div  key={i}>
                {notifelem}
                <div className="rsschillist tbframe tbfixed">
                    <div onClick={()=>{this.clickOpenFeedContent(i,element)}}  onContextMenu={()=>{this.contextMenuShow(element)}} mycheck="sssssss" className="tc tcnwrap tcvm" >
                        <div className="rsstextinfo title">{element.title}</div>
                        <div className="rsstextinfo url">{element.url}</div> 
                    </div>         
                    <div className="delbut tc tcnwrap tcvm">
                        <button onClick={()=>this.butClickdeleteRss(i)} className="btn btn-danger btn-sm">delete</button>
                    </div>       
                </div>            
            </div>)
        });


        return( 
            <div ref={this.elsettingElem}>

            <div id="spage" >
                <div className="titleframe">
                    <div className="titletext">Setting Page</div> 
                </div>

                <div className="ctn">
                    <div className="ssegment">
                        <h3 className="smalltitle">Feed :</h3>
                        <div className="rsslist">
                                {elemlist}
                        </div>
                    </div>
                    <div className="ssegment">
                        <h3 className="smalltitle">Settings :</h3>
                        <div className="settingtb">
                            <table className="tbframe">
                            <tbody>
                            <tr>
                                <td className="tcl">Refresh</td>
                                <td>:</td>
                                <td><input  className="numinput" type="text" onChange={this.jsxfunc.iptrefesh} value={this.AppCtx.config.refreshtime} /></td>
                                <td>second </td>
                            </tr>

                            <tr>
                                <td className="tcl">Max Items</td>
                                <td>:</td>
                                <td><input className="numinput" onChange={this.jsxfunc.iptmax} type="text" value={this.AppCtx.config.maxfeed} /></td>
                                <td></td>
                            </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                    TestAja
                    <button onClick={this.jsxfunc.tslowdown}>TestSlowdown</button>
                </div>
                </div>
                <div className="bottomel tbframe"> 
                    <div className="tc tcnwrap tcvm">
                        RSS Url :
                    </div>
                    <div className="tc tcnwrap tcvm iptparent">
                        <input onContextMenu={showInputMenu} type="text" className="form-control addinput"/>
                    </div>                   
                
                    <div className="tc tcnwrap tcvm ">
                        <button onClick={this.jsxfunc.addbut} className="btn btn-primary">add</button>
                    </div>
                </div>


            </div>
            </div>
        )
    }
}