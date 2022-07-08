(function(){var e=function(){var f="";
if(window.akamaiRoot){f+="https:"+window.akamaiRoot
}f+=window.location.pathname.replace(/\.[^/.]+$/,"");
if(!f.endsWith("/")){f+="/"
}return f+"_jcr_content.personalization.pagemetadata.v2.json"
},a=function(f){window.pagemeta={};
window.pagemeta.image=f.imageUrl||"";
window.pagemeta.tags=f.namespaces||{}
},c=function(i,g,j){var h=j||{},f=i.createEvent("CustomEvent");
f.initCustomEvent(g,true,false,h);
document.dispatchEvent(f)
},b=function(){var f=new XMLHttpRequest(),g={};
f.open("GET",e(),false);
f.onload=function(){if(f.status>=200&&f.status<400){try{g=JSON.parse(f.responseText)
}catch(h){console.warn("Could not load taxonomy info of page due error: ",h.message)
}}else{console.warn("Could not load taxonomy information for the current page due server status")
}};
f.onerror=function(){console.warn("Could not load taxonomy information for the current page due an error")
};
f.send();
return g
},d=function(){var f=b();
if(!f||!Object.keys(f).length){return
}a(f);
c(document,"sfdc-tagsReady",f)
};
d()
}());