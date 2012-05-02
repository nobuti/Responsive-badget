(function(window, document, undefined){
	
	var addEventListener = "addEventListener",
  		attachEvent = "attachEvent",
  		removeEventListener = "removeEventListener",
  		detachEvent = "detachEvent",
  		space = /\s+/,
  		_events = [],
  		slice = Array.prototype.slice,
  		dom;
	
	/**
	* 
	* Data for get vendor prefix
	* 
	*/
	var vendor = {
		"transform": ["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"],
		"transition": ["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"],
		"animation": ["animation", "msAnimation", "MozAnimation", "WebkitAnimation", "OAnimation"],
		"prefix": ["","-ms-","-moz-","-webkit-","-o-"]
	};

	var rsp = {
		visible: true,
		/**
		* 
		* Helper to get vendor prefixes.
		* @param {Array} prefixes
		* 
		*/
		getVendorPrefix: function(prefixes) 
		{
	   		var tmp = document.createElement("div"),
	   			result = "",
	   			l = prefixes.length;

			while (l--) {
				if (typeof tmp.style[prefixes[l]] != 'undefined') {
		      		return vendor.prefix[l];
		   		} 
			}
	   		return "";
		},
		/**
		* 
		* Resize handler
		* @param {Object} event
		* 
		*/
		resize: function(event)
		{
			var size = this.size();
			dom.innerHTML = size.w+" x "+size.h;
		},
		/**
		* 
		* Cross-browser style set property
		* @param {Object} el
		* @param {String} property
		* @param {String} value
		* 
		*/
		setProperty: function(el,property,value)
		{
			 (el.style.setProperty) ? el.style.setProperty(property, value,'') : el.style.setAttribute(property, value);
		},
		/**
		* 
		* Cross-browser suscriber event
		* @param {Object} elem
		* @param {String} type
		* @param {Object} fn
		* 
		*/
		on: function(elem, type, fn)
		{
			function wrapHandler(event) {
				fn.call(elem, event || window.event);
			}
			if ( (elem && !elem.length) || elem === window ) {
				var events = type.split(space),
					num = events.length;
				while (num--){
					if ( document[addEventListener] ) {
		        		elem[addEventListener](events[num], wrapHandler, false);  
		    		} else if ( document[attachEvent] ) {  
		    			elem[attachEvent]('on'+events[num], wrapHandler); 
		            }
		        }
			} else {
				var len = elem.length;  
	            while (len--){
	                _m.on( elem[len], type, fn );  
	            }
			}         
		},
		/**
		* 
		* Cross-browser desuscriber event
		* @param {Object} elem
		* @param {String} type
		* @param {Object} fn
		* 
		*/
		off: function(elem, type, fn)
		{
			if ( (elem && !elem.length) || elem === window ) {  
				var events = type.split(space),
					num = events.length;
				while (num--){	
					if ( document[removeEventListener] ) {  
		        		elem[removeEventListener](events[num], fn, false);  
		    		} else if ( document[detachEvent] ) {  
		    			elem[detachEvent]('on'+events[num]);
		            }
	            } 
			} else {
				var len = elem.length;  
	            while (len--){
	                _m.off( elem[len], type, fn );  
	            }
			}   
		},
		/**
		* 
		* Cross-browser get viewport size
		* 
		*/
		size: function()
		{
			var result = {};
			result.w = window.innerWidth;
			result.h = window.innerHeight;
			if (typeof result.w != "number"){
				var element = (document.compatMode === "CSS1Compat") ? "documentElement" : "body";
				result.w = document[element].clientWidth;
				result.h = document[element].clientHeight;
			}
			return result;
		},
		/**
		* 
		* Toggle visibility
		* 
		*/
		toggle: function(e)
		{
			// Alt + Shift + v
			if (e.keyCode === 9674){
				var visibility = (this.visible ? 'none' : 'block');
				this.visible = !this.visible;
				this.setProperty(dom, 'display',visibility);
			}

		},
		/**
		* 
		* Init function
		* 
		*/
		init: function(){
			var self = this,
				prefix=this.getVendorPrefix(vendor.transition),
				setProperty = this.setProperty;
			

			dom = document.createElement('div');
			setProperty(dom, 'padding','10px');
			setProperty(dom, 'color','#444');
			setProperty(dom, 'width','100px');
			setProperty(dom, 'height','20px');
			setProperty(dom, 'font-size','18px');
			setProperty(dom, 'font-weight','bold');
			setProperty(dom, 'text-align','center');
			setProperty(dom, 'background-color','#ddd');
			setProperty(dom, prefix+'border-radius','40px');
			setProperty(dom, 'position','absolute');
			setProperty(dom, 'top','50%');
			setProperty(dom, 'margin-top','-20px');
			setProperty(dom, 'left','50%');
			setProperty(dom, 'margin-left','-60px');
			setProperty(dom, 'z-index','991');

			document.body.appendChild(dom);
			
			rsp.on(window,'resize',function(){
				self.resize()
			});

			rsp.on(window,'keypress',function(e){
				self.toggle(e);
			});
			rsp.resize();
			window.focus();
		}
	}
	
	rsp.init();
	
	
}(this, document))