<template>
    <section class="section container-lg">
        <h2 class="section__title section__title--center">Discover the wall of blockchain</h2>
        <ClientOnly>
            <transition name="fade" mode="out-in">
                <div v-if="loading" key="loader" class="loading">
                    <div class="loader" title="Loading"><div></div><div></div><div></div></div>
                </div>
                <div class="masonry-container wall"
                     key="wall"
                     v-else
                     v-masonry
                     transition-duration="3s"
                     item-selector=".wall__item"
                     fit-width="true">
                    <div class="wall__item wall__sizer"></div>
                    <div v-for="item in wall"
                         :key="item.id"
                         v-masonry-tile
                         class="wall__item star"
                         :class="`star--${sizes[item.size]}`">
                        <div class="star__content">
                            <span class="star__icon" :class="`star__icon--${item.icon}`"></span>
                            <h2 class="star__title">{{ item.title }}</h2>
                            <div class="star__amount">{{ item.amount }} {{ item.currency }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </ClientOnly>
    </section>
</template>
<script>
    import Vue from 'vue';
    import { VueMasonryPlugin } from 'vue-masonry';

    Vue.use(VueMasonryPlugin);

    const getWall = () => new Promise((resolve, reject) => {
        const generateStar = id => ({
            id,
            title: Math.random().toString(36).substring(7),
            amount: Math.random() * 10,
            currency: 'ETH',
            icon: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        });

        const wall = [
            generateStar(1), generateStar(2), generateStar(3), generateStar(4),
            generateStar(5), generateStar(6), generateStar(7), generateStar(8),
            generateStar(9), generateStar(10), generateStar(11), generateStar(12),
            generateStar(13), generateStar(14),
        ];

        setTimeout(() => {
            resolve(wall);
        }, 1000);
    });

    export default {
        data() {
            return {
                loading: false,
                wall: [],
                sizes: [10, 20, 30],
            };
        },
        mounted() {
            this.loading = true;

            getWall().then((wall) => {
                this.loading = false;

                wall.sort((a, b) => {
                    if (a.amount < b.amount) {
                        return 1;
                    } else if (a.amount > b.amount) {
                        return -1;
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
                        if (item.amount - minAmount <= ((aAmount * (100 - size)) / 100)) {
                            itemSize = sizeIndex;
                        }
                    });

                    item.size = itemSize;
                    this.wall.push(item);
                });
            });
        },
    };
</script>
<style lang="scss">
    $columns: 12;
    $sizes: (
        10: 4,
        20: 3,
        30: 2,
    );

    $styles: (
        10: linear-gradient(-135deg, #DADE8D 0%, #C84747 100%),
        20: linear-gradient(-135deg, #8DD5DE 0%, #0F26AA 100%),
        30: linear-gradient(-135deg, #DE62EE 0%, #E1C1C1 100%),
    );

    $font-sizes: (
        10: 1.75rem,
        20: 1.375rem,
        30: 1rem,
    );

    .wall {
        margin: 0 auto;

        &__sizer {
            width: 100%;
            max-width: percentage(1 / $columns);
        }
    }

    .star {
        $root: &;
        display: inline-block;
        position: relative;
        width: 100%;
        max-width: percentage(1 / $columns);

        @each $class, $size in $sizes {
            &--#{$class} {
                max-width: percentage($size / $columns);

                #{$root}__content {
                    background-image: map_get($styles, $class);
                    font-size: map_get($font-sizes, $class);
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
            box-shadow: 0 30px 60px 0 rgba(0,0,0,0.50);
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