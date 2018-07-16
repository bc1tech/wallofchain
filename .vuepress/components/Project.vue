<template>
    <main class="container">
        <div class="row">
            <div class="col-md">

                <div class="box">
                    <span class="box__star">
                        <span class="box__star-content">1</span>
                    </span>
                    <h2 class="box__title">What is WallOfChain?</h2>
                    <p class="box__copy">Lorem ipsum dolor sit amen, consecteur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua. Lorem ipsum dolor sit amen, consecteur adipiscing elit</p>
                </div>

            </div>
            
            <div class="col-md">

                <div class="box">
                    <span class="box__star">
                        <span class="box__star-content">2</span>
                    </span>
                    <h2 class="box__title">Why chose WallOfChain?</h2>
                    <p class="box__copy">Lorem ipsum dolor sit amen, consecteur adipiscing elit, sed do eiusmod tempor incididunt et dolore magna aliqua. Lorem ipsum dolor sit amen, consecteur adipiscing elit</p>
                </div>

            </div>
            
        </div>

        <div class="project-footer">
            <h2>Are you ready?</h2>
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
        padding: 60px 40px 48px;
        border-radius: 24px;
        text-align: center;
        margin: 48px auto;

        @include media-breakpoint-up('md') {
            margin: 96px auto;
        }

        &__star {
            $hw: 96px;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1;
            height: $hw;
            width: $hw;
            margin: -54px auto 0;
            font-size: 32px;
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
            margin-top: 10px;
            background: linear-gradient(157deg, #2d215e, #0a0e2c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .project-footer {
        text-align: center;
        margin-bottom: 40px;

        @include media-breakpoint-up('md') {
            margin-bottom: 82px;
        }
    }
</style>