import "./toast.css"

class ToastDeft{
	constructor(){			
		this.color = "#fff";
		this.toppos = '10%';
		this.auto = true;
		this.time = 2000;
		this.parent = null;

	}

	callback(){

	}

	start(text){
		if(this.parent == null){
			this.parent = $('body');
		}

		var viewtoast = $('<div class="toastMask"></div>').appendTo(this.parent); 
		viewtoast.css({'top' : this.toppos });
	
		var textinner = $('<div class="toastInnet"></div>');
		viewtoast.append(textinner);
		textinner.css({'color' : this.color});
		textinner.html(text);
	  
		var my = this;
		if(this.auto){
			setTimeout(function(){
				viewtoast.fadeTo(500,0,function(){
					viewtoast.remove();
					my.callback();
				});
			},this.time);		
		}   
		return viewtoast;
	}

	static sendSimpleToast(txt){
		var t = new ToastDeft();
		t.start(txt)
	}
} 

class Mask{
	constructor(){
		this.withloading = false;

		/**
		 * 
         * parent loading harus position relative
		 * @type {JQuery}
		 */
		this.parent = null;
		this.mask = null;
	} 
	start(){ 
		var cssClassName = "callmaskAbsolute";
		if(this.parent == null){
			this.parent = $('body');
			cssClassName = "callmaskFixed";
		}
		this.mask = $('<div class="'+cssClassName+' callmask_mask"></div>').appendTo(this.parent);
		//this.mask.css({'display':'none'});

		if(this.withloading){
			var bootstraploading = `
			<div style="text-align:center;padding:10px;height:100px">
			<div class='loadingmask'>
			<div class='loader'>
				<div class='loader--dot'></div>
				<div class='loader--dot'></div>
				<div class='loader--dot'></div>
				<div class='loader--dot'></div>
				<div class='loader--dot'></div>
				<div class='loader--dot'></div>
				<div class='loader--text'>
					<div class="loaderinfotext"></div>
					<div class="loaderinfodot"></div>

				</div>
			</div>
			</div>
			</div>
			`;

			this.mask.append(bootstraploading);
		}
		//this.mask.fadeIn(100);
	} 

	setText(text){
		this.mask.find('.loaderinfotext').text(text)
	}

	remove(){ 
		if(this.mask == null) return;  

		var my = this;
		this.mask.fadeOut(100,function(){
			my.mask.remove();
			my.mask = null;
		}) 
	}


	static StartLoding(){
		var mask = new Mask();
		mask.withloading = true;
		mask.start();
		return mask;
	}

	static destroyAllUnknownMask(){
		$('.callmask_mask').remove();
	}
} 
export {
	ToastDeft,
	Mask
}