(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-login/my-login"],{"0500":function(e,t,n){"use strict";n.r(t);var r=n("912e"),o=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},"66a9":function(e,t,n){"use strict";n.r(t);var r=n("742c"),o=n("0500");for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("7eda");var u=n("f0c5"),a=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=a.exports},"742c":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"8abe"))}},o=function(){var e=this.$createElement;this._self._c},c=[]},"7eda":function(e,t,n){"use strict";var r=n("f5d6"),o=n.n(r);o.a},"912e":function(e,t,n){"use strict";(function(e){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("2eee")),c=r(n("c973")),u=r(n("9523")),a=n("26cb");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={name:"my-login",data:function(){return{secondCode:""}},computed:i({},(0,a.mapState)("m_user",["token","userinfo"])),methods:i(i({},(0,a.mapMutations)("m_user",["updateUserInfo","updateToken","updateCwbNum","updateCubTotal","updateUserId"])),{},{getPhoneNumber:function(e){this.secondCode=e.detail.code,this.getToken()},getToken:function(){var t=this;return(0,c.default)(o.default.mark((function n(){var r,c,u,a,s,i,d,f,l;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.login().catch((function(e){return e}));case 2:if(r=n.sent,"login:ok"===r.errMsg){n.next=5;break}return n.abrupt("return",e.$showMsg("登录失败"));case 5:return c={code:r.code},n.next=8,e.$http.post("/wxxlogin",c);case 8:return u=n.sent,a=u.data,console.log(a),s={code:t.secondCode,openId:a.wxxUser.openId},n.next=14,e.$http.post("/wxxgetPhone",s);case 14:if(i=n.sent,d=i.data,t.updateToken(d.token),d.wxxUser.rushNum=null,d.wxxUser.rushTotalNum=null,t.updateUserId(d.ruoyiUser.userId),t.updateUserInfo(d.wxxUser),null===d.wxxUser.score){n.next=27;break}return n.next=24,e.$http.get("/extendApp/getSchoolFirstNum?openId=".concat(d.wxxUser.openId,"&examProvince=").concat(d.wxxUser.examProvince,"&score=").concat(d.wxxUser.score,"&rank=").concat(d.wxxUser.rank,"&batch=本科"));case 24:f=n.sent,l=f.data,200===l.code&&(t.updateCwbNum(l.data),t.updateCubTotal(l.total));case 27:e.$showMsg("登录成功!");case 28:case"end":return n.stop()}}),n)})))()},navigateBack:function(){var t=this;this.redirectInfo&&"switchTab"===this.redirectInfo.openType&&e.switchTab({url:this.redirectInfo.from,complete:function(){t.updateRedirectInfo(null)}})}})};t.default=d}).call(this,n("543d")["default"])},f5d6:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-login/my-login-create-component',
    {
        'components/my-login/my-login-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("66a9"))
        })
    },
    [['components/my-login/my-login-create-component']]
]);