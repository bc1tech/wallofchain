<template>
    <div class="modal fade" :class="{'show' : isOpen }" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal__dialog modal__dialog--xl" role="document">
            <div class="modal__content">
                <div class="modal__body">
                    <h2 class="modal__title">GREAT! :)</h2>
                    <p class="modal__copy">You’ll need a safe place to store your Wall of Chain! The perfect place is in a secure wallet like MetaMask. This will also act as your login to the game (no extra password needed).</p>
                    <!-- <p class="modal__copy">Naw your star is on oure WallOfChain</p> -->
                </div>
                <div class="modal__footer">
                    <button type="button" @click="close()" class="btn btn-secondary" data-dismiss="modal">Comeback home</button>
                    <!-- <button type="button" @click="close()" class="btn btn-secondary" data-dismiss="modal">INSTALL METAMASK</button> -->
                    <!-- <button type="button" @click="close()" class="btn btn--unstyled">Close</button> -->
                </div>
            </div>
        </div>
        </div>
</template>

    <script>
    export default {
        data() {
            return {
                isOpen: false
            };
        },
        methods: {
            open() {
                this.isOpen = true;
            },
            close() {
                this.isOpen = false;
            }
        }
    };
</script>

<style lang="scss">

    @import "../../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $zindex-modal;
        display: none;
        overflow: hidden;
        background-color: rgba(20, 24, 55, 0.85);


        &.fade {
        opacity: 0;
        transition: opacity .15s linear;

            &.show {
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
            }
        }

        .modal-open & {
            overflow-x: hidden;
            overflow-y: auto;
        }

        &__title {
            font-family: $font-family-base;
            font-size: 1.75rem;
            font-weight: bold;
        }

        &__copy {
            font-size: 1.125rem;
            margin-bottom: 2.5em;
            font-weight: 400;
        }

        &__dialog {
            position: relative;
            width: auto;
            margin: $modal-dialog-margin;
            pointer-events: none;

            display: flex;
            align-items: center;
            min-height: calc(100% - (#{$modal-dialog-margin} * 2));
            

            &--lg {
                width: 100%;
                max-width: 680px;
            }
            &--xl {
                width: 100%;
                max-width: 920px;
            }

            .modal.fade & {
                @include transition($modal-transition);
                transform: translate(0, -25%);
            }
            .modal.show & {
                transform: translate(0, 0);
            }
        }

        &__content {
            position: relative;
            width: 100%;
            max-height: calc(100vh - 15px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            pointer-events: auto;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
            background-color: rgba(255, 255, 255, 0.4);
            border: solid 4px #ffffff;
            padding: 1.75rem;
            border-radius: 1.5rem;
            background-clip: padding-box;
            outline: 0;

            @include media-breakpoint-up('md') {
                padding: 5rem 3.75rem;
            }
        }

        &__footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;

            .btn {
                &:nth-child(n+2) {
                    margin-top: 1rem;
                }
            }
        }
    }
</style>