<template>
    <div class="loading" :class="{ 'loading--overlay': overlay }">
        <div class="loader" title="Loading"><div></div><div></div><div></div></div>
    </div>
</template>
<script>
    export default {
        props: {
            overlay: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
<style lang="scss">
    .loading-parent {
        position: relative;

        .loading--overlay {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .loading-hide {
        position: relative;
        transition: opacity .25s ease-in-out;

        &:before {
            display: none;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        &--active {
            opacity: 0.5;

            &:before {
                display: block;
            }
        }
    }
</style>