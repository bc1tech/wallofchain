(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{140:function(a,e,t){},154:function(a,e,t){var s=t(3);s(s.P,"Array",{fill:t(155)}),t(70)("fill")},155:function(a,e,t){"use strict";var s=t(15),r=t(69),n=t(19);a.exports=function(a){for(var e=s(this),t=n(e.length),o=arguments.length,i=r(o>1?arguments[1]:void 0,t),l=o>2?arguments[2]:void 0,c=void 0===l?t:r(l,t);c>i;)e[i++]=a;return e}},158:function(a,e,t){"use strict";var s=t(140);t.n(s).a},183:function(a,e,t){"use strict";t.r(e);t(151);var s=t(152),r=(t(154),t(71),{name:"PageBecomeAStar",mixins:[t(139).a],data:function(){return{loading:!0,trxHash:"",trxLink:"",starLink:"",formData:{firstName:"",lastName:"",value:0,giftEth:"",gradient:"",icon:""},gradients:Array(11).fill(void 0).map(function(a,e){return e}),icons:Array(10).fill(void 0).map(function(a,e){return e})}},mounted:function(){this.start(!0)},methods:{submit:function(){var a=this;if(!this.metamask.installed)return this.toggleModal("metamask"),!1;this.$validator.validateAll().then(function(){var e=Object(s.a)(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.metamask.netId===a.network.expectedId){e.next=3;break}return alert("You are on the wrong Network.\nPlease switch your MetaMask on ".concat(a.network.expectedName,".")),e.abrupt("return");case 3:if(!t){e.next=17;break}if(a.loading=!0,e.prev=5,a.legacy){e.next=9;break}return e.next=9,a.web3Provider.enable();case 9:setTimeout(function(){var e=a.formData.firstName,t=a.formData.lastName,s=a.web3.toWei(a.formData.value,"ether"),r=a.formData.giftEth||a.web3.eth.coinbase,n=a.formData.gradient,o=a.formData.icon;"0"!==s&&s||(n=0,o=0),a.instances.market.buyToken(r,e,t,n,o,{value:s,from:a.web3.eth.coinbase},function(e,t){e?(a.loading=!1,alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!")):(a.trxHash=t,a.trxLink="".concat(a.etherscanLink,"/tx/").concat(a.trxHash),a.instances.market.TokenPurchase({purchaser:a.web3.eth.coinbase,beneficiary:r},function(e,t){e?alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id."):(console.log(t),a.starLink=a.$withBase("star.html?id=".concat(parseInt(t.args.tokenId.valueOf()))),a.loading=!1,a.toggleModal("okay"))}))})},500),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(5),console.warn(e.t0),alert("Some error occurred. ".concat(e.t0.message)),a.loading=!1;case 17:case"end":return e.stop()}},e,this,[[5,12]])}));return function(a){return e.apply(this,arguments)}}())},onlyNumbers:function(a){var e=a||window.event,t=e.which?e.which:e.keyCode;t>31&&(t<48||t>57)&&46!==t&&e.preventDefault()},web3Ready:function(){var a=this;this.loading=!1,this.$validator.extend("eth_address",{getMessage:function(a){return"Insert a valid Ethereum wallet address."},validate:function(e){return a.web3.isAddress(e)}})},toggleModal:function(a,e){e?this.$refs[a].close():this.$refs[a].open()}}}),n=(t(158),t(2)),o=Object(n.a)(r,function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("main",{staticClass:"container"},[a.trxLink?t("div",{staticClass:"jumbotron text-center"},[t("h1",{staticClass:"display-4"},[a._v("\n      Generating Star...\n    ")]),a._v(" "),t("p",{staticClass:"lead"},[a._v("\n      Please wait until generation is completed.\n    ")]),a._v(" "),a.loading?t("ui-loading"):a._e(),a._v(" "),t("a",{staticClass:"btn",attrs:{target:"_blank",href:a.trxLink}},[a._v("\n      View transaction\n    ")])],1):t("form",{staticClass:"form loading-parent row",on:{submit:function(e){return e.preventDefault(),a.submit(e)}}},[t("div",{staticClass:"col-lg-7 loading-hide",class:{"loading-hide--active":a.loading}},[a._m(0),a._v(" "),t("div",{staticClass:"row form__row"},[t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label",attrs:{for:"form_first_name"}},[a._v("\n            First Name\n          ")]),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.firstName,expression:"formData.firstName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("firstName")},attrs:{id:"form_first_name",type:"text",name:"firstName","data-vv-as":"fist name"},domProps:{value:a.formData.firstName},on:{input:function(e){e.target.composing||a.$set(a.formData,"firstName",e.target.value)}}}),a._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("firstName"),expression:"errors.has('firstName')"}],staticClass:"form__helper",class:a.errors.has("firstName")?"text-danger":""},[a._v("\n            "+a._s(a.errors.first("firstName"))+"\n          ")])]),a._v(" "),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label",attrs:{for:"form_last_name"}},[a._v("\n            Last Name\n          ")]),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.lastName,expression:"formData.lastName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("lastName")},attrs:{id:"form_last_name",type:"text",name:"lastName","data-vv-as":"last name"},domProps:{value:a.formData.lastName},on:{input:function(e){e.target.composing||a.$set(a.formData,"lastName",e.target.value)}}}),a._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("lastName"),expression:"errors.has('lastName')"}],staticClass:"form__helper",class:a.errors.has("lastName")?"text-danger":""},[a._v("\n            "+a._s(a.errors.first("lastName"))+"\n          ")])]),a._v(" "),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("\n            ETH Value\n          ")]),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.value,expression:"formData.value"},{name:"validate",rawName:"v-validate",value:"min_value:0",expression:"'min_value:0'"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("valueEth")},attrs:{type:"number",name:"valueEth",step:"any",min:"0","data-vv-as":"eth"},domProps:{value:a.formData.value},on:{keypress:function(e){a.onlyNumbers(e)},input:function(e){e.target.composing||a.$set(a.formData,"value",e.target.value)}}}),a._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("valueEth"),expression:"errors.has('valueEth')"}],staticClass:"form__helper",class:a.errors.has("valueEth")?"text-danger":""},[a._v("\n            "+a._s(a.errors.first("valueEth"))+"\n          ")])]),a._v(" "),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("\n            Gift this (optional)\n          ")]),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.giftEth,expression:"formData.giftEth"},{name:"validate",rawName:"v-validate",value:"eth_address",expression:"'eth_address'"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("giftEth")},attrs:{type:"text",name:"giftEth",placeholder:"Insert an ETH compatible wallet","data-vv-as":"ETH wallet"},domProps:{value:a.formData.giftEth},on:{input:function(e){e.target.composing||a.$set(a.formData,"giftEth",e.target.value)}}}),a._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("giftEth"),expression:"errors.has('giftEth')"}],staticClass:"form__helper",class:a.errors.has("giftEth")?"text-danger":""},[a._v("\n            "+a._s(a.errors.first("giftEth"))+"\n          ")])])]),a._v(" "),a._m(1),a._v(" "),t("div",{staticClass:"row form__row"},[t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("\n            Background colors\n          ")]),a._v(" "),t("ui-dropdown",{directives:[{name:"validate",rawName:"v-validate",value:a.formData.value?"required":"",expression:"formData.value ? 'required' : ''"}],class:{"is-invalid":a.errors.has("gradient")},attrs:{toggle:"Select your gradient",type:"gradient",name:"gradient",options:a.gradients,disabled:"0"===a.formData.value||!a.formData.value},model:{value:a.formData.gradient,callback:function(e){a.$set(a.formData,"gradient",e)},expression:"formData.gradient"}})],1),a._v(" "),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("\n            Icon\n          ")]),a._v(" "),t("ui-dropdown",{directives:[{name:"validate",rawName:"v-validate",value:a.formData.value?"required":"",expression:"formData.value ? 'required' : ''"}],class:{"is-invalid":a.errors.has("icon")},attrs:{toggle:"Select your icon",type:"icon",name:"icon",options:a.icons,disabled:"0"===a.formData.value||!a.formData.value},model:{value:a.formData.icon,callback:function(e){a.$set(a.formData,"icon",e)},expression:"formData.icon"}})],1)])]),a._v(" "),t("div",{staticClass:"col-lg-5 loading-hide",class:{"loading-hide--active":a.loading}},[t("div",{staticClass:"edit-star"},[t("h2",{staticClass:"title"},[a._v("\n          Watch the Preview\n        ")]),a._v(" "),t("div",{class:"star star--edit star--style-"+("0"!==a.formData.value&&a.formData.value&&a.formData.gradient||0)},[t("div",{staticClass:"star__content"},["0"!==a.formData.value&&a.formData.value&&""!==a.formData.icon?t("span",{staticClass:"star__icon",class:"icon-"+a.formData.icon}):a._e(),a._v(" "),t("h2",{staticClass:"star__title"},[a._v("\n              "+a._s(a.formData.firstName?a.formData.firstName+" "+a.formData.lastName:"insert infos")+"\n            ")]),a._v(" "),t("div",{staticClass:"star__amount"},[a._v("\n              "+a._s(a.formData.value||0)+" ETH\n            ")])])]),a._v(" "),t("button",{staticClass:"btn btn--no-border",attrs:{type:"submit"}},[a._v("\n          Create your star\n        ")]),a._v(" "),t("p",{staticClass:"form-header__copy text-center small"},[a.metamask.installed?a.metamask.netId!==a.network.expectedId?[a._v("\n            You are on the wrong Network."),t("br"),a._v("\n            Please switch your MetaMask on "+a._s(a.network.expectedName)+".\n          ")]:a._e():[a._v("\n            You need the "),t("a",{attrs:{href:"https://metamask.io/",title:"MetaMask",target:"_blank"}},[a._v("\n              MetaMask\n            ")]),a._v(" extension.\n          ")]],2)])])]),a._v(" "),t("ui-dialog",{ref:"okay"},[t("template",{slot:"title"},[a._v("\n      Great :)\n    ")]),a._v("\n    Now your star is on our WallOfChain!!\n    "),t("template",{slot:"footer"},[t("RouterLink",{staticClass:"btn btn--outline d-block",attrs:{to:"/"},on:{click:function(e){a.toggleModal("okay",!0)}}},[a._v("\n        Go back home\n      ")])],1)],2),a._v(" "),t("ui-dialog",{ref:"metamask"},[t("template",{slot:"title"},[a._v("\n      Become a star\n    ")]),a._v("\n    You’ll need a safe place to store your Wall of Chain!\n    The perfect place is in a secure wallet like MetaMask.\n    This will also act as your login to the game (no extra password needed).\n    "),t("template",{slot:"footer"},[t("a",{staticClass:"btn btn--outline d-block",attrs:{href:"https://metamask.io/",target:"_blank"}},[a._v("\n        INSTALL METAMASK\n      ")])])],2)],1)},[function(){var a=this.$createElement,e=this._self._c||a;return e("header",{staticClass:"form-header"},[e("h2",{staticClass:"form-header__title"},[this._v("\n          Get your star\n        ")])])},function(){var a=this.$createElement,e=this._self._c||a;return e("header",{staticClass:"form-header"},[e("p",{staticClass:"form-header__copy"},[this._v("\n          Insert your information to buy you a piece of WallOfChain."),e("br"),this._v("\n          You can customize your stars only if you have done a donation of ETH.\n        ")])])}],!1,null,null,null);o.options.__file="BecomeAStar.vue";e.default=o.exports}}]);