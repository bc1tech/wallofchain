<template>
    <main class="container">
        <h1 class="text-center">Frequently Asked Questions</h1>
        
        <div class="row">

            <div class="col-md-3">
                <nav class="tab">
                    <ul class="tab__list">
                        <li class="tab__li" v-for="category in categories" @click="selectedFaq = category" :class="{ 'tab__li--active': selectedFaq == category }">
                            <span>{{ category }}</span>
                        </li>
                    </ul>  
                </nav>
            </div>

            <div class="col-md-9">
                <div class="accordion-wrapper">
                    <div class="accordion" v-for="(faq, index) in filteredFaq">
                        <input v-bind:id="faq.category + index | identify" name="faq" type="radio" class="accordion__input"/>
                        <label  v-bind:for="faq.category + index | identify" class="accordion__label">{{ faq.title }} <i class="accordion__icon"></i></label>
                        <article class="accordion__content">
                            <p class="accordion__copy">{{ faq.content }} </p>
                        </article>
                    </div>
                </div>
            </div>
        </div>

        

    </main>
</template>
<script>
    export default {
        props: {},
        data() {
            return {
                faqs: [
                    {
                        title: 'Titolo della domanda 0',
                        category: 'Getting Started',
                        content: 'Contenuto della risposta 0'
                    },
                    {
                        title: 'Titolo della domanda 1',
                        category: 'Getting Started',
                        content: 'Contenuto della risposta 1'
                    },
                    {
                        title: 'Titolo della domanda 2',
                        category: 'Getting Started',
                        content: 'Contenuto della risposta 2'
                    },
                    {
                        title: 'Titolo della domanda 0',
                        category: 'Understanding WALLOFFCHAIN',
                        content: 'Contenuto della risposta 0'
                    },
                    {
                        title: 'Titolo della domanda 1',
                        category: 'Understanding WALLOFFCHAIN',
                        content: 'Contenuto della risposta 1'
                    },
                    {
                        title: 'Titolo della domanda 0',
                        category: 'Buyng and selling',
                        content: 'Contenuto della risposta 0'
                    },
                    {
                        title: 'Titolo della domanda 1',
                        category: 'Buyng and selling',
                        content: 'Contenuto della risposta 1'
                    },
                    {
                        title: 'Titolo della domanda 2',
                        category: 'Buyng and selling',
                        content: 'Contenuto della risposta 2'
                    },
                ],
                categories: [],
                selectedFaq: ''
            }
        },
        computed: {
            filteredFaq() {
                return this.faqs.filter(faq => {
                    return faq.category.match(this.selectedFaq);
                });
            },
        },
        filters: {
            identify : function (value) {
                if (!value) return ''
                value = value.toString()
                return value.toLowerCase().replace(/ /g,'')
            },
        },
        methods: {
            getCategories() {
                let categoriesSet = new Set();
                this.faqs.forEach((faq) => {
                    categoriesSet.add(faq.category);
                });
                this.categories = Array.from(categoriesSet);
            },
        },
        created() {
            this.getCategories();
            this.selectedFaq = this.categories[0];
        }
    };
</script>
<style lang="scss">

    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .tab {

        &__list {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: space-between;
            margin: 0 -.75rem;
            @include media-breakpoint-up('md') {
                flex-direction: column;
                margin: 0;
            }
        }

        &__li {
            width: calc(100% - 1rem);
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
            border-radius: 5px;
            
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
            margin-left: 1.75rem;

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
            min-height: 0px;
            max-height: 0px;
            max-width: calc(100% - 48px);
            position: relative;
            z-index: 10;
            overflow: hidden;
            transition: all .3s ease-in-out;
        }

        &__copy {
            opacity: 0;
            margin-bottom: 1.25em;
            transform: translate( 0 , 15% );
            transition: all .3s ease-in-out;
            
        }
    }
</style>