import React from 'react' 
import './rssFeedCtnRBarAnim.css'
import rssFeedCtnShare from './rssFeedCtnShare';


export default class RssFeedCtnRBarAnim{
    constructor(){
        this.elemReact = React.createRef()
 


        this.spageFrame = null;
        this.spage = null;
        this.maskelem = null;  
    }

    show(){ 
        this.spage.animate({
            right : "+=400"
        },"fast",()=>{
            this.maskelem.mouseenter(()=>{
                this.hide()
            })
        })
    }
    hide(){
        this.spage.animate({
            right : "-=400"
        },"fast",()=>{ 
            console.log("after slide")
            rssFeedCtnShare.rssFeedCtn.clickListeners.menubut()
        })
    }

    mount(){ 
        this.spageFrame = $(this.elemReact.current)
        this.spage = this.spageFrame.find('.rbar');
        this.maskelem = $('<div class="masksetting"/>').prependTo(this.spageFrame)
        
        this.show();
        
    }

    unMount(){
        console.log('unmount')
    }
}