<template>
    <section class="section container-lg">
        <h2 class="section__title section__title--center" v-if="showTitle">Discover the wall of blockchain</h2>
        <ClientOnly>
            <transition name="fade" mode="out-in">
                <div v-if="loading" key="loader" class="loading">
                    <div class="loader" title="Loading"><div></div><div></div><div></div></div>
                </div>
                <div class="masonry-container wall"
                     key="wall"
                     v-else
                     v-masonry
                     transition-duration="0"
                     :item-selector="`.wall__item`"
                     percent-position="true"
                     horizontal-order="true">
                    <div class="wall__item wall__sizer"></div>
                    <div v-for="item in wall"
                         :key="item.id"
                         v-masonry-tile
                         class="wall__item star"
                         :class="`star--${sizes[item.size].className} star--style-${item.style} ${itemClass}`">
                        <div class="star__content">
                            <span class="star__icon" :class="`star__icon--${item.icon}`"></span>
                            <h2 class="star__title">{{ item.title }}</h2>
                            <div class="star__amount">{{ item.amount | number }} {{ item.currency }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </ClientOnly>
    </section>
</template>
<script>
    const getWall = (params) => new Promise((resolve, reject) => {
        const { limit } = params;

        const generateStar = id => ({
            id,
            title: Math.random().toString(36).substring(7),
            amount: Math.random() * 10,
            currency: 'ETH',
            icon: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
            style: Math.floor(Math.random() * (11 - 1 + 1)) + 1,
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
            showTitle: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                loading: false,
                wall: [],
                sizes: [{
                    val: 0.2,
                    className: 'size-1'
                }, {
                    val: 0.3,
                    className: 'size-2'
                }, {
                    val: 0.5,
                    className: 'size-3'
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
<style lang="scss">
    $columns: 12;
    $sizes: (
        size-1: 4,
        size-2: 3,
        size-3: 2,
    );

    $font-sizes: (
        size-1: 1.75rem,
        size-2: 1.375rem,
        size-3: 1rem,
    );

    $styles: (
        style-1: linear-gradient(-135deg, #959595 0%, #C6C6C6 100%),
        style-2: linear-gradient(-135deg, #FCE38A 0%, #F38181 100%),
        style-3: linear-gradient(45deg, #FF7676 0%, #F54EA2 100%),
        style-4: linear-gradient(-135deg, #17EAD9 0%, #6078EA 100%),
        style-5: linear-gradient(-135deg, #622774 0%, #C53364 100%),
        style-6: linear-gradient(-135deg, #7117EA 0%, #EA6060 100%),
        style-7: linear-gradient(-135deg, #43E695 0%, #3BB2B8 100%),
        style-8: linear-gradient(-135deg, #F030C1 0%, #6094EA 100%),
        style-9: linear-gradient(44deg, #5E2563 0%, #65799B 100%),
        style-10: linear-gradient(44deg, #57CA85 0%, #194F68 100%),
        style-11: linear-gradient(45deg, #1BCEDF 0%, #5B247A 100%),
    );

    .wall {
        width: 100%;
        margin: 0 auto 1.25em;

        &__sizer {
            width: 100%;
            max-width: percentage(1 / $columns);
        }
    }

    .star {
        $root: &;
        display: block;
        position: relative;
        width: 100%;
        max-width: percentage(1 / $columns);

        @each $class, $size in $sizes {
            &--#{$class} {
                max-width: percentage($size / $columns);

                #{$root}__content {
                    font-size: map_get($font-sizes, $class);
                }

                &#{$root}--small {
                    max-width: percentage(($size * 2) / $columns);

                    #{$root}__content {
                        font-size: map_get($font-sizes, $class) * 0.8;
                    }
                }
            }
        }

        @each $class, $style in $styles {
            &--#{$class} {
                #{$root}__content {
                   background-image: map_get($styles, $class);
                }
            }
        }

        &:before {
            content: '';
            width: 100%;
            padding-top: 100%;
            display: block;
        }

        &__content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 20px;
            right: 20px;
            bottom: 20px;
            left: 20px;
            padding: 1em;
            // box-shadow: 0 30px 60px 0 rgba(0,0,0,0.50);
            border-radius: 4px;
            text-align: center;
            text-shadow: 0 3px 3px rgba(112,112,112,0.50);
            z-index: 1;

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                content: '';
                background-image: url(../images/star.png);
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;

                @media
                (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                    background-image: url(../images/star@2x.png);
                }
            }
        }

        &__title {
            font-weight: 700;
            line-height: 1.02;
            font-size: inherit;
            margin-bottom: 0.5em;
            letter-spacing: 0;
        }

        &__amount {
            font-weight: 700;
            font-size: 80%;
            letter-spacing: 0;
            line-height: 1.02;
        }
    }
</style>