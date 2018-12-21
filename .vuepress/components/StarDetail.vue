<template>
    <main class="section container-lg">
        <h2 class="section__title section__title--center">Discover your star on the Blockchain.</h2>
        <transition name="fade" mode="out-in">
            <ui-loading v-if="loading"></ui-loading>
            <div v-else>
                <ui-star :amount="item.amount"
                         :currency="item.currency"
                         :icon="item.icon"
                         :styleType="item.styleType"
                         :title="item.title"
                         :etherscanLink="item.etherscanLink"
                         class="wall__item m-auto" />
            </div>
        </transition>
    </main>
</template>
<script>
    import dapp from '../mixins/dapp';

    export default {
        mixins: [
            dapp
        ],
        data() {
            return {
                item: null,
                loading: true,
            };
        },
        methods: {
            web3Ready() {
                const tokenID = this.getParam('id');
                this.getStar(tokenID);
            },
            getStar(tokenID) {
                this.instances.token.getWall(tokenID, (err, rawStar) => {
                    /* function getWall returns an array as below
                        [
                            address tokenOwner,
                            uint256 value,
                            string firstName,
                            string lastName,
                            uint256 pattern,
                            uint256 icon
                        ]
                     */

                    if (rawStar) {
                        this.item = {
                            id: parseInt(tokenID.valueOf()),
                            tokenOwner: rawStar[0],
                            amount: this.web3.fromWei(rawStar[1]),
                            title: `${rawStar[2]} ${rawStar[3]}`,
                            currency: 'ETH',
                            styleType: rawStar[4].valueOf(),
                            icon: rawStar[5].valueOf(),
                            etherscanLink: this.etherscanLink + "/token/" + this.instances.token.address + "?a=" + parseInt(tokenID.valueOf())
                        };

                        this.loading = false;
                    } else {
                        document.location.href = this.$withBase('/');
                    }
                });
            },
            getParam (param) {
                const vars = {};
                window.location.href.replace(location.hash, '').replace(
                    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
                    function (m, key, value) { // callback
                        vars[key] = value !== undefined ? value : '';
                    }
                );

                if (param) {
                    return vars[param] ? vars[param] : null;
                }
                return vars;
            },
        },
        mounted() {
            this.start(false);
        },
    };
</script>
<style>
    .m-auto {
        margin: auto;
    }
    .list-enter-active, .list-leave-active {
        transition: all .85s ease-in-out;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: scale(.25);
    }
</style>
