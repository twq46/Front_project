(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/about-my/about-my"],{"1f13":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var r=function(){var t=this.$createElement;this._self._c},a=[]},"2a08":function(t,e,n){},"2c35":function(t,e,n){"use strict";n.r(e);var r=n("1f13"),a=n("b22a");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("fb9a");var u=n("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"12845cdd",null,!1,r["a"],void 0);e["default"]=c.exports},"36e9":function(t,e,n){"use strict";(function(t){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("2eee")),o=r(n("c973")),u=r(n("9523")),c=n("26cb");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){(0,u.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s={data:function(){return{aboutmy:""}},onLoad:function(){this.getAboutData()},methods:f(f({},(0,c.mapMutations)("m_user",["updateToken","updateUserInfo"])),{},{loginOutClick:function(){var e=this;return(0,o.default)(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.showModal({title:"提示",content:"确认退出登录吗？"}).catch((function(t){return t}));case 2:r=n.sent,console.log(r),r&&r.confirm&&(e.updateToken(""),e.updateUserInfo({}),t.switchTab({url:"/pages/mine/mine"}));case 5:case"end":return n.stop()}}),n)})))()},getAboutData:function(){var e=this;t.request({url:"https://www.zytb.top/NEMT/gk/dynamicData/aboutUs",method:"GET",success:function(t){console.log(t),e.aboutmy=t.data.data.content}})}})};e.default=s}).call(this,n("543d")["default"])},8864:function(t,e,n){"use strict";(function(t,e){var r=n("4ea4");n("f49e");r(n("66fd"));var a=r(n("2c35"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},b22a:function(t,e,n){"use strict";n.r(e);var r=n("36e9"),a=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},fb9a:function(t,e,n){"use strict";var r=n("2a08"),a=n.n(r);a.a}},[["8864","common/runtime","common/vendor"]]]);