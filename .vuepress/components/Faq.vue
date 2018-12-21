<template>
    <main class="container">
        <h1 class="text-center">Frequently Asked Questions</h1>

        <div class="row">
            <div class="col-md-3">
                <nav class="tab">
                    <ul class="tab__list">
                        <li class="tab__li"
                            v-for="(faq, index) in faqs"
                            @click="selectCategory(index)"
                            :class="{ 'tab__li--active': selectedFaq === index }">
                            <span>{{ faq.category }}</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="col-md-9">
                <div class="accordion-wrapper">
                    <div class="accordion"
                         v-for="(item, index) in faq.list"
                         :key="`${selectedFaq}-${index}`">
                        <input :id="`${selectedFaq}-${index}`"
                               :name="`list-${selectedFaq}`"
                               type="radio"
                               class="accordion__input" />
                        <label :for="`${selectedFaq}-${index}`"
                               class="accordion__label">
                            {{ item.title }} <i class="accordion__icon"></i>
                        </label>
                        <article class="accordion__content">
                            <p class="accordion__copy">{{ item.content }} </p>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        name: 'PageFaq',
        data() {
            return {
                faqs: [{
                    category: 'Starters',
                    list: [{
                        title: 'What is needed to aquire a star?',
                        content: 'A computer with Firefox/Chrome.\n' +
                            'We suggest using these two browsers, as they ensure maximum compatibility.\n' +
                            'Mobile navigation is also garanteed.\n' +
                            'Navigation from multiple computers is also allowed.\n' +
                            '\n' +
                            '    A digital wallet\n' +
                            '        To buy a star, you will need a digital wallet, specifically MetaMask.\n' +
                            '        As your digital wallet acts as a real one, you’ll need to put money in        it in order to do your first purchase.\n' +
                            'WallOfChain does not have any control over your wallet, that belongs only to you. Please do not share with others your seeds words: they can restore your account in the case it’s deleted, but they can also garantee access to your entire account.\n' +
                            'Your wallet is univocally identified by a wallet address. You can share it with other, and it’s used to convey assets to your wallet.',
                    }, {
                        title: 'Ethereum',
                        content: 'Ethereum is a digital currency – its value, like any other currency, fluctuates with the market.\n' +
                            'In order to convert your actual currency in Ethereum, you can use the Coinbase.\n' +
                            'Some wallets allow the possibilty to directly aquire Ethereum currency, while others may require you to make a purchase from an exchange. After your purchase, you can transfer your Ethereum from the exchange wallet to your digital one.\n' +
                            'Keep in mind it’s not the shortest process: you’ll need to verify your identity, which will probably take a day or two.\n' +
                            'Worry not – your star awaits for you.',
                    }],
                }, {
                    category: 'Transactions',
                    list: [{
                        title: 'What is Etherscan?',
                        content: 'Etherscan is an interface for the Ethereum Network. It has a memory of everything that’s happened on the blockchain. In this way, you can a 100% sure that your transactions were successful.'
                    }, {
                        title: 'My transaction failed',
                        content: 'It is possible that the setting level of the gas limit was too low.'
                    }, {
                        title: 'My transaction failed, but my gas was charged',
                        content: 'Gas is essential to process requests on the blockchain. In this sense, even a failed transaction still represents a transaction.\n' +
                            'This fee is payed to the Ethereum network and miners, and not to WallOfChain.'
                    }, {
                        title: 'My transaction timed out',
                        content: 'It’s possible that the Ethereum network may be too busy to process the transaction. It usually happens when gas prices are too high, or there is a spike in network congestion.'
                    }, {
                        title: 'Ok, but what is gas?',
                        content: 'Gas is a short term used to describe the cost of a transaction or contract in Ethereum.\n' +
                            'Each transaction takes a lot of computational power, and is splitted beneath multiple computers. This power is covered by gas.'
                    }],
                }],
                selectedFaq: 0,
            };
        },
        computed: {
            faq() {
                return this.faqs[this.selectedFaq];
            },
        },
        methods: {
            selectCategory(categoryId) {
                this.selectedFaq = categoryId;
            },
        },
    };
</script>
<style lang="scss">
    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .tab {
        &__list {
            display: flex;
            justify-content: space-between;
            list-style-type: none;
            margin: 0 -.75rem;
            padding: 0;

            @include media-breakpoint-up('md') {
                flex-direction: column;
                margin: 0;
            }
        }

        &__li {
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            border: 1px solid rgba(#fff, .6);
            cursor: pointer;
            text-align: center;
            margin-right: .75rem;
            margin-left: .75rem;
            transition: all .3s ease-in-out;
            overflow: hidden;

            &--active {
                font-weight: 700;
                border-image: linear-gradient(111deg, #4090ef, #9c9a42);
                border-image-slice: 1;

                @include media-breakpoint-up('md') {
                    width: 100%;
                }
            }

            @include media-breakpoint-up('md') {
                margin-right: auto;
                margin-left: auto;

                & + & {
                    margin-top: .75rem;
                }
            }
        }
    }

    .accordion {
        position: relative;

        & + & {
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                content: '';
                height: 1px;
                width: 100%;
                display: block;
                background-image: linear-gradient(to right, #4090ef, #9c9a42);
            }
        }

        &__label,
        &__input {
            cursor: pointer;
            width: 100%;
        }

        &__label {
            padding: 1.25em 0;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__icon {
            position: relative;
            min-height: 20px;
            min-width: 20px;
            border: 2px solid #fff;
            display: inline-block;
            border-radius: 20px;
            margin-left: 1em;

            &::before,
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: calc(100% - 6px);
                width: 2px;
                content: '';
                margin: auto;
                background-color: #fff;
                display: block;
                transition: all .3s ease-in-out;
            }

            &::before {
                margin: auto;
            }

            &::after {
                transform: rotate(90deg);
            }
        }

        &__input {
            position: absolute;
            top: 1.25em;
            right: 0;
            bottom: 1.25em;
            left: 0;
            opacity: 0;

            &:checked ~ .accordion__content {
                min-height: auto;
                max-height: 1000px;

                .accordion__copy {
                    opacity: 1;
                    transform: translate( 0 , 0 );
                }
            }

            &:checked ~ .accordion__label .accordion__icon::before {
                transform: rotate(-90deg);
            }
        }

        &__content {
            min-height: 0;
            max-height: 0;
            max-width: 90%;
            position: relative;
            z-index: 10;
            overflow: hidden;
            transition: all .3s ease-in-out;
        }

        &__copy {
            opacity: 0;
            margin-bottom: 1.25em;
            transform: translate(0 , 15% );
            transition: all .3s ease-in-out;
        }
    }
</style>
