(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0009e6e2"],{1047:function(e,t,n){"use strict";var a=n("7a23");const r=Object(a["f"])(" + ");function c(e,t,n,c,i,u){const o=Object(a["w"])("EditList"),s=Object(a["w"])("ReferenceShow");return Object(a["q"])(),Object(a["d"])("div",null,[Object(a["g"])(o,{manager:e.manager,canAdd:!1,canEdit:!1},null,8,["manager"]),Object(a["g"])(s,{onSelect:e.select,type:e.type},{default:Object(a["H"])(()=>[r]),_:1},8,["onSelect","type"])])}var i=n("7329"),u=n.n(i),o=n("a957"),s=n("c12b"),l=n("e27e"),b=Object(a["h"])({components:{EditList:s["a"],ReferenceShow:l["a"]},props:{manager:{type:Object,required:!0},type:{type:String,required:!1,default:o["b"].schemas}},methods:{select:function(e){try{var t=this.manager.make(e.ui,this.type);this.manager.add(t)}catch(n){new u.a({text:n.message,theme:"bootstrap-v4",type:"error"}).show()}}}});b.render=c;t["a"]=b},"1aa4":function(e,t,n){"use strict";var a=n("7a23");function r(e,t,n,r,c,i){return Object(a["q"])(),Object(a["d"])("span",{onClick:t[1]||(t[1]=(...t)=>e.change&&e.change(...t)),class:"btn btn-outline-primary"},Object(a["y"])(e.item.ui),1)}var c=n("bd3f"),i=Object(a["h"])({props:{item:{type:Object,required:!0},manager:{type:Object,required:!0}},setup:function(e){var t=Object(a["k"])("uiDialogue"),n=function(){t.value.showInput("Please input the ui",e.item.ui,(function(t){e.manager.find(t)?c["a"].error(t+" already exists!"):e.item.ui=t})),t.value.visible=!0};return{change:n}}});i.render=r;t["a"]=i},"55e7":function(e,t,n){"use strict";n.r(t);var a=n("7a23");function r(e,t,n,r,c,i){const u=Object(a["w"])("ReferenceList");return Object(a["q"])(),Object(a["d"])(u,{manager:e.sss.sidebar.item.headerManager,type:"headers",class:"mt11"},null,8,["manager"])}var c=n("cca5"),i=n("1047"),u=Object(a["h"])({components:{ReferenceList:i["a"]},data:function(){return{sss:c["a"]}}});u.render=r;t["default"]=u},"873b":function(e,t,n){"use strict";var a=n("7a23");function r(e,t,n,r,c,i){return Object(a["q"])(),Object(a["d"])("span",{onClick:t[1]||(t[1]=(...t)=>e.remove&&e.remove(...t)),class:"btn btn-outline-danger"}," - ")}var c=n("7329"),i=n.n(c),u=Object(a["h"])({props:{manager:{type:Object,required:!0},item:{type:Object,required:!0}},methods:{remove:function(){var e=this,t=new i.a({animation:{open:null,close:null},buttons:[i.a.button("Yes","btn btn-outline-danger mr11",(function(){t.close(),e.manager.remove(e.item),e.$emit("deleted",e.item)})),i.a.button("No","btn btn-outline-primary",(function(){t.close()}))],closeWith:["button"],layout:"topCenter",modal:!0,text:'<h4 class="mtb11">Are you sure?</h4>'});t.show()}}});u.render=r;t["a"]=u},bd3f:function(e,t,n){"use strict";var a=n("7329"),r=n.n(a);function c(e){new r.a({text:e,theme:"bootstrap-v4",type:"error"}).show()}function i(e){new r.a({text:e,theme:"bootstrap-v4",timeout:2333,type:"info"}).show()}function u(e,t){200!==t?c(e):i(e)}function o(e){new r.a({text:e,theme:"bootstrap-v4",type:"warning"}).show()}t["a"]={error:c,show:u,toast:i,warn:o}},c12b:function(e,t,n){"use strict";var a=n("7a23");const r={class:"btn-group"},c={key:1,class:"btn btn-outline-secondary"};function i(e,t,n,i,u,o){const s=Object(a["w"])("DeleteButton"),l=Object(a["w"])("ChangeButton"),b=Object(a["w"])("AddButton");return Object(a["q"])(),Object(a["d"])("div",null,[(Object(a["q"])(!0),Object(a["d"])(a["a"],null,Object(a["u"])(e.manager.list,t=>(Object(a["q"])(),Object(a["d"])("div",{key:t.ui,class:"mb11"},[Object(a["g"])("div",r,[Object(a["g"])(s,{manager:e.manager,item:t},null,8,["manager","item"]),e.canEdit?(Object(a["q"])(),Object(a["d"])(l,{key:0,manager:e.manager,item:t},null,8,["manager","item"])):(Object(a["q"])(),Object(a["d"])("span",c,Object(a["y"])(t.ui),1))])]))),128)),e.canAdd?(Object(a["q"])(),Object(a["d"])(b,{key:0,manager:e.manager},null,8,["manager"])):Object(a["e"])("",!0)])}var u=n("e3dc"),o=n("1aa4"),s=n("873b"),l=Object(a["h"])({components:{AddButton:u["a"],ChangeButton:o["a"],DeleteButton:s["a"]},props:{manager:{type:Object,required:!0},canAdd:{type:Boolean,required:!1,default:!0},canEdit:{type:Boolean,required:!1,default:!0}}});l.render=i;t["a"]=l},e27e:function(e,t,n){"use strict";var a=n("7a23");function r(e,t,n,r,c,i){const u=Object(a["w"])("SelectList");return Object(a["q"])(),Object(a["d"])(u,Object(a["l"])(e.$attrs,{list:e.list,title:e.title}),{default:Object(a["H"])(()=>[Object(a["v"])(e.$slots,"default")]),_:3},16,["list","title"])}var c=n("a957"),i=n("cca5"),u=n("f031"),o=Object(a["h"])({components:{SelectList:u["a"]},props:{type:{type:String,required:!1,default:c["b"].schemas}},data:function(){return{list:i["a"].getProject().oapi.getManager(this.type).list,title:"Select a "+this.type}}});o.render=r;t["a"]=o},e3dc:function(e,t,n){"use strict";var a=n("7a23");function r(e,t,n,r,c,i){return Object(a["q"])(),Object(a["d"])("span",{onClick:t[1]||(t[1]=(...t)=>e.add&&e.add(...t)),class:"btn btn-outline-primary"}," + ")}var c=Object(a["h"])({props:{manager:{type:Object,required:!0},value:{type:String,required:!1,default:"name"},noinput:{type:Boolean,required:!1,default:!1}},setup:function(e,t){var n=function(n){var a=e.manager.make(n);e.manager.add(a),t.emit("added",a)},r=Object(a["k"])("uiDialogue"),c=function(){e.noinput?n(e.value):(r.value.showInput("Please input the ui",e.value,(function(e){n(e)})),r.value.visible=!0)};return{add:c}}});c.render=r;t["a"]=c},f031:function(e,t,n){"use strict";var a=n("7a23");function r(e,t,n,r,c,i){return Object(a["q"])(),Object(a["d"])("span",{onClick:t[1]||(t[1]=(...t)=>e.show&&e.show(...t)),class:"btn btn-outline-primary"},[Object(a["v"])(e.$slots,"default")])}var c=Object(a["h"])({props:{list:{type:Object,required:!0},title:{type:String,required:!0}},setup:function(e,t){var n=Object(a["k"])("listDialogue");function r(){n.value.showList(e.list,e.title,(function(e){t.emit("select",e),n.value.visible=!1})),n.value.visible=!0}return{show:r}}});c.render=r;t["a"]=c}}]);