(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/editScore/editScore"],{"0584":function(e,t,n){"use strict";var i=n("baf0"),r=n.n(i);r.a},"162e":function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("2eee")),s=i(n("c973")),o=i(n("9523")),c=n("26cb");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l={data:function(){return{scoreInputTimer:null,iscontinueUpdateScore:null,currentIndex:null,physics:null,chemistry:null,biology:null,politics:null,history:null,geography:null,highRank:0,score:null,rank:null,lowRank:3e6,currentSelectProvince:"",labelinfo:[],provinceList:["辽宁","山东","河北"],subjectList:["物","化","生","政","史","地"],selectsubjectList:[]}},computed:a({},(0,c.mapState)("m_user",["userinfo"])),onLoad:function(){this.score=this.userinfo.score,this.rank=this.userinfo.rank,this.physics=this.userinfo.physics,this.chemistry=this.userinfo.chemistry,this.biology=this.userinfo.biology,this.politics=this.userinfo.politics,this.history=this.userinfo.history,this.geography=this.userinfo.geography,this.userinfo.score&&(this.getRankScopeData(),this.isUpdateScore())},methods:a(a({},(0,c.mapMutations)("m_user",["updateUserScore","updateUserRank","updateUserProvince","updateUserInfo","updateCwbNum","updateCubTotal","updateSubject"])),{},{scoreInputClick:function(){this.iscontinueUpdateScore&&e.$showMsg("每天仅有一次修改机会呦！")},isUpdateScore:function(){var t=this;return(0,s.default)(r.default.mark((function n(){var i,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.post("/getIsRevisable?openId=".concat(t.userinfo.openId));case 2:i=n.sent,s=i.data,t.iscontinueUpdateScore=!s.data.flag;case 5:case"end":return n.stop()}}),n)})))()},provinceOpen:function(){this.iscontinueUpdateScore?e.$showMsg("每天仅有一次修改机会呦！"):this.$refs.provincePopup.open("bottom")},majorOpen:function(){this.iscontinueUpdateScore?e.$showMsg("每天仅有一次修改机会呦！"):this.$refs.subjectPopup.open("bottom")},clickProvinceItem:function(e){this.currentIndex=e,this.currentSelectProvince=this.provinceList[e],this.updateUserProvince(this.currentSelectProvince),this.$refs.provincePopup.close()},clickSubjectItem:function(e){this.selectsubjectList.push(this.subjectList[e]),this.physics=this.selectsubjectList.find((function(e){return"物"===e}))?1:0,this.chemistry=this.selectsubjectList.find((function(e){return"化"===e}))?1:0,this.biology=this.selectsubjectList.find((function(e){return"生"===e}))?1:0,this.politics=this.selectsubjectList.find((function(e){return"政"===e}))?1:0,this.history=this.selectsubjectList.find((function(e){return"史"===e}))?1:0,this.geography=this.selectsubjectList.find((function(e){return"地"===e}))?1:0,this.updateSubject(this.physics)},inputScore:function(e){var t=this;""==e.detail.value&&(this.lowRank=3e6,this.highRank=0),clearTimeout(this.scoreInputTimer),this.scoreInputTimer=setTimeout((function(){t.updateUserScore(e.detail.value),t.getRankScopeData()}),500)},getRankScopeData:function(){var t=this;return(0,s.default)(r.default.mark((function n(){var i,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={physics:t.userinfo.physics,province:t.userinfo.examProvince,score:t.userinfo.score},n.next=3,e.$http.get("/userWX/rankByScore",i);case 3:s=n.sent,t.lowRank=s.data.data.lowRank,t.highRank=s.data.data.highRank;case 6:case"end":return n.stop()}}),n)})))()},rankInput:function(e){this.updateUserRank(e.detail.value)},confirmSubmitClick:function(){var t=this;return(0,s.default)(r.default.mark((function n(){var i,s,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(""!=t.userinfo.examProvince){n.next=2;break}return n.abrupt("return",e.$showMsg("请选择省份"));case 2:if(0!=t.userinfo.physics||0!=t.userinfo.chemistry||0!=t.userinfo.biology||0!=t.userinfo.politics||0!=t.userinfo.history||0!=t.userinfo.geography){n.next=4;break}return n.abrupt("return",e.$showMsg("请选择科目"));case 4:if(null!=t.userinfo.score){n.next=6;break}return n.abrupt("return",e.$showMsg("请输入高考分数"));case 6:if(null!=t.userinfo.rank){n.next=8;break}return n.abrupt("return",e.$showMsg("请输入高考位次"));case 8:return n.next=10,e.$http.post("/userApp/wxxAddUserInfo?openId=".concat(t.userinfo.openId,"&score=").concat(t.userinfo.score,"&examProvince=").concat(t.userinfo.examProvince,"&physics=").concat(t.physics,"&chemistry=").concat(t.chemistry,"&biology=").concat(t.biology,"&politics=").concat(t.politics,"&history=").concat(t.history,"&geography=").concat(t.geography,"&rank=").concat(t.userinfo.rank,"&nickName=").concat(t.userinfo.nickName,"&avatarUrl=").concat(t.userinfo.avatarUrl));case 10:return i=n.sent,200===i.data.code&&(i.data.data.rushNum=null,i.data.data.rushTotalNum=null,t.updateUserInfo(i.data.data)),n.next=14,e.$http.get("/extendApp/getSchoolFirstNum?openId=".concat(t.userinfo.openId,"&examProvince=").concat(t.userinfo.examProvince,"&score=").concat(t.userinfo.score,"&rank=").concat(t.userinfo.rank,"&batch=本科"));case 14:s=n.sent,o=s.data,200===o.code&&(t.updateCwbNum(o.data),t.updateCubTotal(o.total),e.$showMsg("用户信息填写成功"),e.navigateBack({delta:1}));case 17:case"end":return n.stop()}}),n)})))()}})};t.default=l}).call(this,n("543d")["default"])},"2d9e":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var i={uniCard:function(){return n.e("uni_modules/uni-card/components/uni-card/uni-card").then(n.bind(null,"c794"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"8abe"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"eb0c"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.userinfo.physics||e.userinfo.chemistry||e.userinfo.biology||e.userinfo.politics||e.userinfo.history||e.userinfo.geography?null:e.selectsubjectList.length),i=!(e.userinfo.physics||e.userinfo.chemistry||e.userinfo.biology||e.userinfo.politics||e.userinfo.history||e.userinfo.geography)&&n>0?e.__map(e.selectsubjectList,(function(t,n){var i=e.__get_orig(t),r=e.selectsubjectList.length;return{$orig:i,g1:r}})):null,r=e.__map(e.subjectList,(function(t,n){var i=e.__get_orig(t),r=e.selectsubjectList.includes(t);return{$orig:i,g2:r}}));e.$mp.data=Object.assign({},{$root:{g0:n,l0:i,l1:r}})},s=[]},"4ec8":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("f49e");i(n("66fd"));var r=i(n("f0e3"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"78e0":function(e,t,n){"use strict";n.r(t);var i=n("162e"),r=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=r.a},baf0:function(e,t,n){},f0e3:function(e,t,n){"use strict";n.r(t);var i=n("2d9e"),r=n("78e0");for(var s in r)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(s);n("0584");var o=n("f0c5"),c=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"71b1beab",null,!1,i["a"],void 0);t["default"]=c.exports}},[["4ec8","common/runtime","common/vendor"]]]);