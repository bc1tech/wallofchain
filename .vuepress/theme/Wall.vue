<template>
    <transition name="fade" mode="out-in">
        <ui-loading v-if="loading"></ui-loading>
        <div class="masonry-container wall"
            v-else
            v-masonry
            transition-duration="0"
            item-selector=".wall__item"
            percent-position="true"
            horizontal-order="true">
            <div class="wall__item wall__sizer"></div>
            <!-- <div class="wall__item wall__gutter"></div> -->
            <div v-for="item in wall"
                :key="item.id"
                v-masonry-tile
                class="wall__item star"
                :class="`star--${sizes[item.size][small ? 'classNameSmall' : 'className']} star--style-${item.style} ${itemClass}`">
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
    import Vue from 'vue';
    import { VueMasonryPlugin } from 'vue-masonry';

    Vue.use(VueMasonryPlugin);

    const getWall = (params) => new Promise((resolve, reject) => {
        const { limit } = params;

        const generateStar = id => ({
            id,
            title: Math.random().toString(36).substring(7),
            amount: Math.random() * 10,
            currency: 'ETH',
            icon: Math.floor(Math.random() * (9 - 1 + 1)) + 1,
            style: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        });

        const wall = [];

        for (let i = 0; i < (limit || 50); i++) {
            wall.push(generateStar(i));
        }

        setTimeout(() => {
            resolve(wall);
        }, 1000);
    });

    export default {
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
                default: 0,
            },
        },
        data() {
            return {
                loading: false,
                wall: [],
                sizes: [{
                    val: 0.2,
                    className: 'size-1',
                    classNameSmall: 'size-small-1'
                }, {
                    val: 0.3,
                    className: 'size-2',
                    classNameSmall: 'size-small-2'
                }, {
                    val: 0.5,
                    className: 'size-3',
                    classNameSmall: 'size-small-3'
                }],
            };
        },
        computed: {
            itemClass() {
                let itemClass = '';

                if (this.small) {
                    itemClass = 'star--small';
                }

                return itemClass;
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

            getWall({
                limit: this.limit,
            }).then((wall) => {
                wall.sort((a, b) => {
                    if (a.amount < b.amount) {
                        return this.order === 'ASC' ? -1 : 1;
                    } else if (a.amount > b.amount) {
                        return this.order === 'ASC' ? 1 : -1;
                    }

                    return 0;
                });

                let maxAmount = wall[0].amount;
                let minAmount = wall[wall.length - 1].amount;

                const aAmount = maxAmount - minAmount;

                wall.forEach((wallItem) => {
                    const item = wallItem;
                    let itemSize = 0;

                    this.sizes.forEach((size, sizeIndex) => {
                        if (item.amount - minAmount <= (aAmount * (1 - size.val))) {
                            itemSize = sizeIndex;
                        }
                    });

                    item.size = itemSize;
                    this.wall.push(item);
                });

                this.loading = false;
                this.$redrawVueMasonry();
            });
        },
    };
</script>