<template>
    <main>
        <div class="container hero">
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="row">
                        <h1 class="col-lg-10 hero__title">Become a part of the blockchain hall of fame. Become a star now</h1>
                        <p class="col hero__copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor si amet, consectetur adipiscing elit</p>
                    </div>
                    <router-link to="/become-a-star.html" class="btn">Become a star</router-link>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="wall wall-featured">
                        <div class="wall__item star star--style-3 star--small star--size-small-2">
                            <div class="star__content">
                                <span class="star__icon icon-2"></span>
                                <h2 class="star__title">Simone Tallarita</h2>
                                <div class="star__amount">1 ETH</div>
                            </div>
                        </div>
                        <div class="wall__item star star--style-1 star--small star--size-small-1">
                            <div class="star__content">
                                <span class="star__icon icon-0"></span>
                                <h2 class="star__title">Vincenzo Capasso</h2>
                                <div class="star__amount">2 ETH</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="section container-lg">
            <h2 class="section__title section__title--center">Discover the wall of blockchain</h2>
            <ClientOnly>
                <wall :limit="13" />
            </ClientOnly>
        </section>
        <div class="text-center">
            <router-link to="/wall.html" class="btn btn--outline">Show other position</router-link>
        </div>
    </main>
</template>
<script>
    const Wall = () => import('../theme/Wall.vue');

    export default {
        components: {
            Wall,
        },
    };
</script>
<style lang="scss">
    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .hero {
        margin-bottom: 3.75em;

        @include media-breakpoint-up(lg) {
            margin-bottom: 7.5em;
        }

        &__title {
            font-size: 2rem;
            line-height: 1.25;
            font-weight: 700;
            letter-spacing: 0.0625em;
            margin-bottom: 0.625em;
        }

        &__copy {
            font-size: 1.125rem;
            letter-spacing: 0;
            line-height: 1.555;
            margin-bottom: 2.22em;
        }
    }

    .wall-featured {
        .star {
            display: inline-block;
            z-index: 2;

            .star__content {
                transform: translateX(10%);
            }

            &:last-child {
                z-index: 1;

                .star__content {
                    transform: translateX(-20%);
                }
            }
        }
    }
</style>
