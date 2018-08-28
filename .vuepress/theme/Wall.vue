<template>
    <transition name="fade" mode="out-in">
        <ui-loading v-if="loading"></ui-loading>
        <transition-group name="list" class="wall" tag="div" v-else>
            <ui-star v-for="(item, index) in wall"
                     :key="item.id"
                     :index="index"
                     :amount="item.amount"
                     :currency="item.currency"
                     :icon="item.icon"
                     :styleType="item.styleType"
                     :title="item.title"
                     class="wall__item" />
        </transition-group>
    </transition>
</template>
<script>
    import dapp from '../mixins/dapp';

    export default {
        mixins: [
            dapp
        ],
        props: {
            small: {
                type: Boolean,
                default: false,
            },
            limit: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                loading: false,
                progressiveId: 0,
                wall: [],
            };
        },
        computed: {
            isAtLimit() {
                return this.limit ? this.wall.length < this.limit : true;
            },
        },
        methods: {
            web3Ready() {
                this.instances.token.progressiveId((err, progressiveId) => {
                    this.progressiveId = progressiveId.valueOf();
                    if (this.progressiveId > 0 &&
                        this.isAtLimit) {
                        this.getPreviousStar(0);
                    }
                });
            },
            getPreviousStar(tokenID) {
                this.instances.token.getPreviousNode(tokenID, (err, nodeIndex) => {
                    if (nodeIndex[0]) {
                        let tokenID = nodeIndex[1];
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
                                let wallItem = {
                                    id: tokenID.valueOf(),
                                    tokenOwner: rawStar[0],
                                    amount: this.web3.fromWei(rawStar[1]),
                                    title: `${rawStar[2]} ${rawStar[3]}`,
                                    currency: 'ETH',
                                    styleType: rawStar[4].valueOf(),
                                    icon: rawStar[5].valueOf(),
                                };

                                this.wall.push(wallItem);
                                this.loading = false;
                            }

                            if (this.wall.length < this.progressiveId &&
                                this.isAtLimit) {
                                this.getPreviousStar(tokenID);
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            this.loading = true;
        },
    };
</script>
<style>
    .list-enter-active, .list-leave-active {
        transition: all .85s ease-in-out;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: scale(.25);
    }
</style>
