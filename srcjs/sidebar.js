class DragableSize{
    constructor(){
        this.elemApp = $('#app')
        this.elemSbar = this.elemApp.find('.sidebar');
        this.elemCtn = this.elemApp.find('.appctn')
        this.elemResizer = $('<div class="resizer"></div>').appendTo(this.elemSbar);
        
        this.x = 0;
    }

    loadSavedWidth(){
        var str = localStorage.getItem("sidebarsize");
        console.log(str);
        var x = Number(str)
        if(x <= 0){
            x = 200;
        }
        this.x = x;
    }

    saveWidth(){
        localStorage.setItem("sidebarsize",this.x);
    }

    applyElemWidth(){
        this.elemSbar.width(this.x)
        this.elemCtn.css({left : this.x})
    }

    start(){
        var maskresizer = $('<div class="maskresize"/>').appendTo('body');
        this.loadSavedWidth();
        this.applyElemWidth();
         
        
        var startMouseDrag = ()=>{
             maskresizer.css({display : "block"})
        }
        
        this.elemResizer.mousedown((e)=>{ 
            startMouseDrag()
        }) 
        maskresizer.mousemove((e)=>{
            this.x = e.pageX; 
            this.applyElemWidth()
        })

        maskresizer.mouseup(()=>{
            maskresizer.css({display : "none"})
            this.saveWidth()
        })

        maskresizer.mouseleave(()=>{
            maskresizer.css({display : "none"})
            this.saveWidth()
        })
    }
}
 

$(document).ready(function(){
    new DragableSize().start()
})