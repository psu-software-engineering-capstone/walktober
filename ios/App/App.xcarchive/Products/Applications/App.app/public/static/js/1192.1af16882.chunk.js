"use strict";(self.webpackChunkwalktober=self.webpackChunkwalktober||[]).push([[1192],{1192:function(t,e,i){i.r(e),i.d(e,{ion_virtual_scroll:function(){return d}});var n=i(3431),r=i(1205),o=i(300),s="item",l="header",h="footer",a=function(t,e){var i=c(t,e);return i&&null!==t.ownerDocument?t.ownerDocument.importNode(i.content,!0).children[0]:null},c=function(t,e){switch(e){case s:return t.querySelector("template:not([name])");case l:return t.querySelector("template[name=header]");case h:return t.querySelector("template[name=footer]")}},u=function(t,e,i,n,r,o,a,c,u,d,p,f){for(var g=[],m=f+p,v=p;v<m;v++){var y,b=t[v];if(r)null!=(y=r(b,v,t))&&g.push({i:d++,type:l,value:y,index:v,height:i?i(y,v):a,reads:i?0:2,visible:!!i});if(g.push({i:d++,type:s,value:b,index:v,height:e?e(b,v):u,reads:e?0:2,visible:!!e}),o)null!=(y=o(b,v,t))&&g.push({i:d++,type:h,value:y,index:v,height:n?n(y,v):c,reads:n?0:2,visible:!!n})}return g},d=function(){function t(t){var e=this;(0,r.r)(this,t),this.range={offset:0,length:0},this.viewportHeight=0,this.cells=[],this.virtualDom=[],this.isEnabled=!1,this.viewportOffset=0,this.currentScrollTop=0,this.indexDirty=0,this.lastItemLen=0,this.totalHeight=0,this.approxItemHeight=45,this.approxHeaderHeight=30,this.approxFooterHeight=30,this.onScroll=function(){e.updateVirtualScroll()}}return t.prototype.itemsChanged=function(){this.calcCells(),this.updateVirtualScroll()},t.prototype.componentWillLoad=function(){console.warn("[Deprecation Warning]: ion-virtual-scroll has been deprecated and will be removed in Ionic Framework v7.0. See https://ionicframework.com/docs/angular/virtual-scroll for migration steps.")},t.prototype.connectedCallback=function(){return(0,n.mG)(this,void 0,void 0,(function(){var t,e;return(0,n.Jh)(this,(function(i){switch(i.label){case 0:return(t=this.el.closest("ion-content"))?(e=this,[4,t.getScrollElement()]):(console.error("<ion-virtual-scroll> must be used inside an <ion-content>"),[2]);case 1:return e.scrollEl=i.sent(),this.contentEl=t,this.calcCells(),this.updateState(),[2]}}))}))},t.prototype.componentDidUpdate=function(){this.updateState()},t.prototype.disconnectedCallback=function(){this.scrollEl=void 0},t.prototype.onResize=function(){this.calcCells(),this.updateVirtualScroll()},t.prototype.positionForItem=function(t){return Promise.resolve(function(t,e,i){var n=e.find((function(e){return e.type===s&&e.index===t}));return n?i[n.i]:-1}(t,this.cells,this.getHeightIndex()))},t.prototype.checkRange=function(t,e){return void 0===e&&(e=-1),(0,n.mG)(this,void 0,void 0,(function(){var i,r,o;return(0,n.Jh)(this,(function(n){return this.items?(i=-1===e?this.items.length-t:e,r=function(t,e){var i=t.length>0?t[t.length-1].index:0;return 0===e?0:e===i+1?t.length:t.findIndex((function(t){return t.index===e}))}(this.cells,t),o=u(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,r,t,i),this.cells=function(t,e,i){if(0===i&&e.length>=t.length)return e;for(var n=0;n<e.length;n++)t[n+i]=e[n];return t}(this.cells,o,r),this.lastItemLen=this.items.length,this.indexDirty=Math.max(t-1,0),this.scheduleUpdate(),[2]):[2]}))}))},t.prototype.checkEnd=function(){return(0,n.mG)(this,void 0,void 0,(function(){return(0,n.Jh)(this,(function(t){return this.items&&this.checkRange(this.lastItemLen),[2]}))}))},t.prototype.updateVirtualScroll=function(){this.isEnabled&&this.scrollEl&&(this.timerUpdate&&(clearTimeout(this.timerUpdate),this.timerUpdate=void 0),(0,r.f)(this.readVS.bind(this)),(0,r.c)(this.writeVS.bind(this)))},t.prototype.readVS=function(){for(var t=this,e=t.contentEl,i=t.scrollEl,n=0,r=t.el;null!==r&&r!==e;)n+=r.offsetTop,r=r.offsetParent;this.viewportOffset=n,i&&(this.viewportHeight=i.offsetHeight,this.currentScrollTop=i.scrollTop)},t.prototype.writeVS=function(){var t=this.indexDirty,e=function(t,e,i){return{top:Math.max(t-i,0),bottom:t+e+i}}(this.currentScrollTop-this.viewportOffset,this.viewportHeight,100),i=this.getHeightIndex(),n=function(t,e,i){for(var n=e.top,r=e.bottom,o=0;o<t.length&&!(t[o]>n);o++);for(var s=Math.max(o-i-1,0);o<t.length&&!(t[o]>=r);o++);return{offset:s,length:Math.min(o+i,t.length)-s}}(i,e,2),o=function(t,e,i){return t<=i.offset+i.length||e.offset!==i.offset||e.length!==i.length}(t,this.range,n);o&&(this.range=n,function(t,e,i,n){for(var r=0,o=t;r<o.length;r++){var s=o[r];s.change=0,s.d=!0}for(var l=[],h=n.offset+n.length,a=function(n){var r=i[n],o=t.find((function(t){return t.d&&t.cell===r}));if(o){var s=e[n];s!==o.top&&(o.top=s,o.change=1),o.d=!1}else l.push(r)},c=n.offset;c<h;c++)a(c);for(var u=t.filter((function(t){return t.d})),d=function(i){var n=u.find((function(t){return t.d&&t.cell.type===i.type})),r=i.i;n?(n.d=!1,n.change=2,n.cell=i,n.top=e[r]):t.push({d:!1,cell:i,visible:!0,change:2,top:e[r]})},p=0,f=l;p<f.length;p++)d(f[p]);t.filter((function(t){return t.d&&-9999!==t.top})).forEach((function(t){t.change=1,t.top=-9999}))}(this.virtualDom,i,this.cells,n),this.nodeRender?function(t,e,i,n){for(var r,o,s=Array.from(t.children).filter((function(t){return"TEMPLATE"!==t.tagName})),l=s.length,h=0;h<i.length;h++){var c=i[h],u=c.cell;if(2===c.change){if(h<l)e(o=s[h],u,h);else{var d=a(t,u.type);(o=null!==(r=e(d,u,h))&&void 0!==r?r:d).classList.add("virtual-item"),t.appendChild(o)}o.$ionCell=u}else o=s[h];0!==c.change&&(o.style.transform="translate3d(0,".concat(c.top,"px,0)"));var p=u.visible;c.visible!==p&&(p?o.classList.remove("virtual-loading"):o.classList.add("virtual-loading"),c.visible=p),u.reads>0&&(n(u,o),u.reads--)}}(this.el,this.nodeRender,this.virtualDom,this.updateCellHeight.bind(this)):this.domRender?this.domRender(this.virtualDom):this.renderItem&&(0,r.j)(this))},t.prototype.updateCellHeight=function(t,e){var i=this,n=function(){if(e.$ionCell===t){var n=window.getComputedStyle(e),r=e.offsetHeight+parseFloat(n.getPropertyValue("margin-bottom"));i.setCellHeight(t,r)}};e?(0,o.c)(e,n):n()},t.prototype.setCellHeight=function(t,e){var i=t.i;t===this.cells[i]&&(t.height===e&&!0===t.visible||(t.visible=!0,t.height=e,this.indexDirty=Math.min(this.indexDirty,i),this.scheduleUpdate()))},t.prototype.scheduleUpdate=function(){var t=this;clearTimeout(this.timerUpdate),this.timerUpdate=setTimeout((function(){return t.updateVirtualScroll()}),100)},t.prototype.updateState=function(){var t=!!(this.scrollEl&&this.cells.length>0);t!==this.isEnabled&&(this.enableScrollEvents(t),t&&this.updateVirtualScroll())},t.prototype.calcCells=function(){this.items&&(this.lastItemLen=this.items.length,this.cells=u(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,0,0,this.lastItemLen),this.indexDirty=0)},t.prototype.getHeightIndex=function(){return this.indexDirty!==1/0&&this.calcHeightIndex(this.indexDirty),this.heightIndex},t.prototype.calcHeightIndex=function(t){void 0===t&&(t=0),this.heightIndex=function(t,e){if(!t)return new Uint32Array(e);if(t.length===e)return t;if(e>t.length){var i=new Uint32Array(e);return i.set(t),i}return t.subarray(0,e)}(this.heightIndex,this.cells.length),this.totalHeight=function(t,e,i){for(var n=t[i],r=i;r<t.length;r++)t[r]=n,n+=e[r].height;return n}(this.heightIndex,this.cells,t),this.indexDirty=1/0},t.prototype.enableScrollEvents=function(t){var e=this;this.rmEvent&&(this.rmEvent(),this.rmEvent=void 0);var i=this.scrollEl;i&&(this.isEnabled=t,i.addEventListener("scroll",this.onScroll),this.rmEvent=function(){i.removeEventListener("scroll",e.onScroll)})},t.prototype.renderVirtualNode=function(t){var e=t.cell,i=e.type,n=e.value,r=e.index;switch(i){case s:return this.renderItem(n,r);case l:return this.renderHeader(n,r);case h:return this.renderFooter(n,r)}},t.prototype.render=function(){var t=this;return(0,r.h)(r.H,{style:{height:"".concat(this.totalHeight,"px")}},this.renderItem&&(0,r.h)(p,{dom:this.virtualDom},this.virtualDom.map((function(e){return t.renderVirtualNode(e)}))))},Object.defineProperty(t.prototype,"el",{get:function(){return(0,r.i)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{itemHeight:["itemsChanged"],headerHeight:["itemsChanged"],footerHeight:["itemsChanged"],items:["itemsChanged"]}},enumerable:!1,configurable:!0}),t}(),p=function(t,e,i){var n=t.dom;return i.map(e,(function(t,e){var i=n[e],r=t.vattrs||{},o=r.class||"";return o+="virtual-item ",i.visible||(o+="virtual-loading"),Object.assign(Object.assign({},t),{vattrs:Object.assign(Object.assign({},r),{class:o,style:Object.assign(Object.assign({},r.style),{transform:"translate3d(0,".concat(i.top,"px,0)")})})})}))};d.style="ion-virtual-scroll{display:block;position:relative;width:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-virtual-scroll>.virtual-loading{opacity:0}ion-virtual-scroll>.virtual-item{position:absolute !important;top:0 !important;right:0 !important;left:0 !important;-webkit-transition-duration:0ms;transition-duration:0ms;will-change:transform}"}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLElBQUlDLEVBQUVRLEVBQUVULEdBQU9VLEVBQUVYLEVBQUVrSyxRQUFRLENBQUMsRUFBTXRKLEVBQUVELEVBQUV3SixPQUFPLEdBQTBELE9BQXZEdkosR0FBRyxnQkFBb0JWLEVBQUU0QixVQUFTbEIsR0FBRyxtQkFBeUJnSixPQUFPUSxPQUFPUixPQUFPUSxPQUFPLENBQUMsRUFBRXBLLEdBQUcsQ0FBQ2tLLE9BQU9OLE9BQU9RLE9BQU9SLE9BQU9RLE9BQU8sQ0FBQyxFQUFFekosR0FBRyxDQUFDd0osTUFBTXZKLEVBQUU2RyxNQUFNbUMsT0FBT1EsT0FBT1IsT0FBT1EsT0FBTyxDQUFDLEVBQUV6SixFQUFFOEcsT0FBTyxDQUFDQyxVQUFVLGlCQUFpQkMsT0FBT3pILEVBQUVxRyxJQUFJLGNBQWMsR0FBRyxFQUFFeEUsRUFBYzBGLE1BQW41TSxvWiIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0Bpb25pYy9jb3JlL2Rpc3QvZXNtLWVzNS9pb24tdmlydHVhbC1zY3JvbGwuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0e19fYXdhaXRlcixfX2dlbmVyYXRvcn1mcm9tXCJ0c2xpYlwiO1xuLyohXG4gKiAoQykgSW9uaWMgaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbSAtIE1JVCBMaWNlbnNlXG4gKi9pbXBvcnR7ciBhcyByZWdpc3Rlckluc3RhbmNlLGYgYXMgcmVhZFRhc2ssYyBhcyB3cml0ZVRhc2ssaiBhcyBmb3JjZVVwZGF0ZSxoLEggYXMgSG9zdCxpIGFzIGdldEVsZW1lbnR9ZnJvbVwiLi9pbmRleC04ZTY5MjQ0NS5qc1wiO2ltcG9ydHtjIGFzIGNvbXBvbmVudE9uUmVhZHl9ZnJvbVwiLi9oZWxwZXJzLTNiMzkwZTQ4LmpzXCI7dmFyIENFTExfVFlQRV9JVEVNPVwiaXRlbVwiO3ZhciBDRUxMX1RZUEVfSEVBREVSPVwiaGVhZGVyXCI7dmFyIENFTExfVFlQRV9GT09URVI9XCJmb290ZXJcIjt2YXIgTk9ERV9DSEFOR0VfTk9ORT0wO3ZhciBOT0RFX0NIQU5HRV9QT1NJVElPTj0xO3ZhciBOT0RFX0NIQU5HRV9DRUxMPTI7dmFyIE1JTl9SRUFEUz0yO3ZhciB1cGRhdGVWRG9tPWZ1bmN0aW9uKHQsZSxpLHIpe2Zvcih2YXIgbj0wLG89dDtuPG8ubGVuZ3RoO24rKyl7dmFyIGE9b1tuXTthLmNoYW5nZT1OT0RFX0NIQU5HRV9OT05FO2EuZD10cnVlfXZhciBzPVtdO3ZhciBsPXIub2Zmc2V0K3IubGVuZ3RoO3ZhciBoPWZ1bmN0aW9uKHIpe3ZhciBuPWlbcl07dmFyIG89dC5maW5kKChmdW5jdGlvbih0KXtyZXR1cm4gdC5kJiZ0LmNlbGw9PT1ufSkpO2lmKG8pe3ZhciBhPWVbcl07aWYoYSE9PW8udG9wKXtvLnRvcD1hO28uY2hhbmdlPU5PREVfQ0hBTkdFX1BPU0lUSU9OfW8uZD1mYWxzZX1lbHNle3MucHVzaChuKX19O2Zvcih2YXIgYz1yLm9mZnNldDtjPGw7YysrKXtoKGMpfXZhciB1PXQuZmlsdGVyKChmdW5jdGlvbih0KXtyZXR1cm4gdC5kfSkpO3ZhciBmPWZ1bmN0aW9uKGkpe3ZhciByPXUuZmluZCgoZnVuY3Rpb24odCl7cmV0dXJuIHQuZCYmdC5jZWxsLnR5cGU9PT1pLnR5cGV9KSk7dmFyIG49aS5pO2lmKHIpe3IuZD1mYWxzZTtyLmNoYW5nZT1OT0RFX0NIQU5HRV9DRUxMO3IuY2VsbD1pO3IudG9wPWVbbl19ZWxzZXt0LnB1c2goe2Q6ZmFsc2UsY2VsbDppLHZpc2libGU6dHJ1ZSxjaGFuZ2U6Tk9ERV9DSEFOR0VfQ0VMTCx0b3A6ZVtuXX0pfX07Zm9yKHZhciBkPTAscD1zO2Q8cC5sZW5ndGg7ZCsrKXt2YXIgdj1wW2RdO2Yodil9dC5maWx0ZXIoKGZ1bmN0aW9uKHQpe3JldHVybiB0LmQmJnQudG9wIT09LTk5OTl9KSkuZm9yRWFjaCgoZnVuY3Rpb24odCl7dC5jaGFuZ2U9Tk9ERV9DSEFOR0VfUE9TSVRJT047dC50b3A9LTk5OTl9KSl9O3ZhciBkb1JlbmRlcj1mdW5jdGlvbih0LGUsaSxyKXt2YXIgbjt2YXIgbz1BcnJheS5mcm9tKHQuY2hpbGRyZW4pLmZpbHRlcigoZnVuY3Rpb24odCl7cmV0dXJuIHQudGFnTmFtZSE9PVwiVEVNUExBVEVcIn0pKTt2YXIgYT1vLmxlbmd0aDt2YXIgcztmb3IodmFyIGw9MDtsPGkubGVuZ3RoO2wrKyl7dmFyIGg9aVtsXTt2YXIgYz1oLmNlbGw7aWYoaC5jaGFuZ2U9PT1OT0RFX0NIQU5HRV9DRUxMKXtpZihsPGEpe3M9b1tsXTtlKHMsYyxsKX1lbHNle3ZhciB1PWNyZWF0ZU5vZGUodCxjLnR5cGUpO3M9KG49ZSh1LGMsbCkpIT09bnVsbCYmbiE9PXZvaWQgMD9uOnU7cy5jbGFzc0xpc3QuYWRkKFwidmlydHVhbC1pdGVtXCIpO3QuYXBwZW5kQ2hpbGQocyl9c1tcIiRpb25DZWxsXCJdPWN9ZWxzZXtzPW9bbF19aWYoaC5jaGFuZ2UhPT1OT0RFX0NIQU5HRV9OT05FKXtzLnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZTNkKDAsXCIuY29uY2F0KGgudG9wLFwicHgsMClcIil9dmFyIGY9Yy52aXNpYmxlO2lmKGgudmlzaWJsZSE9PWYpe2lmKGYpe3MuY2xhc3NMaXN0LnJlbW92ZShcInZpcnR1YWwtbG9hZGluZ1wiKX1lbHNle3MuY2xhc3NMaXN0LmFkZChcInZpcnR1YWwtbG9hZGluZ1wiKX1oLnZpc2libGU9Zn1pZihjLnJlYWRzPjApe3IoYyxzKTtjLnJlYWRzLS19fX07dmFyIGNyZWF0ZU5vZGU9ZnVuY3Rpb24odCxlKXt2YXIgaT1nZXRUZW1wbGF0ZSh0LGUpO2lmKGkmJnQub3duZXJEb2N1bWVudCE9PW51bGwpe3JldHVybiB0Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShpLmNvbnRlbnQsdHJ1ZSkuY2hpbGRyZW5bMF19cmV0dXJuIG51bGx9O3ZhciBnZXRUZW1wbGF0ZT1mdW5jdGlvbih0LGUpe3N3aXRjaChlKXtjYXNlIENFTExfVFlQRV9JVEVNOnJldHVybiB0LnF1ZXJ5U2VsZWN0b3IoXCJ0ZW1wbGF0ZTpub3QoW25hbWVdKVwiKTtjYXNlIENFTExfVFlQRV9IRUFERVI6cmV0dXJuIHQucXVlcnlTZWxlY3RvcihcInRlbXBsYXRlW25hbWU9aGVhZGVyXVwiKTtjYXNlIENFTExfVFlQRV9GT09URVI6cmV0dXJuIHQucXVlcnlTZWxlY3RvcihcInRlbXBsYXRlW25hbWU9Zm9vdGVyXVwiKX19O3ZhciBnZXRWaWV3cG9ydD1mdW5jdGlvbih0LGUsaSl7cmV0dXJue3RvcDpNYXRoLm1heCh0LWksMCksYm90dG9tOnQrZStpfX07dmFyIGdldFJhbmdlPWZ1bmN0aW9uKHQsZSxpKXt2YXIgcj1lLnRvcDt2YXIgbj1lLmJvdHRvbTt2YXIgbz0wO2Zvcig7bzx0Lmxlbmd0aDtvKyspe2lmKHRbb10+cil7YnJlYWt9fXZhciBhPU1hdGgubWF4KG8taS0xLDApO2Zvcig7bzx0Lmxlbmd0aDtvKyspe2lmKHRbb10+PW4pe2JyZWFrfX12YXIgcz1NYXRoLm1pbihvK2ksdC5sZW5ndGgpO3ZhciBsPXMtYTtyZXR1cm57b2Zmc2V0OmEsbGVuZ3RoOmx9fTt2YXIgZ2V0U2hvdWxkVXBkYXRlPWZ1bmN0aW9uKHQsZSxpKXt2YXIgcj1pLm9mZnNldCtpLmxlbmd0aDtyZXR1cm4gdDw9cnx8ZS5vZmZzZXQhPT1pLm9mZnNldHx8ZS5sZW5ndGghPT1pLmxlbmd0aH07dmFyIGZpbmRDZWxsSW5kZXg9ZnVuY3Rpb24odCxlKXt2YXIgaT10Lmxlbmd0aD4wP3RbdC5sZW5ndGgtMV0uaW5kZXg6MDtpZihlPT09MCl7cmV0dXJuIDB9ZWxzZSBpZihlPT09aSsxKXtyZXR1cm4gdC5sZW5ndGh9ZWxzZXtyZXR1cm4gdC5maW5kSW5kZXgoKGZ1bmN0aW9uKHQpe3JldHVybiB0LmluZGV4PT09ZX0pKX19O3ZhciBpbnBsYWNlVXBkYXRlPWZ1bmN0aW9uKHQsZSxpKXtpZihpPT09MCYmZS5sZW5ndGg+PXQubGVuZ3RoKXtyZXR1cm4gZX1mb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl7dFtyK2ldPWVbcl19cmV0dXJuIHR9O3ZhciBjYWxjQ2VsbHM9ZnVuY3Rpb24odCxlLGkscixuLG8sYSxzLGwsaCxjLHUpe3ZhciBmPVtdO3ZhciBkPXUrYztmb3IodmFyIHA9YztwPGQ7cCsrKXt2YXIgdj10W3BdO2lmKG4pe3ZhciBnPW4odixwLHQpO2lmKGchPW51bGwpe2YucHVzaCh7aTpoKyssdHlwZTpDRUxMX1RZUEVfSEVBREVSLHZhbHVlOmcsaW5kZXg6cCxoZWlnaHQ6aT9pKGcscCk6YSxyZWFkczppPzA6TUlOX1JFQURTLHZpc2libGU6ISFpfSl9fWYucHVzaCh7aTpoKyssdHlwZTpDRUxMX1RZUEVfSVRFTSx2YWx1ZTp2LGluZGV4OnAsaGVpZ2h0OmU/ZSh2LHApOmwscmVhZHM6ZT8wOk1JTl9SRUFEUyx2aXNpYmxlOiEhZX0pO2lmKG8pe3ZhciBnPW8odixwLHQpO2lmKGchPW51bGwpe2YucHVzaCh7aTpoKyssdHlwZTpDRUxMX1RZUEVfRk9PVEVSLHZhbHVlOmcsaW5kZXg6cCxoZWlnaHQ6cj9yKGcscCk6cyxyZWFkczpyPzA6TUlOX1JFQURTLHZpc2libGU6ISFyfSl9fX1yZXR1cm4gZn07dmFyIGNhbGNIZWlnaHRJbmRleD1mdW5jdGlvbih0LGUsaSl7dmFyIHI9dFtpXTtmb3IodmFyIG49aTtuPHQubGVuZ3RoO24rKyl7dFtuXT1yO3IrPWVbbl0uaGVpZ2h0fXJldHVybiByfTt2YXIgcmVzaXplQnVmZmVyPWZ1bmN0aW9uKHQsZSl7aWYoIXQpe3JldHVybiBuZXcgVWludDMyQXJyYXkoZSl9aWYodC5sZW5ndGg9PT1lKXtyZXR1cm4gdH1lbHNlIGlmKGU+dC5sZW5ndGgpe3ZhciBpPW5ldyBVaW50MzJBcnJheShlKTtpLnNldCh0KTtyZXR1cm4gaX1lbHNle3JldHVybiB0LnN1YmFycmF5KDAsZSl9fTt2YXIgcG9zaXRpb25Gb3JJbmRleD1mdW5jdGlvbih0LGUsaSl7dmFyIHI9ZS5maW5kKChmdW5jdGlvbihlKXtyZXR1cm4gZS50eXBlPT09Q0VMTF9UWVBFX0lURU0mJmUuaW5kZXg9PT10fSkpO2lmKHIpe3JldHVybiBpW3IuaV19cmV0dXJuLTF9O3ZhciB2aXJ0dWFsU2Nyb2xsQ3NzPVwiaW9uLXZpcnR1YWwtc2Nyb2xse2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtjb250YWluOnN0cmljdDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9aW9uLXZpcnR1YWwtc2Nyb2xsPi52aXJ0dWFsLWxvYWRpbmd7b3BhY2l0eTowfWlvbi12aXJ0dWFsLXNjcm9sbD4udmlydHVhbC1pdGVte3Bvc2l0aW9uOmFic29sdXRlICFpbXBvcnRhbnQ7dG9wOjAgIWltcG9ydGFudDtyaWdodDowICFpbXBvcnRhbnQ7bGVmdDowICFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOjBtczt0cmFuc2l0aW9uLWR1cmF0aW9uOjBtczt3aWxsLWNoYW5nZTp0cmFuc2Zvcm19XCI7dmFyIFZpcnR1YWxTY3JvbGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQpe3ZhciBlPXRoaXM7cmVnaXN0ZXJJbnN0YW5jZSh0aGlzLHQpO3RoaXMucmFuZ2U9e29mZnNldDowLGxlbmd0aDowfTt0aGlzLnZpZXdwb3J0SGVpZ2h0PTA7dGhpcy5jZWxscz1bXTt0aGlzLnZpcnR1YWxEb209W107dGhpcy5pc0VuYWJsZWQ9ZmFsc2U7dGhpcy52aWV3cG9ydE9mZnNldD0wO3RoaXMuY3VycmVudFNjcm9sbFRvcD0wO3RoaXMuaW5kZXhEaXJ0eT0wO3RoaXMubGFzdEl0ZW1MZW49MDt0aGlzLnRvdGFsSGVpZ2h0PTA7dGhpcy5hcHByb3hJdGVtSGVpZ2h0PTQ1O3RoaXMuYXBwcm94SGVhZGVySGVpZ2h0PTMwO3RoaXMuYXBwcm94Rm9vdGVySGVpZ2h0PTMwO3RoaXMub25TY3JvbGw9ZnVuY3Rpb24oKXtlLnVwZGF0ZVZpcnR1YWxTY3JvbGwoKX19dC5wcm90b3R5cGUuaXRlbXNDaGFuZ2VkPWZ1bmN0aW9uKCl7dGhpcy5jYWxjQ2VsbHMoKTt0aGlzLnVwZGF0ZVZpcnR1YWxTY3JvbGwoKX07dC5wcm90b3R5cGUuY29tcG9uZW50V2lsbExvYWQ9ZnVuY3Rpb24oKXtjb25zb2xlLndhcm4oXCJbRGVwcmVjYXRpb24gV2FybmluZ106IGlvbi12aXJ0dWFsLXNjcm9sbCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gSW9uaWMgRnJhbWV3b3JrIHY3LjAuIFNlZSBodHRwczovL2lvbmljZnJhbWV3b3JrLmNvbS9kb2NzL2FuZ3VsYXIvdmlydHVhbC1zY3JvbGwgZm9yIG1pZ3JhdGlvbiBzdGVwcy5cIil9O3QucHJvdG90eXBlLmNvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKCl7cmV0dXJuIF9fYXdhaXRlcih0aGlzLHZvaWQgMCx2b2lkIDAsKGZ1bmN0aW9uKCl7dmFyIHQsZTtyZXR1cm4gX19nZW5lcmF0b3IodGhpcywoZnVuY3Rpb24oaSl7c3dpdGNoKGkubGFiZWwpe2Nhc2UgMDp0PXRoaXMuZWwuY2xvc2VzdChcImlvbi1jb250ZW50XCIpO2lmKCF0KXtjb25zb2xlLmVycm9yKFwiPGlvbi12aXJ0dWFsLXNjcm9sbD4gbXVzdCBiZSB1c2VkIGluc2lkZSBhbiA8aW9uLWNvbnRlbnQ+XCIpO3JldHVyblsyXX1lPXRoaXM7cmV0dXJuWzQsdC5nZXRTY3JvbGxFbGVtZW50KCldO2Nhc2UgMTplLnNjcm9sbEVsPWkuc2VudCgpO3RoaXMuY29udGVudEVsPXQ7dGhpcy5jYWxjQ2VsbHMoKTt0aGlzLnVwZGF0ZVN0YXRlKCk7cmV0dXJuWzJdfX0pKX0pKX07dC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy51cGRhdGVTdGF0ZSgpfTt0LnByb3RvdHlwZS5kaXNjb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbigpe3RoaXMuc2Nyb2xsRWw9dW5kZWZpbmVkfTt0LnByb3RvdHlwZS5vblJlc2l6ZT1mdW5jdGlvbigpe3RoaXMuY2FsY0NlbGxzKCk7dGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsKCl9O3QucHJvdG90eXBlLnBvc2l0aW9uRm9ySXRlbT1mdW5jdGlvbih0KXtyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvc2l0aW9uRm9ySW5kZXgodCx0aGlzLmNlbGxzLHRoaXMuZ2V0SGVpZ2h0SW5kZXgoKSkpfTt0LnByb3RvdHlwZS5jaGVja1JhbmdlPWZ1bmN0aW9uKHQsZSl7aWYoZT09PXZvaWQgMCl7ZT0tMX1yZXR1cm4gX19hd2FpdGVyKHRoaXMsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24oKXt2YXIgaSxyLG47cmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsKGZ1bmN0aW9uKG8pe2lmKCF0aGlzLml0ZW1zKXtyZXR1cm5bMl19aT1lPT09LTE/dGhpcy5pdGVtcy5sZW5ndGgtdDplO3I9ZmluZENlbGxJbmRleCh0aGlzLmNlbGxzLHQpO249Y2FsY0NlbGxzKHRoaXMuaXRlbXMsdGhpcy5pdGVtSGVpZ2h0LHRoaXMuaGVhZGVySGVpZ2h0LHRoaXMuZm9vdGVySGVpZ2h0LHRoaXMuaGVhZGVyRm4sdGhpcy5mb290ZXJGbix0aGlzLmFwcHJveEhlYWRlckhlaWdodCx0aGlzLmFwcHJveEZvb3RlckhlaWdodCx0aGlzLmFwcHJveEl0ZW1IZWlnaHQscix0LGkpO3RoaXMuY2VsbHM9aW5wbGFjZVVwZGF0ZSh0aGlzLmNlbGxzLG4scik7dGhpcy5sYXN0SXRlbUxlbj10aGlzLml0ZW1zLmxlbmd0aDt0aGlzLmluZGV4RGlydHk9TWF0aC5tYXgodC0xLDApO3RoaXMuc2NoZWR1bGVVcGRhdGUoKTtyZXR1cm5bMl19KSl9KSl9O3QucHJvdG90eXBlLmNoZWNrRW5kPWZ1bmN0aW9uKCl7cmV0dXJuIF9fYXdhaXRlcih0aGlzLHZvaWQgMCx2b2lkIDAsKGZ1bmN0aW9uKCl7cmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsKGZ1bmN0aW9uKHQpe2lmKHRoaXMuaXRlbXMpe3RoaXMuY2hlY2tSYW5nZSh0aGlzLmxhc3RJdGVtTGVuKX1yZXR1cm5bMl19KSl9KSl9O3QucHJvdG90eXBlLnVwZGF0ZVZpcnR1YWxTY3JvbGw9ZnVuY3Rpb24oKXtpZighdGhpcy5pc0VuYWJsZWR8fCF0aGlzLnNjcm9sbEVsKXtyZXR1cm59aWYodGhpcy50aW1lclVwZGF0ZSl7Y2xlYXJUaW1lb3V0KHRoaXMudGltZXJVcGRhdGUpO3RoaXMudGltZXJVcGRhdGU9dW5kZWZpbmVkfXJlYWRUYXNrKHRoaXMucmVhZFZTLmJpbmQodGhpcykpO3dyaXRlVGFzayh0aGlzLndyaXRlVlMuYmluZCh0aGlzKSl9O3QucHJvdG90eXBlLnJlYWRWUz1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LmNvbnRlbnRFbCxpPXQuc2Nyb2xsRWwscj10LmVsO3ZhciBuPTA7dmFyIG89cjt3aGlsZShvIT09bnVsbCYmbyE9PWUpe24rPW8ub2Zmc2V0VG9wO289by5vZmZzZXRQYXJlbnR9dGhpcy52aWV3cG9ydE9mZnNldD1uO2lmKGkpe3RoaXMudmlld3BvcnRIZWlnaHQ9aS5vZmZzZXRIZWlnaHQ7dGhpcy5jdXJyZW50U2Nyb2xsVG9wPWkuc2Nyb2xsVG9wfX07dC5wcm90b3R5cGUud3JpdGVWUz1mdW5jdGlvbigpe3ZhciB0PXRoaXMuaW5kZXhEaXJ0eTt2YXIgZT10aGlzLmN1cnJlbnRTY3JvbGxUb3AtdGhpcy52aWV3cG9ydE9mZnNldDt2YXIgaT1nZXRWaWV3cG9ydChlLHRoaXMudmlld3BvcnRIZWlnaHQsMTAwKTt2YXIgcj10aGlzLmdldEhlaWdodEluZGV4KCk7dmFyIG49Z2V0UmFuZ2UocixpLDIpO3ZhciBvPWdldFNob3VsZFVwZGF0ZSh0LHRoaXMucmFuZ2Usbik7aWYoIW8pe3JldHVybn10aGlzLnJhbmdlPW47dXBkYXRlVkRvbSh0aGlzLnZpcnR1YWxEb20scix0aGlzLmNlbGxzLG4pO2lmKHRoaXMubm9kZVJlbmRlcil7ZG9SZW5kZXIodGhpcy5lbCx0aGlzLm5vZGVSZW5kZXIsdGhpcy52aXJ0dWFsRG9tLHRoaXMudXBkYXRlQ2VsbEhlaWdodC5iaW5kKHRoaXMpKX1lbHNlIGlmKHRoaXMuZG9tUmVuZGVyKXt0aGlzLmRvbVJlbmRlcih0aGlzLnZpcnR1YWxEb20pfWVsc2UgaWYodGhpcy5yZW5kZXJJdGVtKXtmb3JjZVVwZGF0ZSh0aGlzKX19O3QucHJvdG90eXBlLnVwZGF0ZUNlbGxIZWlnaHQ9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzO3ZhciByPWZ1bmN0aW9uKCl7aWYoZVtcIiRpb25DZWxsXCJdPT09dCl7dmFyIHI9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZSk7dmFyIG49ZS5vZmZzZXRIZWlnaHQrcGFyc2VGbG9hdChyLmdldFByb3BlcnR5VmFsdWUoXCJtYXJnaW4tYm90dG9tXCIpKTtpLnNldENlbGxIZWlnaHQodCxuKX19O2lmKGUpe2NvbXBvbmVudE9uUmVhZHkoZSxyKX1lbHNle3IoKX19O3QucHJvdG90eXBlLnNldENlbGxIZWlnaHQ9ZnVuY3Rpb24odCxlKXt2YXIgaT10Lmk7aWYodCE9PXRoaXMuY2VsbHNbaV0pe3JldHVybn1pZih0LmhlaWdodCE9PWV8fHQudmlzaWJsZSE9PXRydWUpe3QudmlzaWJsZT10cnVlO3QuaGVpZ2h0PWU7dGhpcy5pbmRleERpcnR5PU1hdGgubWluKHRoaXMuaW5kZXhEaXJ0eSxpKTt0aGlzLnNjaGVkdWxlVXBkYXRlKCl9fTt0LnByb3RvdHlwZS5zY2hlZHVsZVVwZGF0ZT1mdW5jdGlvbigpe3ZhciB0PXRoaXM7Y2xlYXJUaW1lb3V0KHRoaXMudGltZXJVcGRhdGUpO3RoaXMudGltZXJVcGRhdGU9c2V0VGltZW91dCgoZnVuY3Rpb24oKXtyZXR1cm4gdC51cGRhdGVWaXJ0dWFsU2Nyb2xsKCl9KSwxMDApfTt0LnByb3RvdHlwZS51cGRhdGVTdGF0ZT1mdW5jdGlvbigpe3ZhciB0PSEhKHRoaXMuc2Nyb2xsRWwmJnRoaXMuY2VsbHMubGVuZ3RoPjApO2lmKHQhPT10aGlzLmlzRW5hYmxlZCl7dGhpcy5lbmFibGVTY3JvbGxFdmVudHModCk7aWYodCl7dGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsKCl9fX07dC5wcm90b3R5cGUuY2FsY0NlbGxzPWZ1bmN0aW9uKCl7aWYoIXRoaXMuaXRlbXMpe3JldHVybn10aGlzLmxhc3RJdGVtTGVuPXRoaXMuaXRlbXMubGVuZ3RoO3RoaXMuY2VsbHM9Y2FsY0NlbGxzKHRoaXMuaXRlbXMsdGhpcy5pdGVtSGVpZ2h0LHRoaXMuaGVhZGVySGVpZ2h0LHRoaXMuZm9vdGVySGVpZ2h0LHRoaXMuaGVhZGVyRm4sdGhpcy5mb290ZXJGbix0aGlzLmFwcHJveEhlYWRlckhlaWdodCx0aGlzLmFwcHJveEZvb3RlckhlaWdodCx0aGlzLmFwcHJveEl0ZW1IZWlnaHQsMCwwLHRoaXMubGFzdEl0ZW1MZW4pO3RoaXMuaW5kZXhEaXJ0eT0wfTt0LnByb3RvdHlwZS5nZXRIZWlnaHRJbmRleD1mdW5jdGlvbigpe2lmKHRoaXMuaW5kZXhEaXJ0eSE9PUluZmluaXR5KXt0aGlzLmNhbGNIZWlnaHRJbmRleCh0aGlzLmluZGV4RGlydHkpfXJldHVybiB0aGlzLmhlaWdodEluZGV4fTt0LnByb3RvdHlwZS5jYWxjSGVpZ2h0SW5kZXg9ZnVuY3Rpb24odCl7aWYodD09PXZvaWQgMCl7dD0wfXRoaXMuaGVpZ2h0SW5kZXg9cmVzaXplQnVmZmVyKHRoaXMuaGVpZ2h0SW5kZXgsdGhpcy5jZWxscy5sZW5ndGgpO3RoaXMudG90YWxIZWlnaHQ9Y2FsY0hlaWdodEluZGV4KHRoaXMuaGVpZ2h0SW5kZXgsdGhpcy5jZWxscyx0KTt0aGlzLmluZGV4RGlydHk9SW5maW5pdHl9O3QucHJvdG90eXBlLmVuYWJsZVNjcm9sbEV2ZW50cz1mdW5jdGlvbih0KXt2YXIgZT10aGlzO2lmKHRoaXMucm1FdmVudCl7dGhpcy5ybUV2ZW50KCk7dGhpcy5ybUV2ZW50PXVuZGVmaW5lZH12YXIgaT10aGlzLnNjcm9sbEVsO2lmKGkpe3RoaXMuaXNFbmFibGVkPXQ7aS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbCk7dGhpcy5ybUV2ZW50PWZ1bmN0aW9uKCl7aS5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsZS5vblNjcm9sbCl9fX07dC5wcm90b3R5cGUucmVuZGVyVmlydHVhbE5vZGU9ZnVuY3Rpb24odCl7dmFyIGU9dC5jZWxsLGk9ZS50eXBlLHI9ZS52YWx1ZSxuPWUuaW5kZXg7c3dpdGNoKGkpe2Nhc2UgQ0VMTF9UWVBFX0lURU06cmV0dXJuIHRoaXMucmVuZGVySXRlbShyLG4pO2Nhc2UgQ0VMTF9UWVBFX0hFQURFUjpyZXR1cm4gdGhpcy5yZW5kZXJIZWFkZXIocixuKTtjYXNlIENFTExfVFlQRV9GT09URVI6cmV0dXJuIHRoaXMucmVuZGVyRm9vdGVyKHIsbil9fTt0LnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3JldHVybiBoKEhvc3Qse3N0eWxlOntoZWlnaHQ6XCJcIi5jb25jYXQodGhpcy50b3RhbEhlaWdodCxcInB4XCIpfX0sdGhpcy5yZW5kZXJJdGVtJiZoKFZpcnR1YWxQcm94eSx7ZG9tOnRoaXMudmlydHVhbERvbX0sdGhpcy52aXJ0dWFsRG9tLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIHQucmVuZGVyVmlydHVhbE5vZGUoZSl9KSkpKX07T2JqZWN0LmRlZmluZVByb3BlcnR5KHQucHJvdG90eXBlLFwiZWxcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGdldEVsZW1lbnQodGhpcyl9LGVudW1lcmFibGU6ZmFsc2UsY29uZmlndXJhYmxlOnRydWV9KTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIndhdGNoZXJzXCIse2dldDpmdW5jdGlvbigpe3JldHVybntpdGVtSGVpZ2h0OltcIml0ZW1zQ2hhbmdlZFwiXSxoZWFkZXJIZWlnaHQ6W1wiaXRlbXNDaGFuZ2VkXCJdLGZvb3RlckhlaWdodDpbXCJpdGVtc0NoYW5nZWRcIl0saXRlbXM6W1wiaXRlbXNDaGFuZ2VkXCJdfX0sZW51bWVyYWJsZTpmYWxzZSxjb25maWd1cmFibGU6dHJ1ZX0pO3JldHVybiB0fSgpO3ZhciBWaXJ0dWFsUHJveHk9ZnVuY3Rpb24odCxlLGkpe3ZhciByPXQuZG9tO3JldHVybiBpLm1hcChlLChmdW5jdGlvbih0LGUpe3ZhciBpPXJbZV07dmFyIG49dC52YXR0cnN8fHt9O3ZhciBvPW4uY2xhc3N8fFwiXCI7bys9XCJ2aXJ0dWFsLWl0ZW0gXCI7aWYoIWkudmlzaWJsZSl7bys9XCJ2aXJ0dWFsLWxvYWRpbmdcIn1yZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LHQpLHt2YXR0cnM6T2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LG4pLHtjbGFzczpvLHN0eWxlOk9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSxuLnN0eWxlKSx7dHJhbnNmb3JtOlwidHJhbnNsYXRlM2QoMCxcIi5jb25jYXQoaS50b3AsXCJweCwwKVwiKX0pfSl9KX0pKX07VmlydHVhbFNjcm9sbC5zdHlsZT12aXJ0dWFsU2Nyb2xsQ3NzO2V4cG9ydHtWaXJ0dWFsU2Nyb2xsIGFzIGlvbl92aXJ0dWFsX3Njcm9sbH07Il0sIm5hbWVzIjpbIkNFTExfVFlQRV9JVEVNIiwiQ0VMTF9UWVBFX0hFQURFUiIsIkNFTExfVFlQRV9GT09URVIiLCJjcmVhdGVOb2RlIiwidCIsImUiLCJpIiwiZ2V0VGVtcGxhdGUiLCJvd25lckRvY3VtZW50IiwiaW1wb3J0Tm9kZSIsImNvbnRlbnQiLCJjaGlsZHJlbiIsInF1ZXJ5U2VsZWN0b3IiLCJjYWxjQ2VsbHMiLCJyIiwibiIsIm8iLCJhIiwicyIsImwiLCJoIiwiYyIsInUiLCJmIiwiZCIsInAiLCJnIiwidiIsInB1c2giLCJ0eXBlIiwidmFsdWUiLCJpbmRleCIsImhlaWdodCIsInJlYWRzIiwidmlzaWJsZSIsIlZpcnR1YWxTY3JvbGwiLCJ0aGlzIiwicmVnaXN0ZXJJbnN0YW5jZSIsInJhbmdlIiwib2Zmc2V0IiwibGVuZ3RoIiwidmlld3BvcnRIZWlnaHQiLCJjZWxscyIsInZpcnR1YWxEb20iLCJpc0VuYWJsZWQiLCJ2aWV3cG9ydE9mZnNldCIsImN1cnJlbnRTY3JvbGxUb3AiLCJpbmRleERpcnR5IiwibGFzdEl0ZW1MZW4iLCJ0b3RhbEhlaWdodCIsImFwcHJveEl0ZW1IZWlnaHQiLCJhcHByb3hIZWFkZXJIZWlnaHQiLCJhcHByb3hGb290ZXJIZWlnaHQiLCJvblNjcm9sbCIsInVwZGF0ZVZpcnR1YWxTY3JvbGwiLCJwcm90b3R5cGUiLCJpdGVtc0NoYW5nZWQiLCJjb21wb25lbnRXaWxsTG9hZCIsImNvbnNvbGUiLCJ3YXJuIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJfX2F3YWl0ZXIiLCJfX2dlbmVyYXRvciIsImxhYmVsIiwiZWwiLCJjbG9zZXN0IiwiZ2V0U2Nyb2xsRWxlbWVudCIsImVycm9yIiwic2Nyb2xsRWwiLCJzZW50IiwiY29udGVudEVsIiwidXBkYXRlU3RhdGUiLCJjb21wb25lbnREaWRVcGRhdGUiLCJkaXNjb25uZWN0ZWRDYWxsYmFjayIsInVuZGVmaW5lZCIsIm9uUmVzaXplIiwicG9zaXRpb25Gb3JJdGVtIiwiUHJvbWlzZSIsInJlc29sdmUiLCJmaW5kIiwicG9zaXRpb25Gb3JJbmRleCIsImdldEhlaWdodEluZGV4IiwiY2hlY2tSYW5nZSIsIml0ZW1zIiwiZmluZEluZGV4IiwiZmluZENlbGxJbmRleCIsIml0ZW1IZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJmb290ZXJIZWlnaHQiLCJoZWFkZXJGbiIsImZvb3RlckZuIiwiaW5wbGFjZVVwZGF0ZSIsIk1hdGgiLCJtYXgiLCJzY2hlZHVsZVVwZGF0ZSIsImNoZWNrRW5kIiwidGltZXJVcGRhdGUiLCJjbGVhclRpbWVvdXQiLCJyZWFkVGFzayIsInJlYWRWUyIsImJpbmQiLCJ3cml0ZVRhc2siLCJ3cml0ZVZTIiwib2Zmc2V0VG9wIiwib2Zmc2V0UGFyZW50Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsVG9wIiwidG9wIiwiYm90dG9tIiwiZ2V0Vmlld3BvcnQiLCJtaW4iLCJnZXRSYW5nZSIsImdldFNob3VsZFVwZGF0ZSIsImNoYW5nZSIsImNlbGwiLCJmaWx0ZXIiLCJmb3JFYWNoIiwidXBkYXRlVkRvbSIsIm5vZGVSZW5kZXIiLCJBcnJheSIsImZyb20iLCJ0YWdOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsInRyYW5zZm9ybSIsImNvbmNhdCIsInJlbW92ZSIsImRvUmVuZGVyIiwidXBkYXRlQ2VsbEhlaWdodCIsImRvbVJlbmRlciIsInJlbmRlckl0ZW0iLCJmb3JjZVVwZGF0ZSIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJwYXJzZUZsb2F0IiwiZ2V0UHJvcGVydHlWYWx1ZSIsInNldENlbGxIZWlnaHQiLCJjb21wb25lbnRPblJlYWR5Iiwic2V0VGltZW91dCIsImVuYWJsZVNjcm9sbEV2ZW50cyIsIkluZmluaXR5IiwiY2FsY0hlaWdodEluZGV4IiwiaGVpZ2h0SW5kZXgiLCJVaW50MzJBcnJheSIsInNldCIsInN1YmFycmF5IiwicmVzaXplQnVmZmVyIiwicm1FdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyVmlydHVhbE5vZGUiLCJyZW5kZXJIZWFkZXIiLCJyZW5kZXJGb290ZXIiLCJyZW5kZXIiLCJIb3N0IiwiVmlydHVhbFByb3h5IiwiZG9tIiwibWFwIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJnZXRFbGVtZW50IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInZhdHRycyIsImNsYXNzIiwiYXNzaWduIl0sInNvdXJjZVJvb3QiOiIifQ==