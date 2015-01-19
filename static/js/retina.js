/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
(function(){var c=(typeof exports==="undefined"?window:exports);var d={retinaImageSuffix:"@2x",check_mime_type:true,force_original_dimensions:true};function b(){}c.Retina=b;b.configure=function(h){if(h===null){h={};}for(var i in h){if(h.hasOwnProperty(i)){d[i]=h[i];}}};b.init=function(h){if(h===null){h=c;}var i=h.onload||function(){};h.onload=function(){var j=document.getElementsByTagName("img"),k=[],l,m;for(l=0;l<j.length;l+=1){m=j[l];if(!!!m.getAttributeNode("data-no-retina")&&m.src.substr(-3)!="svg"){k.push(new e(m));}}i();};};b.isRetina=function(){var h="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-moz-min-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 144dpi), (min-resolution: 1.5dppx)";if(c.devicePixelRatio>1){return true;}if(c.matchMedia&&c.matchMedia(h).matches){return true;}return false;};var g=/\.\w+$/;function a(h){return d.retinaImageSuffix+h;}function f(k,i){this.path=k||"";if(typeof i!=="undefined"&&i!==null){this.at_2x_path=i;this.perform_check=false;}else{if(undefined!==document.createElement){var h=document.createElement("a");h.href=this.path;h.pathname=h.pathname.replace(g,a);this.at_2x_path=h.href;}else{var j=this.path.split("?");j[0]=j[0].replace(g,a);this.at_2x_path=j.join("?");}this.perform_check=true;}}c.RetinaImagePath=f;f.confirmed_paths=[];f.prototype.is_external=function(){return !!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain));};f.prototype.check_2x_variant=function(j){var h,i=this;if(this.is_external()){return j(false);}else{if(!this.perform_check&&typeof this.at_2x_path!=="undefined"&&this.at_2x_path!==null){return j(true);}else{if(this.at_2x_path in f.confirmed_paths){return j(true);}else{h=new XMLHttpRequest();h.open("HEAD",this.at_2x_path);h.onreadystatechange=function(){if(h.readyState!==4){return j(false);}if(h.status>=200&&h.status<=399){if(d.check_mime_type){var k=h.getResponseHeader("Content-Type");if(k===null||!k.match(/^image/i)){return j(false);}}f.confirmed_paths.push(i.at_2x_path);return j(true);}else{return j(false);}};h.send();}}}};function e(h){this.el=h;this.path=new f(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var i=this;this.path.check_2x_variant(function(j){if(j){i.swap();}});}c.RetinaImage=e;e.prototype.swap=function(j){if(typeof j==="undefined"){j=this.path.at_2x_path;}var h=this;function i(){if(!h.el.complete){setTimeout(i,5);}else{if(d.force_original_dimensions){h.el.setAttribute("width",h.el.offsetWidth);h.el.setAttribute("height",h.el.offsetHeight);}h.el.setAttribute("src",j);}}i();};if(b.isRetina()){b.init(c);}})();