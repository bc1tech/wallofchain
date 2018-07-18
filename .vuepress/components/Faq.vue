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
        data() {
            return {
                faqs: [{
                    category: 'Getting Started',
                    list: [{
                        title: 'Titolo della domanda 1-1',
                        content: 'Contenuto della risposta 1-1',
                    }, {
                        title: 'Titolo della domanda 1-2',
                        content: 'Contenuto della risposta 1-2',
                    }, {
                        title: 'Titolo della domanda 1-3',
                        content: 'Contenuto della risposta 1-3',
                    }],
                }, {
                    category: 'Understanding WALLOFFCHAIN',
                    list: [{
                        title: 'Titolo della domanda 2-1',
                        content: 'Contenuto della risposta 2-1'
                    }, {
                        title: 'Titolo della domanda 2-2',
                        content: 'Contenuto della risposta 2-2'
                    }],
                }, {
                    category: 'Buying and selling',
                    list: [{
                        title: 'Titolo della domanda 3-1',
                        content: 'Contenuto della risposta 1',
                    }, {
                        title: 'Titolo della domanda 3-2',
                        content: 'Contenuto della risposta 3-2',
                    }, {
                        title: 'Titolo della domanda 3-3',
                        content: 'Contenuto della risposta 3-3',
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