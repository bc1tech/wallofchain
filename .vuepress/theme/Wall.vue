<template>
    <transition name="fade" mode="out-in">
        <ui-loading v-if="loading"></ui-loading>
        <div class="wall"
             v-else>
            <div v-for="(item, index) in wall"
                 :key="item.id"
                 class="wall__item star"
                 :class="`star--style-${item.style} ${itemClass(index)}`">
                <div class="star__content">
                    <span class="star__icon" :class="`icon-${item.icon}`"></span>
                    <h2 class="star__title">{{ item.title }}</h2>
                    <div class="star__amount">{{ item.amount | number }} {{ item.currency }}</div>
                </div>
            </div>
        </div>
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
            order: {
                type: String,
                default: 'DESC',
                validator: (val) => val === 'ASC' || val === 'DESC',
            },
            limit: {
                type: Number,
                default: 3,
            },
        },
        data() {
            return {
                loading: false,
                wall: [],
                sizes: [{
                    className: 'size-1',
                    classNameSmall: 'size-small-1'
                }, {
                    className: 'size-2',
                    classNameSmall: 'size-small-2'
                }, {
                    className: 'size-3',
                    classNameSmall: 'size-small-3'
                }],
            };
        },
        methods: {
            itemClass(index) {
                let itemClass = 'star--';

                if (index < 3) {
                    itemClass += this.sizes[this.order === 'ASC' ? 2 : 0][this.small ? 'classNameSmall' : 'className'];
                } else if(index < 7) {
                    itemClass += this.sizes[1][this.small ? 'classNameSmall' : 'className'];
                } else {
                    itemClass += this.sizes[this.order === 'ASC' ? 0 : 2][this.small ? 'classNameSmall' : 'className'];
                }

                if (this.small) {
                    itemClass += ' star--small';
                }

                return itemClass;
            },
            web3Ready() {
                for (let i = 0; i < (this.limit || 12); i++) {
                    let nodeIndex = this.instances.token.getNextNode(i);

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
                                    title: `${rawStar[2]} ${rawStar[1]}`,
                                    currency: 'ETH',
                                    style: rawStar[4].valueOf(),
                                    icon: rawStar[5].valueOf(),
                                };

                                this.wall.push(wallItem);
                                this.loading = false;
                            }
                        });
                    }
                }
            },
        },
        filters: {
            number(num, maxDecimals = 4, minDecimals = 0) {
                const value = parseFloat(num);
                return value.toLocaleString('en', {
                    maximumFractionDigits: maxDecimals,
                    minimumFractionDigits: minDecimals,
                });
            }
        },
        mounted() {
            this.loading = true;
        },
    };
</script>
