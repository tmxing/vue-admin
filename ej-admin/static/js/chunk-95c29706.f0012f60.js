(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95c29706"],{5377:function(t,e,r){},c2f1:function(t,e,r){"use strict";var c=r("5377"),o=r.n(c);o.a},dbf8:function(t,e,r){"use strict";r.r(e);var c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"detail",staticStyle:{margin:"1em"}},[r("el-page-header",{attrs:{title:"返回"},on:{back:t.goBack}}),t._v(" "),r("div",[t._v("产品名称："+t._s(t.productById.name))]),t._v(" "),r("div",[t._v("产品价格：$"+t._s(t.productById.price))]),t._v(" "),r("div",[t._v("产品介绍："+t._s(t.productById.description))]),t._v(" "),r("div",[t._v("产品主图："),r("img",{staticStyle:{width:"400px",height:"260px"},attrs:{src:t.productById.photo,alt:"",align:"top"}})])],1)},o=[],n=(r("5ab2"),r("6d57"),r("e10e"),r("70ea")),i=r("52c1");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,c)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var a={computed:u({},Object(i["d"])("product",["productById"])),created:function(){this.findProductById(this.$route.query.productId)},methods:u(u({},Object(i["b"])("product",["findProductById"])),{},{goBack:function(){this.$router.go(-1)}})},p=a,s=(r("c2f1"),r("4023")),f=Object(s["a"])(p,c,o,!1,null,"0e0e23f4",null);e["default"]=f.exports}}]);