/*!CK:3014301389!*//*1384754402,173217843*/

if (self.CavalryLogger) { CavalryLogger.start_js(["OwyYE"]); }

__d("BrowseLogger",["Banzai","copyProperties","createObjectFrom","objMap","Run"],function(a,b,c,d,e,f){var g=b('Banzai'),h=b('copyProperties'),i=b('createObjectFrom'),j=b('objMap'),k=b('Run'),l='browse',m='browse_aggr',n=null,o={},p={},q=function(z){var aa=Array.prototype.slice.call(arguments,1);return i(aa,aa.map(function(ba){return z[ba];}));},r=function(z){if(z==null)return 'undefined';var aa=z.tagName.toLowerCase(),ba=z.id,ca=z.className;if(ba)aa+='#'+ba;if(ca)aa+='.'+ca;return aa;};function s(){n=null;o={};p={};}function t(z){h(z,{clientSessionID:n});return z;}function u(z){g.post(l,t(z));}function v(){if(n===null)return;p.aggregated=o;g.post(m,t(p));s();}function w(z){o[z]=(o[z]||0)+1;}function x(z){h(p,z);}k.onUnload(v);var y={newSession:function(){v();n=Math.random().toString();if(!p.start_time)p.start_time=Math.round(Date.now()/1000);},logResultClick:function(z,aa,ba,ca){var da={action:'result_click',click_type:z.ct||'result',section:z.section||'unknown',id:z.id||0,path:z.path||'unknown',rank:z.rank||0,referrer:z.referrer||'unknown',result_type:z.result_type||'unknown',session_id:z.session_id||0,query_time:z.query_time,abtest_version:z.abtest_version||'NONE',abtest_params:z.abtest_params,typeahead_sid:z.typeahead_sid||'',result_title:z.result_title||'unknown',result_href:z.result_href||'unknown',result_semantic:z.result_semantic||'unknown',type:z.experience_type||'unknown',click_action:ba,sub_id:z.sub_id,owner_id:z.owner_id};if(aa.tn)da.tn=aa.tn;if(z.cst)da.click_subtype=z.cst;w('result_click_'+da.click_type);x({path:da.path,referrer:da.referrer,result_type:da.result_type,session_id:da.session_id,abtest_version:da.abtest_version,abtest_params:da.abtest_params,typeahead_sid:da.typeahead_sid});u(da);if(!z.id)u({action:'logging_error',click_action:ba,click_type:da.click_type,attributes:JSON.stringify(z),element:j(q(ca,'srcElement','target','toElement'),r),event:q(ca,'button','clientX','clientY','ctrlKey','layerX','layerY','offsetX','offsetY','pageX','pageY','screenX','screenY','shiftKey','type','x','y')});},logControlsClick:function(z,aa){var ba={action:'controls_click',click_type:aa,path:z.path||'unknown',referrer:z.referrer||'unknown',session_id:z.session_id||0,query_time:z.query_time,filter_name:z.name||'unknown',typeahead_sid:z.typeahead_sid||'',result_type:z.result_type||'unknown',type:z.experience_type||'unknown'};if(z.cst)ba.click_subtype=z.cst;w('controls_click_'+aa);x({path:ba.path,referrer:ba.referrer,session_id:ba.session_id,typeahead_sid:ba.typeahead_sid});u(ba);},logResultHover:function(z,aa){var ba={action:'result_hover',id:z.id||0,path:z.path||'unknown',rank:z.rank,result_type:z.result_type||'unknown',session_id:z.session_id||0,query_time:z.query_time,time_elapsed:aa,typeahead_sid:z.typeahead_sid||0,type:z.experience_type||'unknown'};w('result_hover');x({path:ba.path,session_id:ba.session_id,typeahead_sid:ba.typeahead_sid});u(ba);},logScroll:function(z,aa,ba){var ca={action:'scroll',encoded_query:z,fragments:aa,position:ba};u(ca);},logNUXStep:function(z){var aa={action:'nux_step',step:z};u(aa);},logDisambiguationImpression:function(z,aa,ba,ca,da){var ea={action:'disambiguation_imp',ids:ca,name:z,path:ba,type:aa,typeahead_sid:da};u(ea);},logDisambiguationClick:function(z,aa,ba,ca,da,ea){var fa={action:'disambiguation_clk',id:da,index:ca,name:z,path:ba,type:aa,typeahead_sid:ea};u(fa);}};e.exports=y;});
__d("concatMap",[],function(a,b,c,d,e,f){function g(h,i){var j=-1,k=i.length,l=[],m;while(++j<k){m=h(i[j],j,i);Array.isArray(m)?Array.prototype.push.apply(l,m):Array.prototype.push.call(l,m);}return l;}e.exports=g;});
__d("LitestandNewsfeedCountUpdater",["Arbiter","AsyncRequest","LitestandMessages","LitestandSidebarBookmarkConfig","emptyFunction"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('LitestandMessages'),j=b('LitestandSidebarBookmarkConfig'),k=b('emptyFunction'),l,m;function n(){m&&clearTimeout(m);if(l)return;m=setTimeout(o,j.nf_count_query_interval_ms,false);}function o(){if(l)return;new h().setURI('/ajax/litestand/newsfeed_count').setHandler(function(r){if(l)return;p(r.getPayload());n();}).setAllowCrossPageTransition(true).send();}function p(r){g.inform(i.UPDATE_HOME_COUNT,{count:r,onHome:l},g.BEHAVIOR_STATE);}var q={init:function(){q.init=k;g.subscribe(i.NEWSFEED_LOAD,function(){l=true;p(0);});g.subscribe(i.LEAVE_HOME,function(){l=false;n();});n();}};e.exports=q;});
__d("clip",[],function(a,b,c,d,e,f){function g(h,i,j){return Math.min(Math.max(h,i),j);}e.exports=g;});
__d("FacebarTypeaheadL2Terms",["FacebarJSConstants"],function(a,b,c,d,e,f){var g=b('FacebarJSConstants'),h=3,i={addL2Terms:function(j,k,l,m){if(!m.suggestBackendL2Terms)return j;var n=[],o=[];j.forEach(function(q){if(q.exactMatchKeywords){q.tags.l2_suggestion=true;n.push(q);}else if(q.isKeywordL2){q.tags.l2_suggestion=true;q.type='l2suggestion';n.push(q);}else if(q.type!=='keywords')o.push(q);});var p=0;return o.map(function(q){if(g.entityTypes[q.type])if(p<h){p++;}else if(n.length)return n.pop();return q;});}};e.exports=i;});
__d("FacebarTypeaheadShortcut",["FacebarTypeaheadShortcutConfig","KeyEventController","Run","copyProperties","emptyFunction"],function(a,b,c,d,e,f){var g=b('FacebarTypeaheadShortcutConfig'),h=b('KeyEventController'),i=b('Run'),j=b('copyProperties'),k=b('emptyFunction');function l(m){"use strict";this._input=m.core.input;this._view=m.view;this._listener=null;}l.prototype.enable=function(){"use strict";this._registerListener();};l.prototype._registerListener=function(){"use strict";h.registerKey('SLASH',this._handleKeydown.bind(this));i.onLeave(function(){this._registerListener.bind(this).defer();}.bind(this));};l.prototype._handleKeydown=function(m){"use strict";var n=m.getModifiers().shift;if(n&&!g.gkWebShortcut)return;this._view.setAutoSelect(true);this._input.focus();this._input.selectInput();this._input.inform('shortcut',{shift:n});return false;};j(l.prototype,{disable:k});e.exports=l;});
__d("FacebarTypeaheadHighlightedText.react",["BrowseFacebarHighlighter","React","ReactPropTypes"],function(a,b,c,d,e,f){var g=b('BrowseFacebarHighlighter'),h=b('React'),i=b('ReactPropTypes'),j=h.createClass({displayName:'FacebarTypeaheadHighlightedText',propTypes:{text:i.string,tokens:i.array},renderHighlight:function(k,l){if((l+1)%3===0){return h.DOM.span({className:"highlightNode"},k);}else if(k)return k;},renderParts:function(){var k=this.props.text,l=this.props.tokens;if(l&&k){var m=g.createRegex(l),n=k.split(m);return n.map(this.renderHighlight);}else return k;},render:function(){return this.transferPropsTo(h.DOM.span(null,this.renderParts()));}});e.exports=j;});
__d("FacebarTypeaheadTokenText",["DOM","HTML"],function(a,b,c,d,e,f){var g=b('DOM'),h=b('HTML'),i='\u00B7';function j(n){if(typeof n==='object'){return g.getText(h(n).getRootNode());}else return n||'';}function k(n){return j(n).split(i).map(function(o){return o.trim();});}function l(n){var o={};return n.filter(function(p){var q=!o[p];o[p]=true;return q&&p;});}var m={textForEntity:function(n,o){var p=n.category||o[n.type]||'',q=n.subtext||'',r=k(p).concat(k(q));return l(r);},text:function(n){return l(k(n));}};e.exports=m;});
__d("StructuredInputDOM",["createArrayFrom","CSS","cx","DOM"],function(a,b,c,d,e,f){var g=b('createArrayFrom'),h=b('CSS'),i=b('cx'),j=b('DOM'),k={ENTITY_CLASS:"_586o",encodeText:function(l){return l.replace(/ /g,'\u00a0');},decodeText:function(l){return l.replace(/\u00a0/g,' ');},createIconNode:function(l){if(l&&typeof l=='object'){var m=j.create('i',{className:l.className,style:l.uri&&{backgroundImage:'url("'+l.uri+'")'}});m.setAttribute('data-select','ignore');return m;}},createTextNode:function(l){return j.create('span',{'data-si':true},k.encodeText(l||""));},createEntityNode:function(l,m){var n=k.encodeText(l.text),o=k.createIconNode(m.icon),p=j.create('span',{},o?[o,n]:n),q=(m.className||'').split(/\s+/);q.push(k.ENTITY_CLASS);q.forEach(h.addClass.bind(h,p));var r={si:true,uid:l.uid,type:l.type,text:n,fulltext:n,group:m.group,select:m.select,icon:JSON.stringify(m.icon||null)};for(var s in r)if(r[s]!=null)p.setAttribute('data-'+s,r[s]);return p;},convertToTextNode:function(l){l.className='';l.setAttribute('data-type','text');l.removeAttribute('data-group');l.removeAttribute('data-select');l.removeAttribute('data-icon');l.removeAttribute('data-uid');for(var m=l.firstChild;m;m=m.nextSibling)if(!j.isTextNode(m))j.remove(m);},isEntityNode:function(l){return j.isElementNode(l)&&h.hasClass(l,k.ENTITY_CLASS);},containsOnlyText:function(l,m){m=g(m);for(var n=l.firstChild;n;n=n.nextSibling)if(!(j.isTextNode(n)||l.nodeName in m))return false;return true;},getText:function(l){return j.getText(l).replace(/ /g,'\u00a0');},getDecodedText:function(l){return k.decodeText(j.getText(l));},getLength:function(l){return j.getText(l).length;},getMarker:function(l,m,n){var o=l.firstChild;while(o){var p=k.getLength(o);if(p>m||!o.nextSibling){if(j.isTextNode(o)||!n){return {node:o,offset:Math.min(m,p)};}else return k.getMarker(o,m);}else m-=p;o=o.nextSibling;}}};e.exports=k;});