<template>
    <main class="container">
        <div class="row">
            <div class="col-md d-flex">

                <div class="box">
                    <span class="box__star">
                        <span class="box__star-content">1</span>
                    </span>
                    <h2 class="box__title">What is wall of chain?</h2>
                    <p class="box__copy">WallOfChain is a collectible token on Ethereum Blockchain.</p>
                    <p class="box__copy">It is made by the same technologies currently used by the Ethereum technology.</p>
                    <p class="box__copy">When you aquire a star, it is uniquely owned by you. It carries your name, and cannot be replicated. You can let it shine brighter and let it grow while using our platform.</p>
                </div>

            </div>
            
            <div class="col-md d-flex">

                <div class="box">
                    <span class="box__star">
                        <span class="box__star-content">2</span>
                    </span>
                    <h2 class="box__title">Why choose WallOfChain?</h2>
                    <p class="box__copy">Owning a star speaks greatly of your character. Owning a star created with Ethereum technology speaks of a person with a fine eye for detail, and a grasp of the next future markets.</p>
                    <p class="box__copy">WallOfChain hangs your star on the wall, for everyone to see.</p>
                </div>

            </div>
            
        </div>

        <div class="project-footer">
            <h2 class="project-footer__title">Are you ready?</h2>
            <router-link to="/become-a-star.html" class="btn">Become a star</router-link>
        </div>
    </main>
</template>
<script>
    export default {};
</script>
<style lang="scss">
    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .box {
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        background-color: rgba(255, 255, 255, 0.4);
        border: solid 4px #ffffff;
        padding: 3.75em 2.5em 3em;
        border-radius: 24px;
        text-align: center;
        margin: 3em auto;

        @include media-breakpoint-up('md') {
            margin: 6em auto;
        }

        &__star {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1;
            height: 6rem;
            width: 6rem;
            margin: -3.375rem auto 0;
            font-size: 2rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;

            &::after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                content: '';
                background-image: url(../images/starwhite.png);
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;

                @media
                (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                    background-image: url(../images/starwhite@2x.png);
                }
            }
        }

        &__star-content {
            margin-top: .625em;
            background: linear-gradient(157deg, #2d215e, #0a0e2c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &__title {
            font-size: 1.75rem;
            letter-spacing: 1px;
            line-height: 1.4285;
        }
    }

    .project-footer {
        text-align: center;
        margin-bottom: 2.5em;

        @include media-breakpoint-up('md') {
            margin-bottom: 5.125em;
        }

        &__title {
            font-size: 2rem;
            letter-spacing: 2px;
            line-height: 1.25;
            margin-bottom: .8em;
        }
    }
</style>