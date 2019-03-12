;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const sdkhooks_1=require('./4670a8a5ef34810c4c4b823e11ef941c.js'),lodash_1=require("lodash"),store=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),consoleDisplay=require('./2dfc6a3df6d6fc51266b293c8420e88b.js');class APIConfigHandler{constructor(){this.configList=[],this.postHookAdded=!1,this.sessionId=0,this.sessionInfo=new Set,this.postHook=({api:a,data:b,result:c})=>{for(const d of this.configList)if(d.config.match===a&&!this.sessionInfo.has(d.config.id)){const c=d.config.scope;let e=!0;for(const a of c)switch(a.conditionMatchType){case"parameter":{if(!this.testParameterMatch(b.args,a)){e=!1;break}break}default:}e&&(consoleDisplay.display({command:C.DISPLAY_INFO,type:C.DISPLAY_TYPES.BBS_API_LINK,data:{api:a,messageLevel:1,explanation:d.config.explanation,link:d.config.link,linkType:d.config.linkType}}),this.sessionInfo.add(d.config.id))}};let a,b=0;store.subscribe(()=>{const c=store.getState();c.simulator.compileCommand&&c.simulator.compileCommand.ts&&c.simulator.compileCommand.ts!==b&&(b=c.simulator.compileCommand.ts,this.sessionId=b,this.sessionInfo=new Set),c.config.bbsConfig&&c.config.bbsConfig!==a&&(this.updateConfig(c.config.bbsConfig),a=c.config.bbsConfig,this.updateConfig(a))})}start(){sdkhooks_1.addHook(sdkhooks_1.SDK_TYPE.APPSERVICE_SDK,sdkhooks_1.HOOK_TYPE.POST_HOOK,this.postHook),this.postHookAdded=!0}updateConfig(a){this.configList=a.filter((a)=>{return"api"===a.config.type})}testParameterMatch(a,b){const c=()=>{switch(b.matchType){case"full":return lodash_1.get(a,b.param)===b.match;case"reg":return new RegExp(b.match).test(lodash_1.get(a,b.param));case"exist":return lodash_1.has(a,b.param);case"type":return Object.prototype.toString.call(lodash_1.get(a,b.param)).slice(8,-1)===b.match;default:return!1;}};try{const a=c();return b.not?!a:a}catch(a){return!1}}}const handler=new APIConfigHandler;exports.default=handler;
;}(require("lazyload"), require);