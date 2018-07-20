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

        for (let i = 0; i < (limit || 55); i++) {
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

                wall.forEach((wallItem) => {
                    this.wall.push(wallItem);
                });

                this.loading = false;
            });
        },
    };
</script>