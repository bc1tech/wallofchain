(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{158:function(t,e,n){},251:function(t,e,n){"use strict";var i=n(158);n.n(i).a},254:function(t,e,n){"use strict";n.r(e);var i={mixins:[n(165).a],props:{small:{type:Boolean,default:!1},loadMore:{type:Boolean,default:!1}},data:function(){return{loading:!1,loadingMore:this.loadMore,totalSupply:0,progressiveId:0,lastId:0,limit:13,wall:[]}},computed:{canGetMore:function(){return this.wall.length<this.totalSupply&&this.wall.length<this.limit}},methods:{web3Ready:function(){var t=this;this.instances.token.totalSupply(function(e,n){t.totalSupply=parseInt(n.valueOf()),t.instances.token.progressiveId(function(e,n){t.progressiveId=parseInt(n.valueOf()),t.progressiveId>0&&t.getPreviousStar(0)})})},getMore:function(){this.wall.length<this.progressiveId&&(this.limit=this.limit+12,this.getPreviousStar(this.lastId))},getPreviousStar:function(t){var e=this;this.loadingMore=!0,this.instances.token.getPreviousNode(t,function(t,n){if(n[0]){var i=n[1];e.instances.token.getWall(i,function(t,n){if(e.lastId=parseInt(i.valueOf()),n){var a={id:e.lastId,tokenOwner:n[0],amount:e.web3.fromWei(n[1]),title:"".concat(n[2]," ").concat(n[3]),currency:"ETH",styleType:n[4].valueOf(),icon:n[5].valueOf()};e.wall.push(a),e.loading=!1}e.wall.length<e.progressiveId&&e.canGetMore?e.getPreviousStar(e.lastId):e.loadingMore=!1})}})}},mounted:function(){this.loading=!0}},a=(n(251),n(4)),l=Object(a.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade",mode:"out-in"}},[t.loading?n("ui-loading"):n("div",{key:"wall"},[n("transition-group",{staticClass:"wall",attrs:{name:"list",tag:"div"}},t._l(t.wall,function(t,e){return n("ui-star",{key:t.id,staticClass:"wall__item",attrs:{index:e,amount:t.amount,currency:t.currency,icon:t.icon,styleType:t.styleType,title:t.title}})})),t._v(" "),t.loadMore&&!t.loadingMore&&t.wall.length<t.totalSupply?n("div",{staticClass:"text-center"},[n("a",{staticClass:"btn btn--outline",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.getMore(e)}}},[t._v("More position")])]):t._e()],1)],1)},[],!1,null,null,null);e.default=l.exports}}]);