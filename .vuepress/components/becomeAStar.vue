<template>
    <main class="container">
        <form class="form row" @submit.prevent="submit">
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
                        <input class="form__input"
                               :class="{'is-invalid': errors.has('firstName') }"
                               type="text"
                               name="firstName"
                               placeholder="First Name"
                               data-vv-as="fist name"
                               v-validate="'required'"
                               v-model="formData.firstName">
                        <p class="form__helper"
                           :class="errors.has('firstName') ? 'text-danger' : ''"
                           v-show="errors.has('firstName')">
                            {{ errors.first('firstName') }}
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <input class="form__input"
                               :class="{'is-invalid': errors.has('lastName') }"
                               type="text"
                               name="lastName"
                               placeholder="Last Name"
                               data-vv-as="last name"
                               v-validate="'required'"
                               v-model="formData.lastName">
                        <p class="form__helper"
                           :class="errors.has('lastName') ? 'text-danger' : ''"
                           v-show="errors.has('lastName')">
                            {{ errors.first('lastName') }}
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Value in ETH</label>
                        <input class="form__input"
                               :class="{'is-invalid': errors.has('valueEth') }"
                               type="number"
                               name="valueEth"
                               placeholder="Insert value"
                               step="any"
                               min="0"
                               @keypress="onlyNumbers($event)"
                               data-vv-as="eth"
                               v-validate="'min_value:0'"
                               v-model="formData.value">
                        <p class="form__helper"
                           :class="errors.has('valueEth') ? 'text-danger' : ''"
                           v-show="errors.has('valueEth')">
                            {{ errors.first('valueEth') }}
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Gift This (optional)</label>
                        <input class="form__input"
                               :class="{'is-invalid': errors.has('giftAddress') }"
                               type="text"
                               name="giftAddress"
                               placeholder="Insert an address wallet of a friend"
                               data-vv-as="address wallet"
                               v-validate="'eth_address'"
                               v-model="formData.giftAddress">
                        <p class="form__helper"
                           :class="errors.has('giftAddress') ? 'text-danger' : ''"
                           v-show="errors.has('giftAddress')">
                            {{ errors.first('giftAddress') }}
                        </p>
                    </div>
                </div>

                <header class="form-header">
                    <p class="form-header__copy">Insert your information to buy you a piece of Wall of Chain</p>
                    <p class="form-header__copy small"><strong>Attention</strong>: you can customize your stars only if you have done a donation of ETH.</p>
                </header>

                <div class="row form__row">
                    <div class="col-lg-6">
                        <label class="form__label">Background colors</label>
                        <ui-dropdown toggle="Select your gradient"
                                     :class="{'is-invalid': errors.has('gradient') }"
                                     type="gradient"
                                     name="gradient"
                                     :options="gradients"
                                     v-validate="'required'"
                                     v-model="formData.gradient"></ui-dropdown>
                    </div>
                    <div class="col-lg-6">
                        <label class="form__label">Icon</label>
                        <ui-dropdown toggle="Select your icon"
                                     :class="{'is-invalid': errors.has('icon') }"
                                     type="icon"
                                     name="icon"
                                     :options="icons"
                                     v-validate="'required'"
                                     v-model="formData.icon"></ui-dropdown>
                    </div>
                </div>

            </div>

            <div class="col-lg-5">
                <div class="edit-star">
                    <h2 class="title">Edit your stars</h2>

                    <div :class="`star star--edit star--style-${formData.gradient}`">
                        <div class="star__content">
                        <span class="star__icon" :class="`icon-${formData.icon} ${formData.icon === '' ? 'placeholder' : ''}`">
                            <span v-if="formData.icon === ''">Select icon</span>
                        </span>
                            <h2 class="star__title">{{ formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'insert infos' }}</h2>
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
    import dapp from '../mixins/dapp';

    export default {
        mixins: [
            dapp
        ],
        data() {
            return {
                trxHash: '',
                trxLink: '',
                formData: {
                    firstName: '',
                    lastName: '',
                    value: 0,
                    giftAddress: '',
                    gradient: '0',
                    icon: '0',
                },
                // array with numbers from 0 to 10
                gradients: Array(11).fill(undefined).map((v, i) => i),
                // array with numbers from 0 to 9
                icons: Array(10).fill(undefined).map((v, i) => i),
            };
        },
        methods: {
            submit() {
                this.$validator.validateAll().then((valid) => {
                    if (valid) {
                        let firstName = this.formData.firstName;
                        let lastName = this.formData.lastName;
                        let value = this.web3.toWei(this.formData.value, 'ether');
                        let giftAddress = this.formData.giftAddress || this.web3.eth.coinbase;
                        let gradient = this.formData.gradient;
                        let icon = this.formData.icon;
                        console.log(this.formData);
                        this.instances.market.buyToken(
                            giftAddress,
                            firstName,
                            lastName,
                            gradient,
                            icon,
                            {
                                value: value,
                                from: this.web3.eth.coinbase,
                            },
                            (err, trxHash) => {
                                if (!err) {
                                    this.trxHash = trxHash;
                                    this.trxLink = this.etherscanLink + "/tx/" + this.trxHash;
                                    this.instances.market.TokenPurchase(
                                        {
                                            purchaser: this.web3.eth.coinbase,
                                            beneficiary: giftAddress,
                                        },
                                        (err, event) => {
                                            if (!err) {
                                                console.log(event);
                                                alert("Your Star is ready!");
                                            } else {
                                                alert("Some error occurred. Maybe transaction failed for some reasons. Check your transaction id.");
                                            }
                                        });
                                } else {
                                    alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
                                }
                            }
                        );
                    }
                });
            },
            onlyNumbers(e) {
                const evt = e || window.event;
                const charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                }
            },
            web3Ready() {
                this.$validator.extend('eth_address', {
                    getMessage: field => 'Insert a valid Ethereum wallet address.',
                    validate: value => this.web3.isAddress(value),
                });
            },
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

            &.is-invalid {
                border-color: #dc3545;
                color: #dc3545;

                &::placeholder {
                    color: #dc3545;
                }
            }
        }

        &__helper {
            font-size: .875rem;
            margin: -0.71425em 0 1.4285em;
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
