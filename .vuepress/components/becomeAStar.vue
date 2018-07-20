<template>
    <main class="container">
        <form class="form row">
            <div class="col-lg-7">
                <header class="form-header">
                    <h2 class="form-header__title">Buy your star</h2>
                    <p class="form-header__copy">Insert your information to buy a spot in the Wall of Chain</p>
                    <p class="form-header__copy">
                        <strong>Attention:</strong> you need the <a href="https://metamask.io/" title="MetaMask" target="_blank" class="form-header__link">MetaMask</a> extension.
                    </p>
                </header>

                <div class="row form__row">
                    <div class="col-12">
                        <span class="form__label">Insert your information*</span>
                    </div>
                    <div class="col-lg-6">
                        <input class="form__input" type="text" name="First Name" placeholder="First Name" v-model="formData.firstName">
                    </div>
                    <div class="col-lg-6">
                        <input class="form__input" type="text" name="Last Name" placeholder="Last Name" v-model="formData.lastName">
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Value in ETH</label>
                        <input class="form__input" type="number" name="Last Name" placeholder="Insert value" min="0" v-model="formData.value">
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Gift This (optional)</label>
                        <input class="form__input" type="text" name="Last Name" placeholder="Insert an address wallet of a friend"  v-model="formData.giftAddress">
                    </div>
                </div>

                <header class="form-header">
                    <p class="form-header__copy">Insert your information to buy you a piece of Wall of Chain</p>
                    <p class="form-header__copy small"><strong>Attention</strong>: you can customize your stars only if you have done a donation of ETH.</p>
                </header>

                <div class="row form__row">
                    <div class="col-lg-6">
                        <label class="form__label">Background colors</label>
                        <ui-dropdown toggle="Select your gradient" type="gradient" :options="gradients" v-model="formData.gradient"></ui-dropdown>
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Icon</label>
                        <ui-dropdown toggle="Select your icon" type="icon" :options="icons" v-model="formData.icon"></ui-dropdown>
                    </div>
                </div>

            </div>

            <div class="col-lg-5">
                <div class="edit-star">
                    <h2 class="title">Edit your stars</h2>

                    <div :class="`star star--edit star--style-${formData.gradient || 0}`">
                        <div class="star__content">
                            <span class="star__icon" :class="`icon-${ formData.icon || '' }`"></span>
                            <h2 class="star__title">{{ formData.firstName }} {{ formData.lastName }}</h2>
                            <div class="star__amount">{{ formData.value || 0 }} ETH</div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn--no-border">Create your star</button>

                </div>
            </div>

        </form>
    </main>
</template>
<script>
    export default {
        data() {
            return {
                formData: {
                    firstName: '',
                    lastName: '',
                    value: '',
                    giftAddress: '',
                    gradient: '',
                    icon: '',
                },
                // array with numbers from 0 to 10
                gradients: Array(11).fill(undefined).map((v, i) => i),
                // array with numbers from 0 to 9
                icons: Array(10).fill(undefined).map((v, i) => i),
            };
        },
    };
</script>
<style lang="scss">

    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .form-header {
        margin-top: 1.25em;
        margin-bottom: 1.25em;

        &:first-child {
            margin-top: 0;
            margin-bottom: 2.5em;
        }

        &__title {
            font-size: 1.75rem;
            line-height: 1.142;
            margin-bottom: .42em;
        }

        &__copy {
            margin: 0;
            font-size: 1.125rem;
            line-height: 1.555;

            strong {
                font-weight: 700;
            }

            &.small {
                font-size: 1rem;
                line-height: 1.75;
            }
        }

        &__link {
            color: #7E9FFF;
            text-decoration: underline;
            font-weight: 700;
        }
    }

    .form {
        &__input {
            background-color: transparent;
            width: 100%;
            display: block;
            border: 1px solid rgba(255,255,255,0.40);
            border-radius: 0.75rem;
            padding: 1rem;
            color: #fff;
            font-size: .875rem;
            line-height: 1.2857;
            margin-bottom: 1.4285em;
            font-weight: 700;
            transition: border-color .15s ease-in-out;

            &:focus {
                border-color: #fff;
                outline: none;
            }

            &::placeholder {
                font-weight: 600;
            }
        }

        &__label {
            display: inline-block;
            font-weight: 600;
            font-size: .875rem;
            color: rgba(255,255,255,0.80);
            letter-spacing: 1px;
            line-height: 1.2857;
            margin-bottom: 0.857em;
        }

        .btn {
            width: 100%;
        }
    }

    .edit-star {
        position: relative;
        height: 100%;
        
        @include media-breakpoint-up(lg) {
            padding-left: 25px;
            padding-bottom: 80px;
        }

        &::before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: -10px;
            height: 100%;
            width: 1px;
            display: block;
            background-image: linear-gradient(to bottom, #4090ef, #9c9a42);
            @include media-breakpoint-up(lg) {
                content: '';
            }
        }

        .star {
            max-width: calc(100% - 30px);
            margin: 46px auto;
        }
    }
</style>
