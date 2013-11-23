/*!CK:3802496871!*//*1384774871,173199715*/

if (self.CavalryLogger) { CavalryLogger.start_js(["oFQJK"]); }

__d("BrowseClickLogger",["Event","BrowseLogger","collectDataAttributes"],function(a,b,c,d,e,f){var g=b('Event'),h=b('BrowseLogger'),i=b('collectDataAttributes');function j(l,m){var n=l.target,o=i(n,['bt','ft']);h.logResultClick(o.bt,o.ft,m,l);}var k={init:function(l){g.listen(l,'mousedown',function(m){var n=(m.button===2||m.which===3)?'right_click':'left_click';if(m.shiftKey)n+='_shift';if(m.altKey)n+='_alt';if(m.metaKey||m.ctrlKey)n+='_ctrl';j(m,n);}.bind(this));}};e.exports=k;});
__d("BrowseGroupResult",["Event"],function(a,b,c,d,e,f){var g=b('Event');function h(){}h.toggle=function(i,j,k){g.listen(j,'click',function(){k.toggle();i.hideFlyout();});};e.exports=h;});
__d("BrowseMouseSpeedTracker",["Event","removeFromArray"],function(a,b,c,d,e,f){var g=b('Event'),h=b('removeFromArray'),i=50,j=null,k=null,l=[],m={x:0,y:0},n=0,o=[{x:0,y:0},{x:0,y:0}];function p(){o[n].x=m.x;o[n].y=m.y;n=(n+1)%2;}function q(){var w=o[0].x-o[1].x,x=o[0].y-o[1].y;return Math.sqrt(w*w+x*x)*(1000/i);}function r(){if(j)return;k=g.listen(document.body,'mousemove',function(event){m.x=event.pageX||event.screenX;m.y=event.pageY||event.screenY;});j=window.setInterval(function(){p();t(q());},i);}function s(){if(j){window.clearInterval(j);k.remove();j=null;}}function t(w){l.forEach(function(x){if(w<x.velocity){x.callback(w);u(x);}});}function u(w){h(l,w);l.length||s();}var v={addTrigger:function(w,x){var y={velocity:w,callback:x};r();l.push(y);return {remove:u.curry(y)};}};e.exports=v;});
__d("BrowseMouse",["Event","BrowseMouseSpeedTracker","CSS","DOM","DataStore","Parent","BrowseRunOnLeave","Toggler","cx","removeFromArray"],function(a,b,c,d,e,f){var g=b('Event'),h=b('BrowseMouseSpeedTracker'),i=b('CSS'),j=b('DOM'),k=b('DataStore'),l=b('Parent'),m=b('BrowseRunOnLeave'),n=b('Toggler'),o=b('cx'),p=b('removeFromArray'),q=500,r="_3u0",s="_3u1",t=null,u=[];function v(da){return l.byClass(da,s);}function w(da){return 'browse-'+(da?'over':'out');}function x(da){return i.addClass(da,s);}function y(da,ea,fa,ga){var ha=v(ea);if(!ga)u.push({element:ea,callback:fa});if(ha){var ia=w(da),ja=k.get(ha,ia,[]);k.set(ha,ia,ja.concat(fa));return ha;}}function z(da,ea){if(da){i.conditionClass(da,r,ea);var fa=k.get(da,w(ea));fa&&fa.forEach(function(ga){ga();});}}function aa(da){var ea=da.element;['browse-over','browse-out'].forEach(function(fa){var ga=k.get(ea,fa);if(ga){p(ga,da.callback);ga.length||k.remove(ea,fa);}});}function ba(){var da=null;if(t)return;t=g.listen(document.body,'mouseover',function(ea){var fa=v(ea.getTarget());if(!fa||fa==da)return;var ga=null,ha=null,ia=false;da=fa;var ja=h.addTrigger(q,function(){z(fa,true);ia=true;}),ka=function(){ja.remove();ma.remove();ga&&ga.remove();ha&&ha.unsubscribe();},la=function(){ka();ia&&z(fa,false);da=null;},ma=g.listen(fa,'mouseleave',function(){var na=n.getActive();if(na&&j.contains(fa,na)){ha=n.subscribe('hide',la);ga=g.listen(fa,'mouseover',ka);}else la();});});m.register(function(){while(u.length)aa(u.pop());});}var ca={init:ba,makeTarget:x,onMouseOver:y.curry(true),onMouseOut:y.curry(false),removeListeners:aa};e.exports=ca;});
__d("BrowseHoverLogger",["BrowseLogger","BrowseMouse","collectDataAttributes","csx","DOM"],function(a,b,c,d,e,f){var g=b('BrowseLogger'),h=b('BrowseMouse'),i=b('collectDataAttributes'),j=b('csx'),k=b('DOM'),l={selectedElem:null,mouseoverTime:0,MIN_TIME:200,register:function(m){var n="._3u1",o=k.scry(m,n)[0]||m;h.onMouseOver(o,this.mouseenter.bind(this,o));h.onMouseOut(o,this.mouseleave.bind(this,o));},mouseenter:function(m){var n=new Date();this.mouseoverTime=Date.parse(n)+n.getMilliseconds();},mouseleave:function(m){var n=i(m,['bt']).bt;if(n.rank){var o=new Date(),p=Date.parse(o)+o.getMilliseconds(),q=p-this.mouseoverTime;if(q>this.MIN_TIME)g.logResultHover(n,q);}}};e.exports=l;});
__d("BrowsePerfLogger",["Arbiter","Banzai","collectDataAttributes"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Banzai'),i=b('collectDataAttributes'),j='browse_perf',k={init:function(l,m,n){if(!a.CavalryLogger||!l||!m)return;g.subscribe('pagelet_event',function(o,p){if(p.event==='jsdone'&&m===p.id){var q=a.CavalryLogger.getInstance(),r=q.events[m];if(r){var s=i(l,['bt']).bt,t=q.values.t_tti-window._cstart;this.logPerf(r,m,n,s,t);}}}.bind(this));},logPerf:function(l,m,n,o,p){var q={arrive:l.arrive||0,css_done:l.css||0,display:l.display||0,js_done:l.jsdone||0,js_start:l.jsstart||0,pagelet:m,path:o.path,phase:l.phase||0,quickling:n?1:0,result_type:o.result_type,tti:p,type:o.experience_type};h.post(j,q,{delay:0,retry:true});}};e.exports=k;});
__d("BrowseResultPivots",["Animation","BrowseMouse","copyProperties","csx","DOM","UserAgent","Style"],function(a,b,c,d,e,f){var g=b('Animation'),h=b('BrowseMouse'),i=b('copyProperties'),j=b('csx'),k=b('DOM'),l=b('UserAgent'),m=b('Style'),n=250,o=l.ie()<=8;function p(q){this._buttonGroup=k.scry(q,"._cmf")[0];if(!this._buttonGroup)return;this._pivots=k.scry(this._buttonGroup,"._cmg");h.onMouseOver(q,this._mouseover.bind(this));h.onMouseOut(q,this._mouseout.bind(this));}i(p,{register:function(q){new p(q);}});i(p.prototype,{_mouseout:function(){m.set(this._buttonGroup,'width','');},_mouseover:function(){m.set(this._buttonGroup,'width','auto');if(o)return;this._pivots.forEach(function(q){new g(q).from('opacity',0).to('opacity',1).duration(n).go();});}});e.exports=p;});
__d("BrowseScrollLogger",["BrowseLogger","Event","getUnboundedScrollPosition","throttle"],function(a,b,c,d,e,f){var g=b('BrowseLogger'),h=b('Event'),i=b('getUnboundedScrollPosition'),j=b('throttle'),k=200;function l(m,n){"use strict";this.$BrowseScrollLogger0=m;this.$BrowseScrollLogger1=n;this.$BrowseScrollLogger2=0;this.$BrowseScrollLogger3=1;h.listen(window,'scroll',j(this.$BrowseScrollLogger4,100,this));}l.prototype.$BrowseScrollLogger4=function(){"use strict";this.$BrowseScrollLogger2=i(window).y;if(this.$BrowseScrollLogger2/this.$BrowseScrollLogger3>k){this.$BrowseScrollLogger3++;g.logScroll(this.$BrowseScrollLogger0,this.$BrowseScrollLogger1,this.$BrowseScrollLogger2);}};l.init=function(m,n){return new l(m,n);};e.exports=l;});
__d("BrowseScrollingPager",["AsyncDialog","AsyncRequest","CSS","DOM","OnVisible","BrowseRunOnLeave","UIPagelet","copyProperties"],function(a,b,c,d,e,f){var g=b('AsyncDialog'),h=b('AsyncRequest'),i=b('CSS'),j=b('DOM'),k=b('OnVisible'),l=b('BrowseRunOnLeave'),m=b('UIPagelet'),n=b('copyProperties'),o=800,p={_pageletID:0,_queuedData:null,init:function(q,r){this.loadingNode=q;this.globalData=r;this.pageData=null;this.visibleListener=null;this._hasErrors=false;this._queuedData&&this.pageletComplete(this._queuedData);this._queuedData=null;l.register(p._cleanup.bind(p));},pageletComplete:function(q){if(this.loadingNode){this.pageData=q;this._updateVisibleListener.bind(this).defer(1000);}else this._queuedData=q;},_cleanup:function(){this.pageData=null;this.loadingNode=null;this.visibleListener&&this.visibleListener.remove();},_updateVisibleListener:function(){if(!this.loadingNode){return;}else if(this.pageData){i.show(this.loadingNode);this.visibleListener=new k(this.loadingNode,this._loadNextContent.bind(this),false,o);}else i.hide(this.loadingNode);},_genID:function(){return 'fbBrowseScrollingPagerContainer'+this._pageletID++;},_loadNextContent:function(){if(this._hasErrors)return;i.show(this.loadingNode.firstChild);this.contentContainer=j.create('div',{id:this._genID()});j.insertAfter(this.loadingNode,this.contentContainer);m.loadFromEndpoint('BrowseScrollingSetPagelet',this.contentContainer.id,n({},this.globalData,this.pageData),{constHeight:true,sid:this.globalData.typeahead_sid||0,displayCallback:this._showLoadedContent.bind(this)});},_showLoadedContent:function(q){try{q();if(this.contentContainer&&this.loadingNode)j.insertAfter(this.contentContainer,this.loadingNode);}catch(r){var s=new h('/ajax/browse/error_dialog.php');s.setData(n({},this.globalData,{error_name:r.name,error_message:r.message}));g.send(s,null);this._hasErrors=true;}finally{this.loadingNode&&i.hide(this.loadingNode.firstChild);}}};e.exports=p;});
__d("BrowseFeedbackMenu",["AsyncRequest","copyProperties","Event"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('copyProperties'),i=b('Event');function j(k,l){this._xButtonElem=k;this._data=l;i.listen(this._xButtonElem,'click',this._click.bind(this));}h(j.prototype,{_triggered:false,_logClick:function(){new g().setURI('/ajax/browse/x/').setData(this._data).setHandler(function(k){}).send();},_click:function(k){if(!this._triggered)this._logClick();this._triggered=true;}});e.exports=j;});
__d("legacy:DynamicFriendListEducation",["DynamicFriendListEducation"],function(a,b,c,d){a.DynamicFriendListEducation=b('DynamicFriendListEducation');},3);
__d("FriendListMenu",["Event","Arbiter","AsyncRequest","CSS","DOM","HTML","Focus","Input","Keys","MenuDeprecated","Parent"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('CSS'),k=b('DOM'),l=b('HTML'),m=b('Focus'),n=b('Input'),o=b('Keys'),p=b('MenuDeprecated'),q=b('Parent'),r={init:function(s){p.register(s,false);var t=k.find(s,'.FriendListCreateTrigger'),u=k.find(s,'.CreateListInputItem'),v=k.find(u,'.createListInput');p.subscribe('select',function(w,x){if(x.item==t){j.addClass(s,'FriendListMenuCreate');m.set(v);}});g.listen(v,'blur',function(w){if(n.isEmpty(v))j.removeClass(s,'FriendListMenuCreate');});g.listen(v,'keydown',function(w){if(g.getKeyCode(w)==o.RETURN&&/[^\s]/.test(v.value))new i().setURI('/ajax/friends/lists/create.php').setData({name:v.value,id:s.id}).setHandler(function(){n.reset(v);j.removeClass(s,'FriendListMenuCreate');}).send();});h.subscribe('friend-list/new',function(w,x){var y=l(x.new_li).getRootNode();k.insertBefore(t,y);if(x.id===s.id){p.focusItem(y);p.inform('select',{menu:q.byClass(y,'uiMenu'),item:y});}else p.toggleItem(y);});h.subscribe('friend-list/close_editor',function(){var w=q.byClass(s,'FlyoutFriendMenu');j.removeClass(w,'addToListsOpen');j.addClass(w,'addToListsClosed');});},addToAnotherList:function(s,t){g.listen(s,'click',function(event){var u=q.byClass(s,'FlyoutFriendMenu');j.removeClass(u,'addToListsClosed');j.addClass(u,'addToListsOpen');});},goBack:function(s,t){g.listen(s,'click',function(event){var u=q.byClass(s,'FlyoutFriendMenu');j.removeClass(u,'addToListsOpen');j.addClass(u,'addToListsClosed');});}};e.exports=r;});
__d("RestrictedFriendListEducation",["Arbiter","AsyncRequest"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i,j;function k(m,n){if(n.flid==i)if(m=='FriendListHovercard/add'){if(j)return;j=true;new h().setURI('/ajax/friends/lists/restricted_edu.php').setData({target:n.uid,flid:n.flid}).send();}else if(m=='RestrictedListNUX/okay')new h().setURI('/ajax/friends/lists/nux_log.php').setData(n).send();return true;}var l={init:function(m){i=m;g.subscribe(['FriendListHovercard/add','RestrictedListNUX/okay'],k);}};e.exports=l;});
__d("legacy:FriendListRestrictedEducation",["RestrictedFriendListEducation"],function(a,b,c,d){a.RestrictedFriendListEducation=b('RestrictedFriendListEducation');},3);
__d("FacebarTrigger",["Arbiter","Event","FacebarStructuredText"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Event'),i=b('FacebarStructuredText'),j={register:function(k,l){h.listen(k,'click',function(){g.inform('FacebarTrigger/select',{structure:i.fromStruct(l)});});}};e.exports=j;});