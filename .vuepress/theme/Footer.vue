<template>
    <footer class="container footer">
        <hr class="footer__divisor">
        <h3 class="footer__brand">WallOfChain.com</h3>
        <p class="footer__copy">Copyright (c) 2018 WALLOFCHAIN</p>
        <span class="footer__credits">Proudly made by <a href="https://www.paneedesign.com/" target="_blank">Pane&Design</a> | <a href="https://github.com/paneedesign/wallofchain" target="_blank"><img width="16" :src="$withBase('/assets/images/github-logo.svg')"/></a></span>
    </footer>
</template>
<script>
    export default {};
</script>
<style lang="scss">
    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .footer {
        text-align: center;

        @include media-breakpoint-up(lg) {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        padding-top: 2.5em;
        padding-bottom: 2.5em;

        &__divisor {
            margin: 0 0 2.5em;
            border: 0;
            height: 1px;
            background-image: linear-gradient(to right, #4090ef, #9c9a42);
            width: 100%;
        }

        &__brand {
            font-size: 0.875rem;
            font-weight: 800;
            letter-spacing: 0.15em;
            line-height: 1.714;
            text-transform: uppercase;
            margin: 0;
        }

        &__copy {
            font-size: 0.75rem;
            font-style: italic;
            line-height: 2;
            margin: 0;
        }

        &__credits {
            font-size: 0.875rem;
            letter-spacing: 0;
            line-height: 1.714;
        }
    }
</style>
