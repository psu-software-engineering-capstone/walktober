"use strict";(self.webpackChunkwalktober=self.webpackChunkwalktober||[]).push([[9773],{9773:function(e,i,t){t.r(i),t.d(i,{ion_split_pane:function(){return a}});var s=t(3431),r=t(1205),n=t(3878),o="split-pane-main",d="split-pane-side",l={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",never:""},a=function(){function e(e){(0,r.r)(this,e),this.ionSplitPaneVisible=(0,r.e)(this,"ionSplitPaneVisible",7),this.visible=!1,this.disabled=!1,this.when=l.lg}return e.prototype.visibleChanged=function(e){var i={visible:e,isPane:this.isPane.bind(this)};this.ionSplitPaneVisible.emit(i)},e.prototype.connectedCallback=function(){return(0,s.mG)(this,void 0,void 0,(function(){return(0,s.Jh)(this,(function(e){switch(e.label){case 0:return"undefined"===typeof customElements?[3,2]:[4,customElements.whenDefined("ion-split-pane")];case 1:e.sent(),e.label=2;case 2:return this.styleChildren(),this.updateState(),[2]}}))}))},e.prototype.disconnectedCallback=function(){this.rmL&&(this.rmL(),this.rmL=void 0)},e.prototype.updateState=function(){var e=this;if(this.rmL&&(this.rmL(),this.rmL=void 0),this.disabled)this.visible=!1;else{var i=this.when;if("boolean"!==typeof i){var t=l[i]||i;if(0!==t.length){if(window.matchMedia){var s=function(i){e.visible=i.matches},r=window.matchMedia(t);r.addListener(s),this.rmL=function(){return r.removeListener(s)},this.visible=r.matches}}else this.visible=!1}else this.visible=i}},e.prototype.isPane=function(e){return!!this.visible&&(e.parentElement===this.el&&e.classList.contains(d))},e.prototype.styleChildren=function(){for(var e=this.contentId,i=this.el.children,t=this.el.childElementCount,s=!1,r=0;r<t;r++){var n=i[r],o=void 0!==e&&n.id===e;if(o){if(s)return void console.warn("split pane cannot have more than one main node");s=!0}p(n,o)}s||console.warn("split pane does not have a specified main node")},e.prototype.render=function(){var e,i=(0,n.b)(this);return(0,r.h)(r.H,{class:(e={},e[i]=!0,e["split-pane-".concat(i)]=!0,e["split-pane-visible"]=this.visible,e)},(0,r.h)("slot",null))},Object.defineProperty(e.prototype,"el",{get:function(){return(0,r.i)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{visible:["visibleChanged"],disabled:["updateState"],when:["updateState"]}},enumerable:!1,configurable:!0}),e}(),p=function(e,i){var t,s;i?(t=o,s=d):(t=d,s=o);var r=e.classList;r.add(t),r.remove(s)};a.style={ios:":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:0.55px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:0;border-right:var(--border);border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:unset;border-right:unset;-webkit-border-start:0;border-inline-start:0;-webkit-border-end:var(--border);border-inline-end:var(--border)}}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:var(--border);border-right:0;border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:unset;border-right:unset;-webkit-border-start:var(--border);border-inline-start:var(--border);-webkit-border-end:0;border-inline-end:0}}",md:":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:0;border-right:var(--border);border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:unset;border-right:unset;-webkit-border-start:0;border-inline-start:0;-webkit-border-end:var(--border);border-inline-end:var(--border)}}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:var(--border);border-right:0;border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:unset;border-right:unset;-webkit-border-start:var(--border);border-inline-start:var(--border);-webkit-border-end:0;border-inline-end:0}}"}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRQyxLQUFLLGlEQUFrRCxFQUFFOUMsRUFBRVEsVUFBVXdDLE9BQU8sV0FBVyxJQUFJaEQsRUFBTVUsR0FBRXVDLEVBQUFBLEVBQUFBLEdBQVcvQyxNQUFNLE9BQU9nRCxFQUFBQSxFQUFBQSxHQUFFQyxFQUFBQSxFQUFLLENBQUNDLE9BQU9wRCxFQUFFLENBQUMsRUFBRUEsRUFBRVUsSUFBRyxFQUFLVixFQUFFLGNBQWNxRCxPQUFPM0MsS0FBSSxFQUFLVixFQUFFLHNCQUFzQkUsS0FBS0csUUFBUUwsS0FBSWtELEVBQUFBLEVBQUFBLEdBQUUsT0FBTyxNQUFNLEVBQUVJLE9BQU9DLGVBQWV2RCxFQUFFUSxVQUFVLEtBQUssQ0FBQ2dELElBQUksV0FBVyxPQUFPQyxFQUFBQSxFQUFBQSxHQUFXdkQsS0FBSyxFQUFFd0QsWUFBVyxFQUFNQyxjQUFhLElBQU9MLE9BQU9DLGVBQWV2RCxFQUFFLFdBQVcsQ0FBQ3dELElBQUksV0FBVyxNQUFNLENBQUNuRCxRQUFRLENBQUMsa0JBQWtCQyxTQUFTLENBQUMsZUFBZUMsS0FBSyxDQUFDLGVBQWUsRUFBRW1ELFlBQVcsRUFBTUMsY0FBYSxJQUFjM0QsQ0FBQyxDQUExbUUsR0FBa25FK0MsRUFBYSxTQUFTL0MsRUFBRVUsR0FBRyxJQUFJZ0IsRUFBTUksRUFBS3BCLEdBQUdnQixFQUFFcEMsRUFBZ0J3QyxFQUFFdkMsSUFBcUJtQyxFQUFFbkMsRUFBZ0J1QyxFQUFFeEMsR0FBZ0IsSUFBSTBDLEVBQUVoQyxFQUFFcUMsVUFBVUwsRUFBRTRCLElBQUlsQyxHQUFHTSxFQUFFNkIsT0FBTy9CLEVBQUUsRUFBRS9CLEVBQVUrRCxNQUFNLENBQUNDLElBQTc4TixtdEVBQWkrTnBFLEdBQTN2Siw0dEUiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9AaW9uaWMvY29yZS9kaXN0L2VzbS1lczUvaW9uLXNwbGl0LXBhbmUuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0e19fYXdhaXRlcixfX2dlbmVyYXRvcn1mcm9tXCJ0c2xpYlwiO1xuLyohXG4gKiAoQykgSW9uaWMgaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbSAtIE1JVCBMaWNlbnNlXG4gKi9pbXBvcnR7ciBhcyByZWdpc3Rlckluc3RhbmNlLGUgYXMgY3JlYXRlRXZlbnQsaCxIIGFzIEhvc3QsaSBhcyBnZXRFbGVtZW50fWZyb21cIi4vaW5kZXgtOGU2OTI0NDUuanNcIjtpbXBvcnR7YiBhcyBnZXRJb25Nb2RlfWZyb21cIi4vaW9uaWMtZ2xvYmFsLWM3NGU0OTUxLmpzXCI7dmFyIHNwbGl0UGFuZUlvc0Nzcz1cIjpob3N0ey0tc2lkZS13aWR0aDoxMDAlO2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlOy1tcy1mbGV4LWRpcmVjdGlvbjpyb3c7ZmxleC1kaXJlY3Rpb246cm93Oy1tcy1mbGV4LXdyYXA6bm93cmFwO2ZsZXgtd3JhcDpub3dyYXA7Y29udGFpbjpzdHJpY3R9OjpzbG90dGVkKGlvbi1tZW51Lm1lbnUtcGFuZS12aXNpYmxlKXstbXMtZmxleDowIDEgYXV0bztmbGV4OjAgMSBhdXRvO3dpZHRoOnZhcigtLXNpZGUtd2lkdGgpO21pbi13aWR0aDp2YXIoLS1zaWRlLW1pbi13aWR0aCk7bWF4LXdpZHRoOnZhcigtLXNpZGUtbWF4LXdpZHRoKX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSksOmhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLW1haW4pe2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO3Bvc2l0aW9uOnJlbGF0aXZlOy13ZWJraXQtYm94LXNoYWRvdzpub25lICFpbXBvcnRhbnQ7Ym94LXNoYWRvdzpub25lICFpbXBvcnRhbnQ7ei1pbmRleDowfTpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1tYWluKXstbXMtZmxleDoxO2ZsZXg6MX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZTpub3QoaW9uLW1lbnUpKSw6aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoaW9uLW1lbnUuc3BsaXQtcGFuZS1zaWRlLm1lbnUtZW5hYmxlZCl7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtbmVnYXRpdmU6MDtmbGV4LXNocmluazowfTo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlOm5vdChpb24tbWVudSkpe2Rpc3BsYXk6bm9uZX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSl7LW1zLWZsZXgtb3JkZXI6LTE7b3JkZXI6LTF9Omhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLXNpZGVbc2lkZT1lbmRdKXstbXMtZmxleC1vcmRlcjoxO29yZGVyOjF9Omhvc3R7LS1ib3JkZXI6MC41NXB4IHNvbGlkIHZhcigtLWlvbi1pdGVtLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjUwLCAjYzhjN2NjKSkpOy0tc2lkZS1taW4td2lkdGg6MjcwcHg7LS1zaWRlLW1heC13aWR0aDoyOCV9Omhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLXNpZGUpe2JvcmRlci1sZWZ0OjA7Ym9yZGVyLXJpZ2h0OnZhcigtLWJvcmRlcik7Ym9yZGVyLXRvcDowO2JvcmRlci1ib3R0b206MDttaW4td2lkdGg6dmFyKC0tc2lkZS1taW4td2lkdGgpO21heC13aWR0aDp2YXIoLS1zaWRlLW1heC13aWR0aCl9QHN1cHBvcnRzICgoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApIG9yIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXs6aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSl7Ym9yZGVyLWxlZnQ6dW5zZXQ7Ym9yZGVyLXJpZ2h0OnVuc2V0Oy13ZWJraXQtYm9yZGVyLXN0YXJ0OjA7Ym9yZGVyLWlubGluZS1zdGFydDowOy13ZWJraXQtYm9yZGVyLWVuZDp2YXIoLS1ib3JkZXIpO2JvcmRlci1pbmxpbmUtZW5kOnZhcigtLWJvcmRlcil9fTpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlW3NpZGU9ZW5kXSl7Ym9yZGVyLWxlZnQ6dmFyKC0tYm9yZGVyKTtib3JkZXItcmlnaHQ6MDtib3JkZXItdG9wOjA7Ym9yZGVyLWJvdHRvbTowO21pbi13aWR0aDp2YXIoLS1zaWRlLW1pbi13aWR0aCk7bWF4LXdpZHRoOnZhcigtLXNpZGUtbWF4LXdpZHRoKX1Ac3VwcG9ydHMgKCgtd2Via2l0LW1hcmdpbi1zdGFydDogMCkgb3IgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApezpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlW3NpZGU9ZW5kXSl7Ym9yZGVyLWxlZnQ6dW5zZXQ7Ym9yZGVyLXJpZ2h0OnVuc2V0Oy13ZWJraXQtYm9yZGVyLXN0YXJ0OnZhcigtLWJvcmRlcik7Ym9yZGVyLWlubGluZS1zdGFydDp2YXIoLS1ib3JkZXIpOy13ZWJraXQtYm9yZGVyLWVuZDowO2JvcmRlci1pbmxpbmUtZW5kOjB9fVwiO3ZhciBzcGxpdFBhbmVNZENzcz1cIjpob3N0ey0tc2lkZS13aWR0aDoxMDAlO2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlOy1tcy1mbGV4LWRpcmVjdGlvbjpyb3c7ZmxleC1kaXJlY3Rpb246cm93Oy1tcy1mbGV4LXdyYXA6bm93cmFwO2ZsZXgtd3JhcDpub3dyYXA7Y29udGFpbjpzdHJpY3R9OjpzbG90dGVkKGlvbi1tZW51Lm1lbnUtcGFuZS12aXNpYmxlKXstbXMtZmxleDowIDEgYXV0bztmbGV4OjAgMSBhdXRvO3dpZHRoOnZhcigtLXNpZGUtd2lkdGgpO21pbi13aWR0aDp2YXIoLS1zaWRlLW1pbi13aWR0aCk7bWF4LXdpZHRoOnZhcigtLXNpZGUtbWF4LXdpZHRoKX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSksOmhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLW1haW4pe2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO3Bvc2l0aW9uOnJlbGF0aXZlOy13ZWJraXQtYm94LXNoYWRvdzpub25lICFpbXBvcnRhbnQ7Ym94LXNoYWRvdzpub25lICFpbXBvcnRhbnQ7ei1pbmRleDowfTpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1tYWluKXstbXMtZmxleDoxO2ZsZXg6MX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZTpub3QoaW9uLW1lbnUpKSw6aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoaW9uLW1lbnUuc3BsaXQtcGFuZS1zaWRlLm1lbnUtZW5hYmxlZCl7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtbmVnYXRpdmU6MDtmbGV4LXNocmluazowfTo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlOm5vdChpb24tbWVudSkpe2Rpc3BsYXk6bm9uZX06aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSl7LW1zLWZsZXgtb3JkZXI6LTE7b3JkZXI6LTF9Omhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLXNpZGVbc2lkZT1lbmRdKXstbXMtZmxleC1vcmRlcjoxO29yZGVyOjF9Omhvc3R7LS1ib3JkZXI6MXB4IHNvbGlkIHZhcigtLWlvbi1pdGVtLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTUwLCByZ2JhKDAsIDAsIDAsIDAuMTMpKSkpOy0tc2lkZS1taW4td2lkdGg6MjcwcHg7LS1zaWRlLW1heC13aWR0aDoyOCV9Omhvc3QoLnNwbGl0LXBhbmUtdmlzaWJsZSkgOjpzbG90dGVkKC5zcGxpdC1wYW5lLXNpZGUpe2JvcmRlci1sZWZ0OjA7Ym9yZGVyLXJpZ2h0OnZhcigtLWJvcmRlcik7Ym9yZGVyLXRvcDowO2JvcmRlci1ib3R0b206MDttaW4td2lkdGg6dmFyKC0tc2lkZS1taW4td2lkdGgpO21heC13aWR0aDp2YXIoLS1zaWRlLW1heC13aWR0aCl9QHN1cHBvcnRzICgoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApIG9yIChtYXJnaW4taW5saW5lLXN0YXJ0OiAwKSkgb3IgKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKXs6aG9zdCguc3BsaXQtcGFuZS12aXNpYmxlKSA6OnNsb3R0ZWQoLnNwbGl0LXBhbmUtc2lkZSl7Ym9yZGVyLWxlZnQ6dW5zZXQ7Ym9yZGVyLXJpZ2h0OnVuc2V0Oy13ZWJraXQtYm9yZGVyLXN0YXJ0OjA7Ym9yZGVyLWlubGluZS1zdGFydDowOy13ZWJraXQtYm9yZGVyLWVuZDp2YXIoLS1ib3JkZXIpO2JvcmRlci1pbmxpbmUtZW5kOnZhcigtLWJvcmRlcil9fTpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlW3NpZGU9ZW5kXSl7Ym9yZGVyLWxlZnQ6dmFyKC0tYm9yZGVyKTtib3JkZXItcmlnaHQ6MDtib3JkZXItdG9wOjA7Ym9yZGVyLWJvdHRvbTowO21pbi13aWR0aDp2YXIoLS1zaWRlLW1pbi13aWR0aCk7bWF4LXdpZHRoOnZhcigtLXNpZGUtbWF4LXdpZHRoKX1Ac3VwcG9ydHMgKCgtd2Via2l0LW1hcmdpbi1zdGFydDogMCkgb3IgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApezpob3N0KC5zcGxpdC1wYW5lLXZpc2libGUpIDo6c2xvdHRlZCguc3BsaXQtcGFuZS1zaWRlW3NpZGU9ZW5kXSl7Ym9yZGVyLWxlZnQ6dW5zZXQ7Ym9yZGVyLXJpZ2h0OnVuc2V0Oy13ZWJraXQtYm9yZGVyLXN0YXJ0OnZhcigtLWJvcmRlcik7Ym9yZGVyLWlubGluZS1zdGFydDp2YXIoLS1ib3JkZXIpOy13ZWJraXQtYm9yZGVyLWVuZDowO2JvcmRlci1pbmxpbmUtZW5kOjB9fVwiO3ZhciBTUExJVF9QQU5FX01BSU49XCJzcGxpdC1wYW5lLW1haW5cIjt2YXIgU1BMSVRfUEFORV9TSURFPVwic3BsaXQtcGFuZS1zaWRlXCI7dmFyIFFVRVJZPXt4czpcIihtaW4td2lkdGg6IDBweClcIixzbTpcIihtaW4td2lkdGg6IDU3NnB4KVwiLG1kOlwiKG1pbi13aWR0aDogNzY4cHgpXCIsbGc6XCIobWluLXdpZHRoOiA5OTJweClcIix4bDpcIihtaW4td2lkdGg6IDEyMDBweClcIixuZXZlcjpcIlwifTt2YXIgU3BsaXRQYW5lPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXtyZWdpc3Rlckluc3RhbmNlKHRoaXMsZSk7dGhpcy5pb25TcGxpdFBhbmVWaXNpYmxlPWNyZWF0ZUV2ZW50KHRoaXMsXCJpb25TcGxpdFBhbmVWaXNpYmxlXCIsNyk7dGhpcy52aXNpYmxlPWZhbHNlO3RoaXMuZGlzYWJsZWQ9ZmFsc2U7dGhpcy53aGVuPVFVRVJZW1wibGdcIl19ZS5wcm90b3R5cGUudmlzaWJsZUNoYW5nZWQ9ZnVuY3Rpb24oZSl7dmFyIHQ9e3Zpc2libGU6ZSxpc1BhbmU6dGhpcy5pc1BhbmUuYmluZCh0aGlzKX07dGhpcy5pb25TcGxpdFBhbmVWaXNpYmxlLmVtaXQodCl9O2UucHJvdG90eXBlLmNvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKCl7cmV0dXJuIF9fYXdhaXRlcih0aGlzLHZvaWQgMCx2b2lkIDAsKGZ1bmN0aW9uKCl7cmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsKGZ1bmN0aW9uKGUpe3N3aXRjaChlLmxhYmVsKXtjYXNlIDA6aWYoISh0eXBlb2YgY3VzdG9tRWxlbWVudHMhPT1cInVuZGVmaW5lZFwiKSlyZXR1cm5bMywyXTtyZXR1cm5bNCxjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZChcImlvbi1zcGxpdC1wYW5lXCIpXTtjYXNlIDE6ZS5zZW50KCk7ZS5sYWJlbD0yO2Nhc2UgMjp0aGlzLnN0eWxlQ2hpbGRyZW4oKTt0aGlzLnVwZGF0ZVN0YXRlKCk7cmV0dXJuWzJdfX0pKX0pKX07ZS5wcm90b3R5cGUuZGlzY29ubmVjdGVkQ2FsbGJhY2s9ZnVuY3Rpb24oKXtpZih0aGlzLnJtTCl7dGhpcy5ybUwoKTt0aGlzLnJtTD11bmRlZmluZWR9fTtlLnByb3RvdHlwZS51cGRhdGVTdGF0ZT1mdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYodGhpcy5ybUwpe3RoaXMucm1MKCk7dGhpcy5ybUw9dW5kZWZpbmVkfWlmKHRoaXMuZGlzYWJsZWQpe3RoaXMudmlzaWJsZT1mYWxzZTtyZXR1cm59dmFyIHQ9dGhpcy53aGVuO2lmKHR5cGVvZiB0PT09XCJib29sZWFuXCIpe3RoaXMudmlzaWJsZT10O3JldHVybn12YXIgaT1RVUVSWVt0XXx8dDtpZihpLmxlbmd0aD09PTApe3RoaXMudmlzaWJsZT1mYWxzZTtyZXR1cm59aWYod2luZG93Lm1hdGNoTWVkaWEpe3ZhciBzPWZ1bmN0aW9uKHQpe2UudmlzaWJsZT10Lm1hdGNoZXN9O3ZhciByPXdpbmRvdy5tYXRjaE1lZGlhKGkpO3IuYWRkTGlzdGVuZXIocyk7dGhpcy5ybUw9ZnVuY3Rpb24oKXtyZXR1cm4gci5yZW1vdmVMaXN0ZW5lcihzKX07dGhpcy52aXNpYmxlPXIubWF0Y2hlc319O2UucHJvdG90eXBlLmlzUGFuZT1mdW5jdGlvbihlKXtpZighdGhpcy52aXNpYmxlKXtyZXR1cm4gZmFsc2V9cmV0dXJuIGUucGFyZW50RWxlbWVudD09PXRoaXMuZWwmJmUuY2xhc3NMaXN0LmNvbnRhaW5zKFNQTElUX1BBTkVfU0lERSl9O2UucHJvdG90eXBlLnN0eWxlQ2hpbGRyZW49ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmNvbnRlbnRJZDt2YXIgdD10aGlzLmVsLmNoaWxkcmVuO3ZhciBpPXRoaXMuZWwuY2hpbGRFbGVtZW50Q291bnQ7dmFyIHM9ZmFsc2U7Zm9yKHZhciByPTA7cjxpO3IrKyl7dmFyIG49dFtyXTt2YXIgbz1lIT09dW5kZWZpbmVkJiZuLmlkPT09ZTtpZihvKXtpZihzKXtjb25zb2xlLndhcm4oXCJzcGxpdCBwYW5lIGNhbm5vdCBoYXZlIG1vcmUgdGhhbiBvbmUgbWFpbiBub2RlXCIpO3JldHVybn1zPXRydWV9c2V0UGFuZUNsYXNzKG4sbyl9aWYoIXMpe2NvbnNvbGUud2FybihcInNwbGl0IHBhbmUgZG9lcyBub3QgaGF2ZSBhIHNwZWNpZmllZCBtYWluIG5vZGVcIil9fTtlLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgZTt2YXIgdD1nZXRJb25Nb2RlKHRoaXMpO3JldHVybiBoKEhvc3Qse2NsYXNzOihlPXt9LGVbdF09dHJ1ZSxlW1wic3BsaXQtcGFuZS1cIi5jb25jYXQodCldPXRydWUsZVtcInNwbGl0LXBhbmUtdmlzaWJsZVwiXT10aGlzLnZpc2libGUsZSl9LGgoXCJzbG90XCIsbnVsbCkpfTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZS5wcm90b3R5cGUsXCJlbFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZ2V0RWxlbWVudCh0aGlzKX0sZW51bWVyYWJsZTpmYWxzZSxjb25maWd1cmFibGU6dHJ1ZX0pO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwid2F0Y2hlcnNcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJue3Zpc2libGU6W1widmlzaWJsZUNoYW5nZWRcIl0sZGlzYWJsZWQ6W1widXBkYXRlU3RhdGVcIl0sd2hlbjpbXCJ1cGRhdGVTdGF0ZVwiXX19LGVudW1lcmFibGU6ZmFsc2UsY29uZmlndXJhYmxlOnRydWV9KTtyZXR1cm4gZX0oKTt2YXIgc2V0UGFuZUNsYXNzPWZ1bmN0aW9uKGUsdCl7dmFyIGk7dmFyIHM7aWYodCl7aT1TUExJVF9QQU5FX01BSU47cz1TUExJVF9QQU5FX1NJREV9ZWxzZXtpPVNQTElUX1BBTkVfU0lERTtzPVNQTElUX1BBTkVfTUFJTn12YXIgcj1lLmNsYXNzTGlzdDtyLmFkZChpKTtyLnJlbW92ZShzKX07U3BsaXRQYW5lLnN0eWxlPXtpb3M6c3BsaXRQYW5lSW9zQ3NzLG1kOnNwbGl0UGFuZU1kQ3NzfTtleHBvcnR7U3BsaXRQYW5lIGFzIGlvbl9zcGxpdF9wYW5lfTsiXSwibmFtZXMiOlsiU1BMSVRfUEFORV9NQUlOIiwiU1BMSVRfUEFORV9TSURFIiwiUVVFUlkiLCJ4cyIsInNtIiwibWQiLCJsZyIsInhsIiwibmV2ZXIiLCJTcGxpdFBhbmUiLCJlIiwicmVnaXN0ZXJJbnN0YW5jZSIsInRoaXMiLCJpb25TcGxpdFBhbmVWaXNpYmxlIiwiY3JlYXRlRXZlbnQiLCJ2aXNpYmxlIiwiZGlzYWJsZWQiLCJ3aGVuIiwicHJvdG90eXBlIiwidmlzaWJsZUNoYW5nZWQiLCJ0IiwiaXNQYW5lIiwiYmluZCIsImVtaXQiLCJjb25uZWN0ZWRDYWxsYmFjayIsIl9fYXdhaXRlciIsIl9fZ2VuZXJhdG9yIiwibGFiZWwiLCJjdXN0b21FbGVtZW50cyIsIndoZW5EZWZpbmVkIiwic2VudCIsInN0eWxlQ2hpbGRyZW4iLCJ1cGRhdGVTdGF0ZSIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwicm1MIiwidW5kZWZpbmVkIiwiaSIsImxlbmd0aCIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJzIiwibWF0Y2hlcyIsInIiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImVsIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjb250ZW50SWQiLCJjaGlsZHJlbiIsImNoaWxkRWxlbWVudENvdW50IiwibiIsIm8iLCJpZCIsImNvbnNvbGUiLCJ3YXJuIiwic2V0UGFuZUNsYXNzIiwicmVuZGVyIiwiZ2V0SW9uTW9kZSIsImgiLCJIb3N0IiwiY2xhc3MiLCJjb25jYXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldEVsZW1lbnQiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiYWRkIiwicmVtb3ZlIiwic3R5bGUiLCJpb3MiXSwic291cmNlUm9vdCI6IiJ9