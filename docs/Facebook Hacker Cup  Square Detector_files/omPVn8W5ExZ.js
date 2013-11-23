/*!CK:616804202!*//*1383238894,173198623*/

if (self.CavalryLogger) { CavalryLogger.start_js(["nGYXD"]); }

__d("HackerCup",["Arbiter","CSS","DOM","HackerCupConst","$"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DOM'),j=b('HackerCupConst'),k=b('$'),l={complete:function(m){i.setContent(k('hackercup_submit_controls'),m);h.removeClass('hackercup_submit','async_saving');g.inform(j.SUCCESSFUL_UPLOAD,{});},incomplete:function(m){i.setContent(k('hackercup_submit_message'),m);h.removeClass('hackercup_submit','async_saving');}};e.exports=l;});