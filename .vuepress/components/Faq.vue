<template>
    <main class="container">
        <h1 class="text-center">Frequently Asked Questions</h1>
        
        <nav>
            <ul>
                <li v-for="category in categories" @click="selectedFaq = category" :class="{ 'active-tab': selectedFaq == category }">
                    {{ category }}
                </li>
            </ul>  
        </nav>

        <div class="accordion-wrapper">
            <div class="accordion" v-for="(faq, index) in filteredFaq">
                <input :id="'faq-' + index" name="faq" type="radio" class="accordion__input"/>
                <label  :for="'faq-' + index" class="accordion__label">{{ faq.title }} <i class="accordion__icon"></i></label>
                <article class="accordion__content">
                    <p class="accordion__copy">{{ faq.content }} </p>
                </article>
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
                        category: 'Understanding',
                        content: 'Contenuto della risposta 0'
                    },
                    {
                        title: 'Titolo della domanda 1',
                        category: 'Understanding',
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
            }
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