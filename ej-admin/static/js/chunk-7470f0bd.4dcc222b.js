(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7470f0bd"],{"2fd47":function(e,t,r){"use strict";r.r(t);var l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"order",staticStyle:{margin:"1em"}},[r("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"所有订单",name:"first"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orders.list,"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{staticStyle:{color:"rgba(0, 51, 255, 0.647058823529412)"},attrs:{href:""},on:{click:function(r){return r.preventDefault(),e.detailHandler(t.row.id)}}},[e._v("详情")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.orders.total,"page-size":e.orders.pageSize,"current-page":e.orders.page+1},on:{"current-change":e.changePage}})],1),e._v(" "),r("el-tab-pane",{attrs:{label:"待支付",name:"second"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderStatus("待支付"),"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("a",{staticStyle:{color:"rgba(0, 51, 255, 0.647058823529412)"},attrs:{href:""},on:{click:function(r){return r.preventDefault(),e.detailHandler(t.row.id)}}},[e._v("详情")])]}}])})],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"待派单",name:"third"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderStatus("待派单"),"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{staticStyle:{color:"rgba(0, 51, 255, 0.647058823529412)"},attrs:{size:"small"},on:{click:function(r){return r.preventDefault(),e.sendOrderHandler(t.row)}}},[e._v("派单")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"选择员工",visible:e.sendOrder_visible},on:{"update:visible":function(t){e.sendOrder_visible=t}}},[r("el-form",{ref:"form",attrs:{model:e.sendOrder_form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"员工信息"}},[r("el-select",{attrs:{placeholder:"请选择员工"},model:{value:e.sendOrder_form.waiterId,callback:function(t){e.$set(e.sendOrder_form,"waiterId",t)},expression:"sendOrder_form.waiterId"}},e._l(e.waiters,(function(e){return r("el-option",{key:e.id,attrs:{label:e.username,value:e.id}})})),1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.sendOrder_visible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.saveOrderHandler}},[e._v("确 定")])],1)],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"待接单",name:"fourth"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderStatus("待接单"),"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{staticStyle:{color:"rgba(0, 51, 255, 0.647058823529412)"},attrs:{size:"small"},on:{click:function(r){return r.preventDefault(),e.takeOrderHandler(t.row)}}},[e._v("接单")])]}}])})],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"待服务",name:"fiveth"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderStatus("待服务"),"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{staticStyle:{color:"rgba(0, 51, 255, 0.647058823529412)"},attrs:{size:"small"},on:{click:function(r){return r.preventDefault(),e.confirmOrderHandler(t.row)}}},[e._v("服务")])]}}])})],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"已完成",name:"sixth"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderStatus("已完成"),"header-cell-style":e.styleSet,"cell-style":e.styleSet}},[r("el-table-column",{attrs:{prop:"id",label:"订单编号",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"orderTime",label:"下单时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("dateFormat")(t.row.orderTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),r("el-table-column",{attrs:{prop:"customerId",label:"顾客ID"}})],1)],1)],1)],1)},a=[],s=(r("5ab2"),r("6d57"),r("e10e"),r("70ea")),o=r("52c1");function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i={data:function(){return{userInfo:JSON.parse(localStorage.getItem("userInfo")),params:{page:0,pageSize:10},activeName:"first",formLabelWidth:"120px",order_form:{},sendOrder_visible:!1,sendOrder_form:{}}},watch:{params:{handler:function(){this.findAllOrder(this.params)},deep:!0}},computed:d(d(d({},Object(o["d"])("order",["orders"])),Object(o["c"])("order",["orderStatus"])),Object(o["d"])("waiter",["waiters"])),created:function(){this.findAllOrder(this.params),this.findAll(),this.findAllWaiters()},methods:d(d(d({},Object(o["b"])("order",["findAllOrder","findAll","editOrder","sendOrder","takeOrder","confirmOrder"])),Object(o["b"])("waiter",["findAllWaiters"])),{},{detailHandler:function(e){console.log(e),this.$router.push({path:"/order/list",query:{id:e}})},confirmOrderHandler:function(e){var t=this;this.sendOrder_form.orderId=e.id,this.confirmOrder(this.sendOrder_form).then((function(){t.$message({message:"服务完成",type:"success"}),t.findAll()}))},takeOrderHandler:function(e){var t=this;this.sendOrder_form=e,this.sendOrder_form.orderId=e.id,this.takeOrder(this.sendOrder_form).then((function(){t.$message({message:"接单成功",type:"success"}),t.findAll()}))},saveOrderHandler:function(){var e=this;this.sendOrder(this.sendOrder_form).then((function(){e.findAll(),e.$message({message:"派单成功",type:"success"}),e.sendOrder_visible=!1}))},sendOrderHandler:function(e){this.sendOrder_form=e,this.sendOrder_form.orderId=e.id,this.sendOrder_visible=!0},changePage:function(e){this.params.page=e-1},styleSet:function(){return"text-align:center"}})},c=i,u=r("4023"),b=Object(u["a"])(c,l,a,!1,null,null,null);t["default"]=b.exports}}]);