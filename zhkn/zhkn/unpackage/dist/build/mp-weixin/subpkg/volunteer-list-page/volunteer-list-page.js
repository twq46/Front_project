(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/volunteer-list-page/volunteer-list-page"],{"2b1d":function(e,t,n){"use strict";n.r(t);var r=n("67e0"),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=i.a},"67e0":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n("2eee")),a=r(n("c973")),u=r(n("9523")),c=n("26cb");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var o={data:function(){return{listId:null,wishesList:[],contentHeight:null,isEmpty:!0}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},(0,c.mapState)("m_user",["userinfo"])),onLoad:function(){this.getListId();var t=this;e.getSystemInfo({success:function(e){t.contentHeight=e.screenHeight}})},methods:{getListId:function(){var t=this;return(0,a.default)(i.default.mark((function n(){var r,a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("/wishWX/getWxxAllHandleWishId?openId=".concat(t.userinfo.openId));case 2:r=n.sent,a=r.data,"成功"==a.msg&&(t.listId=a.data,t.getVolunteerTableList());case 5:case"end":return n.stop()}}),n)})))()},getVolunteerTableList:function(){var t=this;return(0,a.default)(i.default.mark((function n(){var r,a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("/wishWX/getAllWishByListId2?listId=".concat(t.listId));case 2:r=n.sent,a=r.data,t.wishesList=a.data.wishes,t.wishesList.length>0?t.isEmpty=!1:t.isEmpty=!0;case 6:case"end":return n.stop()}}),n)})))()},deleteVolunteer:function(t){var n=this;return(0,a.default)(i.default.mark((function r(){var a;return i.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.delete("/wishWX/deleteWishFromList?id=".concat(t.id));case 2:a=r.sent,"删除成功"==a.data.data&&(e.$showMsg("删除成功!"),n.getVolunteerTableList());case 4:case"end":return r.stop()}}),r)})))()}}};t.default=o}).call(this,n("543d")["default"])},"6bcd":function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("f49e");r(n("66fd"));var i=r(n("9e78"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"8b40":function(e,t,n){"use strict";var r=n("eb98"),i=n.n(r);i.a},"9e78":function(e,t,n){"use strict";n.r(t);var r=n("a015"),i=n("2b1d");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("8b40");var u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"1b161758",null,!1,r["a"],void 0);t["default"]=c.exports},a015:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={volunteerItem:function(){return n.e("components/volunteer-item/volunteer-item").then(n.bind(null,"d295"))}},i=function(){var e=this.$createElement;this._self._c},a=[]},eb98:function(e,t,n){}},[["6bcd","common/runtime","common/vendor"]]]);