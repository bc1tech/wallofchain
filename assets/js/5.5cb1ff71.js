(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{135:function(a,e,t){},156:function(a,e,t){var s=t(3);s(s.P,"Array",{fill:t(157)}),t(58)("fill")},157:function(a,e,t){"use strict";var s=t(17),r=t(57),i=t(29);a.exports=function(a){for(var e=s(this),t=i(e.length),o=arguments.length,n=r(o>1?arguments[1]:void 0,t),l=o>2?arguments[2]:void 0,m=void 0===l?t:r(l,t);m>n;)e[n++]=a;return e}},161:function(a,e,t){"use strict";var s=t(135);t.n(s).a},240:function(a,e,t){"use strict";t.r(e);t(156),t(59);var s={mixins:[t(149).a],data:function(){return{trxHash:"",trxLink:"",formData:{firstName:"",lastName:"",value:0,giftAddress:"",gradient:"0",icon:"0"},gradients:Array(11).fill(void 0).map(function(a,e){return e}),icons:Array(10).fill(void 0).map(function(a,e){return e})}},methods:{submit:function(){var a=this;this.$validator.validateAll().then(function(e){if(a.metamask.netId===a.network.expectedId){if(e){var t=a.formData.firstName,s=a.formData.lastName,r=a.web3.toWei(a.formData.value,"ether"),i=a.formData.giftAddress||a.web3.eth.coinbase,o=a.formData.gradient,n=a.formData.icon;a.instances.market.buyToken(i,t,s,o,n,{value:r,from:a.web3.eth.coinbase},function(e,t){e?alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!"):(a.trxHash=t,a.trxLink=a.etherscanLink+"/tx/"+a.trxHash,a.instances.market.TokenPurchase({purchaser:a.web3.eth.coinbase,beneficiary:i},function(a,e){a?alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id."):(console.log(e),alert("Your Star is ready!"))}))})}}else alert("You are on the wrong Network.\nPlease switch your MetaMask on ".concat(a.network.expectedName,"."))})},onlyNumbers:function(a){var e=a||window.event,t=e.which?e.which:e.keyCode;t>31&&(t<48||t>57)&&46!==t&&e.preventDefault()},web3Ready:function(){var a=this;this.$validator.extend("eth_address",{getMessage:function(a){return"Insert a valid Ethereum wallet address."},validate:function(e){return a.web3.isAddress(e)}})}}},r=(t(161),t(1)),i=Object(r.a)(s,function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("main",{staticClass:"container"},[t("form",{staticClass:"form row",on:{submit:function(e){return e.preventDefault(),a.submit(e)}}},[t("div",{staticClass:"col-lg-7"},[t("header",{staticClass:"form-header"},[t("h2",{staticClass:"form-header__title"},[a._v("Buy your star")]),t("p",{staticClass:"form-header__copy"},[a._v("Insert your information to buy a spot in the Wall of Chain")]),a.metamask.installed?a.metamask.netId!==a.network.expectedId?t("p",{staticClass:"form-header__copy"},[t("strong",[a._v("Attention:")]),a._v(" you are on the wrong Network."),t("br"),a._v("Please switch your MetaMask on "+a._s(a.network.expectedName)+".\n                ")]):a._e():t("p",{staticClass:"form-header__copy"},[t("strong",[a._v("Attention:")]),a._v(" you need the "),t("a",{staticClass:"form-header__link",attrs:{href:"https://metamask.io/",title:"MetaMask",target:"_blank"}},[a._v("MetaMask")]),a._v(" extension.\n                ")])]),t("div",{staticClass:"row form__row"},[a._m(0),t("div",{staticClass:"col-lg-6"},[t("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:a.formData.firstName,expression:"formData.firstName"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("firstName")},attrs:{type:"text",name:"firstName",placeholder:"First Name","data-vv-as":"fist name"},domProps:{value:a.formData.firstName},on:{input:function(e){e.target.composing||a.$set(a.formData,"firstName",e.target.value)}}}),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("firstName"),expression:"errors.has('firstName')"}],staticClass:"form__helper",class:a.errors.has("firstName")?"text-danger":""},[a._v("\n                        "+a._s(a.errors.first("firstName"))+"\n                    ")])]),t("div",{staticClass:"col-lg-6"},[t("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:a.formData.lastName,expression:"formData.lastName"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("lastName")},attrs:{type:"text",name:"lastName",placeholder:"Last Name","data-vv-as":"last name"},domProps:{value:a.formData.lastName},on:{input:function(e){e.target.composing||a.$set(a.formData,"lastName",e.target.value)}}}),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("lastName"),expression:"errors.has('lastName')"}],staticClass:"form__helper",class:a.errors.has("lastName")?"text-danger":""},[a._v("\n                        "+a._s(a.errors.first("lastName"))+"\n                    ")])]),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("Value in ETH")]),t("input",{directives:[{name:"validate",rawName:"v-validate",value:"min_value:0",expression:"'min_value:0'"},{name:"model",rawName:"v-model",value:a.formData.value,expression:"formData.value"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("valueEth")},attrs:{type:"number",name:"valueEth",placeholder:"Insert value",step:"any",min:"0","data-vv-as":"eth"},domProps:{value:a.formData.value},on:{keypress:function(e){a.onlyNumbers(e)},input:function(e){e.target.composing||a.$set(a.formData,"value",e.target.value)}}}),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("valueEth"),expression:"errors.has('valueEth')"}],staticClass:"form__helper",class:a.errors.has("valueEth")?"text-danger":""},[a._v("\n                        "+a._s(a.errors.first("valueEth"))+"\n                    ")])]),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("Gift This (optional)")]),t("input",{directives:[{name:"validate",rawName:"v-validate",value:"eth_address",expression:"'eth_address'"},{name:"model",rawName:"v-model",value:a.formData.giftAddress,expression:"formData.giftAddress"}],staticClass:"form__input",class:{"is-invalid":a.errors.has("giftAddress")},attrs:{type:"text",name:"giftAddress",placeholder:"Insert an address wallet of a friend","data-vv-as":"address wallet"},domProps:{value:a.formData.giftAddress},on:{input:function(e){e.target.composing||a.$set(a.formData,"giftAddress",e.target.value)}}}),t("p",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("giftAddress"),expression:"errors.has('giftAddress')"}],staticClass:"form__helper",class:a.errors.has("giftAddress")?"text-danger":""},[a._v("\n                        "+a._s(a.errors.first("giftAddress"))+"\n                    ")])])]),a._m(1),t("div",{staticClass:"row form__row"},[t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("Background colors")]),t("ui-dropdown",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":a.errors.has("gradient")},attrs:{toggle:"Select your gradient",type:"gradient",name:"gradient",options:a.gradients},model:{value:a.formData.gradient,callback:function(e){a.$set(a.formData,"gradient",e)},expression:"formData.gradient"}})],1),t("div",{staticClass:"col-lg-6"},[t("label",{staticClass:"form__label"},[a._v("Icon")]),t("ui-dropdown",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":a.errors.has("icon")},attrs:{toggle:"Select your icon",type:"icon",name:"icon",options:a.icons},model:{value:a.formData.icon,callback:function(e){a.$set(a.formData,"icon",e)},expression:"formData.icon"}})],1)])]),t("div",{staticClass:"col-lg-5"},[t("div",{staticClass:"edit-star"},[t("h2",{staticClass:"title"},[a._v("Edit your stars")]),t("div",{class:"star star--edit star--style-"+a.formData.gradient},[t("div",{staticClass:"star__content"},[t("span",{staticClass:"star__icon",class:"icon-"+a.formData.icon+" "+(""===a.formData.icon?"placeholder":"")},[""===a.formData.icon?t("span",[a._v("Select icon")]):a._e()]),t("h2",{staticClass:"star__title"},[a._v(a._s(a.formData.firstName?a.formData.firstName+" "+a.formData.lastName:"insert infos"))]),t("div",{staticClass:"star__amount"},[a._v(a._s(a.formData.value||0)+" ETH")])])]),t("button",{staticClass:"btn btn--no-border",attrs:{type:"submit",disabled:!a.metamask.installed}},[a._v("Create your star")])])])])])},[function(){var a=this.$createElement,e=this._self._c||a;return e("div",{staticClass:"col-12"},[e("span",{staticClass:"form__label"},[this._v("Insert your information*")])])},function(){var a=this.$createElement,e=this._self._c||a;return e("header",{staticClass:"form-header"},[e("p",{staticClass:"form-header__copy"},[this._v("Insert your information to buy you a piece of Wall of Chain")]),e("p",{staticClass:"form-header__copy small"},[e("strong",[this._v("Attention")]),this._v(": you can customize your stars only if you have done a donation of ETH.")])])}],!1,null,null,null);e.default=i.exports}}]);