<template>
    <div class="star"
         ref="star"
         :class="`star--style-${!parseFloat(amount) ? '0' : styleType} ${itemClass(index)}`">
        <div class="star__content" ref="starContent">
            <span v-if="!!parseFloat(amount)"
                  class="star__icon" :class="`icon-${icon}`"></span>
            <h2 class="star__title">{{ title }}</h2>
            <div class="star__amount">{{ amount | number }} {{ currency }}</div>
        </div>
    </div>
</template>
<script>
    import VanillaTilt from 'vanilla-tilt';

    const sizes = [{
        className: 'size-1',
        classNameSmall: 'size-small-1'
    }, {
        className: 'size-2',
        classNameSmall: 'size-small-2'
    }, {
        className: 'size-3',
        classNameSmall: 'size-small-3'
    }];

    export default {
        props: ['amount', 'currency', 'icon', 'styleType', 'title', 'index', 'small'],
        methods: {
            itemClass(index) {
                let itemClass = 'star--';

                if (index < 3) {
                    itemClass += sizes[0][this.small ? 'classNameSmall' : 'className'];
                } else if(index < 7) {
                    itemClass += sizes[1][this.small ? 'classNameSmall' : 'className'];
                } else {
                    itemClass += sizes[2][this.small ? 'classNameSmall' : 'className'];
                }

                if (this.small) {
                    itemClass += ' star--small';
                }

                return itemClass;
            },
        },
        mounted() {
            VanillaTilt.init(this.$refs.starContent, {
                max: 25,
                perspective: 2000,
                // scale: 1.025,
                glare: true,
                'max-glare': 0.5,
            });
        },
        beforeDestroy() {
            this.$refs.starContent.vanillaTilt.destroy();
        },
        filters: {
            number(num, maxDecimals = 5, minDecimals = 0) {
                const value = parseFloat(num);
                return value.toLocaleString('en', {
                    maximumFractionDigits: maxDecimals,
                    minimumFractionDigits: minDecimals,
                });
            }
        },
    };
</script>
<style lang="scss">
    .star {
        &__content {
            transform-style: preserve-3d;
        }

        &__title {
            transform: translateZ(50px);
        }

        &__icon, &__amount {
            transform: translateZ(40px);
        }

        .js-tilt-glare {
            border-radius: 4px;
        }
    }
</style>
