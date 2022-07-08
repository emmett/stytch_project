"use strict";
var vp=vp||{};
(function(){vp.getDaysSinceLastVisit=function(){var a=this.getActivity("l_vdays");
if(a===-1){return"First Visit"
}else{if(a>-1&&a<=1){return"Less than 1 day"
}else{if(a>1&&a<=7){return"Less than 7 days"
}else{if(a>7&&a<=30){return"More than 7 days"
}else{if(a>30){return"More than 30 days"
}else{return"Cookies Not Supported"
}}}}}};
vp.getFirstFormCompleteTime=function(){if(this.getActivity("f_form")){return""
}this.activityData.f_form=this.timestamp;
this.saveActivityData();
var b=(this.getActivity("f_form")-this.getActivity("f_visit"))/1000;
var c=60,a=60,e=24;
if(b<=0){return"No Time Available"
}else{if(b<(5*a)){return"< 5 minutes"
}else{if(b<(10*a)){return"5-10 minutes"
}else{if(b<(30*a)){return"10-30 minutes"
}else{if(b<(2*a*c)){return"30 minutes to 2 hours"
}else{if(b<(5*a*c)){return"2-5 hours"
}else{if(b<(a*c*e)){return"5 hours to 1 day"
}else{if(b<(2*a*c*e)){return"1-2 days"
}else{if(b<(7*a*c*e)){return"2-7 days"
}else{if(b<(14*a*c*e)){return"1-2 weeks"
}else{return"> 2 weeks"
}}}}}}}}}}};
vp.getFormCompleteId=function(){return this.fcid
};
let isSkipFormRedirect=function(){return(Util.getParam("redirect")==="true"&&Util.getParam("leadcreated")==="true")
};
vp.setFormCompleteId=function(){var a=Util.getParam("FormCampaignId")||(isSkipFormRedirect()&&Util.getParam("nc"))||this.getProperty("fcid");
if(a){this.fcid=Util.convert15To18(a)+"|"+this.getProperty("hash")
}};
if(vp.getProperty("hash")&&((vp.getProperty("fcid")||Util.getParam("FormCampaignId"))||(isSkipFormRedirect()&&Util.getParam("nc")))){vp.setFormCompleteId()
}}());
"use strict";
var Page=Page||{};
(function(){var a=["un","pw","vysfid","vyemail"];
Page.leadCaptureForms=[];
Page.hasExcludedParam=function(c){for(var d=0,b=a.length;
d<b;
d++){if(Util.getParam(a[d],c)){return true
}}return false
};
Page.getDisplayAdId=function(){if(Util.getCookie("adId")){this.displayAdId=Util.convert15To18(Util.getCookie("adId"));
Util.deleteCookie("adId")
}return this.displayAdId||""
};
Page.isFormKickback=function(){return !!(Util.getParam("ve"))
};
Page.isSkipFormRedirect=function(){return(Util.getParam("redirect")==="true"&&Util.getParam("leadcreated")==="true")
};
Page.isMigratedPage=function(){return typeof Modernizr==="object"
};
Page.isCareersForm=function(b){var c;
if(typeof b==="string"){c=b
}else{c=this.getName()
}return c.indexOf(":form:careers")>-1
};
Page.hasLeadCaptureForm=function(){var b="https://hosted-scratch.herokuapp.com/trial",d="form[data-sfdc-form]",c=document.querySelectorAll(d);
if(!c){return false
}c=Array.prototype.slice.call(c).filter(function(e){return e.sfdcForm&&(e.sfdcForm.formType==="lead"||e.action.indexOf(b)>-1)
});
return c.length>0
};
Page.isFromSingleLineForm=function(){return document.querySelectorAll('form input[name="isFromSingleLineForm"]').length>0
};
Page.getChannel=function(){var b=this.getLocale()+":"+(this.getPathNode(2)?this.getPathNode(2):"other");
if(this.getPathNode(3)==="news-press"&&this.getPathNode(4)==="press-releases"){b+=":"+this.getPathNode(3)+":"+this.getPathNode(4)
}else{if(this.getPathNode(3)==="careers"){b+=":"+this.getPathNode(3)
}}return b
}
}());
"use strict";
var Page=Page||{};
(function(){function a(c){if(!c){return""
}var b=Page.getLocale();
c=c.replace("login-messages:","");
c=c.replace("messages:","");
c=c.replace("promos:","");
c=c.indexOf(":")===0?c.substring(1):c;
c=c.charAt(c.length-1)===":"?c.substring(0,c.length-1):c;
c=c?c:b;
if(!Page.isValidLocale(c)){var e=[{str:"appexchange",srv:"APPX"},{str:"appstore",srv:"STOR"},{str:"lms",srv:"LMS"},{str:"lmsdev",srv:"LMS"},{str:"developer",srv:"DFC"},{str:"community",srv:"COMM"}];
for(var d=0;
d<e.length;
d++){if(c.indexOf(e[d].str)>-1){c=c.replace(e[d].str,"");
c=c.indexOf(":")===0?c.substring(1):c;
c+=(c===""?b:"");
Page.setServer(e[d].srv);
break
}}}c=":"+c+":login";
if(c.indexOf("mobile")>-1){c=c.replace("mobile:login","login-mobile");
c=Util.getParam("locale")?(":"+Util.getParam("locale").toLowerCase()+c):c
}c=vp.hasCurrentTrial()&&!vp.isCustomer()&&!vp.isEmployee()?c.replace(/login/,"login:freetrial"):c;
c=vp.getType()==="developer"&&c.indexOf("login:freetrial")===-1?c.replace(/login/,"login:developer"):c;
return c
}Page.calculateName=function(b,i){var g=false,d=":us",h="SFDC:error_404",j=this.getLocale();
if(b===h){b="";
g=true
}else{if(!b||b.indexOf("http")>-1){b=Url.sanitizedPathname();
i=document.location.hostname
}}if(b===Url.sanitizedPathname()){var e=Util.getMeta("analytics_url");
b=e?e:b
}if(!i){i=document.location.hostname
}if(b.indexOf("/")>-1&&b.indexOf(":")<0){b=b.replace(/\//g,":");
b=b.replace(/:index\.jsp/,"");
b=b.replace(/\.jsp|\.htm(l?)/,"");
b=b.charAt(b.length-1)===":"?b:b+":";
if(b.indexOf("login-messages")>-1){b=a(b)
}if(b.match(/^:\w{2}-\w{2}:/)||b.match(/^:\w{2}:/)){d=""
}b=this.getServer()+d+b;
b=b.charAt(b.length-1)===":"?b.substring(0,b.length-1):b
}if(!this.isValidServer(this.getPathNode(0,b))){this.setServer();
b=this.getServer()+(b.charAt(0)===":"?"":":")
}if(!this.isValidLocale(this.getPathNode(1,b))){var c=b.split(":");
c.splice(1,0,this.locale);
b=c.join(":")
}if(!this.getPathNode(2,b)){b+=":homepage"
}if(g){b=h.replace(this.getServer()+":",this.getServer()+":"+j+":")
}if(i.indexOf("certification.salesforce.com")>-1){var f=this.getServer()+":"+j;
b=b.replace(f,f+":certification");
b=b.replace(":Home","");
b=this.getServer()+b.substring(this.getServer().length).toLowerCase()
}if(this.isConfirmation(b)&&!this.isError(b)&&!this.hasLeadCaptureForm()){b=b+":[conf]"
}if(b==="SFDC:"+j+":blog"){b=b+":homepage"
}return b
};
Page.setPrevious=function(b){var c;
if(typeof b==="string"){c=b
}else{c=this.getName()
}if(this.previous==null){this.previous=vp.getActivity("l_page")
}vp.activityData.l_page=c;
if(vp.activityData.pv==null){vp.activityData.pv=0
}vp.activityData.pv++;
vp.saveActivityData();
return this.previous
};
Page.setPreviousUrl=function(b){let curPageUrl;
if(typeof b==="string"){curPageUrl=b
}else{curPageUrl=this.getUrl()
}if(this.previousUrl==null){this.previousUrl=vp.getActivity("l_page_url")
}vp.activityData.l_page_url=curPageUrl;
vp.saveActivityData();
return this.previousUrl
};
Page.setName=function(b){this.name=this.calculateName(b);
vp.activityData.seg=this.getSegment();
this.setPrevious(this.name);
return this.name
};
Page.setUrl=function(b){if(!b){let analyticsUrl=Util.getMeta("analytics_url"),currentUrl=window.location.href;
currentUrl=Page.hasExcludedParam(currentUrl)?currentUrl.split("?")[0]:currentUrl;
if(analyticsUrl){if(analyticsUrl.indexOf("https")>-1||analyticsUrl.indexOf("http")>-1){this.url=analyticsUrl
}else{this.url=document.location.hostname+analyticsUrl
}}else{this.url=currentUrl
}}this.setPreviousUrl(this.url);
return this.url
};
Page.getName=function(){if(this.name&&this.needNameRecal){this.setName(this.name);
this.needNameRecal=false
}else{if(this.name==null){this.setName()
}}return this.name
};
Page.getUrl=function(){if(this.url&&this.needNameRecal){this.setUrl(this.url);
this.needNameRecal=false
}else{if(this.url==null){this.setUrl()
}}return this.url
};
Page.getNameNoLocale=function(){return this.getName().replace(":"+this.getLocale()+":",":")
}
}());
"use strict";
var Page=Page||{};
(function(){function a(){var d=".salesforce.com",b=document.createElement("a"),c,e;
b.href=document.referrer;
c=b.hostname!==location.hostname;
e=b.hostname.indexOf(d)>-1&&location.hostname.indexOf(d)>-1;
return c&&e&&!Page.getDriver()
}Page.getSFDCNetworkReferrer=function(){return a()?this.lookupDriver(location.href,this.getReferrer()):null
};
Page.getReferrer=function(){if(this.referrer){return this.referrer
}else{this.referrer="";
if(Util.getParam("r")){this.referrer=Util.getParam("r");
if(this.referrer.length===1){this.referrer="";
return this.referrer
}}else{if(Util.getParam("adobe_mc_ref")){this.referrer=Util.getParam("adobe_mc_ref")
}else{var b=Util.getCookie("referrer");
if(!(b===""||b==null||b==="null")){Util.deleteCookie("referrer");
this.referrer=b
}else{if(document.referrer){this.referrer=this.hasExcludedParam(document.referrer)?document.referrer.split("?")[0]:document.referrer
}}}}if(this.isLogin()&&this.referrer.indexOf("https://login.salesforce.com")===0){this.referrer="https://login.salesforce.com"
}this.referrer=this.referrer.indexOf("://")===-1?Url.decodeComponent(this.referrer):this.referrer
}return this.referrer
};
Page.hasExternalReferrer=function(){var d=this.getReferrer()?this.getReferrer():"",c=Server.getExternalDomains();
if(!d){return true
}d=d.indexOf("?")===-1?d:d.substring(0,d.indexOf("?"));
for(var b=0;
b<c.length;
b++){if(d.indexOf(c[b])>-1){return true
}}return false
};
Page.hasInternalReferrer=function(){if(this.hasExternalReferrer()){return false
}var d=this.getReferrer()?this.getReferrer():"",c=Server.getInternalDomains();
d=d.indexOf("?")===-1?d:d.substring(0,d.indexOf("?"));
for(var b=0;
b<c.length;
b++){if(d.indexOf(c[b])>-1){return true
}}return !!(Util.getParam("internal")==="true"||(this.getPrevious()&&!(Util.getParam("r")||d)))
}
}());
"use strict";
var Page=Page||{};
(function(){Page.driver=null;
var a="Typed/Bookmarked";
var b={types:[{name:"SEM",qp:"d,dcmp",cb:"getSearchData"},{name:"Email",qp:"d",cb:"getEmail",d:"70130000000sUfv"},{name:"BAN",qp:"d,ban",cb:"getDisplay"},{name:"SEO",cb:"getSearchData",d:"70130000000sUVb"},{name:"Paid Social Media",qp:"d",cb:"getSocial"},{name:"Social Media",d:"70130000000sUVl",pm:[{name:"youtube",ms:"youtube.com"},{name:"vidyard",ms:"vidyard.com"},{name:"twitter",ms:"twitter.com,.t.co,/t.co/",d:"70130000000szyK"},{name:"linkedin",ms:"linkedin.com,lnkd.in",d:"70130000000szyP"},{name:"facebook",ms:"facebook.com",d:"70130000000szyF"},{name:"instagram",ms:"instagram.com",d:"701300000025Rrr"},{name:"flickr",ms:"flickr.com,flickr.net"},{name:"slideshare",ms:"slideshare.com,slideshare.net"},{name:"googleplus",ms:"plus.google.com,plus.url.google.com",d:"70130000000szyU"},{name:"vimeo",ms:"vimeo.com"},{name:"pinterest",ms:"pinterest.com,pintrest.com",d:"70130000000szyZ"},{name:"foursquare",ms:"foursquare.com"},{name:"stumbleupon",ms:"stumbleupon.com"},{name:"yelp",ms:"yelp.com"},{name:"myspace",ms:"myspace.com"},{name:"xing",ms:"xing.com"},{name:"mixi",ms:"mixi.jp"},{name:"viadeo",ms:"viadeo.com"},{name:"friendster",ms:"friendster.com"},{name:"badoo",ms:"badoo.com"},{name:"bebo",ms:"bebo.com"},{name:"hi5",ms:"hi5.com"},{name:"myyearbook",ms:"myyearbook.com"},{name:"nig",ms:"nig.com"},{name:"tumblr",ms:"tumblr.com"},{name:"xanga",ms:"xanga.com"},{name:"yammer",ms:"yammer.com"},{name:"medium",ms:"medium.com"}]},{name:"SFDC Network",d:"70130000000sUW0",pm:[{name:"[AppExchange]",ms:"appexchange.salesforce.com,appexchangejp.salesforce.com,sites.secure.force.com/appexchange,go.appexchange.com"},{name:"[Community Site]",ms:"success.salesforce.com,sites.secure.force.com"},{name:"[DeveloperForce]",ms:"developer.salesforce.com"},{name:"[Help&Training]",ms:"help.salesforce.com"},{name:"[Foundation]",ms:"foundation.force.com,salesforcefoundation.org"},{name:"[VMForce]",ms:"vmforce.com"},{name:"[YourServiceCloud.com]",ms:"yourservicecloud.com,yourservicecloud.force.com"},{name:"[JoinTheConversations.com]",ms:"jointheconversations.com"},{name:"[Chatter.com]",ms:"chatter.com"},{name:"[Site.com]",ms:"site.com"},{name:"[Work.com]",ms:"work.com"},{name:"[Database.com]",ms:"database.force.com,database.com"},{name:"[Data.com]",ms:"data.com"},{name:"[Jigsaw.com]",ms:"jigsaw.com"},{name:"[Force.com]",ms:"www.force.com"},{name:"[Force.com Sites]",ms:".force.com"},{name:"[www.salesforce.com]",ms:"www.salesforce.com"},{name:"[trust.salesforce.com]",ms:"trust.salesforce.com"},{name:"[Salesforce Blogs]",ms:"blogs.salesforce.com, cloudblog.salesforce.com"},{name:"[Desk.com]",ms:".desk.com"},{name:"[Relateiq.com]",ms:".salesforceiq.com"},{name:"[Steelbrick.com]",ms:".steelbrick.com, steelbrick.de"},{name:"[Demandware]",ms:".demandware.com"},{name:"[Beyondcore]",ms:".beyondcore.com,https://beyondcore.com"},{name:"[Heywire]",ms:".heywire.com"},{name:"[Quip]",ms:".quip.com,https://quip.com"},{name:"[Gravity Tank]",ms:".gravitytank.com"},{name:"[MuleSoft]",ms:"mulesoft.com"},{name:"[CloudCraze]",ms:"cloudcraze.com"},{name:"[Datorama.com]",ms:"datorama.com"},{name:"[MapAnything.com]",ms:"mapanything.com"},{name:"[sfdc.co]",ms:"sfdc.co"},{name:"[salesforce.com]",ms:"https://salesforce.com"},{name:"[cloudforce.com sites]",ms:".cloudforce.com"},{name:"[heroku.com sites]",ms:".heroku.com, heroku.support"},{name:"[citizendevelopment.salesforce.com]",ms:"citizendevelopment.salesforce.com"},{name:"[compliance.salesforce.com]",ms:"compliance.salesforce.com"},{name:"[crm.dev]",ms:"crm.dev"},{name:"[developer.mulesoft.com]",ms:"developer.mulesoft.com"},{name:"[einstein analytics sites]",ms:"einstein.ai, einsteinanalyticslearningmap.com, einsteinreadiness.salesforce.com"},{name:"[getessentials.com]",ms:"getessentials.com"},{name:"[insidestories.salesforce.com]",ms:"insidestories.salesforce.com"},{name:"[lightning sites]",ms:"lightning-assessment.salesforce.com, lightning-configuration.salesforce.com, lightningappcookbook.salesforce.com, lightningdesignsystem.com"},{name:"[mobilebeta.salesforce.com]",ms:"mobilebeta.salesforce.com"},{name:"[ohana.salesforce.com]",ms:"ohana.salesforce.com"},{name:"[opensource.salesforce.com]",ms:"opensource.salesforce.com"},{name:"[pages.mail.salesforce.com]",ms:"pages.mail.salesforce.com"},{name:"[pardot.com]",ms:"pardot.com"},{name:"[partnernavigator.salesforce.com]",ms:"partnernavigator.salesforce.com"},{name:"[partners.salesforce.com]",ms:"partners.salesforce.com"},{name:"[partnersignup.salesforce.com]",ms:"partnersignup.salesforce.com"},{name:"[pathfinder.salesforce.com]",ms:"pathfinder.salesforce.com"},{name:"[platform-roi-calculator.salesforce.com]",ms:"platform-roi-calculator.salesforce.com"},{name:"[platformtour.salesforce.com]",ms:"platformtour.salesforce.com"},{name:"[quotable.com]",ms:"quotable.com"},{name:"[recurringrelationships.salesforce.com]",ms:"recurringrelationships.salesforce.com"},{name:"[docs.salesforce.com]",ms:".docs.salesforce.com"},{name:"[salesforccesponsorship.com sites]",ms:".salesforcesponsorship.com"},{name:"[salesforcestore.com sites]",ms:".salesforcestore.com"},{name:"[service-value.salesforce.com]",ms:"service-value.salesforce.com"},{name:"[trailblazer login]",ms:"trailblazer.me"},{name:"[trailblazer.salesforce.com]",ms:"trailblazer.salesforce.com"},{name:"[trailblazercommunitygroups.com]",ms:"trailblazercommunitygroups.com"},{name:"[engineering.salesforce.com]",ms:"engineering.salesforce.com"},{name:"[salesforce.org]",ms:"salesforce.org"},{name:"[salesforcejapan.com sites]",ms:".salesforcejapan.com"},{name:"[salesforce.wd1.myworkdayjobs.com]",ms:"salesforce.wd1.myworkdayjobs.com"},{name:"[Salesforce Essentials]",ms:"essentials.salesforce.com"},{name:"[getessentials]",ms:"getessentials.com"},{name:"[partners.salesforce.com]",ms:"partners.salesforce.com"},{name:"[trailhead.salesforce.com]",ms:"trailhead.salesforce.com"},{name:"[trailhead]",ms:"trailhead.com"},{name:"[tableau]",ms:"tableau.com"},{name:"[evergage]",ms:"evergage.com"},{name:"[clicksoftware]",ms:"clicksoftware.com"},{name:"[Salesforce.com App]",ms:".salesforce.com"}]},{name:"External Websites",cb:"getReferredDriver",d:"70130000000sUVv"},{name:"Other",qp:"d",cb:"fixInternal"},{name:a,d:"7010M000002Mw7O"}],searchEngines:[{se:"All The Web",ms:"alltheweb.com",kw:"q,query",dc:"US"},{se:"AllSearchEngines",ms:"allsearchengines.co.uk",kw:"query",dc:"United Kingdom"},{se:"AltaVista",ms:"altavista.com",kw:"q,r",dc:"US",cl:[{cn:"Canada",pre:"ca."},{cn:"Denmark",pre:"dk."},{cn:"France",pre:"fr."},{cn:"Germany",pre:"de."},{cn:"Italy",pre:"it."},{cn:"Netherlands",pre:"nl."},{cn:"Norway",pre:"no."},{cn:"Spain",pre:"es."},{cn:"Sweden",pre:"se."},{cn:"Switzerland",pre:"ch."},{cn:"United Kingdom",pre:"uk."}]},{se:"AOL",ms:".aol.",kw:"q,query",dc:"US",cl:[{cn:"Canada",post:"ca"},{cn:"France",post:"fr"},{cn:"Germany",post:"de"},{cn:"United Kingdom",post:"co.uk"}]},{se:"Ask",ms:"ask.com",kw:"q",dc:"US",cl:[{cn:"Japan",pre:"jp"},{cn:"United Kingdom",pre:"uk"}]},{se:"Baidu",ms:"baidu.com",kw:"wd,s",dc:"China"},{se:"BeGuide.com",ms:"beguide.com",kw:"q,search",dc:"US"},{se:"Biglobe",ms:"biglobe.ne.jp",kw:"q",dc:"Japan"},{se:"Microsoft Bing",ms:"bing.com",kw:"q",dc:"US"},{se:"Blue Window",ms:"search.bluewin.ch",kw:"q,qry",dc:"Switzerland"},{se:"Business.com",ms:"business.com",kw:"query",dc:"US"},{se:"BuyersIndex",ms:"buyersindex.com",kw:"query",dc:"US"},{se:"Chubba",ms:"whatuseek.com",kw:"arg",dc:"US"},{se:"CNET",ms:"cnet.com",kw:"query,q",dc:"US"},{se:"Debriefing.com",ms:"debriefing.com",kw:"tsearch",dc:"US"},{se:"Dmoz",ms:"dmoz.org",kw:"search",dc:"US"},{se:"Excite",ms:"excite.com",kw:"q,search",dc:"US",cl:[{cn:"Netherlands",post:".nl"},{cn:"France",post:".fr"},{cn:"Germany",post:".de"},{cn:"Japan",post:".co.jp"},{cn:"Switzerland",post:".ch"}]},{se:"Fireball",ms:"fireball.de",kw:"q,query",dc:"Germany"},{se:"FreshEye",ms:"fresheye.com",kw:"kw,ord",dc:"Japan"},{se:"Godado",ms:"godado.it",kw:"key",dc:"Italy"},{se:"Goo (Jp.)",ms:"goo.ne.jp",kw:"MT",dc:"Japan"},{se:"Google",ms:".google.,googlesyndication.com",kw:"q",types:[{tn:"Images",pre:"images"},{tn:"Video",pre:"video"}],dc:"US",cl:[{cn:"Afghanistan",post:"com.af"},{cn:"American Samoa",post:"as"},{cn:"Anguilla",post:"com.ai"},{cn:"Antigua and Barbuda",post:"com.ag"},{cn:"Argentina",post:"com.ar"},{cn:"Armenia",post:"am"},{cn:"Australia",post:"com.au"},{cn:"Austria",post:"at"},{cn:"Azerbaijan",post:"az"},{cn:"Bahrain",post:"com.bh"},{cn:"Bangladesh",post:"com.bd"},{cn:"Belarus",post:"com.by"},{cn:"Belgium",post:"be"},{cn:"Belize",post:"com.bz"},{cn:"Bolivia",post:"com.bo"},{cn:"Bosnia-Hercegovina",post:"ba"},{cn:"Botswana",post:"co.bw"},{cn:"Brasil",post:"com.br"},{cn:"British Virgin Islands",post:"vg"},{cn:"Brunei",post:"com.bn"},{cn:"Bulgaria",post:"bg"},{cn:"Burundi",post:"bi"},{cn:"Cambodia",post:"com.kh"},{cn:"Canada",post:"ca"},{cn:"Chile",post:"cl"},{cn:"China",post:"cn"},{cn:"Colombia",post:"com.co"},{cn:"Cook Islands",post:"co.ck"},{cn:"Costa Rica",post:"co.cr"},{cn:"Cote D'Ivoire",post:"ci"},{cn:"Croatia",post:"hr"},{cn:"Cuba",post:"com.cu"},{cn:"Czech Republic",post:"cz"},{cn:"Denmark",post:"dk"},{cn:"Djibouti",post:"dj"},{cn:"Dominica",post:"dm"},{cn:"Dominican Republic",post:"com.do"},{cn:"Ecuador",post:"com.ec"},{cn:"Egypt",post:"com.eg"},{cn:"El Salvador",post:"com.sv"},{cn:"Estonia",post:"ee"},{cn:"Ethiopia",post:"com.et"},{cn:"Fiji",post:"com.fj"},{cn:"Finland",post:"fi"},{cn:"France",post:"fr"},{cn:"Germany",post:"de"},{cn:"Greece",post:"gr"},{cn:"Greenland",post:"gl"},{cn:"Guadeloupe",post:"gp"},{cn:"Guatemala",post:"com.gt"},{cn:"Guernsey",post:"gg"},{cn:"Guyana",post:"gy"},{cn:"Haiti",post:"ht"},{cn:"Honduras",post:"hn"},{cn:"Hong Kong",post:"com.hk"},{cn:"Hungary",post:"hu"},{cn:"India",post:"co.in"},{cn:"Indonesia",post:"co.id"},{cn:"Ireland",post:"ie"},{cn:"Island",post:"is"},{cn:"Isle of Gibraltar",post:"com.gi"},{cn:"Isle of Man",post:"im"},{cn:"Israel",post:"co.il"},{cn:"Italy",post:"it"},{cn:"Jamaica",post:"com.jm"},{cn:"Japan",post:"co.jp"},{cn:"Jersey",post:"je"},{cn:"Jordan",post:"jo"},{cn:"Kazakhstan",post:"kz"},{cn:"Kenya",post:"co.ke"},{cn:"Kiribati",post:"ki"},{cn:"Korea",post:"co.kr"},{cn:"Kyrgyzstan",post:"kg"},{cn:"Laos",post:"la"},{cn:"Latvia",post:"lv"},{cn:"Lesotho",post:"co.ls"},{cn:"Libya",post:"com.ly"},{cn:"Liechtenstein",post:"li"},{cn:"Lithuania",post:"lt"},{cn:"Luxembourg",post:"lu"},{cn:"Madagascar",post:"mgz"},{cn:"Malawi",post:"mw"},{cn:"Malaysia",post:"com.my"},{cn:"Maldives",post:"mv"},{cn:"Malta",post:"com.mt"},{cn:"Mauritius",post:"mu"},{cn:"Mexico",post:"com.mx"},{cn:"Micronesia",post:"fm"},{cn:"Moldova",post:"md"},{cn:"Mongolia",post:"mn"},{cn:"Montserrat",post:"ms"},{cn:"Morocco",post:"co.ma"},{cn:"Namibia",post:"com.na"},{cn:"Nauru",post:"nr"},{cn:"Nepal",post:"com.np"},{cn:"Netherlands",post:"nl"},{cn:"New Zealand",post:"co.nz"},{cn:"Nicaragua",post:"com.ni"},{cn:"Nigeria",post:"com.ng"},{cn:"Niue",post:"nu"},{cn:"Norfolk Island",post:"com.nf"},{cn:"Norway",post:"no"},{cn:"Oman",post:"com.om"},{cn:"Pakistan",post:"com.pk"},{cn:"Panama",post:"com.pa"},{cn:"Paraguay",post:"com.py"},{cn:"Peru",post:"com.pe"},{cn:"Philippines",post:"com.ph"},{cn:"Pitcairn Islands",post:"pn"},{cn:"Poland",post:"pl"},{cn:"Portugal",post:"pt"},{cn:"Puerto Rico",post:"com.pr"},{cn:"Qatar",post:"com.qa"},{cn:"Rep. Dem. du Congo",post:"cd"},{cn:"Rep. du Congo",post:"cg"},{cn:"Repulic of Georgia",post:"ge"},{cn:"Romania",post:"ro"},{cn:"Russia",post:"ru"},{cn:"Rwanda",post:"rw"},{cn:"Saint Helena",post:"sh"},{cn:"Saint Vincent and the Grenadine",post:"com.vc"},{cn:"Samoa",post:"ws"},{cn:"San Marino",post:"sm"},{cn:"Sao Tome and Principe",post:"st"},{cn:"Saudi Arabia",post:"com.sa"},{cn:"Senegal",post:"sn"},{cn:"Seychelles",post:"sc"},{cn:"Singapore",post:"com.sg"},{cn:"Slovakia",post:"sk"},{cn:"Slovenia",post:"si"},{cn:"Solomon Islands",post:"com.sb"},{cn:"South Africa",post:"co.za"},{cn:"Spain",post:"es"},{cn:"Sri Lanka",post:"lk"},{cn:"Sweden",post:"se"},{cn:"Switzerland",post:"ch"},{cn:"Taiwan",post:"com.tw"},{cn:"Tajikistan",post:"com.tj"},{cn:"Thailand",post:"co.th"},{cn:"The Bahamas",post:"bs"},{cn:"The Gambia",post:"gm"},{cn:"Timor-Leste",post:"tp"},{cn:"Tokelau",post:"tk"},{cn:"Tonga",post:"to"},{cn:"Trinidad and Tobago",post:"tt"},{cn:"Turkey",post:"com.tr"},{cn:"Turkmenistan",post:"tm"},{cn:"Uganda",post:"co.ug"},{cn:"Ukraine",post:"com.ua"},{cn:"United Arab Emirates",post:"ae"},{cn:"United Kingdom",post:"co.uk"},{cn:"Uruguay",post:"com.uy"},{cn:"Uzbekiston",post:"co.uz"},{cn:"Vanuatu",post:"vu"},{cn:"Venezuela",post:"co.ve"},{cn:"Viet Nam",post:"com.vn"},{cn:"Virgin Islands",post:"co.vi"},{cn:"Yugoslavia",post:"co.yu"},{cn:"Zambia",post:"co.zm"},{cn:"Zimbabwe",post:"co.zw"}]},{se:"Hotbot",ms:"hotbot.com",kw:"query",dc:"US"},{se:"ilse.nl",ms:"ilse.nl",kw:"search_for",dc:"Netherlands"},{se:"Indeed",ms:"www.indeed.",kw:"q",dc:"US",cl:[{cn:"Canada",post:"ca"},{cn:"India",post:"co.in"}]},{se:"InfoSpace",ms:"infospace.com",kw:"",dc:"US"},{se:"InfoTiger",ms:"infotiger.com",kw:"qs",dc:"US"},{se:"Livedoor",ms:"livedoor.com",kw:"q",dc:"Japan"},{se:"Lycos",ms:".lycos",kw:"query",dc:"US",cl:[{cn:"France",post:".fr"},{cn:"Germany",post:".de"},{cn:"Italy",post:".it"},{cn:"Netherlands",post:".nl"},{cn:"Spain",post:".es"},{cn:"United Kingdom",post:".co.uk"}]},{se:"Metacrawler",ms:"metacrawler.com",kw:"",dc:"US"},{se:"Monster Crawler",ms:"monstercrawler.com",kw:"",dc:"US"},{se:"myGO",ms:"mygo.com",kw:"",dc:"Taiwan"},{se:"Nate.com",ms:"nate.com",kw:"q",dc:"Korea"},{se:"Naver",ms:"naver.com",kw:"query",dc:"Korea"},{se:"NetSearch",ms:"netscape.com",kw:"qry_str",dc:"US"},{se:"Nifty",ms:"nifty.com,search.nifty.com",kw:"q",dc:"Japan"},{se:"Oh! New? Mobile",ms:"ohnew.co.jp",kw:"k",dc:"Japan"},{se:"OptusZoo",ms:"optuszoo.com.au",kw:"q",dc:"Australia"},{se:"Reference.com",ms:"reference.com",kw:"q",dc:"US"},{se:"Search.ch",ms:"search.ch",kw:"q",dc:"Switzerland"},{se:"Searchalot",ms:"searchalot.com",kw:"q,query",dc:"US"},{se:"Tiscali",ms:"tiscali.it",kw:"key",dc:"Italy"},{se:"track.nl",ms:"track.nl",kw:"qr",dc:"Netherlands"},{se:"Virgilio",ms:"ricerca.virgilio.it,virgilio.it",kw:"qs",dc:"Italy"},{se:"Web Wombat",ms:"webwombat.com.au",kw:"ix,I",dc:"Australia"},{se:"Web.de",ms:"web.de",kw:"su",dc:"Germany"},{se:"Webalta",ms:"webalta.ru",kw:"q",dc:"Russia"},{se:"WebCrawler",ms:"webcrawler.com",kw:"",dc:"US"},{se:"Yahoo!",ms:"search.yahoo.",kw:"p",dc:"US",cl:[{cn:"Argentina",pre:"ar."},{cn:"Asia",pre:"asia."},{cn:"Australia",pre:"au."},{cn:"Austria",pre:"at."},{cn:"Brazil",pre:"br."},{cn:"Canada",pre:"ca."},{cn:"Canada (French)",pre:"qc."},{cn:"Catalan",pre:"ct."},{cn:"China",pre:"cn."},{cn:"Denmark",pre:"dk."},{cn:"Finland",pre:"fi."},{cn:"France",pre:"fr."},{cn:"Germany",pre:"de."},{cn:"Hong Kong",pre:"hk."},{cn:"India",pre:"in."},{cn:"Indonesia",pre:"id."},{cn:"Italy",pre:"it."},{cn:"Japan",post:"co.jp"},{cn:"Korea",pre:"kr."},{cn:"Malaysia",pre:"malaysia."},{cn:"Mexico",pre:"mx."},{cn:"Netherlands",pre:"nl."},{cn:"New Zealand",pre:"nz."},{cn:"Norway",pre:"no."},{cn:"Philippines",pre:"ph."},{cn:"Russia",pre:"ru."},{cn:"Singapore",pre:"sg."},{cn:"Spain",pre:"es."},{cn:"Sweden",pre:"se."},{cn:"Switzerland",pre:"ch."},{cn:"Taiwan",pre:"tw."},{cn:"Thailand",pre:"th."},{cn:"UK and Ireland",pre:"uk."},{cn:"Viet Nam",pre:"vn."}]},{se:"Yandex.ru",ms:"yandex.ru",kw:"text",dc:"Russia"},{se:"zoeken.nl",ms:"zoeken.nl",kw:"q",dc:"Netherlands"}],getReferringDomain:function(){var d=Page.getReferrer(),e="://";
if(!d||d.indexOf("http")!==0){return""
}d=d.indexOf(e)>-1?d.substring(d.indexOf(e)+e.length):d;
d=d.indexOf("/")>-1?d.substring(0,d.indexOf("/")):d;
d=d.indexOf("?")>-1?d.substring(0,d.indexOf("?")):d;
d=d.indexOf("#")>-1?d.substring(0,d.indexOf("#")):d;
return d
},getReferredDriver:function(d){var e=this.getReferringDomain();
if(!(d&&e)){return""
}d.id=(d.id?d.id:d.type)+"|"+e;
return d
},fixInternal:function(f){if(!f){return""
}var h=this.types[5];
for(var g=0;
g<h.pm.length;
g++){var d=h.pm[g].ms.split(",");
for(var e=0;
e<d.length;
e++){if(Page.getReferrer().indexOf(d[e])>-1){return{id:h.name+"|"+h.pm[g].name,type:h.type,internal:Util.getParam("d")}
}}}return f
},getDefault:function(g,k){if(!g){return""
}for(var f=0;
f<this.types.length;
f++){var h=this.types[f];
if(g===h.name){if(h.pm){var e=k.replace(g+"|","");
for(var d=0;
d<h.pm.length;
d++){if(e===h.pm[d].name&&h.pm[d].d){return h.pm[d].d
}}}if(h.d){return h.d
}}}return""
},getEmail:function(e){var d=document.location.href.toLowerCase();
if(!(d.indexOf("elq_mid=")>-1||d.indexOf("eid=")>-1||d.indexOf("rrid")>-1||d.indexOf("mkt_tok")>-1)){return""
}return e
},getDisplay:function(d){if(!(d&&d.id&&d.type)){return""
}var f=Url.decodeComponent(Util.getParam("ban")).replace(/_/g,"|"),e="ban|";
if(f.indexOf(e)===0||f.indexOf(e.toUpperCase())===0){f=f.substring(e.length-1)
}f=f.toLowerCase();
if(f.charAt(0)!=="|"){f="|"+f
}return{id:d.id+f,type:d.type}
},getSocial:function(e){var d=Url.decodeComponent(Util.getParam("soc")).toLowerCase();
if(!(e&&d)){return""
}e.id+="|"+d;
return e
},isBaiduSEO:function(d){if(!d){return false
}else{if(d.indexOf(".baidu.")>-1&&(d.indexOf("?wd=")>-1||d.indexOf("&wd=")>-1)){return true
}}},getSearchData:function(r){var g=Page.getReferrer(),s="",f="",p="";
if(!r){return""
}else{if(!(r.type==="SEM"||r.type==="SEO")||(r.type==="SEO"&&r.id)){return""
}}for(var o=0;
o<this.searchEngines.length;
o++){var e=this.searchEngines[o],q=this.searchEngines[o].ms.split(",");
for(var n=0;
n<q.length;
n++){if(q[n]&&(g.indexOf(q[n])>-1)){s=e.se;
if(e.types){for(var u=0;
u<e.types.length;
u++){if(e.types[u].pre&&g.indexOf(e.types[u].pre+q[n])>-1){s=s+" "+e.types[u].tn;
break
}if(e.types[u].post&&g.indexOf(q[n]+e.types[u].post)>-1){s=s+" "+e.types[u].tn;
break
}}}var v=e.kw.split(",");
for(var m=0;
m<v.length;
m++){p=Url.decodeComponent(Util.getParam(v[m],g));
if(p){break
}}if(!p){var d=g.substring(g.indexOf("//")+2);
if((g.indexOf("/url")>-1&&(g.indexOf("q=&")>-1||g.indexOf("?sa=t")>-1))||(d.indexOf("/")===-1||d.indexOf("/")===d.length-1)||this.isBaiduSEO(g)){p="no keyword"+(g.indexOf("https")>-1?" (secure)":"")
}else{break
}}if(e.cl){for(var h=0;
h<e.cl.length;
h++){if(e.cl[h].pre&&g.indexOf(e.cl[h].pre+q[n])>-1){f=e.cl[h].cn
}if(e.cl[h].post&&g.indexOf(q[n]+e.cl[h].post)>-1){f=e.cl[h].cn
}}}if(!f){f=e.dc||"US"
}}}}if((r.id&&r.type==="SEM")||(s&&p)){p=p?Util.cleanUrlData(p):"no keyword";
s=s?(f.toUpperCase()!=="US"&&f!==""?s+" - "+f:s):"no search engine";
if(r.type==="SEM"){r.id+=((s?"|"+s:"")+(p?"|"+p:""))
}return{id:(r.id?r.id:(r.type+"|"+s+"|"+p)),type:r.type,keyword:p,engine:s}
}else{return""
}}};
Page.lookupDriver=function(d,r){var s=Util.getParam("d",d)?Util.convert15To18(Util.getParam("d",d)):"",t;
for(var n=0;
n<b.types.length;
n++){var f=b.types[n];
if(f.qp){var l=f.qp.split(","),g=true;
for(var m=0;
m<l.length;
m++){if(l[m].indexOf("|")>-1){var p=l[m].split("|"),e=false;
for(var h=0;
h<p.length;
h++){if(Util.getParam(p[h],d)){e=true;
break
}}if(!e){g=false
}}else{if(!Util.getParam(l[m],d)){g=false;
break
}}}if(g&&Util.getParam("internal",d)!=="true"){t={id:s+"|"+f.name,type:f.name};
if(f.cb){t=b[f.cb](t);
if(t){if(t.id==="null|Other"){t={id:a,type:a}
}return t
}}else{return t
}}}else{if(f.pm){for(m=0;
m<f.pm.length;
m++){var q=f.pm[m].ms.split(",");
for(var o=0;
o<q.length;
o++){if(r.indexOf(q[o])>-1){t={id:(s?s+"|":"")+f.name+"|"+f.pm[m].name,type:f.name};
return t
}}}}if(f.cb){t={id:(s?s+"|"+f.name:""),type:f.name};
t=b[f.cb](t);
if(t){return t
}}}}};
function c(d){if(!d){return
}vp.activityData.l_dtype=d.type;
if(d.id===a&&d.type===a){vp.activityData.d="7010M000002Mw7O"
}else{vp.activityData.d=Util.getParam("d")?Util.getParam("d"):b.getDefault(d.type,d.id)
}vp.saveActivityData()
}Page.driverLookup=b;
Page.getDriver=function(){if(this.driver){return this.driver
}var e={id:a,type:a},d=Util.getParam("d");
if(this.hasInternalReferrer()){if(d){return{id:(d.length===15?Util.convert15To18(d):d),type:"internal"}
}else{return false
}}else{if(this.getReferrer()||d){e=this.lookupDriver(location.href,this.getReferrer())
}}this.driver=e?e:"";
c(e);
return this.driver
}
}());
"use strict";
var Page=Page||{};
(function(){Page.type=null;
Page.isHome=function(){return this.getName().indexOf("homepage")>-1
};
Page.isSEM=function(){return(this.hasLeadCaptureForm()||this.isConfirmation())&&this.getName().indexOf(":sem:")>-1
};
Page.isLogin=function(){return(this.getName().match(/:\w{2}:(.*:)?login/)!=null)
};
Page.is404=function(){return this.getName().indexOf("error_404")>-1
};
Page.isError=function(a){var b=typeof a==="string"?a:this.getName();
return(b.indexOf("error")!==-1&&this.isConfirmation(a))
};
Page.isSearchResults=function(){return(this.getName().indexOf(":blog:search")>-1||this.getName().indexOf(":video-search")>-1)
};
Page.isBlog=function(){return this.getPathNode(2).indexOf("blog")>-1
};
Page.isSFLive=function(){return this.getPathNode(2).indexOf("video")>-1
};
Page.isDemoConfirmation=function(){return this.isDemo()&&this.isConfirmation()
};
Page.isDemo=function(){return(this.getName().indexOf("demo:")>-1||this.getName().indexOf("demo-")>-1||this.getName().indexOf("demos")>-1||this.getName().indexOf("demo_")>-1||this.isDemoDirectory)||(this.isConfirmation()&&this.getPrevious().indexOf("demo")>-1)
};
Page.isSignup=function(){return this.getName().indexOf("signup")>-1||this.getName().indexOf("trial")>-1||document.location.href.indexOf("SignupServlet")>-1
};
Page.isPricing=function(){return this.getName().indexOf("-pricing")>-1||this.getName().indexOf("pricing-")>-1||this.getName().indexOf("platform-edition")>-1||this.getName().indexOf(":editions")>-1
};
Page.isProductCategory=function(){var b=[":crm:sales-force-automation",":sales-cloud:overview",":service-cloud:overview",":data:overview",":crm:customer-service-support",":platform",":chatter",":chatter:overview",":radian6:overview",":jigsaw"];
for(var a=0;
a<b.length;
a++){if(Util.endsWith(this.getName(),":"+this.getLocale()+b[a])){return true
}}return false
};
Page.isProduct=function(){return !(this.isProductCategory()||this.getCloud()==="No Cloud")||this.getName().indexOf(":products")>-1||this.getName().indexOf(":touch")>-1
};
Page.isEvents=function(){var b=[":events",":cloudforce"];
for(var a=0;
a<b.length;
a++){if(this.getName().indexOf(b[a]+":")>-1||Util.endsWith(this.getName(),b[a])){return true
}}return false
};
Page.isCareersConfirmation=function(a){var b=typeof a==="string"?a:this.getName();
return(b.indexOf(":careers:career-apply-confirm")>-1||b.indexOf(":form:careers:conf")>-1)
};
Page.isSocialEnterprise=function(){return(this.getName().indexOf("social")>-1&&this.getName().indexOf("enterprise")>-1)||this.getChannel().indexOf(":solutions")>-1||this.getChannel().indexOf(":customers")>-1||this.getChannel().indexOf(":like")>-1||this.getName().indexOf("contactme-se")>-1
};
Page.isConfirmation=function(a){var b;
if(typeof a==="string"){b=a
}else{b=this.getName()
}return(((b.indexOf(":conf:")!==-1)||(b.indexOf("[conf]")!==-1)||(Util.endsWith(b,"conf"))||(Url.sanitizedPathname().indexOf("_conf.jsp")!==-1)||(Url.sanitizedPathname().indexOf("SignupServlet")!==-1)||(Url.sanitizedPathname().indexOf("LeadCaptureServlet")!==-1))&&(Page.previous!==Page.name)&&!this.isCareersConfirmation(a))
};
Page.getFormType=function(){var a="";
if(Page.isSEM()){a="SEM Form"
}else{if(Page.isDemo()){a="Demo Form"
}else{if(Page.isSignup()){a="Free Trial"
}else{if(!!~Page.getName().indexOf("contact")){a="Contact Form"
}}}}return a
};
Page.getType=function(){var a=[{name:"Form Page",cb:"hasLeadCaptureForm"},{name:"Form Error Page",cb:"isError"},{name:"Login Page",cb:"isLogin"},{name:"404 Error Page",cb:"is404"},{name:"Search Results Page",cb:"isSearchResults"},{name:"Blog Page",cb:"isBlog"},{name:"Home Page",cb:"isHome"},{name:"Confirmation Page",cb:"isConfirmation"},{name:"Demo Page",cb:"isDemo"},{name:"Pricing and Editions Page",cb:"isPricing"},{name:"Customer Testimonial Page",pm:"customers,success_stories"},{name:"Events Page",cb:"isEvents"},{name:"Video Page",pm:"video"},{name:"Careers Page",pm:"company:careers"},{name:"Press Release Page",pm:"news-press:press-releases"},{name:"Company Page",pm:"company"},{name:"Dreamforce Page",pm:"dreamforce"},{name:"Services: Training Page",pm:"services-training:training_certification"},{name:"Services: Support Page",pm:"services-training:customer-support"},{name:"Services: Consulting Page",pm:"services-training:professional-services"},{name:"Support: Partners Page",pm:"services-training:partner-support"},{name:"Services Page",pm:"services-training"},{name:"Resource Center Page",pm:"resource_center"},{name:"Product Category Page",cb:"isProductCategory"},{name:"Product Page",cb:"isProduct"},{name:"Social Enterprise Page",cb:"isSocialEnterprise"},{name:"Solutions Page",pm:"solutions"},{name:"Country Selector Page",pm:"country_selector"},{name:"Other Page"}];
for(var c=0;
c<a.length;
c++){if(c===a.length-1){break
}else{if(a[c].cb){if(this[a[c].cb]()){return a[c].name
}}else{if(a[c].pm){var d=a[c].pm.split(",");
for(var b=0;
b<d.length;
b++){if(this.getName().indexOf(":"+d[b]+":")>-1||Util.endsWith(this.getName(),":"+d[b])){return a[c].name
}}}}}}return a[a.length-1].name
};
if(Page.isHome()){Page.groupName=(vp.isCustomer()?"Customer Homepage":"Prospect Homepage")+" - "+Page.getLocale().toUpperCase()
}Page.setUrl()
}());
"use strict";
var Page=Page||{};
(function(){Page.ctas=null;
Page.isValidLink=function(e){var b=Util.getHref(e),a=true,d=jQuery;
if(!b){return false
}else{if(!Util.getParam("d",b)){return false
}else{if(!Page.isLogin()&&b.indexOf("/form/")===-1){return false
}else{if(d(e).hasClass("submit")){return false
}else{if(d(e).attr("id")==="free-trial-trigger"&&vp.isCustomer()){return false
}else{if(d(e).attr("class")&&d(e).attr("class").indexOf("chat")>-1){return true
}else{try{(function(f){f(e).parents().each(function(){if(f(this).css("display")==="none"||f(this).css("visibility")==="hidden"||f(this).attr("id")==="nav"||f(this).attr("id")==="footer"||f(this).hasClass("sf-menu")){a=false;
return false
}})
})(jQuery)
}catch(c){}if(!a){return false
}}}}}}}return true
};
Page.setCTAs=function(f,a){f=f?f:"";
a=a?a:"a";
if(this.ctas==null||a){this.ctas=[];
try{(function(h,g){h(a).each(function(){if(g.isValidLink(this)){g.ctas[g.ctas.length]=Util.getParam("d",Util.getHref(this)).length===15?Util.convert15To18(Util.getParam("d",Util.getHref(this))):Util.getParam("d",Util.getHref(this))
}})
})(jQuery,this)
}catch(d){var e=document.getElementsByTagName("a");
for(var c=0;
c<e.length;
c++){var b=Util.getHref(e[c]);
if(b&&Util.getParam("d",b)){this.ctas[this.ctas.length]=Util.getParam("d",b).length===15?Util.convert15To18(Util.getParam("d",b)):Util.getParam("d",b)
}}return false
}}if(f){if(typeof(f)=="string"){this.ctas[this.ctas.length]=f
}else{this.ctas.concat(f)
}}if(this.ctas.length>0){this.ctas=Util.deDupe(this.ctas);
if(this.ctas.length>15){return this.ctas.splice(15,(this.ctas.length-15))
}else{return this.ctas
}}else{return""
}};
Page.getCTAs=function(){if(this.ctas==null){this.setCTAs()
}return this.ctas.length>0?this.ctas:""
}
}());
"use strict";
var Page=Page||{};
(function(){Page.searchTerm=null;
Page.setSearchTerm=function(a){if(!a){return""
}this.searchTerm=Util.cleanUrlData(a);
vp.activityData.l_search=this.searchTerm;
vp.saveActivityData();
return this.searchTerm
};
Page.getSearchTerm=function(){return this.searchTerm==null?"":this.searchTerm
};
Page.setSearchPage=function(a){if(!a){return 1
}this.searchPage=a;
return this.searchPage
};
Page.getSearchPage=function(){return this.searchPage==null?"":this.searchPage
};
Page.getNumSearchResults=function(){if(this.isSearchResults()){var b="";
try{b=jQuery(".gsc-cursor-page:last").html();
b=b==null?"0":b;
b=b.indexOf("(")===0?b.substring(1):b;
b=b.lastIndexOf(")")===b.length-1?b.substring(0,b.length-1):b;
if((/^\d+$/).test(b)){b=parseInt(b);
return b===0?"zero search results":(b*10-9).toString()+" - "+(b*10).toString()
}else{return"[NUMBER OF RESULTS NOT AVAILABLE]"
}}catch(a){}}return""
}
}());
"use strict";
var Page=Page||{};
(function(){var a=typeof sfPageData!=="undefined";
Page.getBlogPostMeta=function(){return a?sfPageData.blogMeta:""
};
Page.getBlogAuthor=function(){return a?sfPageData.blogAuthor:""
};
Page.getBlogArticleTitle=function(){var b=document.querySelector(".articleInfo-title .articleInfo-title-text");
return b!==null?b.textContent.trim():""
};
Page.getCloud=function(){if(a&&sfPageData.pageCloud){return sfPageData.pageCloud
}else{return"No Cloud"
}}
}());
"use strict";
(function(){$(document).ready(function(){function b(e,c,f){var d=new RegExp("([?&])"+c+"=.*?(&|$)","i");
var g=e.indexOf("?")!==-1?"&":"?";
if(e.match(d)){return e.replace(d,"$1"+c+"="+f+"$2")
}else{return e+g+c+"="+f
}}var a={SEM:"701300000021LUP",Email:"701300000021LUU",BAN:"701300000021LUZ",SEO:"701300000021LUe","Paid Social Media":"701300000021LUj","Social Media":"701300000021LUo","SFDC Network":"701300000021LUt","Typed/Bookmarked":"701300000021LUy"};
$("a[href*='www.salesforceiq.com'], a[href*='app.salesforceiq.com']").each(function(){var c=$(this);
c.attr("href",b(c.attr("href"),"d",a[vp.activityData.l_dtype]))
})
})
}());
"use strict";
if(typeof digitalData==="undefined"){var digitalData={page:{media:{}},user:[{profile:{0:{}}}],products:[],event:[],component:[],flags:{},ptc:(function(){var a=localStorage.getItem("ptc")||"{}";
if(!Util.isValidJson(a)){a="{}";
localStorage.removeItem("ptc")
}return JSON.parse(a)
})(),localStorage:(function(){var a=localStorage.getItem("webactls")||"{}";
if(!Util.isValidJson(a)){a="{}";
localStorage.removeItem("webactls")
}return JSON.parse(a)
})(),debug:sessionStorage.getItem("analytics_debug")}
}(function(u){(function(){if(typeof window.CustomEvent==="function"){return false
}function X(Z,aa){aa=aa||{bubbles:false,cancelable:false,detail:undefined};
var Y=document.createEvent("CustomEvent");
Y.initCustomEvent(Z,aa.bubbles,aa.cancelable,aa.detail);
return Y
}X.prototype=window.Event.prototype;
window.CustomEvent=X
})();
if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector
}var m=false;
var z={BEFORE_PAGE_LOAD:"DataLayer_beforepageload",PRODUCT_ADDED:"DataLayer_productadded",PROFILE_ADDED:"DataLayer_profileadded",ELEMENT_ADDED:"DataLayer_elementadded",BEHAVIOR_ADDED:"DataLayer_behavioradded"};
var p={};
var s=(function(){var Y="MockTagManager";
var ab="event";
var ae="pageLoad";
var aa="trackLink";
function ad(){return(typeof window[Y]!=="undefined")
}function X(ag){return ad()&&typeof window[Y][ag]==="function"
}function Z(){if(X(ae)){return window[Y][ae].apply(this,arguments)
}return false
}function ac(){if(X(ab)){return window[Y][ab].apply(this,arguments)
}return false
}function af(){if(X(aa)){return window[Y][aa].apply(this,arguments)
}return false
}return{ready:ad,load:Z,event:ac,link:af}
}());
function a(X){return !_.isUndefined(X)&&!_.isNull(X)
}function t(X){return !a(X)||_.isEmpty(X)
}function x(X,Z){if(!t(X)){var Y=new CustomEvent(X,{detail:Z});
document.dispatchEvent(Y);
g(X)
}}function G(X,Z){if(t(p[X])){p[X]={fired:false,stack:[]}
}var Y=function(){try{Z.apply(arguments)
}catch(aa){console.log("Error executing handler for event"+X)
}};
if(!p[X].fired){p[X].stack.push(Y)
}else{Y()
}}function g(Z){if(!t(p[Z])){var Y=p[Z].stack;
function aa(){p[Z].stack=[];
p[Z].fired=true
}function ab(ac,ad){return _.compose(ac,ad)
}var X=_.reduce(Y,ab,aa);
X()
}}function j(X,Y,Z){if(s.ready()&&a(X)&&!t(Y)&&a(Z)){X[Y]=Z
}}function F(ab,aa){if(!t(ab)){var ac=/(\w[\w\d]+)\[([\d]+)\]/i;
var Z=/(\w[\w\d]+)\[['"]?([\w]+)['"]?\]/i;
function X(ag,ad,ah){if(t(ad)){return ah
}else{var aj=ad.shift();
if(ac.test(aj)){var ae=aj.match(ac);
var ai=ae[1];
var af=ae[2];
if(typeof ag[ai]!=="object"){ag[ai]=[]
}if(!ag[ai][af]){ag[ai][af]={}
}if(!ad.length){ag[ai][af]=X(ag,ad,ah)
}else{X(ag[ai][af],ad,ah)
}}else{if(Z.test(aj)){var ae=aj.match(Z);
var ai=ae[1];
var af=ae[2];
if(typeof ag[ai]!=="object"){ag[ai]={}
}if(!ag[ai][af]){ag[ai][af]={}
}if(!ad.length){ag[ai][af]=X(ag,ad,ah)
}else{X(ag[ai][af],ad,ah)
}}else{if(!ag[aj]){ag[aj]={}
}if(!ad.length){ag[aj]=X(ag,ad,ah)
}else{X(ag[aj],ad,ah)
}}}}return ah
}var Y=ab.split(".");
return X(u,Y,aa)
}return false
}function C(Y,X){if(s.ready()&&_.isArray(Y)&&a(X)){Y.push(X)
}}function A(X,Z){if(!t(X)&&!t(Z)){j(u.page,X,Z);
var Y={path:"page."+X,value:Z};
x(z.ELEMENT_ADDED,Y)
}}function J(Y){var X=Y;
if(Y&&Y.toLowerCase()==="legacy"){X=0
}return u.user[0].profile[X]
}function w(X,Y){if(!t(X)&&!t(Y)){var Z=Y;
Z.profileID=X;
if(X&&X.toLowerCase()==="legacy"){X=0
}j(u.user[0].profile,X,Z);
x(z.PROFILE_ADDED,Z)
}}function k(Y,Z){if(!t(Y)){var X={productInfo:{productName:Y},category:{primaryCategory:Z||""}};
C(u.products,X);
x(z.PRODUCT_ADDED,X)
}}function v(Y,X){this.eventInfo={eventName:Y,eventID:Y,timeStamp:new Date(),data:X};
if(!t(X)){this.eventInfo.eventPoints=X.value||1;
if(!_.isEmpty(X.primaryCategory)){this.eventInfo.category={primaryCategory:X.primaryCategory}
}}return this
}function l(X){return(_.isObject(X)&&_.has(X,"eventInfo"))
}function U(Y,X){var Z=null;
if(l(Y)){Z=Y
}else{if(_.isString(Y)){Z=new v(Y,X)
}}return Z
}function f(Y,X){var Z=U(Y,X);
if(a(Z)){s.event(Z);
C(u.event,Z);
x(z.BEHAVIOR_ADDED,Z)
}}function E(Z,X,Y){if(!t(Z)){if(s.ready()){s.link(Z,_(X).chain().map(function(aa){var ab=U(aa,{primaryCategory:Z,elements:Y});
u.util.addBehavior(ab);
return ab
}).value(),Y)
}else{X.forEach(function(aa){u.util.addBehavior(aa)
})
}if(u.debug){console.log("Analytics dynamic event tracking fired:",Z,"\nEvents:",X,"\nData points:",Y)
}}}function I(X,Z){function Y(ab,ac){if(ab&&ac.length){var ad=ac.shift();
return Y(ab[ad],ac)
}return ab
}if(Z&&Z.length){var aa=Z.replace(/\[/g,".").replace(/\]|\'|\"/g,"").split(".");
return Y(X,aa)
}return null
}function V(X){return I(u,X)
}function r(X){return I(u.localStorage,X)||""
}function M(Y,aa,X,Z){if(Y&&aa&&Y.length>=1&&aa.length>=1){Util.setCookie(aa,encodeURIComponent(Y),X,Z||location.hostname)
}return aa
}function D(X){if(X&&X.length>=1){X=encodeURIComponent(X);
return Util.getCookie(X)
}return null
}function Q(X){if(X&&X.length>=1){X=encodeURIComponent(X);
Util.deleteCookie(X)
}}function o(aa,Y,Z){var ab=D(Y);
if(aa){var X=Z?(Z*86400):void 0;
M(Y,aa,X,location.hostname)
}return aa==ab?"":aa
}function d(aa,Y,Z){var X=Z?(Z*86400):void 0;
if(aa){M(Y,aa,X)
}return D(Y)
}function i(){if(s.ready()&&!m){s.load();
m=true
}}function B(){g(z.BEFORE_PAGE_LOAD)
}G(z.BEFORE_PAGE_LOAD,i);
function b(Y,X,aa){var Z=_.reduce(aa,function(ab,ac){var ad=u.util.getElement(ac);
ab.push({element:ac,value:ad});
return ab
},[]);
S();
u.util.trackPageGlobal();
u.page.pagename=Y;
Page.setPrevious(u.page.pagename);
X=_(X).chain().map(function(ab){return U(ab,{primaryCategory:Y,elements:aa})
}).value(),s.load(X,aa,Z)
}function S(){u.page={};
u.user[0].profile={0:{}};
u.event=[];
u.product=[];
u.flags={}
}function c(){if(SfdcWwwBase.gdpr&&SfdcWwwBase.gdpr.isEnabled()){if(SfdcWwwBase.gdpr.getActiveCookies().length>0){$.each(u.localStorage,function(X){if(!SfdcWwwBase.gdpr.isCookieActive(X)){delete u.localStorage[X]
}});
localStorage.setItem("webactls",JSON.stringify(u.localStorage))
}}else{localStorage.setItem("webactls",JSON.stringify(u.localStorage))
}return true
}function H(X,Y){return X&&X[Y]?X[Y].value:""
}function T(aa,Z,Y,ae){var ac=Page.getLocale();
var af="";
var X="";
var ad=[];
var ag=[];
u.util.addPageData("formerrors","");
u.util.addPageData("formerrorsall","");
u.util.addPageData("formerrorspercentage","");
if(!aa){return false
}for(var ab in aa){var ah=(ac+":"+ab);
if((af+ah).length<100){af+=(af==""?"":"|")+ah
}if((X+ah).length<255){X+=(X==""?"":"|")+ah
}}if(af){af=af.toLowerCase();
X=X.toLowerCase();
u.util.addPageData("formerrors",af);
ag.push("page.formerrors");
u.util.addPageData("formerrorsall",X);
ag.push("page.formerrorsall");
u.util.addPageData("formerrorspercentage",Math.round(Z/(Y+Z)*100).toString()+"%");
ag.push("page.formerrorspercentage");
ad.push("form_errors")
}else{u.util.setFormFillVals();
ag.push("user[0].profile[0].usercompanysize");
ag.push("user[0].profile[0].usercompanycountry");
ag.push("user[0].profile[0].userprimaryprodinterest");
ag.push("user[0].profile[0].usercompanyname");
ag.push("user[0].profile[0].userfirstformcompletetime")
}ad.push("formbutton_clicks");
if(ad.length===0){ad.push("")
}u.util.trackBehavior("Form error tracking",ad,ag)
}function q(){u.util.trackBehavior("Ajax form view",[""],[])
}function P(X,Y){var Z=[];
var aa=[];
if(!X){return false
}if(!Y){Y="Social sharing"
}if(Y==="Social signup"){u.util.addPageData("sharechannel",X);
aa.push("page.sharechannel");
u.util.addPageData("customlink",Y);
aa.push("page.customlink")
}else{if(Y==="Social success"){u.util.addBehavior("social_signin_success");
Z.push("social_signin_success")
}else{u.util.addBehavior("socialshares");
Z.push("socialshares");
u.util.addPageData("sharechannel",X);
aa.push("page.sharechannel");
Y=X+": social share"
}}if(Z.length===0){Z.push("")
}u.util.trackBehavior(Y,Z,aa)
}function O(){let convertedDateTime=new Date().toLocaleString("en-US",{timeZone:"US/Pacific",hour:"numeric",minute:"numeric",weekday:"long"}),convertedDateTimeArray=convertedDateTime.split(" ");
return convertedDateTimeArray[1]+" "+convertedDateTimeArray[2]+"|"+convertedDateTimeArray[0]
}function N(){var X="";
var Z=document.createElement("a");
Z.href=Page.getReferrer();
if(Z.pathname){X=Z.pathname.replace(/(^\/?)/,"/")
}var Y=Page.calculateName(X,Z.hostname);
if(Y===Page.getServer()+":"+Page.getLocale()+":blog"){Y+=":homepage"
}if(document.referrer.indexOf("login.salesforce.com")>-1){Y=Page.getServer()+":"+Page.getLocale()+":login"
}return Y
}function n(Y){var X={};
if(Y){X={name:!Y.company_name?"":Y.company_name.toLowerCase(),size:!Y.employee_range?"":Y.employee_range.toLowerCase(),sic:!Y.primary_sic?"":Y.primary_sic,ind:(!Y.industry?"":(Y.industry+(!Y.sub_industry?"":":"+Y.sub_industry))).toLowerCase(),cmp:!Y.db_campaign?"":Y.db_campaign.toLowerCase(),aud:(!Y.audience?"":(Y.audience+(!Y.audience_segment?"":":"+Y.audience_segment))).toLowerCase(),atype:!(Y.watch_list&&Y.watch_list.account_type)?"":Y.watch_list.account_type,city:!Y.city?"":Y.city.toLowerCase(),state:!Y.state?"":Y.state.toLowerCase(),requestMade:true}
}return X
}function L(){var X=J("legacy")||{};
if(demandBase&&demandBase.loaded){demandBase.loaded.done(function(){var Y=u.localStorage.db;
w("demandbase",demandBase.data);
X.db=demandBase.data;
X.formattedDB=Y;
X.targetingcompanysize="DB="+(Y.size||"[NO DATA]");
X.accounttype="DB="+(Y.atype||"[NO DATA]");
X.targetingcompanyindustry="DB="+(Y.ind||"[NO DATA]");
X.targetingcompanyname="DB="+(Y.name||"[NO DATA]");
X.targetingaudience="DB="+(Y.aud||"[NO DATA]");
w("legacy",X)
})
}}function W(){if(!Page.getCTAs()){Page.setCTAs()
}return Page.getCTAs()
}function R(ac,X){if(!u.util.mappings.adobe){return
}if(!ac){return
}var Z=X&&X.events||[];
var Y=X&&X.properties||{};
Z.push("event66");
var ab=_(Z).chain().map(u.util.mappings.adobe.getEventName).uniq().value();
var aa=[];
_(Y).chain().keys().each(function(ae){var ad=u.util.mappings.adobe.getDataElementName(ae);
if(ad){if(ad==="products"){_(Y[ae]).map(function(ag){var af;
if(_.indexOf(ab,"intdriverclick")>-1){af="intdriverclick"
}else{af="intdriverimp"
}k(ag,af)
})
}else{F(ad,Y[ae])
}aa.push(ad)
}});
A("customlink",ac);
if(aa.length){aa.push("page.customlink")
}else{aa=["page.customlink"]
}E(ac,ab,aa)
}function h(X){if(X&&X.length>0){var Y="intdriverimp";
for(var Z=0;
Z<X.length;
Z++){var aa=X[Z];
k(aa,Y)
}f(Y)
}}function e(){var X=digitalData.user[0].profile[0];
X.usercompanysize=vp.getCompanyEmployees()?vp.getCompanyEmployees():"[FORM:NO COMPANY SIZE]";
X.usercompanycountry=vp.getCompanyCountry()?vp.getCompanyCountry():"[FORM:NO COUNTRY]";
X.userprimaryprodinterest=vp.getPrimaryProductInterest()?vp.getPrimaryProductInterest():"[FORM:NO PRIMARY PRODUCT INTEREST]";
X.usercompanyname=vp.getCompanyName()?vp.getCompanyName():"[FORM:NO COMPANY NAME]";
X.userfirstformcompletetime=vp.getFirstFormCompleteTime()
}function y(X){for(var Y=0;
Y<digitalData.event.length;
Y++){if(u.event[Y].eventInfo.eventID===X){return true
}}return false
}function K(Y,aa){var Z="";
aa=aa||"";
if(!Y){return aa?";"+aa+";;;event25=1":""
}if(aa){Z=";"+aa+";;;event25=1"
}for(var X=0;
X<Y.length;
X++){if(Z.indexOf(Y[X])===-1){Z+=(Z!==""?",":"")+";"+Y[X]+";;;event19=1"
}}return Z
}u.util={on:G,pageLoad:B,emitEvent:x,addPageData:A,getUserProfileByName:J,setUserProfileByName:w,addProduct:k,addBehavior:f,Behavior:v,trackBehavior:E,getElement:V,setElement:F,writeCookie:M,readCookie:D,deleteCookie:Q,getValueOnce:o,getAndPersistValue:d,dynamicPageLoad:b,event:z,saveLocalStorage:c,getLocalStorage:r,getFormFieldValue:H,trackForm:T,trackAjaxForm:q,trackSocial:P,getTimeParting:O,getReferrerPageName:N,getCTAs:W,trackActivity:R,addDrivers:h,setFormFillVals:e,hasEvent:y,trackCTAs:K,trackDemandBase:L,components:{}};
u.initLocalStorage=function(){var X=["chat","db","kxsfdc","l_cloud","ptb","version"],Z=u.localStorage;
if(!Z||typeof vp==="undefined"||typeof Page==="undefined"){return
}if(vp.activityData){X.forEach(function(aa){if(vp.activityData[aa]){Z[aa]=vp.activityData[aa]
}delete vp.activityData[aa]
})
}if(vp.isNewSession()){Z.chat=0
}if(vp.isNewVisitor()&&vp.firstVisit()===0){Z.version=vp.version
}if(demandBase&&demandBase.loaded){demandBase.loaded.done(function(){Z.db=n(demandBase.data)
})
}var Y=vp.getKruxSegment();
Z.kxsfdc={segs:Y?Y:""};
Z.l_cloud=Page.getCloud();
c()
}
}(digitalData));
"use strict";
(function(){if(digitalData&&digitalData.util){var i=digitalData.util;
i.media=i.media||{};
var j={};
var c="page.videoname";
var g="page.videoplayername";
var l="page.videoduration";
var o="page.customlink";
var k="page.videoid";
var a=[c,g,l,o];
var f={25:"video_25percent_viewed",50:"video_50percent_viewed",75:"video_75percent_viewed",100:"video_100percent_viewed"};
var e="number_video_views";
var h="video_seconds_viewed";
var n="video_load";
i.media.load=function(p,q){i.setElement(c,p);
i.setElement(k,q);
i.trackBehavior(digitalData.page.pagename,[n],[c])
};
i.media.open=function(p,r,q,s){if(!_.isEmpty(p)){j[p]=new d(p,r,q);
j[p].timer.start();
i.setElement(l,0);
i.setElement(k,s);
b(j[p].name,[e])
}};
i.media.stop=function(p,q){if(!_.isEmpty(p)&&_.isObject(j[p])){j[p].timer.pause()
}};
i.media.play=function(q,s,p,r){if(!_.isEmpty(q)&&_.isObject(j[q])){j[q].timer.resume()
}};
i.media.close=function(p){if(!_.isEmpty(p)&&_.isObject(j[p])){j[p].timer.stop();
b(p)
}};
i.media.trackElement=function(p){a.push(p)
};
function b(p,q){if(!_.isEmpty(p)&&_.isObject(j[p])){var r=j[p];
i.setElement(c,r.name);
i.setElement(g,r.player);
i.setElement(o,Page.getName()+"|"+r.name);
i.trackBehavior(digitalData.page.pagename,q||[],a)
}}function d(p,s,r){this.name=p;
this.length=s;
this.player=r;
this.timer=new m();
var u=0;
var q=_(f).chain().keys().sortBy(function(v){return Number(v)
}).reduce(function(w,x){var v=Math.floor(1000*s*(x/100));
w.push({milestone:v,event:f[x]});
return w
},[]).value();
var t=_(q).chain().pluck("milestone").min().value();
this.timer.onTick((function(v){return function(x){if(x>=t){var z=q.shift();
var w={value:Math.round((x-u)/1000)};
var y=new digitalData.util.Behavior(h,w);
i.setElement(l,Math.round(x/1000));
u=x;
b(v.name,[y,z.event]);
t=_(q).chain().pluck("milestone").min().value()
}}
}(this)));
return this
}function m(){console.log("Timer initiated");
var r={INITIALIZED:-1,COUNTING:0,PAUSED:1,STOPPED:2};
var q=100;
var v=0;
var u=0;
var p=[];
var t=r.INITIALIZED;
function s(){var w=_.now();
if(t===r.COUNTING){u+=w-v
}v=w;
if(t<r.STOPPED){window.setTimeout(s,q)
}_.map(p,function(x){x.apply(this,[u])
})
}this.start=function(){if(t===r.INITIALIZED){t=r.COUNTING;
console.log("currentState in timer.start is ",t);
v=_.now();
window.setTimeout(s,q)
}};
this.pause=function(){if(t===r.COUNTING){t=r.PAUSED;
v=_.now()
}};
this.resume=function(){if(t===r.PAUSED){t=r.COUNTING;
v=_.now()
}};
this.stop=function(){if(t<r.STOPPED){t=r.STOPPED;
v=_.now()
}};
this.onTick=function(w){p.push(w);
return this
};
this.getDuration=function(){return u
};
return this
}}}());
"use strict";
(function(){digitalData.util.mappings=digitalData.util.mappings||{};
var e={},h=digitalData.user[0].profile[0],b=digitalData.page,g=["podcastName","episodeName","episodeID"],d={podcastName:"podcastname",episodeName:"episodename",episodeID:"episodeid",totalLength:"episodelength",startTime:"episodestart",stopTime:"episodestop",currentTime:"episodecurrenttime",percentComplete:"episodepercent",takeawayName:"takeawayname",takeawayID:"takeawayid",takeawayStartTime:"takeawaystart",takeawayEndTime:"takeawayend"};
var c={};
c.pageLoad=function(l,m,k){};
c.event=function(){};
c.trackLink=function(m,k,l){};
window.MockTagManager=c;
function f(l){var m=[],k=1;
l.forEach(function(n){var o=n.divId;
m.push({name:"div_"+o,list:o,position:k,dimension60:n.formDriverIdList.join("|"),dimension94:o,dimension95:n.campaignUrl,metric15:1});
k++
});
return m
}function i(){var k=digitalData.component||[{}],m=k.length,r={event:"promotionImpression",ecommerce:{promoView:{promotions:[]}}},l=[];
if(m===0){return r
}var q=m,n=k[m-1].componentInfo,p=n.campaign||"",o=n.experience||"";
do{q=q-1;
n=k[q].componentInfo;
l.push({id:n.componentID||"",name:p,creative:o,position:(n.itemType||"")+"|"+(n.position)})
}while(k[q-1]&&(k[q-1].componentInfo.campaign===p)&&(k[q-1].componentInfo.experience===o));
r.ecommerce.promoView.promotions=l;
return r
}function j(){var l=b.personalization,k={event:"promotionClick",ecommerce:{promoClick:{promotions:[]}}};
if(!l){return k
}k.ecommerce.promoClick.promotions=[{id:l.clickItemId||"",name:l.clickCampId||"",creative:l.clickExpId||"",position:(l.clickItemType||"")+"|"+(l.clickItemPos||"")}];
return k
}function a(k,n){var l=b.media,m={event:k};
n.forEach(function(o){if(o in d){m[o]=l[d[o]]
}});
return m
}digitalData.util.mappings.google={register:function(k,m){if(typeof k==="string"){var l=k.toLowerCase();
if(!e[l]){e[l]=m
}}return this
},getEvent:function(k){if(typeof k==="string"){var l=k.toLowerCase();
var m=e[l];
if(typeof m==="function"){return m()
}}return undefined
}};
digitalData.util.mappings.google.register("chatdrop",function(){return{event:"custEv_chatDrop",eventCat:"Chat",eventAct:"Chat Drop",eventLbl:"Chat Drop",eventVal:0,nonInteraction:1,chatDrops:"1"}
}).register("chat_view",function(){var l=b.customlink;
var k=l==="chat-invite"?"PopUp":l==="chat-anchor"?"Anchor":"CTA";
return{event:"custEv_chatView",chatLocation:k}
}).register("chat_init",function(){var l=b.customlink;
var k=l==="chat-invite"?"PopUp":l==="chat-anchor"?"Anchor":"CTA";
return{event:"custEv_chatInitialization",chatLocation:k}
}).register("chat_invite",function(){return{event:"custEv_chatPopUp"}
}).register("destroy_chat",function(){return{event:"custEv_chatClose"}
}).register("chat_ended",function(){return{event:"custEv_chatEnded",chatEndedBy:b.customlink}
}).register("currentbottomnavigationclicks",function(){return{event:"custEv_bottomNavLinkClick",navLocation:"bottom",navItem:b.navItem}
}).register("legacycurrenttopnavigationclicks",function(){return{event:"custEv_topNavLinkClick",navLocation:"top",navItem:b.navItem}
}).register("currenttopnavigationclicks",function(){return{event:"custEv_navigationClick",navItem:b.navItem,navType:"global",clickText:b.navItemClickText,clickURL:b.navItemClickHref,internalDriver:b.navItemInternalDriver}
}).register("currentleftnavigationclicks",function(){return{event:"custEv_leftNavLinkClick",navLocation:"left",navItem:b.navItem}
}).register("userLogin",function(){return{event:"custEv_userLogin",authenticationMethod:"tbid",id:{tb:digitalData.user[0].profile.tb}}
}).register("internaldriverclicks",function(){var l=b.internalclickpath;
var k=b.internalclickdriver;
var m=b.internalclicktext;
return{event:"custEv_internalDriverClick",eventCat:"Internal Driver Click",eventAct:b.pagename+"|"+k,eventLbl:l,eventVal:0,nonInteraction:0,internalDrivers:b.pagename+"|"+k,internalDriverId:k,calltoActionText:m}
}).register("formview",function(){if(b.is_roll_based_newsletter==="true"){return{event:"custEv_formImpression",convertingPage:b.convertingpage,convertingPageUrl:b.convertingpageurl,formEnvironmentType:b.form_environment_type,formExperienceType:b.form_experience_type,formJoinIDUser:h.transactionid,newsletterSubscription:true}
}else{return{event:"custEv_formImpression",eventCat:"Form Engagement",eventAct:"Form Views",eventLbl:Page.getFormType(),eventVal:0,nonInteraction:0,formID:b.offerid,localizedFormName:Page.getName(),formType:Page.getFormType(),convertingPage:b.convertingpage,convertingPageUrl:b.convertingpageurl,formViews:1,formEnvironmentType:b.form_environment_type,formExperienceType:b.form_experience_type,internalDrivers:b.persistedInternalDriver,partnerPromoCode:b.partnerpromocode,formName:b.formname,diagnosticsLeadIndustry:b.diagnosticsleadindustry}
}}).register("formcompletesubmitbuttonclick",function(){if(b.is_roll_based_newsletter==="true"){return{event:"custEv_formCompletion",convertingPage:b.convertingpage,convertingPageUrl:b.convertingpageurl,formCountry:h.usercompanycountry,formEnvironmentType:b.form_environment_type,formExperienceType:b.form_experience_type,formJoinIDUser:h.transactionid,newsletterSubscription:true,newsletterSelection:b.newsletter_subscriptions}
}else{return{event:"custEv_formCompletion",eventCat:"Form Engagement",eventAct:"Form Completion",eventLbl:Page.getFormType(),eventVal:0,nonInteraction:0,formID:b.offerid,localizedFormName:Page.getName(),formJoinIDUser:h.transactionid,formJoinIDHit:h.transactionid,formType:Page.getFormType(),convertingPage:b.convertingpage,convertingPageUrl:b.convertingpageurl,formCompanyName:h.usercompanyname,formCompanySize:h.usercompanysize,formCountry:h.usercompanycountry,formPrimaryProductInterest:h.userprimaryprodinterest,formCompletions:"1",formEnvironmentType:b.form_environment_type,formExperienceType:b.form_experience_type,internalDrivers:b.persistedInternalDriver}
}}).register("form_errors",function(){return{event:"custEv_formErrors",eventCat:"Form Engagement",eventAct:"Form Errors",eventLbl:b.formerrorsall,eventVal:0,nonInteraction:0,formID:b.offerid,localizedFormName:Page.getName(),formType:Page.getFormType(),formErrors:"1"}
}).register("two_step_form_submit",function(){return{event:"custEv_twoStepFormPreStepSubmit",eventCat:"Form Engagement",eventAct:"Two-step-form submit",eventLbl:b.twostepfieldname+":"+b.twostepbuttontext,eventVal:0,nonInteraction:0}
}).register("form_nonlead_submission",function(){return{event:b.formCustomEv}
}).register("social_signin_success",function(){return{event:"custEv_formFillUsingSocialNetwork",eventCat:"Form Engagement",eventAct:"Form Fill Using Social Account",eventLbl:b.sharechannel,eventVal:0,nonInteraction:0,formID:b.offerid,formType:Page.getFormType()}
}).register("video_load",function(){return{event:"custEv_videoLoad",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"Load",eventVal:0,nonInteraction:1,videoLoads:1,videoName:b.videoname,videoId:b.videoid}
}).register("number_video_views",function(){return{event:"custEv_videoPlay",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"Play",eventVal:0,nonInteraction:0,videoName:b.videoname,videoAction:"Play",videoPercentageWatched:"1%",videoSecondsWatched:b.videoduration,videoPlays:1,videoId:b.videoid}
}).register("video_25percent_viewed",function(){return{event:"custEv_precentComplete",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"25% Completion",eventVal:0,nonInteraction:0,videoName:b.videoname,videoAction:"25% Completion",videoPercentageWatched:"25%",videoSecondsWatched:b.videoduration,videoId:b.videoid}
}).register("video_50percent_viewed",function(){return{event:"custEv_precentComplete",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"50% Completion",eventVal:0,nonInteraction:0,videoName:b.videoname,videoAction:"50% Completion",videoPercentageWatched:"50%",videoSecondsWatched:b.videoduration,videoId:b.videoid}
}).register("video_75percent_viewed",function(){return{event:"custEv_precentComplete",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"75% Completion",eventVal:0,nonInteraction:0,videoName:b.videoname,videoAction:"75% Completion",videoPercentageWatched:"75%",videoSecondsWatched:b.videoduration,videoId:b.videoid}
}).register("video_100percent_viewed",function(){return{event:"custEv_precentComplete",eventCat:"Video Engagement",eventAct:b.videoname,eventLbl:"100% Completion",eventVal:0,nonInteraction:0,videoName:b.videoname,videoAction:"100% Completion",videoPercentageWatched:"100%",videoSecondsWatched:b.videoduration,videoCompletions:1,videoId:b.videoid}
}).register("intsearch",function(){return{event:"custEv_siteSearch",eventCat:"Site Search",eventAct:b.searchterm,eventLbl:b.numsearchresults,eventVal:0,nonInteraction:0}
}).register("feedbackbuttonclick",function(){return{event:"custEv_feedbackButtonClick",eventCat:"Feedback",eventAct:"Feedback Button Click",eventLbl:"Bottom",eventVal:0,nonInteraction:0}
}).register("atcbuttonclick",function(){return{event:"custEv_addToCalendar",eventTitle:b.atcTitle,eventTime:b.atcTime,eventDate:b.atcDate,eventLocation:b.atcLocation,calendarType:b.atcCalendarType}
}).register("contactdockexpand",function(){return{event:"custEv_contactDockExpand",eventCat:"Navigation Link Click",eventAct:"ContactDock:"+b.scrollDepth,eventLbl:b.contactDockStatus,eventVal:0,nonInteraction:0}
}).register("contactdockcollapse",function(){return{event:"custEv_contactDockcollapse",eventCat:"Navigation Link Click",eventAct:"ContactDock:"+b.scrollDepth,eventLbl:"Close",eventVal:0,nonInteraction:0}
}).register("autoformcomplete",function(){return{event:"custEv_autoFormComplete",eventCat:"Form Engagement",eventAct:"Auto Form Completion",eventLbl:Page.getFormType(),formJoinIDUser:h.transactionid,formJoinIDHit:h.transactionid,formID:b.offerid,convertingPage:b.convertingpage,convertingPageUrl:b.convertingpageurl,formCompanyName:h.usercompanyname,formCompanySize:h.usercompanysize,formCountry:h.usercompanycountry,formPrimaryProductInterest:h.userprimaryprodinterest,autoFormCompletions:1,nonInteraction:0,internalDrivers:b.persistedInternalDriver}
}).register("blogtagimpression",function(){return{event:"custEv_blogTagImpression",eventCat:"Blog Tag Impression",eventAct:b.blogArticleTitle,eventLbl:b.blogpostmeta,eventVal:0,nonInteraction:1,blogAuthor:b.authorName,blogTag:b.blogpostmeta,blogTagImpressions:1}
}).register("stepbystepformprogress",function(){return{event:"custEv_stepbystepFormProgress",eventCat:"Form Engagement",eventAct:"Form Step Engagement",eventLbl:b.currentFormStep+"/"+b.totalFormStep,nonInteraction:0,formID:b.offerid,formEnvironmentType:b.form_environment_type,formExperienceType:b.form_experience_type}
}).register("dynamicofferimpression",function(){return{event:"custEv_offerImpressions",eventCat:"dynamic content",eventAct:"campaigns",eventLbl:"offers",nonInteraction:1,ecommerce:{impressions:f(b.dynamicoffercollection)}}
}).register("podcast_load",function(){return a("custEv_podcastLoad",g.concat(["totalLength"]))
}).register("podcast_first_play",function(){return a("custEv_podcastFirstPlay",g.concat(["startTime","totalLength"]))
}).register("podcast_play",function(){return a("custEv_podcastPlay",g.concat(["startTime","totalLength"]))
}).register("podcast_stop",function(){return a("custEv_podcastStop",g.concat(["startTime","stopTime","totalLength"]))
}).register("podcast_percent",function(){return a("custEv_podcastPercentComplete",g.concat(["startTime","currentTime","percentComplete","totalLength"]))
}).register("takeaway_click",function(){return a("custEv_podcastTakeawayClick",g.concat(["takeawayName","takeawayID","takeawayStartTime","takeawayEndTime"]))
}).register("eventregidsuccess",function(){return{event:"custEv_eventRegID",tzRegID:b.tzregid}
}).register("promo_impression",function(){return i()
}).register("promo_click",function(){return j()
}).register("popoffer",function(){return{event:"custEv_offerPrompt",eventID:b.offerID,offerText:b.popOfferText}
}).register("popofferaccepted",function(){return{event:"custEv_offerAccepted",eventID:b.offerID,offerText:b.popOfferText,clickText:b.popAcceptBtn}
}).register("popoffercancel",function(){return{event:"custEv_offerRejected",eventID:b.offerID,offerText:b.popOfferText,clickText:b.popCancelBtn}
})
}());
"use strict";
(function(){digitalData.util.gaPageviewComplete=$.Deferred();
var a=(function(){return Object.keys(digitalData.util.event).reduce(function(c,b){return c+digitalData.util.event[b]+" "
},"")
}());
$(document).on(a,function(b){var d=b.originalEvent;
if(d&&d.detail&&d.detail.eventInfo){if(d.detail.eventInfo){var c=d.detail.eventInfo.eventID;
var f=digitalData.util.mappings.google.getEvent(c);
if(typeof f!=="undefined"){$.when(digitalData.util.gaPageviewComplete).done(function(){dataLayer.push(f);
let observer=digitalData.page.observer;
if(f.event==="custEv_formImpression"&&observer){document.querySelectorAll(".form-builder-form").forEach(function(e){observer.unobserve(e)
})
}})
}}}})
}());
window.MutationObserver=window.MutationObserver||function(l){function n(p){this.i=[];
this.m=p
}function k(p){(function s(){var t=p.takeRecords();
t.length&&p.m(t,p);
p.h=setTimeout(s,n._period)
})()
}function d(s){var p={type:null,target:null,addedNodes:[],removedNodes:[],previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null},t;
for(t in s){p[t]!==l&&s[t]!==l&&(p[t]=s[t])
}return p
}function j(s,p){var t=b(s,p);
return function(v){var u=v.length,w;
p.a&&3===s.nodeType&&s.nodeValue!==t.a&&v.push(new d({type:"characterData",target:s,oldValue:t.a}));
p.b&&t.b&&e(v,s,t.b,p.f);
if(p.c||p.g){w=i(v,s,t,p)
}if(w||v.length!==u){t=b(s,p)
}}
}function h(s,p){return p.value
}function g(s,p){return"style"!==p.name?p.value:s.style.cssText
}function e(A,y,w,v){for(var u={},p=y.attributes,s,t,z=p.length;
z--;
){s=p[z],t=s.name,v&&v[t]===l||(a(y,s)!==w[t]&&A.push(d({type:"attributes",target:y,attributeName:t,oldValue:w[t],attributeNamespace:s.namespaceURI})),u[t]=!0)
}for(t in w){u[t]||A.push(d({target:y,type:"attributes",attributeName:t,oldValue:w[t]}))
}}function i(s,p,x,v){function u(H,F,D,A,G){var C=H.length-1;
G=-~((C-G)/2);
for(var B,z,E;
E=H.pop();
){B=D[E.j],z=A[E.l],v.c&&G&&Math.abs(E.j-E.l)>=C&&(s.push(d({type:"childList",target:F,addedNodes:[B],removedNodes:[B],nextSibling:B.nextSibling,previousSibling:B.previousSibling})),G--),v.b&&z.b&&e(s,B,z.b,v.f),v.a&&3===B.nodeType&&B.nodeValue!==z.a&&s.push(d({type:"characterData",target:B,oldValue:z.a})),v.g&&w(B,z)
}}function w(I,H){for(var E=I.childNodes,A=H.c,J=E.length,K=A?A.length:0,D,C,F,B,M,G=0,L=0,y=0;
L<J||y<K;
){B=E[L],M=(F=A[y])&&F.node,B===M?(v.b&&F.b&&e(s,B,F.b,v.f),v.a&&F.a!==l&&B.nodeValue!==F.a&&s.push(d({type:"characterData",target:B,oldValue:F.a})),C&&u(C,I,E,A,G),v.g&&(B.childNodes.length||F.c&&F.c.length)&&w(B,F),L++,y++):(t=!0,D||(D={},C=[]),B&&(D[F=r(B)]||(D[F]=!0,-1===(F=q(A,B,y,"node"))?v.c&&(s.push(d({type:"childList",target:I,addedNodes:[B],nextSibling:B.nextSibling,previousSibling:B.previousSibling})),G++):C.push({j:L,l:F})),L++),M&&M!==E[L]&&(D[F=r(M)]||(D[F]=!0,-1===(F=q(E,M,L))?v.c&&(s.push(d({type:"childList",target:H.node,removedNodes:[M],nextSibling:A[y+1],previousSibling:A[y-1]})),G--):C.push({j:F,l:y})),y++))
}C&&u(C,I,E,A,G)
}var t;
w(p,x);
return t
}function b(s,p){var u=!0;
return function t(v){var w={node:v};
!p.a||3!==v.nodeType&&8!==v.nodeType?(p.b&&u&&1===v.nodeType&&(w.b=o(v.attributes,function(y,x){if(!p.f||p.f[x.name]){y[x.name]=a(v,x)
}return y
})),u&&(p.c||p.a||p.b&&p.g)&&(w.c=f(v.childNodes,t)),u=p.g):w.a=v.nodeValue;
return w
}(s)
}function r(s){try{return s.id||(s.mo_id=s.mo_id||m++)
}catch(p){try{return s.nodeValue
}catch(t){return m++
}}}function f(s,p){for(var u=[],t=0;
t<s.length;
t++){u[t]=p(s[t],t,s)
}return u
}function o(s,p){for(var u={},t=0;
t<s.length;
t++){u=p(u,s[t],t,s)
}return u
}function q(s,p,u,t){for(;
u<s.length;
u++){if((t?s[u][t]:s[u])===p){return u
}}return -1
}n._period=30;
n.prototype={observe:function(s,p){for(var v={b:!!(p.attributes||p.attributeFilter||p.attributeOldValue),c:!!p.childList,g:!!p.subtree,a:!(!p.characterData&&!p.characterDataOldValue)},u=this.i,t=0;
t<u.length;
t++){u[t].s===s&&u.splice(t,1)
}p.attributeFilter&&(v.f=o(p.attributeFilter,function(x,w){x[w]=!0;
return x
}));
u.push({s:s,o:j(s,v)});
this.h||k(this)
},takeRecords:function(){for(var s=[],p=this.i,t=0;
t<p.length;
t++){p[t].o(s)
}return s
},disconnect:function(){this.i=[];
clearTimeout(this.h);
this.h=null
}};
var c=document.createElement("i");
c.style.top=0;
var a=(c="null"!=c.attributes.style.value)?h:g,m=1;
return n
}(void 0);
(function(){function g(){try{window.custom_var=Page.getLocale()+"|"+vp.getType()+"|"+Page.getSegment()+"|"+vp.getTypeDetailed()+"|"+vp.getVisitNumber()+"|"+Page.getName()
}catch(j){}}function d(j){var k=j.campId||"",n=j.expId||"",o=j.itemPos||"",m=j.itemId||"",l=j.itemType||"";
digitalData.page.personalization=digitalData.page.personalization||{};
digitalData.page.personalization.clickItemId=m;
digitalData.page.personalization.clickCampId=k;
digitalData.page.personalization.clickExpId=n;
digitalData.page.personalization.clickItemType=l;
digitalData.page.personalization.clickItemPos=o;
sessionStorage.setItem("promoClickData",JSON.stringify(digitalData.page.personalization));
sessionStorage.setItem("evgData",JSON.stringify(digitalData.user[0].profile[0].personalization.evergage));
digitalData.util.trackBehavior("promo-click",["promo_click"],["page.personalization.clickItemId","page.personalization.clickCampId","page.personalization.clickExpId","page.personalization.clickItemType","page.personalization.clickItemPos","user[0].profile[0].personalization.evergage.userGroup","user[0].profile[0].personalization.evergage.userId"])
}function e(l,j){if(!l){return
}var k=j.itemId||"";
l.addEventListener("click",function(m){d(j);
window.location=k
})
}function b(o,n,m){if(!o||!n||!m){return
}var j='[data-evg-campaign-id="'+o+'"][data-evg-experience-id="'+n+'"] .thumbnail-content.thumbnail-linked';
if(document.querySelectorAll(j).length===0){return
}var l='[data-evg-campaign-id="'+o+'"][data-evg-experience-id="'+n+'"] [data-evg-item-id]',k=".headingComponent, .bodyCopyComponent",p=0;
document.querySelectorAll(l).forEach(function(r){p=p+1;
var q={campId:o,expId:n,itemPos:p,itemId:r.getAttribute("data-evg-item-id")||"",itemType:r.getAttribute("data-evg-item-type")||""};
if(m==="rc_right_rail"){e(r,q)
}else{if(m==="rc_category_header"){r.querySelectorAll(k).forEach(function(s){e(s,q)
})
}}})
}function a(n,l){if(!n||!l||!n.catalog){return
}var k=n.catalog,q=Object.keys(k)[0],t=q?k[q]:[],v=t?t.length:0;
if(v===0){return
}var j=l.campaignId||"",o=n.experienceId||"",u=l.payload||{},r=u?(u.contentZone||""):"";
b(j,o,r);
digitalData.component=digitalData.component||[];
for(var m=0;
m<v;
m++){var p={componentInfo:{componentID:t[m]||"",campaign:j,experience:o,itemType:q,position:m+1},category:{primaryCategory:"promoimp"}};
digitalData.component.push(p)
}var s=digitalData.user[0].profile[0];
digitalData.user[0].profile[0].personalization=s.personalization||{};
digitalData.user[0].profile[0].personalization.evergage=s.personalization.evergage||{};
digitalData.user[0].profile[0].personalization.evergage.userGroup=l.userGroup||"";
digitalData.user[0].profile[0].personalization.evergage.userId=Evergage&&Evergage.getCurrentPage()&&Evergage.getCurrentPage().user?Evergage.getCurrentPage().user.anonId:"";
digitalData.util.trackBehavior("promo-impression",["promo_impression"],["component","user[0].profile[0].personalization.evergage.userGroup","user[0].profile[0].personalization.evergage.userId"])
}function h(o,m){if(!o||!m||!o.catalog){return
}var k=o.catalog,q=Object.keys(k)[0],t=q?k[q]:[],x=t?t.length:0;
if(x===0){return
}var s="",j=m.campaignId||"",p=o.experienceId||"",r=q.toLowerCase()+"s",v=m.payload,w=v?v[r]:[],u=w?w.length:0;
for(var n=0;
n<u;
n++){if(t[0]===w[n].id){s=n+1;
break
}}var l={campId:j,expId:p,itemPos:s,itemId:t[0],itemType:q};
d(l);
if(l.itemId){window.location=l.itemId
}}function i(k){if(!k||!k.detail||!k.detail.campaignStat||!k.detail.campaignResponse){return
}var j=k.detail.campaignStat,l=k.detail.campaignResponse;
switch(j.stat){case"Impression":a(j,l);
break;
case"Clickthrough":h(j,l);
break;
default:break
}}function f(){if(!digitalData||!digitalData.util){return
}document.addEventListener("evergage:onStatSend",i)
}function c(){if(!digitalData||!digitalData.user[0]||!digitalData.util){return
}const k=digitalData.util.readCookie("pbc");
let peronalizationDetails=null;
if(k){try{peronalizationDetails=JSON.parse(atob(k))
}catch(l){}}if(peronalizationDetails){var j=digitalData.user[0];
digitalData.user[0].personalization=j.personalization||{};
digitalData.user[0].personalization.InteractionStudio=j.personalization.InteractionStudio||{};
digitalData.user[0].personalization.InteractionStudio.userID=peronalizationDetails.userID||"";
digitalData.user[0].personalization.InteractionStudio.userGroup=peronalizationDetails.userGroup||"";
digitalData.user[0].personalization.InteractionStudio.campaignID=peronalizationDetails.campaign||"";
digitalData.user[0].personalization.InteractionStudio.experienceID=peronalizationDetails.experience||""
}}digitalData.util.components.addIntegrations=function(){g();
f();
c()
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof Util==="undefined"){return
}var a=digitalData.util,c=digitalData.page;
function d(){var f=Util.getParam("brand");
c.sembrand=f==="yes"||f==="no"?f:""
}function b(){vp.isNewVisitor()?a.addBehavior("firsttimevisit"):a.addBehavior("returnvisit")
}function e(){c.moduletracking=c.sharechannel=c.captchatype="";
if(a.readCookie("v32")){c.moduletracking=a.readCookie("v32");
a.deleteCookie("v32");
try{if(c.moduletracking){var h="";
if(c.moduletracking.indexOf("|left-nav")>-1){h="Left"
}else{if(c.moduletracking.indexOf("|topnav-products-menu")>-1){h="products-menu-Top"
}else{if(c.moduletracking.indexOf("|topnav")>-1){h="Top"
}else{if(c.moduletracking.indexOf("|footer")>-1){h="Bottom"
}}}}if(h){var f=Page.getNameNoLocale();
f=f.replace(Page.getServer()+":","");
c.toporleftnav=h+"|"+f
}}}catch(g){}}}a.trackPageGlobal=function(){a.trackDemandBase();
e();
c.type=Page.getType();
c.cloud=Page.getCloud();
if(Page.isBlog()){c.blogpostmeta=Page.getBlogPostMeta();
c.authorName=Page.getBlogAuthor();
c.blogArticleTitle=Page.getBlogArticleTitle();
if(c.blogpostmeta!==""&&c.authorName!==""){a.addBehavior("blogtagimpression")
}}a.addDrivers(a.getCTAs());
if(Page.isProductCategory()){a.addBehavior("scremove")
}if(Page.isMigratedPage()&&Page.isConfirmation()){Page.name=Page.calculateName();
c.pagename=Page.name
}};
a.components.trackPage=function(){var h,j,g=/^[a-zA-Z]{1,25}$/,i=Util.getParam("bc"),k=JSON.parse(sessionStorage.getItem("promoClickData")),f=JSON.parse(sessionStorage.getItem("evgData"));
digitalData.event=[];
a.addPageData("pagename",Page.getName());
a.addPageData("prevpage",Page.getPrevious());
c.pagename=c.pagename?c.pagename:Page.getName();
c.charSet="UTF-8";
c.sitesection=Page.getChannel();
c.server="SFDC";
c.locale=Page.getLocale();
c.prevpage=Page.getPrevious();
c.prevpageurl=Page.getPreviousUrl();
c.prevpagesanitized=c.prevpage||"[NO PREVIOUS PAGE AVAILABLE]";
c.namenolocale=Page.getNameNoLocale();
c.uiframework="AEM framework";
h=new Date();
h.setDate(h.getDate()-1);
c.expdate=h;
c.referrer=Page.getReferrer();
c.subdomainReferrer=Page.getSFDCNetworkReferrer()&&Page.getSFDCNetworkReferrer().id;
j=window.location.href;
c.url=Page.hasExcludedParam(j)?j.split("?")[0]:j;
c.numberpageviews="+1";
c.segment=Page.getSegment();
c.botcategory=g.test(i)?i:"";
if(k){c.personalization=c.personalization||{};
c.personalization.clickItemId=k.clickItemId||"";
c.personalization.clickCampId=k.clickCampId||"";
c.personalization.clickExpId=k.clickExpId||"";
c.personalization.clickItemType=k.clickItemType||"";
c.personalization.clickItemPos=k.clickItemPos||""
}if(f){digitalData.user[0].profile[0].personalization=digitalData.user[0].profile[0].personalization||{};
digitalData.user[0].profile[0].personalization.evergage=digitalData.user[0].profile[0].personalization.evergage||{};
digitalData.user[0].profile[0].personalization.evergage.userGroup=f.userGroup||"";
digitalData.user[0].profile[0].personalization.evergage.userId=f.userId||""
}if(window.pagemeta){c.image=window.pagemeta.image||"";
c.tags=Util.convertTagsObjIntoOldSpec(window.pagemeta.tags)
}if(Page.is404()){c.spagetype="errorPage"
}c.reportsuite=Server.getAccount();
c.pageloadtime=(function(){if(!window._pageLoadTime){var n=new Date().getTime(),m=window.performance?performance.timing:0,o=m?m.requestStart:0,l=o?Math.round((n-o)/100):""
}return l
})();
c.lastvaliddriver=digitalData.localStorage.lastvaliddriver?digitalData.localStorage.lastvaliddriver:"";
c.lastvaliddrivercookie=a.readCookie("lastvaliddriver");
if(vp.isNewSession()){b()
}if(Page.isSEM()){d()
}a.trackPageGlobal();
a.addBehavior("pageview")
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof vp==="undefined"||typeof Url==="undefined"){return
}var c=digitalData.util,e=digitalData.localStorage,b=digitalData.user[0].profile[0];
function a(f){try{if(vp.OrgInfo.getStatus()||vp.OrgInfo.getType()){f.orgEdition=vp.OrgInfo.getEdition()
}f.orgId=vp.OrgInfo.getID()
}catch(g){}}function d(f){if(vp.hasCurrentTrial()){f.logintype="freetrial";
c.addBehavior("freetriallogin")
}else{f.logintype=b.usertype==="developer"?"developer":"customer"
}}c.components.trackLegacyProfile=function(){var f=c.getUserProfileByName("legacy")||{};
f.usertype=vp.getType();
f.timepartinghour=c.getTimeParting(-8).split("|")[0];
f.timepartingday=c.getTimeParting(-8).split("|")[1];
f.dayssincelastvisit=vp.getDaysSinceLastVisit();
f.visitnumber=vp.getVisitNumber();
f.detailedusertype=vp.getTypeDetailed();
f.formfillstatus=vp.getUserEmail()?"known":"anonymous";
f.neustar="neustar="+(vp.getNeustarInfoForOmniture()?vp.getNeustarInfoForOmniture():"[NO DATA]");
f.dreamforcerole=vp.getActivity("DFrole")||"";
f.kxsfdc="kxsfdc="+(e.kxsfdc&&e.kxsfdc.segs?e.kxsfdc.segs.replace(/,/g,"|"):"NONE");
a(f);
c.trackDemandBase();
if(Page.isLogin()){d(f)
}c.setUserProfileByName("legacy",f)
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof _==="undefined"||typeof Util==="undefined"||typeof Url==="undefined"){return
}var i=digitalData.util,c=digitalData.page;
function a(n,m){var o="s_pers";
var r=60*60*24*365*10;
var q=i.readCookie(o);
if(q&&q.length>0){var t=_(q.replace(/\s/g,"").split(";")).chain().map(function(v){var u=v.split("=");
return[u[0],u[1]]
}).filter(function(u){return u&&u.length===2&&u[0]&&u[1]
}).object().value();
var p=t[n];
t=_.omit(t,[n]);
if(_.keys(t).length>0){var s=_(t).chain().pairs().map(function(u){return u.join("=")
}).value().join("; ");
i.writeCookie(o,s,r)
}else{Util.deleteCookie(o)
}if(p){if(p.indexOf("|")>0){p=p.split("|")[0]
}p=Url.decodeComponent(p);
if(m){return m(p)
}return p
}}return undefined
}function h(){var q=60*60*24*365*10;
var o=[];
var p="cvtdt";
var m=i.readCookie(p);
function n(r,t){var s=["Typed/Bookmarked","Force.com"];
return !(_.contains(s,t)&&_.contains(r,t))
}if(_.isString(m)&&m.length>0){o=m.split("~")
}else{o=a("v44",function(r){if(r&&r.length>0){return r.split("~")
}return[]
})||[]
}if(c.drivertype&&n(o,c.drivertype)){o.push(c.drivertype)
}while(o.length>5){o.shift()
}i.addPageData("crossvisittrafficdrivertype",o);
if(c.crossvisittrafficdrivertype&&c.crossvisittrafficdrivertype.length){i.writeCookie(p,c.crossvisittrafficdrivertype.join("~"),q)
}}function g(m){var o;
if(!m){return
}var n=i.getReferrerPageName();
i.addPageData("persistedInternalDriver",n+"|"+m.id);
o=i.getValueOnce(m.internal||m.id,"v22");
if(o){o=n+"|"+o;
i.addPageData("internaldrivers",o);
i.addBehavior("intdriverclick")
}}function e(m){var n;
if(!m){return
}n=i.getAndPersistValue(m.type,"c22");
i.addPageData("drivertype",n);
i.addPageData("drivertypepathing",n)
}function d(m){if(!m){return
}if(m.type!=="internal"){if((m.type==="Typed/Bookmarked"||m.type==="Force.com")&&i.readCookie("v0")){m.id=""
}m.id=i.getValueOnce(m.id,"v0",0);
if(m.id){i.addPageData("scampaign",m.id);
if(m.id!==c.lastvaliddriver){c.lastvaliddriver=m.id;
digitalData.localStorage.lastvaliddriver=m.id
}if(m.id!==c.lastvaliddrivercookie){c.lastvaliddrivercookie=m.id
}i.writeCookie("lastvaliddriver",m.id,7*86400);
if(m.type==="SEO"){i.addBehavior("seosearches")
}else{if(m.type==="SEM"){i.addBehavior("semsearches")
}}e(m);
h()
}}}function b(){c.drivertypepathing=i.getAndPersistValue("","c22");
c.drivertypepathing=c.drivertypepathing?c.drivertypepathing+":"+c.pagename:""
}function l(){if(i.readCookie("c40")||c.drivertype){if(!c.drivertype||(c.drivertype===i.readCookie("c40"))){c.drivertype="did not bounce"
}else{if(c.drivertype!==i.readCookie("c40")){c.drivertype=i.getAndPersistValue(c.drivertype,"c40")
}}}}function k(){return Util.getParam("elq_mid")||Util.getParam("RRID")||Util.getParam("eid")||Util.getParam("ban")||Util.getParam("dcmp")||Util.getParam("soc")||Util.getParam("mkt_tok")
}function f(){c.emailid=i.getValueOnce(k(),"v42")
}function j(){c.displayadid=Page.getDisplayAdId();
if(c.displayadid){i.addBehavior("displayadid")
}}i.components.trackDriver=function(){var m=Page.getDriver();
f();
j();
if(m){if(m.type==="internal"){g(m)
}else{d(m)
}}b();
l()
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof vp==="undefined"||typeof Util==="undefined"){return
}var z=digitalData.util,h=digitalData.page,c=digitalData.user[0].profile[0],w="form[data-sfdc-form]",i="data-form-environment-type",o="https://hosted-scratch.herokuapp.com/trial",b={modal:"Modal",dropPanel:"Drop panel",swapContainer:"Swap container",onPage:"On page"},g="sfdcForm",s=function(A){return A[g].formType==="lead"
},d=function(A){return !!(A[g].signup)
},j=function(A){return !!(A&&A.action.indexOf(o)>-1)
},l=function(A){return A.classList.contains("dynamic-load")
},f=function(B){var A="invalidFields";
return A in B&&!B[A].length
},y=function(){var A=JSON.parse(sessionStorage.getItem("form_session"));
return !!(A&&A.twoStep)
},x=function(D){var C=z.getFormFieldValue(D,"CompanyEmployees"),E=z.getFormFieldValue(D,"CompanyCountry"),A=z.getFormFieldValue(D,"CompanyName"),B=z.getFormFieldValue(D,"Lead.Primary_Product_Interest__c");
c.usercompanysize=C?C:"[FORM:NO COMPANY SIZE]";
c.usercompanycountry=E?E:"[FORM:NO COUNTRY]";
c.usercompanyname=A?A:"[FORM:NO COMPANY NAME]";
c.userprimaryprodinterest=B?B:"[FORM:NO PRIMARY PRODUCT INTEREST]";
c.userfirstformcompletetime=vp.getFirstFormCompleteTime()
},m=function(C){var E="FormCampaignId",A=C.elements[E],D=C.elements.UserEmail,B=Util.getParam(E)||(A?A.value:"");
if(B&&typeof(SHA1)!=="undefined"&&D){vp.fcid=Util.convert15To18(B)+"|"+SHA1(D.value)
}return vp.fcid
},k=function(B){var A=(z.getFormFieldValue(B,"subname")?z.getFormFieldValue(B,"subname"):false);
return(A&&A==="RBNBlog")
},u=function(A){Page.leadCaptureForms.push(A);
z.addPageData("type",Page.getType())
},v=function(){h.convertingpage=h.pagename;
h.convertingpageurl=h.url
},r=function(A){var I=[],C=d(A),H=j(A),D=k(A),F=C||H?"syncSignupFormCompleted":"Form Completion";
c.transactionid=m(A);
x(A);
if(D){z.addPageData("is_roll_based_newsletter","true");
var E=[],J=document.querySelectorAll(".field input[type=checkbox]:checked");
if(J){for(var G=0;
G<J.length;
G++){E.push(J[G].name)
}var B=E.join(", ");
z.addPageData("newsletter_subscriptions",B)
}}if(c.transactionid){if(z.readCookie("c30")){h.offerid=z.readCookie("c30")
}else{h.offerid=h.offerid?h.offerid:"[NO OFFER ID]"
}h.numberofformcompletes="+1";
I.push("formcompletesubmitbuttonclick");
if(C||H){I.push("signupformcomplete")
}if(H){I.push("formbutton_clicks")
}}z.deleteCookie("v0");
z.deleteCookie("v20");
z.deleteCookie("convertingPageUrl");
z.deleteCookie("v22");
z.deleteCookie("v28");
z.deleteCookie("c30");
z.trackBehavior(F,I,z.formDataPoints.concat(["user[0].profile[0].usercompanysize","user[0].profile[0].usercompanycountry","user[0].profile[0].userprimaryprodinterest","user[0].profile[0].usercompanyname","user[0].profile[0].userfirstformcompletetime","user[0].profile[0].transactionid","page.numberofformcompletes"]))
},t=function(){z.trackBehavior("Form Button Click",["formbutton_clicks"],["user[0].profile[0].userfirstformcompletetime"])
},a=function(A,G,C){var F=Page.getLocale(),H="",D="",E=[];
z.addPageData("formerrors","");
z.addPageData("formerrorsall","");
z.addPageData("formerrorspercentage","");
if(!A){return false
}A.forEach(function(J){var I=(F+":"+J);
if((H+I).length<100){H+=(H===""?"":"|")+I
}if((D+I).length<255){D+=(D===""?"":"|")+I
}});
if(H){H=H.toLowerCase();
D=D.toLowerCase();
var B=Math.round(G/(C+G)*100).toString()+"%";
z.addPageData("formerrors",H);
E.push("page.formerrors");
z.addPageData("formerrorsall",D);
E.push("page.formerrorsall");
z.addPageData("formerrorspercentage",B);
E.push("page.formerrorspercentage");
z.trackBehavior("Form error tracking",["form_errors"],E)
}},q=function(A){if(h.currentFormStep&&A>h.currentFormStep&&h.totalFormStep){h.currentFormStep=A;
z.addBehavior("stepbystepformprogress")
}},e=function(B,C){var A=B.querySelector("[type=submit]").innerText.trim();
z.addPageData("twostepbuttontext",A);
z.addPageData("twostepfieldname",C);
z.addBehavior("two_step_form_submit")
},n=function(H,A){var F="Step by step",C="Stacked",E="Two Step",D="onPage",G=H.sfdcForm.paginated?F:C,B=H.classList.contains(p.dynamicLoad)?H.getAttribute(i):D;
if(typeof(A)==="boolean"&&A){G=E
}z.addPageData("form_experience_type",G);
z.addPageData("form_environment_type",b[B]);
if(G===F&&H[g].paginate){h.currentFormStep=-1;
h.totalFormStep=H[g].paginate.total;
q(1);
H.addEventListener(p.stepProgress,function(J){var I=parseInt(J.detail);
if(I){q(I)
}})
}},p={init:"init-form",submit:"submit-form",invalid:"invalid-form",error:"error-form",success:"success-form",failed:"failed-form",closeParent:"close-parent",dynamicLoad:"dynamic-load",stepProgress:"step-progress",twoStepProgress:"two-step-progress"};
z.formDataPoints=["page.url","page.referrer","page.locale","user[0].profile[0].dayssincelastvisit","page.pagename","user[0].profile[0].targetingcompanysize","user[0].profile[0].usertype","page.convertingpage","page.internaldrivers","user[0].profile[0].timepartinghour","user[0].profile[0].timepartingday","user[0].profile[0].formfillstatus","page.scampaign","page.offerid","user[0].profile[0].visitnumber","page.cloud","page.type","page.prevpage","user[0].profile[0].targetingcompanyindustry","page.formname","page.sembrand","user[0].profile[0].targetingcompanyname","user[0].profile[0].targetingaudience","user[0].profile[0].accounttype","user[0].profile[0].kxsfdc","user[0].profile[0].hassmbinference","page.form_environment_type","page.form_experience_type","page.partnerpromocode","page.drivertypepathing","user[0].profile[0].detailedusertype","page.prevpagesanitized","page.namenolocale","page.drivertype","page.uiframework","page.segment","page.reportsuite","page.convertingpageurl"];
z.components.trackFormV2=function(){var A=this;
$(document).on(p.dynamicLoad,w,function(B){this.classList.add(p.dynamicLoad);
this.setAttribute(i,B.detail)
});
$(document).on(p.init,w,function(G){var F=this;
if(!F[g]){return
}var B=j(F),C=l(F),E=s(F)||B;
if(E){u(F);
A.trackConverting();
if(C){v()
}n(F,y());
if(window.IntersectionObserver!==null){var D=new IntersectionObserver(function(I){if(I[0].isIntersecting===true){A.trackFormView(F)
}},{threshold:[0]});
D.observe(F);
digitalData.page.observer=D
}else{A.trackFormView(F)
}F.addEventListener(p.success,function(){if(C){v()
}n(F);
r(F)
});
F.addEventListener(p.submit,function(){if(C){v()
}if(B&&f(F)){r(F);
return
}t()
});
F.addEventListener(p.error,function(K){if(C){v()
}var L=K.detail;
if(!L){return
}var J=L.fields,I=L.numValid;
if(J&&typeof I==="number"){a(J,J.length,I)
}})
}else{if(F[g].twoStep){F.addEventListener(p.twoStepProgress,function(I){var J=I.detail;
e(F,J)
})
}else{var H=F[g].submitEvent;
if(H){F.addEventListener(p.submit,function(){z.addPageData("formCustomEv",H);
z.trackBehavior("form_nonlead_submission",["form_nonlead_submission"],["page.formCustomEv"])
})
}}}})
}
}());
(function(){if(typeof digitalData==="undefined"){return
}var a=digitalData.util,b=".opinionlab-trigger, .feedback-trigger-reskin, .feedback-trigger";
a.components.trackFeedbackBtn=function(){var c=document.querySelector(b);
if(c){c.addEventListener("click",function(){a.addBehavior("feedbackbuttonclick")
})
}}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var q=digitalData.util,b=digitalData.localStorage,g=Page.getName(),c={selector:".embeddedServiceHelpButton[data-sf-chat='chat']",label:"chat-anchor"},e={selector:".chat-btn[data-sf-chat='chat']",label:"chat-invite"},i={selector:".chat-trigger-v2",label:"chat-cta"},a="chat_view",k="chat_init",d=".featureBody.embeddedServiceSidebarFeature",f,r=true,n="destroy_chat",p="chat_invite",j="chat_ended",u=function(){return document.querySelector(d)
},s=function(){q.addPageData("customlink","chat-fall");
q.addPageData("drivertypepathing","prop 22 value");
q.addPageData("moduletracking",g+"|chat-fall");
q.trackBehavior("chat-fall",["chatdrop"],["page.pagename","page.drivertypepathing","page.moduletracking","user[0].profile[0].usertype","page.customlink"])
},l=function(v){q.addPageData("customlink",f);
q.addPageData("moduletracking",g+"|"+f);
q.trackBehavior(f,[v],["page.pagename","page.customlink","page.moduletracking","user[0].profile[0].usertype"])
},h=function(w){var v=w.liveAgentSessionKey;
if(!b.chatInitKeys.includes(v)){b.chatInitKeys.push(v)
}else{return
}l(k)
},o=function(w){var v=document.querySelector(w.selector);
if(v){v.addEventListener("click",function(){if(!u()){f=w.label;
l(a)
}})
}},t=function(){if(embedded_svc&&embedded_svc.settings&&(embedded_svc.settings.wwwChatBotEnabled===false)){r=false
}if(!("chatInitKeys" in b)){b.chatInitKeys=[];
q.saveLocalStorage()
}var v={"sfdc-onChatRequestSuccess":{callback:function(w){if(r===false){h(w.detail)
}}},"sfdc-onChatTransferSuccessful":{callback:function(w){if(r){h(w.detail)
}}},"sfdc-afterDestroy":{label:n,callback:l,param:n},"sfdc-chatInvite":{label:p,callback:function(){l(p);
o(e)
}},"sfdc-onChatEndedByAgent":{label:"agent",callback:l,param:j},"sfdc-onChatEndedByChasitor":{label:"visitor",callback:l,param:j}};
Object.keys(v).forEach(function(w){document.addEventListener(w,function(x){var y=v[w];
if(!y){return
}if(y.label){f=y.label
}y.callback(y.param||x)
})
})
},m=function(){document.addEventListener("sfdc-chatLoaded",function(){var v=[c,i];
v.forEach(function(w){o(w)
});
t()
});
document.addEventListener("sfdc-waterfall",function(){s()
})
};
q.components.trackLiveChat=function(){m()
}
}());
"use strict";
(function(){if(typeof digitalData==="undefined"){return
}var c=digitalData.util;
var f="isLoginTracked";
var e="hasLoggedIn";
function d(){var j={company:"",id:"",newRegistration:"",orgID:"",role:"",relationship:""};
var i=Util.getCookie("www_a");
if(i){try{var g=JSON.parse(atob(i));
if(g.ui){j={company:g.ui.com,id:g.ui.id,newRegistration:g.ui.nr,orgID:g.ui.oid,role:g.ui.r,relationship:g.ui.rlt}
}}catch(h){}}return j
}function b(){if(window.sessionStorage.getItem(f)!=="true"){digitalData.util.addBehavior("userLogin");
window.sessionStorage.setItem(f,"true")
}}function a(){var g=window.location.href;
var k=g.split("?");
if(k.length>=2){var l=encodeURIComponent(e)+"=";
var j=k[1].split(/[&;]/g);
for(var h=j.length;
h-->0;
){if(j[h].lastIndexOf(l,0)!==-1){j.splice(h,1)
}}return k[0]+(j.length>0?"?"+j.join("&"):"")
}return g
}c.components.trackTBIDAuth=function(){var g=d();
if(Util.isEmpty(g)){return
}digitalData.user[0].profile.tb=g;
window.addEventListener("load",function(){if(Util.getParam(e)==="true"){b();
window.history.replaceState({},"",a())
}})
}
})();
(function(){if(typeof digitalData==="undefined"){return
}var e=digitalData.util,g={selector:".initial-chat-wrap",label:"dock-expand"},f={selector:".close-chat-wrap",label:"dock-collapse"},d=true,a=null,h=function(){var k=window.pageYOffset||document.documentElement.scrollTop;
return k.toString()
},b=function(){var k=localStorage.getItem("closedInitialChat");
if(k===null){a="Initial"
}else{a="Collapse"
}},i=function(){d?d=false:b();
e.addPageData("scrollDepth",h());
e.addPageData("contactDockStatus",a);
e.addBehavior("contactdockexpand")
},c=function(){e.addPageData("scrollDepth",h());
e.addBehavior("contactdockcollapse")
},j=function(){var l=document.querySelector(g.selector);
if(l){l.addEventListener("click",function(){i()
})
}var k=document.querySelector(f.selector);
if(k){k.addEventListener("click",function(){c()
})
}b()
};
e.components.trackContactDock=function(){j()
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof Util==="undefined"){return
}var a=digitalData.util,d="sfdcForm";
var f=function(h){var i="FormCampaignId",g="radio1";
if(h.elements[i]!=null){Page.nameCaptureId=Util.convert15To18(h.elements[i].value);
if(!Page.nameCaptureId&&h.elements[g]!=null){Page.nameCaptureId=Util.convert15To18(h.elements[g][0].value)
}}return Page.nameCaptureId==null?"":Page.nameCaptureId
};
var c=function(h){var g=(digitalData.page.offerid&&digitalData.page.offerid.indexOf("|")===-1)?digitalData.page.offerid:f(h);
if(g){a.writeCookie("lastOffer",g+":view");
digitalData.page.offerid=a.getValueOnce(g,"v28");
if(digitalData.page.offerid){g=digitalData.page.pagename+"|"+g;
g=(h.className.indexOf("form-builder-form")>-1?"form-builder":"old-form")+"|"+g;
if(digitalData.page.offerid&&digitalData.page.offerid.indexOf(digitalData.page.pagename)===-1){digitalData.page.offerid=g;
a.writeCookie("c30",digitalData.page.offerid)
}}else{g=""
}}return g
};
var b=function(g){var h=g&&g["Lead.Industry"];
return h?"Lead.Industry"+(h.type?"|"+h.type:""):""
};
var e=function(h){var g=(a.getFormFieldValue(h,"subname")?a.getFormFieldValue(h,"subname"):false);
return(g&&g==="RBNBlog")
};
a.components.trackFormView=function(i){var g=c(i),h=e(i);
if(h){a.addPageData("is_roll_based_newsletter","true")
}if(g){if(Page&&!Page.isFormKickback()){a.addPageData("partnerpromocode",a.getFormFieldValue(i,"PartnerPromoCode"));
a.addPageData("formname",a.getFormFieldValue(i,"mcloudFormName"));
a.addPageData("diagnosticsleadindustry",b(i));
if(!i[d].skip){a.trackBehavior("Form View",["formview"],a.formDataPoints.concat(["page.diagnosticsleadindustry"]))
}else{if(Util.getCookie("appxud")===""){a.trackBehavior("Form View",["formview"],a.formDataPoints.concat(["page.diagnosticsleadindustry"]))
}}}}}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof vp==="undefined"||typeof Util==="undefined"){return
}var b=digitalData.util,d=digitalData.page,a=digitalData.user[0].profile[0],c=function(){var h=Util.convert15To18(Util.getParam("d")?Util.getParam("d"):Util.getParam("DriverCampaignId"));
if(h&&!Util.getParam("d")){var i=b.getReferrerPageName()+"|"+h;
b.addPageData("persistedInternalDriver",i);
b.addProduct(h,"intdriverclick");
b.addPageData("internaldrivers",i);
b.addBehavior("intdriverclick")
}d.offerid=Util.convert15To18(Util.getParam("nc")?Util.getParam("nc"):Util.getParam("FormCampaignId"));
if(d.offerid){d.offerid="form-builder|"+Page.calculateName(Util.getParam("landing_page"))+"|"+d.offerid
}if(vp.getFormCompleteId()){a.transactionid=vp.getFormCompleteId()
}if(a.transactionid){d.numberofformcompletes="+1";
b.addBehavior("autoformcomplete")
}},f=function(){var h=(b.readCookie("appxud")?b.readCookie("appxud"):[]);
var i=Util.convert15To18(h.d?h.d:"");
if(i){var j=b.getReferrerPageName()+"|"+i;
b.addPageData("persistedInternalDriver",j);
b.addProduct(i,"intdriverclick");
b.addPageData("internaldrivers",j);
b.addBehavior("intdriverclick")
}d.offerid=Util.convert15To18(vp.getFormCompleteId());
if(d.offerid){d.offerid="form-builder|"+Page.calculateName(Util.getParam("landing_page"))+"|"+d.offerid
}if(vp.getFormCompleteId()){a.transactionid=vp.getFormCompleteId()
}if(a.transactionid){d.numberofformcompletes="+1";
b.addBehavior("autoformcomplete")
}},g=function(){b.setFormFillVals()
},e=function(){if(b.hasEvent("formcompletesubmitbuttonclick")){if(!b.readCookie("v22")){d.internaldrivers="[NO INTERNAL PLACEMENT ID]"
}b.deleteCookie("v0");
b.deleteCookie("v20");
b.deleteCookie("convertingPageUrl");
b.deleteCookie("v22");
b.deleteCookie("v28");
b.deleteCookie("c30")
}};
b.components.trackFormConfPage=function(){if(Page.isSkipFormRedirect()){g();
this.trackConverting();
c();
e()
}document.addEventListener("inline-form-skip-success",function(h){g();
b.components.trackConverting();
f();
e()
})
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var a=digitalData.util,b=digitalData.page,e;
function d(){return(b.scampaign||b.internaldrivers||(Page.hasLeadCaptureForm()&&!a.readCookie("v20")&&!a.readCookie("convertingPageUrl")))&&!Page.isFormKickback()
}function c(){var f="";
var h=document.createElement("a");
h.href=Page.getReferrer();
if(h.pathname){f=h.pathname.replace(/(^\/?)/,"/")
}var g=Page.calculateName(f,h.hostname);
if(g===Page.getServer()+":"+Page.getLocale()+":blog"){g+=":homepage"
}if(document.referrer.indexOf("login.salesforce.com")>-1){g=Page.getServer()+":"+Page.getLocale()+":login"
}return g
}a.components.trackConverting=function(){let convertingPageStored=a.readCookie("v20"),convertingPage=convertingPageStored;
let convertingPageUrlStored=a.readCookie("convertingPageUrl"),convertingPageUrl=convertingPageUrlStored;
try{if(typeof optimizelyEdge!=="undefined"&&optimizelyEdge.get("state").getRedirectInfo()&&optimizelyEdge.get("state").getRedirectInfo().referrer){var f=optimizelyEdge.get("state").getRedirectInfo().referrer;
Page.referrer=b.referrer=convertingPageUrl=f
}}catch(g){}if(d()||Page.isFromSingleLineForm()){if(b.prevpage){convertingPage=b.prevpage;
convertingPageUrl=b.prevpageurl;
try{if(Page.hasInternalReferrer()){convertingPage=a.getReferrerPageName();
convertingPageUrl=b.referrer
}}catch(g){}}else{if(!convertingPageStored){convertingPage="Direct Landing"
}if(!convertingPageUrlStored){convertingPageUrl="Direct Landing"
}}}if(convertingPageStored!==convertingPage){a.writeCookie("v20",convertingPage)
}if(convertingPageUrlStored!==convertingPageUrl){a.writeCookie("convertingPageUrl",convertingPageUrl)
}b.convertingpage=e=convertingPage;
b.convertingpageurl=convertingPageUrl;
digitalData.page.referrername=c()
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var g=digitalData.util,f=Page.getName();
var a=function(){var k="social:twitter",l="social:Facebook",n="social:LinkedIn",m="social:Youtube",j="social:Instagram",o="social:Google";
document.addEventListener("click",function(t){var u="undefined";
if(t.target.matches("footer.bottom a")){var s=t.target,r=s.innerText.trim().toLowerCase(),v=s.closest(".genericLinkListComponent")?s.closest(".genericLinkListComponent").previousElementSibling:"",w=v?v.innerText.trim().toLowerCase():(s.closest(".page-footer_content")?"legal and privacy":"");
u=w?w+":"+r:r
}if(t.target.matches("footer .footer-logo a")||t.target.matches("footer .footer-logo a img")){u="home:logo"
}var p=t.target,q=p.classList;
if(p.getAttribute("src")&&q&&q.contains("salesforce-social-icon")){var x=p.getAttribute("src");
if(x.includes("linkedin")){u=n
}else{if(x.includes("twitter")){u=k
}else{if(x.includes("facebook")){u=l
}else{if(x.includes("youtube")){u=m
}else{if(x.includes("instagram")){u=j
}else{if(x.includes("google")){u=o
}}}}}}}if(u!=="undefined"){g.addPageData("navItem",u);
g.addBehavior("currentbottomnavigationclicks")
}})
};
var d=function(){if(document.getElementsByTagName("hgf-c360nav")){var j=function(k){if(k.detail&&k.detail.event){dataLayer.push(k.detail)
}};
document.addEventListener("www_track",j,false)
}};
var b=function(){var k=document.querySelectorAll(".leftnav a");
for(var j=0;
j<k.length;
j++){k[j].addEventListener("click",function(l){var m=l.target;
g.addPageData("navItem",m.innerText.trim().toLowerCase());
g.addBehavior("currentleftnavigationclicks")
})
}};
var c=function(){var q=document.querySelectorAll(".globalNavigationBar .tab-content .tab-pane");
function o(){var r=p.split("_")[0];
var j=f+"|navvideoplay|"+r;
g.addPageData("moduletracking",j);
g.trackBehavior(j,["topnavigationclicks","customlink"],["page.moduletracking"])
}for(var m=0;
m<q.length;
m++){var n=q[m];
var p=n.getAttribute("id");
var k=n.querySelector(".image-link[data-modal-src] img");
if(p&&!!k){for(var l=0;
l<k.length;
l++){k[l].addEventListener("click",function(){o()
})
}}}};
var i=function(){var k=document.querySelectorAll(".nav-container a");
for(var j=0;
j<k.length;
j++){k[j].addEventListener("click",function(n){var l=n.target.querySelector(".header-text").innerText.toLowerCase().trim().replace(/ /g,"_"),m=f+"|topnav-toplevel|"+l;
g.addPageData("moduletracking",m);
g.trackBehavior(m,["topnavigationclicks","customlink"],["page.moduletracking"])
})
}};
var h;
if(document.querySelector(".globalNavigationBarConsolidated")){h=function(){var j=document.querySelectorAll(".globalNavigationBarConsolidated a");
for(var k=0;
k<j.length;
k++){j[k].addEventListener("click",function(t){var r=t.target,u="Top",q=r.innerText.trim().toLowerCase(),p=q.replace(/ /g,"_"),w=u+"|"+p,s=r.closest(".wwww-main-nav > .nav-item")?r.closest(".wwww-main-nav > .nav-item").getAttribute("id"):"",n="undefined",m=f+"|"+w;
if(s){var y=s.replace("_menu_item",""),o=r.closest(".sub-nav")?r.closest(".sub-nav").previousElementSibling:"",l=o?o.innerText.trim().toLowerCase():"",v=r.closest(".wwww-main-nav > .nav-item > .sub-nav")?r.closest(".wwww-main-nav > .nav-item > .sub-nav").previousElementSibling:"",x=v?v.innerText.trim().toLowerCase():"";
if(l){n=x+":"+l+":"+q
}else{n=x+":"+q
}w=u+"|"+y+"|"+p;
m=f+"|"+w
}if((r.closest("ul")&&r.closest("ul").classList.contains("flyout-menu-login"))||p==="login"){n="login:"+q;
w=u+"|Login|"+p;
m=f+"|"+w
}if(!r.closest(".panel-heading")){if(r.closest("a")&&r.classList.contains("icon-sfdc-icon-magnifying-glass")){n="search:search"
}if((r.closest("a")&&r.closest("a").classList.contains("logo"))){n="home:logo"
}if((r.closest("a")&&r.closest("a").classList.contains("display-phone"))){n=q?"contact us:"+q:"contact us"
}if(n==="undefined"&&q){n=q
}g.addPageData("navItem",n);
g.addBehavior("legacycurrenttopnavigationclicks");
g.addPageData("user[0].profile[0].usertype",vp.getType()?vp.getType():"");
g.addPageData("moduletracking",m);
g.addPageData("customlink",w);
g.trackBehavior(m,["topnavigationclicks","customlink"],["page.moduletracking","user[0].profile[0].usertype","page.customlink"])
}})
}document.addEventListener("click",function(o){if(o.target.matches(".header-right-content .region-selector a")){var q=o.target,p=q.innerText.trim().toLowerCase(),l=q.closest(".genericLinkListComponent")?q.closest(".genericLinkListComponent").previousElementSibling:"",n=l?l.innerText.trim().toLowerCase():"",m=n?n+":"+p:p;
g.addPageData("navItem",m);
g.addBehavior("legacycurrenttopnavigationclicks")
}})
}
}else{function e(l){var q="Top";
var o=l;
var t=o.innerText.toLowerCase(),n=t.trim().replace(/ /g,"_"),r=q+"|"+n,s=o.closest("li.primary-menu-item"),p=(s)?s.getAttribute("id"):"",m=f+"|"+r;
if(p){var u=p.replace("_menu_item","");
var k=o.closest(".tab-pane");
var j=k?k.getAttribute("id"):"";
if(j){r=q+"|"+u+"|"+j.replace("_"+u,"")+"|"+n
}else{r=q+"|"+u+"|"+n
}m=f+"|"+r
}if((o.closest("ul")&&o.closest("ul").classList.contains("flyout-menu-login"))||n==="login"){r=q+"|Login|"+n;
m=f+"|"+r
}if(!o.parentElement.classList.contains("panel-heading")){g.addPageData("user[0].profile[0].usertype",vp.getType()?vp.getType():"");
g.addPageData("moduletracking",m);
g.addPageData("customlink",r);
g.trackBehavior(m,["topnavigationclicks","customlink"],["page.moduletracking","user[0].profile[0].usertype","page.customlink"])
}}h=function(){var j=document.querySelectorAll(".globalNavigationBar a, .skinnynav a");
for(var k=0;
k<j.length;
k++){j[k].addEventListener("click",function(l){e(l.target)
})
}}
}g.components.trackGlobalNavBar=function(){h();
b();
a();
c();
i();
d()
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var d=digitalData.util,b='div[data-href*=".pdf"], a[href*=".pdf"]';
function c(e){return(e.indexOf(":conf:")!==-1)||(e.indexOf("[conf]")!==-1)||(Util.endsWith(e,"conf"))
}function a(e){var f=new RegExp("^[https://]?.*/(.*).pdf"),g=f.exec(e);
return g!=null&&g.length>1?g[1]:null
}d.components.trackPDFImpression=function(){var f=document.querySelector(b);
if(f&&typeof Page!=="undefined"&&c(Page.getName())){var e=a(f.dataset.href?f.dataset.href:f.href);
if(e){d.addPageData("pdfname",e)
}}}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var b=digitalData.util,c="twitter",d="Facebook",e="LinkedIn";
function a(f){b.addPageData("customlink","Social Sharing Click");
b.addPageData("sharechannel",f);
b.trackBehavior("Social Sharing Click",["socialshares","customlink"],["page.pagename","page.segment","page.cloud","user[0].profile[0].usertype","page.customlink","page.sharechannel"])
}b.components.trackSocial=function(){if(Page.isBlog()){document.addEventListener("click",function(g){var f=g.target&&g.target.parentElement&&g.target.parentElement.getAttribute("onclick");
if(f&&f.indexOf("SfdcWwwBase.socialshare")===0){f=f.substring(0,f.indexOf("("));
f=f.split(".").pop();
if(f){if(f==="linkedin"){f=e
}else{if(f==="facebook"){f=d
}else{if(f==="twitter"){f=c
}}}a(f)
}}})
}else{document.addEventListener("click",function(g){var i=g.target,f="",h=i.classList;
if(i.getAttribute("src")&&h&&h.contains("salesforce-social-icon")){if(i.getAttribute("src").includes("linkedin")){f=e
}else{if(i.getAttribute("src").includes("twitter")){f=c
}else{if(i.getAttribute("src").includes("facebook")){f=d
}}}}if(f){a(f)
}})
}}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var i=digitalData.util,a=digitalData.page,c=$("body"),k='div[data-href*=".pdf"], a[href*=".pdf"]',g=".accordionContainer .panel .panel-heading a",b=".dropdown-menu li a.dropdown-menu-item",h=".trailmaps-sessionlist-container .body-title a",j=".region-selector_content .genericLinkListComponent .generic-links a",e=".scrollable-nav .nav-pills a",f='a[data-qe^="TRACK_CUSTOMLINK_"],img[data-qe^="TRACK_CUSTOMLINK_"],div[data-qe^="TRACK_CUSTOMLINK_"]',l='div[data-qe^="Hotspot_"]';
function d(n,m){i.addPageData("customlink",n);
i.addPageData("moduletracking",m);
i.trackBehavior("Custom Link Click",["customlink"],["page.pagename","page.segment","page.cloud","page.moduletracking","user[0].profile[0].usertype","page.customlink"])
}i.components.trackCustomLinkClicks=function(){$(k).on("click",function(){var p=this,n,m;
var o=p.dataset.href?p.dataset.href.toLowerCase():p.href.toLowerCase();
o=a.server+":"+a.sitesection+":file:"+o;
n=Page.setPrevious()?Page.setPrevious():"[NO PREVIOUS PAGE AVAILABLE]";
m=a.pagename;
digitalData.page=a
});
c.on("click",g,function(){var p=this,o="",n="";
if(this.matches(".collapsed")){var m=p.querySelector(".panel-title").innerText.trim();
if(m===""){m=p.innerText.trim()
}if(m!==""){o=m;
n=a.pagename+"|accordions|"+m;
d(o,n)
}}});
$(b).on("click",function(){var o=this,n="",m=o.innerText.trim();
if(m){m="Custom Link Click|Trail Maps|"+m;
n=a.pagename+"|"+m;
d(m,n)
}});
$("#mainContent").on("click",h,function(){var p=this,o="",n="",m=p.textContent;
if(m){o="Custom Link Click|Trail Maps|"+m;
n=a.pagename+"|"+o;
d(o,n)
}});
c.on("click",j,function(){var q=this,p="",n="",r=document.querySelector("header"),m=r.contains(q)?"Header":"Footer",o=q.parentNode.innerText.trim();
if(o!==""){p="RegionSelector|"+m+"|"+o;
n=a.pagename+"|RegionSelector|"+m+"|"+o;
d(p,n)
}});
$(e).on("click",function(){var p=this,o="",n="",m=p.innerText;
if(m){m=m.toLowerCase().trim();
o="Scrollable_Nav|"+m;
n=a.pagename+"|Scrollable_Nav|"+m;
d(o,n)
}});
c.on("click",f,function(){var p=this,o="",m="",n=p.dataset.qe.replace("TRACK_CUSTOMLINK_","").trim();
if(n!==""){o=n;
m=a.pagename+"|customLink|"+n;
d(o,m)
}});
$(l).on("click",function(){var o=this,p="",m="",n=o.dataset.qe.replace("Hotspot_","").trim();
if(n!==""){p=n;
m=a.pagename+"|Hotspot|"+n;
d(p,m)
}})
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var a=digitalData.util,c=digitalData.page;
function b(f,g){var e="";
try{switch(g){case"blogs":(function(h,i){h(i).parentsUntil(".page-wrap").each(function(){var k=h(this),l=k.attr("id")||"",j=k.attr("class")||"";
if(j.indexOf("header-main")>-1){e="topnav"
}else{if(l==="blogspotlightwrap"){e="grid-row-1"
}else{if(j==="container-fluid container-width-md top-20"){e="grid-row-2"
}else{if(j==="footer"){e="footer"
}}}}if(e){return false
}})
})($,f);
break;
case"sflive":(function(h,i){h(i).parentsUntil("body").each(function(){var k=h(this),j=k.attr("class")||"";
if(j.indexOf("header-container")>-1){e="topnav"
}else{if(j==="bottom"){e="footer"
}else{if(k.parent().get(0).className.indexOf("content-container")>-1){e="grid-row-"+(h(this).index()+1)
}}}if(e){return false
}})
})($,f);
break;
default:(function(j,k){var i=j(k).parentsUntil("body").addBack(),h=j(i).get().reverse();
j(h).each(function(){var m=j(this),n=m.attr("id")||"",l=m.attr("class")||"";
if(n.indexOf("products_expand_par")>-1){e="topnav-products-menu"
}else{if(l.indexOf("navbar-expandable-container")>-1||(l.indexOf("overlayMenuItem")>-1)||l.indexOf("globalNavigationBarConsolidated")>-1){e="topnav"
}else{if(n==="navigation_left"||(l.indexOf("leftnav")>-1)){e="left-nav"
}else{if(l.indexOf("navbar-header-container")>-1){e="header"
}else{if(l==="bottom"){e="footer"
}else{if(m.parent().get(0).className.indexOf("content-container")>-1){e="grid-row-"+(j(this).index()+1)
}}}}}}if(e){return false
}})
})($,f)
}}catch(d){}if(e){a.writeCookie("v32",c.pagename+"|"+e)
}}a.components.doCustomPlugins=function(){if(Page.isBlog()){$("header a, .page-content a").click(function(){b(this,"blogs")
})
}else{if(Page.isSFLive()){$("header.header-container a, footer.bottom a, .content-container a").click(function(){b(this,"sflive")
})
}else{$("header.header-container a, footer.bottom a, .content-container a, .leftnav a").click(function(){b(this,"www")
})
}}}
}());
(function(){if(typeof digitalData==="undefined"){return
}var c=digitalData.util,a='a[href*="?d="], a[href*="&d="], div.thumbnail-linked[data-href*="?d="], div.thumbnail-linked[data-href*="&d="]';
function b(f){var h="",g;
if(f){g=document.createElement("a");
g.href=f;
if(g.protocol&&g.host&&g.pathname){h=[g.protocol,"//",g.host,g.pathname.replace(/(^\/?)/,"/")].join("")
}}return h
}function e(i,h){var f;
var g=false;
if(i.currentTarget.hostname){if(i.currentTarget.hostname.indexOf(".salesforce.com")>-1){g=true
}}else{if(h){if(h.indexOf("/")===0){g=true
}else{f=document.createElement("a");
f.href=h;
if(f.hostname.indexOf(".salesforce.com")>-1){g=true
}}}}return g
}function d(){var f=Page.getDriver();
if(f&&f.type==="internal"){c.addProduct(f.id,"intdriverclick")
}c.addDrivers(c.getCTAs())
}c.components.trackInternalDriver=function(){d();
$("body").on("click",a,function(i){var j=this,k=j.innerText.trim(),f=j.href?j.href:j.dataset.href,h=b(f),g=Util.convert15To18(Util.getParam("d",f));
c.addPageData("internalclickpath",h);
c.addPageData("internalclickdriver",g);
c.addPageData("internalclicktext",k);
if(e(i,f)){c.addBehavior("internaldriverclicks");
i.stopPropagation()
}})
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"){return
}var a=digitalData.util,b=digitalData.page;
a.components.trackTrailheadLinks=function(){var c="a[href^='https://trailhead.salesforce.com'], div.thumbnail-linked[data-href^='https://trailhead.salesforce.com']";
var d=b.pagename||Page.getName();
document.addEventListener("click",function(f){if(f.target&&f.target.matches(c)){a.trackBehavior("Trailhead_"+d,["customlink"],["page.customlink"])
}})
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Page==="undefined"||typeof Util==="undefined"){return
}var o=digitalData.util,c=digitalData.page,n=digitalData.user[0].profile[0],f=window.MutationObserver||window.WebKitMutationObserver,d=[];
function b(p){this.divId=p;
this.observer=null;
this.campaignUrl="";
this.driverIdList=[];
this.formDriverIdList=[]
}function g(){var p=[];
d.forEach(function(q){p.push(q.divId)
});
return p
}function h(){var p=[];
d.forEach(function(q){p=p.concat(q.formDriverIdList)
});
p=p.filter(function(q,r){return p.indexOf(q)===r
});
return p
}function l(){var p=[];
d.forEach(function(q){p.push(q.campaignUrl)
});
return p
}function m(p,q,s){if(f){var r=new f(s);
q.observer=r;
r.observe(p,{childList:true,subtree:true})
}else{p.addEventListener("DOMNodeInserted",s,false)
}}function e(q,t){var s=q.addedNodes;
if(s&&s.length>0){var r=s[0].parentNode;
var p=j(r);
if(p){t.campaignUrl=p;
var u=a(r);
t.driverIdList=t.driverIdList.concat(u.driverIds);
t.formDriverIdList=t.formDriverIdList.concat(u.formDriverIds);
t.observer.disconnect();
d.push(t)
}}}function j(p){var q=p.dataset.campaignUrl;
if(q){q=q.replace("|content|campaigns|","").replace("|_jcr_content|par","");
return q
}return""
}function a(q){var s=q.querySelectorAll("a"),r=[],p=[];
s.forEach(function(v){if(!(v.offsetWidth>0&&v.offsetHeight>0)){return
}var u=Util.getHref(v),w=Util.getParam("d",u);
if(!u||!w){return
}var t=w.length===15?Util.convert15To18(w):w;
r.push(t);
if(u.indexOf("/form/")>-1||(Page&&Page.isBlog())){p.push(t)
}});
return{driverIds:r,formDriverIds:p}
}function i(){var p=n,r=p.formattedDB,q="[NO DATA]";
if(r){p.targetingcompanyindustry="DB="+(r.ind||q);
p.targetingcompanyname=["DB="+(r.name||q),"SFDC="+(vp.getCompanyName()||q)].join("|");
p.targetingaudience="DB="+(r.aud||q)
}}function k(){var q=h(),p="";
if(n&&n.db&&n.db.city&&n.db.state){p=n.db.city+"|"+n.db.state
}o.addPageData("dynamicoffercollection",d);
o.addBehavior("dynamicofferimpression")
}o.components.trackDynamicContentImpressions=function(){if(typeof Modernizr==="object"||typeof Page==="undefined"){return
}var p=document.querySelectorAll(".campaign"),q="targetedContentLoaded";
p.forEach(function(s){var r=new b(s.id);
m(s,r,function(t){t.forEach(function(u){e(u,r)
});
if(d.length===p.length){document.dispatchEvent(new CustomEvent(q,{detail:{targetDivs:g()}}))
}})
});
document.addEventListener(q,function(){i();
k()
})
}
}());
(function(){if(typeof digitalData==="undefined"||typeof Util==="undefined"){return
}var b=digitalData.util,e=digitalData.page,a=digitalData.user[0].profile[0];
try{function d(){var f=e.pagename;
return f.indexOf("SFDC:us:solutions:small-business-solutions")!==-1||f.indexOf("SFDC:us:solutions:essentials")!==-1
}b.hasSMBInference=function(){return a.inference&&a.inference.smb
};
a.inference=(function(){var f=localStorage.getItem("inference")||"{}";
if(!Util.isValidJson(f)){f="{}";
localStorage.removeItem("inference")
}return JSON.parse(f)
})();
b.components.trackSMBInference=function(){if(d()){a.inference.smb=true;
$.when(SfdcWwwBase.gdpr.hasFunctional).done(function(){localStorage.setItem("inference",JSON.stringify(a.inference))
})
}if(b.hasSMBInference()){a.hassmbinference="true"
}}
}catch(c){}}());
(function(){if(typeof digitalData==="undefined"||typeof vp==="undefined"){return
}var b=digitalData.util,e=digitalData.localStorage,f=["podcastname","episodename","episodeid"],d=function(h,k){var i={},j=[];
k.forEach(function(l){if(l in h){i[l]=h[l];
j.push(["page","media",l].join("."))
}});
b.addPageData("media",i);
return j
},c={castedEpisodeReady:function(i){var h=d(i,f.concat(["episodelength"]));
b.trackBehavior("podcast-load",["podcast_load"],h)
},episodePlaybackStarted:function(j){var i=d(j,f.concat(["episodelength","episodestart"]));
var h=j.episodeid;
if(vp.isNewSession()&&("podcastepisodelist" in e)&&!e.podcastepisodelist.includes(h)){e.podcastepisodelist.push(h);
b.saveLocalStorage();
b.trackBehavior("podcast-first-play",["podcast_first_play"],i)
}else{b.trackBehavior("podcast-play",["podcast_play"],i)
}},episodePlaybackStopped:function(i){var h=d(i,f.concat(["episodelength","episodestart","episodestop"]));
b.trackBehavior("podcast-stop",["podcast_stop"],h)
},playbackProgress:function(i){var h=d(i,f.concat(["episodelength","episodestart","episodecurrenttime","episodepercent"]));
b.trackBehavior("podcast-percent",["podcast_percent"],h)
},takeawayClicked:function(i){var h=d(i,f.concat(["takeawayname","takeawayid","takeawaystart","takeawayend"]));
b.trackBehavior("takeaway-click",["takeaway_click"],h)
}},a={castedSizeUpdate:function(h){if(isNaN(parseInt(h.height))){return
}document.getElementById("casted-playlist-embed").height=parseInt(h.height)+"px"
}},g=function(i){if(i.origin!=="https://podcasts.salesforce.com"){return
}if(!i.data||!i.data.event||!i.data.payload){return
}var j=i.data.payload;
if(i.data.event in a){a[i.data.event](j)
}if(i.data.event in c){var h={episodestart:j.startTime,episodestop:j.stopTime,episodecurrenttime:j.currentTime,episodepercent:j.progress};
if(j.podcast){h.podcastname=j.podcast.name
}if(j.episode){h.episodename=j.episode.name;
h.episodeid=j.episode.id;
h.episodelength=j.episode.duration
}if(j.takeaway){h.takeawayname=j.takeaway.name;
h.takeawayid=j.takeaway.id;
h.takeawaystart=j.takeaway.startTime;
h.takeawayend=j.takeaway.endTime
}c[i.data.event](h)
}};
b.components.trackPodcast=function(){if(document.querySelector(".podcastComponent")===null){return
}if(vp.isNewSession()||!("podcastepisodelist" in e)){e.podcastepisodelist=[];
b.saveLocalStorage()
}window.addEventListener("message",g)
}
}());
"use strict";
var digitalData=digitalData||{},SfdcWwwBase=SfdcWwwBase||{};
(function(){var a=digitalData.util,b=a.components;
digitalData.initLocalStorage();
b.trackPage();
b.trackLegacyProfile();
b.trackDriver();
b.trackFormV2();
b.doCustomPlugins();
b.trackDynamicContentImpressions();
b.addIntegrations();
b.trackLiveChat();
b.trackTBIDAuth();
b.trackSMBInference();
b.trackTrailheadLinks();
$(document).ready(function(){b.trackConverting();
b.trackFormConfPage();
b.trackFeedbackBtn();
b.trackGlobalNavBar();
b.trackPDFImpression();
b.trackCustomLinkClicks();
b.trackInternalDriver();
b.trackPodcast()
});
$(window).load(function(){b.trackContactDock();
b.trackSocial()
})
}());