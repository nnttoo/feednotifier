
import './settingpageAnimate.css'
import AppCtx from './reuse/appctx';
export default class SettingAnimate{
    constructor(){
        this.spageFrame = null;
        this.spage = null;
        this.maskelem = null;
 
        /** @type {AppCtx} */
        this.appctx = null;
    }

    show(){
        this.spage.animate({
            right : "+=400"
        },"fast")
    }
    hide(){
        this.spage.animate({
            right : "-=400"
        },"fast",()=>{
            this.appctx.classInit.settingBut.removeSettingPage()
        })
    }

    mount(elem){
        this.spageFrame = $(elem); 
        this.spage = this.spageFrame.find('#spage');
        this.maskelem = $('<div class="masksetting"/>').prependTo(this.spageFrame)
        
        this.show();
        this.maskelem.mouseenter(()=>{
            this.hide()
        })
    }

    unMount(){

        console.log('unmount')
    }
}