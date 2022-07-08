"use strict";
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(c,a){a=a||window;
for(var b=0;
b<this.length;
b++){c.call(a,this[b],b,this)
}}
}var SfdcWwwBase=SfdcWwwBase||{};
SfdcWwwBase.gdpr=SfdcWwwBase.gdpr||{};
(function(e){var f=[];
var d=false;
var c=false;
var b=false;
SfdcWwwBase.gdpr.hasFunctional=e.Deferred();
var a={1:["liveagent_vc","liveagent_ptid","liveagent_sid","liveagent_oref","web_core_geoCountry","web_core_geoRedirected","web_core_regionSelectOverride","SSID","_dc_gtm_UA-118367394-2","_dc_gtm_UA-118367394-5","OptanonConsent","OptanonAlertBoxClosed","X-Salesforce-CHAT","videoId","guided-tour-selection","s_vi","privacy_bar","webact","AKA_A2","Lastvaliddriver"],3:["_gid","optimizelyEndUserId","_gat","_ga","_gat_UA-118367394-2","_gat_UA-118367394-5","analytics.twitter.com","appxud","s_pers","Lp","roi","rrCookie_affiliateInfo_home","rrCookie_affiliateInfo_sales","rrCookie_affiliateInfo_service","rrCookie_affiliateInfo_pricing","rrCookie_affiliateInfo_platform","AEM Client Context","coveo_visitorId","Vidyard","Pardot","mbox","s_sess","db","l_cloud","chat","kxsfdc","ptb","ptc","version","invoca_session","cvtdt","is","iv","optimizelyDomainTestCookie","check","BrowserId","AMCV_8D6C67C25245AF020A490D4C%40AdobeOrg","AMCVS_8D6C67C25245AF020A490D4C%40AdobeOrg","lastvaliddriver","c22","c30","c40","v0","v4","v20","v22","v28","v32","closedInitialChat","Lastvaliddriver","Cvtdt","eventsPopupOptOut","convertingPageUrl"],4:[]};
SfdcWwwBase.gdpr.isCookieActive=function(h){var g=f.indexOf(h);
if(g!==-1){return true
}if(d===false){g=a[3].indexOf(h);
if(g!==-1){return false
}}return c
};
SfdcWwwBase.gdpr.initActiveGroups=function(){if(window.OptanonActiveGroups){f=[];
d=false;
c=false;
var g=window.OptanonActiveGroups.split(",").map(String);
g.forEach(function(i){if(i){var h=SfdcWwwBase.gdpr.getGroup(i);
if(h){var j=a[i];
if(j){j.forEach(function(k){f.push(k)
})
}if(i==="3"){d=true;
SfdcWwwBase.gdpr.hasFunctional.resolve()
}if(i==="4"){c=true
}}}})
}return f
};
SfdcWwwBase.gdpr.getGroup=function(g){var h=false;
if(window.Optanon){var i=window.Optanon.GetDomainData().Groups;
i.forEach(function(j){if(j.OptanonGroupId!==undefined&&j.OptanonGroupId===g){h=j
}})
}return h
};
SfdcWwwBase.gdpr.isFunctionalActive=function(){return d
};
SfdcWwwBase.gdpr.isAdvertisingActive=function(){return c
};
SfdcWwwBase.gdpr.getActiveCookies=function(){return f
};
SfdcWwwBase.gdpr.isEnabled=function(){return b
};
SfdcWwwBase.gdpr.preference=function(){if(window.Optanon){return window.Optanon.ToggleInfoDisplay()
}};
SfdcWwwBase.gdpr.postInit=function(){if(typeof digitalData!=="undefined"){digitalData.util.saveLocalStorage()
}};
SfdcWwwBase.gdpr.init=function(){if(window.Optanon&&window.OptanonActiveGroups){SfdcWwwBase.gdpr.initActiveGroups();
SfdcWwwBase.gdpr.setOptimizelyOptOut();
b=true
}};
SfdcWwwBase.gdpr.setOptimizelyOptOut=function(){window.optimizely=window.optimizely||[];
if(SfdcWwwBase.gdpr.isFunctionalActive()){window.optimizely.push({type:"optOut",isOptOut:false})
}else{window.optimizely.push({type:"optOut",isOptOut:true})
}};
e(function(){SfdcWwwBase.gdpr.postInit()
});
SfdcWwwBase.gdpr.init()
}(jQuery));
if(typeof JSON!=="object"){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
(function(a){a.toJSON=function(b){if(typeof(JSON)=="object"&&JSON.stringify){return JSON.stringify(b)
}};
a.evalJSON=function(b){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(b)
}};
a.secureEvalJSON=function(b){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(b)
}}
})(jQuery);
"use strict";
var Url={encode:function(a){return encodeURI(a)
},decode:function(a){return decodeURI(a)
},encodeComponent:function(a){return encodeURIComponent(a)
},decodeComponent:function(a){return decodeURIComponent(a)
},getFullUrl:function(a){try{var i=/^(https?:)?\/\//;
var b=(a.match(i)==null);
var d=a.lastIndexOf(".");
var c=com.salesforce.www.App.config.domainPrefixes;
if(b&&d>0&&c!=null){var f=a.substring(d+1);
var h=c[f];
if(h!=null){if(a.indexOf("/")!==0){var j=this.sanitizedPathname();
a=j.substring(0,j.lastIndexOf("/")+1)+a
}return h+a
}}}catch(g){}return a
},sanitizedPathname:function(){return encodeURI(decodeURIComponent(document.location.pathname).replace(/<\/?[^>]+(>|$)/g,"").replace(/>/g,"").replace(/['";]/g,""))
}};
"use strict";
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";
var k,h,f,j,g,e,d;
var b=0;
c=Base64._utf8_encode(c);
while(b<c.length){k=c.charCodeAt(b++);
h=c.charCodeAt(b++);
f=c.charCodeAt(b++);
j=k>>2;
g=((k&3)<<4)|(h>>4);
e=((h&15)<<2)|(f>>6);
d=f&63;
if(isNaN(h)){e=d=64
}else{if(isNaN(f)){d=64
}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)
}return a
},decode:function(c){var a="";
var k,h,f;
var j,g,e,d;
var b=0;
c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));
g=this._keyStr.indexOf(c.charAt(b++));
e=this._keyStr.indexOf(c.charAt(b++));
d=this._keyStr.indexOf(c.charAt(b++));
k=(j<<2)|(g>>4);
h=((g&15)<<4)|(e>>2);
f=((e&3)<<6)|d;
a=a+String.fromCharCode(k);
if(e!=64){a=a+String.fromCharCode(h)
}if(d!=64){a=a+String.fromCharCode(f)
}}a=Base64._utf8_decode(a);
return a
},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");
var a="";
for(var e=0;
e<b.length;
e++){var d=b.charCodeAt(e);
if(d<128){a+=String.fromCharCode(d)
}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)
}else{a+=String.fromCharCode((d>>12)|224);
a+=String.fromCharCode(((d>>6)&63)|128);
a+=String.fromCharCode((d&63)|128)
}}}return a
},_utf8_decode:function(a){var d="",f=0,g=0,e=0,b=0;
while(f<a.length){g=a.charCodeAt(f);
if(g<128){d+=String.fromCharCode(g);
f++
}else{if((g>191)&&(g<224)){e=a.charCodeAt(f+1);
d+=String.fromCharCode(((g&31)<<6)|(e&63));
f+=2
}else{e=a.charCodeAt(f+1);
b=a.charCodeAt(f+2);
d+=String.fromCharCode(((g&15)<<12)|((e&63)<<6)|(b&63));
f+=3
}}}return d
}};
"use strict";
function CookieHandler(){this.isValid=function(b){if(SfdcWwwBase.gdpr&&SfdcWwwBase.gdpr.isEnabled()){return SfdcWwwBase.gdpr.isCookieActive(b)
}return true
};
function a(){var b=document.location.hostname;
return b.indexOf(".salesforce.com")>-1?".salesforce.com":"."+b
}this.setCookie=function(d,h,i,g){if(this.isValid(d)){g=g?g:a();
var b="";
var f="";
var c=new Date();
c.setTime(c.getTime()+(-1*1000));
f="; expires="+c.toGMTString();
if(typeof(i)!="undefined"){c.setTime(c.getTime()+(i*1000));
b="; expires="+c.toGMTString()
}document.cookie=d+"="+h+f+"; path=/";
var e=d+"="+h+b+"; path=/; domain="+g;
e+=(window.isSecure)?"; secure":"";
document.cookie=e
}};
this.getCookie=function(d){if(this.isValid(d)){d=d+"=";
var b=document.cookie.split(";");
for(var e=0;
e<b.length;
e++){var f=b[e];
while(f.charAt(0)===" "){f=f.substring(1,f.length)
}if(f.indexOf(d)===0){return f.substring(d.length,f.length)
}}}return null
};
this.deleteCookie=function(b){if(this.isValid(b)){this.setCookie(b,"",-1);
this.setCookie(b,"",-1,document.location.hostname)
}}
}"use strict";
var Util=Util||{};
(function(a){a.extend(Util,{ua:navigator.userAgent,isTouch:"createTouch" in document,isOkAMO:function(b){return typeof b==="string"&&b.length<=100&&/^[a-zA-Z0-9\-@:_]+$/.test(b)
},redirect:function(b){var d=new CookieHandler();
var c=document.referrer?document.referrer:"";
d.setCookie("referrer",escape(c),60);
top.location.href=b
},isValidJson:function(b){var d=false;
if(b&&typeof b==="string"){try{var f=JSON.parse(b);
if(f){d=true
}}catch(c){}}return d
},parseJSON:function(b){if(!b){return{}
}return a.secureEvalJSON(b)
},toJSON:function(b){if(!b){return""
}return a.toJSON(b)
},stripXssChars:function(b){return b.replace(/[<>:;#$%()]/gi,"")
},getCookie:function(c){var b=(new CookieHandler()).getCookie(c);
b=b==null?"":Url.decodeComponent(b);
if(this.isValidJson(b)){return this.parseJSON(b)
}return b
},setCookie:function(e,f,b,d){var c="";
if(typeof(e)=="object"){c=this.toJSON(e)
}else{if(typeof(e)=="string"||typeof(e)=="number"){c=e
}else{return false
}}(new CookieHandler()).setCookie(f,Url.encodeComponent(c),b,d||"")
},deleteCookie:function(b){(new CookieHandler()).deleteCookie(b)
},getJSONCookie:function(c){var b=(new CookieHandler()).getCookie(c);
b=b==null?"":Url.decodeComponent(b);
if(!this.isValidJson(b)){return{}
}return this.parseJSON(b)
},setJSONCookie:function(e,f,b,d){var c=this.toJSON(e);
(new CookieHandler()).setCookie(f,Url.encodeComponent(c),b,d)
},convert15To18:function(k){var d=!k||k.length!==15||k.indexOf("70")!==0;
if(d){return k
}var g="";
for(var f=0;
f<3;
f++){var b=0;
for(var e=0;
e<5;
e++){var h=k.charAt(f*5+e);
if(h>="A"&&h<="Z"){b+=1<<e
}}if(b<=25){g+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(b)
}else{g+="012345".charAt(b-26)
}}return k+g
},getParam:function(d,b){if(!b){b=window.location.href
}else{if(b.indexOf("?")===-1){b="?"+b
}}b=Url.decodeComponent(b);
var c="[\\?&]+"+d+"=([^&#]*)";
var f=new RegExp(c,"i");
var e=f.exec(b);
if(e==null){return""
}else{return e[1].replace(/^[ \t]+|[ \t]+$/,"")
}},isEmpty:function(b){return(b===undefined||b===null||(typeof b==="object"&&Object.keys(b).length===0)||(typeof b==="string"&&b.trim().length===0))
},cleanUrlData:function(b){if(!b){return""
}b=b.replace(/\+/g," ");
b=b.replace(/[',"]/g,"");
b=b.replace(/\t/g,"");
b=b.replace(/\n/g,"");
b=b.toLowerCase();
return b
},countChars:function(e,c){var d=0;
for(var b=0;
b<e.length;
b++){if(e.charAt(b)===c){d++
}}return d
},deDupe:function(c){if(!c||typeof(c)=="string"){return""
}var b={};
return a(c).filter(function(d){return b.hasOwnProperty(d)?false:(b[d]=true)
})
},getMeta:function(b){var c="";
a("meta").each(function(){var d="";
if(a(this).attr("name")===b){d="name"
}else{if(a(this).attr("property")===b){d="property"
}}if(d){c=a(this).attr("content");
return false
}});
return c
},isIOS:function(){return this.isIPhone()||this.isIPad()
},isIPhone:function(){return(this.ua.match(/iPhone/i)!=null)||(this.ua.match(/iPod/i)!=null)
},isIPad:function(){return(this.ua.match(/iPad/i)!=null)
},getScreenSize:function(){var b=a(window);
return[b.width(),b.height()]
},isRobot:function(){return(this.ua.match(/google web preview/i)!=null)||(this.ua.match(/gomezagent/i)!=null)||(this.ua.match(/dejaclick/i)!=null)||(this.ua.match(/KTXN/i)!=null)
},getHref:function(c){try{if(c.href&&!(c.href===document.location.href||c.href==="#"||c.href.indexOf(document.location.href+"#")>-1)){return c.href
}else{if(!(c.getAttribute("sfdc:href")===""||c.getAttribute("sfdc:href")==null)){return c.getAttribute("sfdc:href")
}else{return""
}}}catch(b){return""
}},getDriver:function(d){if(!d){return""
}else{if(Util.getParam("d",d).length===18){d=d.replace("?d="+Util.getParam("d",d),"?");
d=d.replace("&d="+Util.getParam("d",d),"&")
}}if(!document.location.search){return d
}var c=document.location.search.substring(1).split("&");
if(d.indexOf("?")+1===d.length){d=d.substring(0,d.length-1)
}for(var b=0;
b<c.length;
b++){var e=c[b].substring(0,c[b].indexOf("="));
if(Util.getParam(e)){var g=e+"="+this.getParam(e,d),f=e+"="+this.getParam(e);
if(this.getParam(e,d)){d=d.replace("?"+g,"?"+f);
d=d.replace("&"+g,"&"+f)
}else{d+=(d.indexOf("?")>-1?"&":"?")+f
}}}if(Util.getParam("d",d).length===18){d=d.replace(Util.getParam("d",d),Util.getParam("d",d).substring(0,15))
}return d
},ellipsis:function(c,b){if(c.length<b){return c
}else{c=c.substring(0,b-3);
if(c.indexOf(" ")!==-1){if(" "!==c.charAt(c.length)){c=c.substring(0,c.lastIndexOf(" "))
}}return c+"..."
}},endsWith:function(c,b){if(!(c||b)||c.indexOf(b)===-1){return false
}else{if(c.indexOf(b)+b.length===c.length){return true
}}return false
},equalHeights:function(b){var c=0;
if(typeof b!=="undefined"){b.each(function(){var d=a(this).height();
if(d>c){c=d
}});
b.height(c)
}},moreLinkShowNext:function(b){a(b).hide().next().show();
return false
},addScript:function(c,d){if(!c){return
}var b=document.createElement("script");
b.setAttribute("src",c);
b.async=true;
if(d){b.onload=d
}document.body.appendChild(b)
},convertTagsObjIntoOldSpec:function(c){var f={};
for(var e in c){var d=c[e].tags;
var b=d.map(function(g){return g.name
});
f[e]=b
}return f
}})
})(jQuery);
var demandBase=demandBase||{};
(function(c){if(window.location.pathname.indexOf("login-messages")!==-1){return
}var e="api.company-target.com/api/v2/ip.json?token=09dd7a8bed725339af3ce985f86800730b42b5cf",a=Util.getParam("ipOverride"),d=document.location.protocol,b=d+"//"+e+(a!==""?"&query="+a:"");
demandBase.loaded=c.Deferred();
demandBase.data=JSON.parse(sessionStorage.getItem("demandBaseData"));
if(demandBase.data){demandBase.loaded.resolve()
}else{c.getJSON(b,function(f){sessionStorage.setItem("demandBaseData",JSON.stringify(f));
demandBase.data=f;
demandBase.loaded.resolve()
})
}}(jQuery));
"use strict";
var Server={isStaging:false,productionAccount:"salesforcemarketing"+((document.location.href.indexOf("/dreamforce/")>-1)?",salesforcedreamforce":""),stagingAccount:"salesforcedevnew",productionDomains:["www.salesforce.com","a.sfdcstatic.com","c.salesforce.com","blogs.salesforce.com","certification.salesforce.com"],stagingDomains:[],internalDomains:[".salesforce.com","opinionlab.com","sfdc.net","a.sfdcstatic.com"],externalDomains:[".my.salesforce.com"],cdnUrlPrefix:"http://www.sfdcstatic.com",isProduction:function(){if(Server.isStaging){return false
}if(this.productionDomains.length>0){for(var a in this.productionDomains){if(self.location.href.indexOf(this.productionDomains[a])>=0){return true
}}}if(this.stagingDomains.length>0){for(a in this.stagingDomains){if(self.location.href.indexOf(this.stagingDomains[a])>=0){return false
}}}return false
},getAccount:function(){if(Util.getParam("trackAccount")){return Util.getParam("trackAccount")
}else{if(Util.isRobot()||!this.isProduction()){return this.stagingAccount
}else{return this.productionAccount
}}},isStage:function(){return !this.isProduction()
},getExternalDomains:function(){return this.externalDomains||[]
},getInternalDomains:function(){return this.internalDomains||[]
},getCookieDomain:function(){var a=document.location.hostname;
return a.indexOf(".salesforce.com")>-1?".salesforce.com":"."+a
}};
"use strict";
var SfdcWwwBase=SfdcWwwBase||{};
function VisitorProfile(){this.version="w172.2";
var b=new Date();
this.timestamp=b.getTime();
this.profileData=Util.getCookie("appxud")||{};
if(typeof(this.profileData)!="object"){this.profileData={};
Util.deleteCookie("appxud")
}this.activityData=Util.getCookie("webact")||{};
if(typeof(this.activityData)!="object"){this.activityData={};
Util.deleteCookie("webact")
}if(this.isNewSession()){this.activityData.l_vdays=this.isNewVisitor()?-1:Math.round((this.timestamp-this.lastVisit())/(1000*60*60*24));
this.activityData.l_visit=this.getSession();
this.activityData.session=this.timestamp;
this.activityData.l_search="";
this.activityData.l_dtype=(""!=this.activityData.l_dtype&&typeof(this.activityData.l_dtype)!="undefined")?this.activityData.l_dtype:"";
this.activityData.l_page="";
this.activityData.l_page_url="";
if(this.lastVisit()>=this.firstVisit()){this.activityData.counter++;
this.activityData.pv=0
}}this.idle=this.sessionTimer();
this.activityData.session=this.timestamp;
if(this.isNewVisitor()){this.activityData.counter=0;
if(this.firstVisit()===0){this.activityData.f_visit=this.timestamp
}}if(typeof(this.customSetup)=="function"){this.customSetup()
}this.skipSave=false;
var a=Util.getParam("forceProfile");
if((a==="customer"&&!this.isCustomer())||(a==="prospect"&&this.isCustomer())){this.activityData.customer=(a==="customer"?this.timestamp:"");
this.skipSave=true
}this.saveActivityData()
}VisitorProfile.prototype.getBase64Cookie=function(b){var a=Util.getCookie(b);
return(a==null||!a)?"":Base64.decode(Url.decodeComponent(a))
};
VisitorProfile.prototype.saveActivityData=function(){if(this.skipSave!==true){Util.setJSONCookie(this.activityData,"webact",60*60*24*365)
}return true
};
VisitorProfile.prototype.getActivity=function(a){if(this.activityData!=null){return(this.activityData[a]!=null?this.activityData[a]:"")
}else{return""
}};
VisitorProfile.prototype.isLoginPromo=function(){return window.location.pathname.indexOf("login-messages")!==-1
};
VisitorProfile.prototype.isCustomer=function(){return(this.getActivity("customer")>0)
};
VisitorProfile.prototype.isDeveloper=function(){return(this.getActivity("developer")>0)
};
VisitorProfile.prototype.isTrialUser=function(){return(this.getActivity("trial")>0)
};
VisitorProfile.prototype.hasCurrentTrial=function(){var a=1000*60*60*24;
return(((this.timestamp-this.getActivity("trial"))/a)<=30)||(((this.timestamp-this.getActivity("signup"))/a)<=30)
};
VisitorProfile.prototype.getVisitNumber=function(){return(this.getActivity("counter")>0?this.getActivity("counter"):0)+1
};
VisitorProfile.prototype.isNewVisitor=function(){return(this.lastVisit()==0)
};
VisitorProfile.prototype.lastVisit=function(){return(this.getActivity("l_visit")>0?this.getActivity("l_visit"):0)
};
VisitorProfile.prototype.firstVisit=function(){return(this.getActivity("f_visit")>0?this.getActivity("f_visit"):0)
};
VisitorProfile.prototype.getSession=function(){return(this.getActivity("session")>0?this.getActivity("session"):0)
};
VisitorProfile.prototype.isNewSession=function(){var a=30*60;
this.newSession=this.sessionTimer()>a||this.newSession;
return this.newSession
};
VisitorProfile.prototype.sessionTimer=function(){return(this.timestamp-this.getSession())/1000
};
VisitorProfile.prototype.getType=function(){if(this.isEmployee()){return"employee"
}else{if(this.isCustomer()){return"customer"
}else{if(this.isDeveloper()){return"developer"
}else{if(this.getUserEmail()){return"known prospect"
}else{return"anonymous"
}}}}};
VisitorProfile.prototype.customSetup=function(){if(demandBase&&demandBase.loaded){var a=this;
demandBase.loaded.done(function(){a.db=demandBase.data
})
}this.getNeustarInfo();
this.getAkaInfo();
var c=this.OrgInfo.getStatus();
var e=this.OrgInfo.getType();
if(!this.isTrialUser()){if(c==="TRIAL"){this.activityData.trial=this.timestamp
}}if(!this.isCustomer()){if((c==="ACTIVE"||c==="DEMO"||c==="FREE")&&(e!=="ME"&&e!=="DE")){this.activityData.customer=this.timestamp
}}if(!this.isDeveloper()){if(e==="DE"){this.activityData.developer=this.timestamp
}}var d=Util.getParam("ef_id");
if(d&&Util.isOkAMO(d)){this.activityData.efid=d
}try{delete this.activityData.scores
}catch(b){}};
VisitorProfile.prototype.getTargeting=function(b,a){if(b&&a){if(this.getActivity(b)){return this.getActivity(b)[a]?this.getActivity(b)[a]:""
}}return""
};
VisitorProfile.prototype.getTypeDetailed=function(){return this.getType()+":"+(this.isTrialUser()?"has-trial":"no-trial")
};
VisitorProfile.prototype.isEmployee=function(){if(typeof(App)!=="undefined"&&typeof(App.config)!=="undefined"&&typeof(App.config.profileUnmapped)!=="undefined"&&App.config.profileUnmapped==="employee"){return true
}else{if(typeof(SfdcWwwBase)!=="undefined"&&typeof(SfdcWwwBase.analyticsProfile)!=="undefined"&&typeof(SfdcWwwBase.analyticsProfile.isEmployee)!=="undefined"){return SfdcWwwBase.analyticsProfile.isEmployee
}}return false
};
VisitorProfile.prototype.OrgInfo={cookieData:VisitorProfile.prototype.getBase64Cookie("oinfo"),getStatus:function(){return Util.getParam("status",this.cookieData).toUpperCase()
},getType:function(){var a=["TE","PE","EE","DE","ME","??","UE","CE","BE"];
var b=Util.getParam("type",this.cookieData);
return a[b]?a[b]:""
},getID:function(){var a=Util.getParam("oid",this.cookieData);
return a?Util.convert15To18(a):""
},getEdition:function(){var a=["Team Edition","Professional Edition","Enterprise Edition","Developer Edition","Personal Edition","Unknown Edition","Unlimited Edition","Contact Manager Edition","Base Edition (Chatter Free / Database.com)"];
var b=Util.getParam("type",this.cookieData);
return a[b]?a[b]:""
}};
VisitorProfile.prototype.getProperty=function(a){if(this.profileData!=null){return(this.profileData[a]!=null?this.profileData[a]:"")
}else{return""
}};
VisitorProfile.prototype.getProductInterests=function(){return this.getProperty("pi")
};
VisitorProfile.prototype.getPrimaryProductInterest=function(){return this.getProperty("ppi")
};
VisitorProfile.prototype.getCompanyEmployees=function(){return this.getProperty("emp")
};
VisitorProfile.prototype.getJobTitle=function(){return this.getProperty("t")
};
VisitorProfile.prototype.getCompanyName=function(){return this.getProperty("c")
};
VisitorProfile.prototype.getCompanyState=function(){return this.getProperty("st")
};
VisitorProfile.prototype.getCompanyCountry=function(){return this.getProperty("cn")
};
VisitorProfile.prototype.getUserEmail=function(){return this.getProperty("e")
};
VisitorProfile.prototype.getKruxSegment=function(){var b="";
if(typeof(localStorage)!="undefined"){for(var a=0;
a<localStorage.length;
a++){if((localStorage.key(a).substring(0,7)==="kxsfdc_")&&(localStorage.key(a).substring(localStorage.key(a).length-5)==="_segs")){b+=localStorage.getItem(localStorage.key(a))+","
}}b=b.substring(0,b.length-1)
}vp.kxsfdc={segs:!b?"":b};
return b
};
VisitorProfile.prototype.getNeustarInfo=function(){if(document.location.hostname.indexOf("-auth")===-1&&!this.isLoginPromo()){var b="/wbin/www-core/f/g?analytics=true",a={pc:"postcode",cic:"city",sc:"state",rc:"region",cc:"country",ncc:"carrier",ntc:"connection_type",hf:"hosting_facility",irt:"ip_routing_type",nsc:"line_speed",noc:"organization"},d={dma:"dmac"},c=["pc","cic","sc","rc","cc","dma","coc","ac","tzc","loc","lac","dmac","msac","ntc","nsc","ncc","noc","sld","tld","asn","hf","irt"];
$.getJSON(b,function(e){var f={};
c.forEach(function(j){var i=j;
var h=j;
if(j in d){i=d[j]
}var g=i in e&&e[i]?e[i]:"";
if(j in a){h=a[j]
}f[h]=g
});
vp.neustar=f
}).fail(function(g,h,e){var f=h+", "+e;
console.log("Request Failed: "+f)
})
}};
VisitorProfile.prototype.getNeustarInfoForOmniture=function(){if(document.location.href.indexOf("-auth")===-1&&!this.isLoginPromo()){var c=["postcode","city","state","region","country","dma"],d=[];
for(var b in c){var a=c[b];
if(_.has(vp.neustar,a)&&vp.neustar[a]!==""){d.push(vp.neustar[a])
}}return d.join("|")
}};
VisitorProfile.prototype.getAkaInfo=function(){if(document.location.hostname.indexOf("-auth")===-1&&!this.isLoginPromo()){var b="/wbin/www-core/f/g?analytics=true&aka=y",a={pc:"postcode",cic:"city",sc:"state",rc:"region",cc:"country",ncc:"carrier",ntc:"connection_type",hf:"hosting_facility",irt:"ip_routing_type",nsc:"line_speed",noc:"organization"},d={dma:"dmac"},c=["pc","cic","sc","rc","cc","dma","coc","ac","tzc","loc","lac","dmac","msac","ntc","nsc","ncc","noc","sld","tld","asn","hf","irt"];
$.getJSON(b,function(e){var f={};
c.forEach(function(j){var i=j;
var h=j;
if(j in d){i=d[j]
}var g=i in e&&e[i]?e[i]:"";
if(j in a){h=a[j]
}f[h]=g
});
vp.aka=f
}).fail(function(g,h,e){var f=h+", "+e;
console.log("Request Failed: "+f)
})
}};
var vp=new VisitorProfile();
"use strict";
var Page={name:null,server:null,previous:null,previousUrl:null,locale:null,needNameRecal:false,isValidLocale:function(a){var b=["ap","au","br","ca","cn","de","dk","es","eu","fi","fr","fr-ca","in","it","jp","kr","mx","ne","nl","no","se","tw","uk","us","my","hk","th","fi","dk","pl","tr"];
return b.indexOf(a)>-1
},isValidServer:function(b){var a=["SFDC","APPX","STOR","LMS","TRUST","DFC","COMM"];
return a.indexOf(b)>-1
},getPathNode:function(c,a){var b;
if(typeof a==="string"){b=a.split(":")
}else{b=this.name?this.name.split(":"):Url.sanitizedPathname().split("/")
}var d=(c<=b.length?b[c]:"");
if(null!=d&&""!==d){return d.toString()
}else{return""
}},setServer:function(a){if(a&&this.isValidServer(a)){this.server=a;
return this.server
}this.server="SFDC";
return this.server
},getServer:function(){if(this.server==null){this.setServer()
}return this.server
},getPrevious:function(){if(this.previous==null){this.previous=vp.getActivity("l_page")
}return this.previous
},getPreviousUrl:function(){if(this.previousUrl==null){this.previousURl=vp.getActivity("l_page_url")
}return this.previousUrl
},getLocale:function(b){if(!b&&this.locale){return this.locale
}var c=this.getPathNode(1,b).match(/^(\w{2})$/)||this.getPathNode(1,b).match(/^(\w{2}-\w{2})$/);
if(c!=null&&c.length>0){var a=c[0].toLowerCase();
if(this.isValidLocale(a)){if(b){return a
}this.locale=a
}}return this.locale?this.locale:"us"
},getSegment:function(){var b=vp.getType(),a=this.getLocale();
if(b==="employee"||b==="customer"){return b+":"+a
}else{return"non-customer:"+a
}},setName:function(a){if(a==="SFDC:error_404"){this.name=a.replace(this.getServer()+":",this.getServer()+":"+this.getLocale()+":")
}},calculateName:function(a){this.name=a;
this.needNameRecal=true;
return a
}};