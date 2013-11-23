/*!CK:8837944!*//*1384214146,173213749*/

if (self.CavalryLogger) { CavalryLogger.start_js(["jj\/wP"]); }

__d("HackerCupLastSubmitController",["Arbiter","AsyncRequest","HackerCupConst","$","copyProperties"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('HackerCupConst'),j=b('$'),k=b('copyProperties');function l(m,n){k(this,{elem:j(m),problem_id:n});var o=this.update.bind(this),p=i.SUCCESSFUL_UPLOAD;g.subscribe(p,o);this.update();}k(l.prototype,{update:function(){var m=new h().setURI('/hackercup/ajax/last_submission.php').setData({problem_id:this.problem_id}).send();}});e.exports=l;});
__d("downloadInput",["Form","URI"],function(a,b,c,d,e,f){var g=b('Form'),h=b('URI');function i(j,k){g.post(h('/ajax/hackercup/input'),{pid:j});}e.exports=i;});
__d("legacy:hackercup-problem-statement",["downloadInput"],function(a,b,c,d){a.downloadInput=b('downloadInput');},3);