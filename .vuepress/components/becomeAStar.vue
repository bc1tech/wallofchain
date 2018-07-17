<template>
    <main class="container">
        <form class="form">

            <div class="row">

                <div class="col-lg-7">
                    <header class="form-header">
                        <h2 class="form-header__title">Buy your stars</h2>
                        <span class="form-header__copy">Insert your information to buy you a piece of Wall of Chain</span>
                        <span class="form-header__copy"><strong>Attention</strong>: you need the <a href="#" title="metamask" class="form-header__link">MetaMask</a> extension.</span>
                    </header>
                    
                    <div class="row form__row">
                        <div class="col-12">
                            <span>Insert your information*</span>
                        </div>
                        <div class="col-lg-6">
                            <input class="form__input" type="text" name="First Name" placeholder="First Name">
                        </div>
                        <div class="col-lg-6">
                            <input class="form__input" type="text" name="Last Name" placeholder="Last Name">
                        </div>
                        <div class="col-lg-6">
                            <label class="form__label">Value in ETH</label>
                        </div>
                        <div class="col-lg-6">
                            <label class="form__label">Gift This (optional)</label>
                        </div>
                    </div>

                    <header class="form-header">
                        <span class="form-header__copy">Insert your information to buy you a piece of Wall of Chain</span>
                        <span class="form-header__copy"><strong>Attention</strong>: you need the <a href="#" title="metamask" class="form-header__link">MetaMask</a> extension.</span>
                    </header>

                    <div class="row form__row">
                        <div class="col-lg-6">
                            <label class="form__label">Background colors</label>
                        </div>
                        <div class="col-lg-6">
                            <label class="form__label">Icon</label>
                        </div>
                    </div>

                </div>

                <div class="col-lg-5">
                    <h2 class="title">Edit your stars</h2>
                </div>

            </div>
        </form>
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

    .form-header {
        margin-bottom: 2.5rem;

        &:not(:first-child) {
            margin-top: 2.5rem;
        }

        &__title {
            font-size: 1.75em;
            line-height: 2rem;
            margin-bottom: .75rem;
        }

        &__copy {
            font-size: 1.125em;
            display: block;
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
            border-radius: 12px;
            padding: 1rem;
            color: #fff;
            font-size: .875em;
            margin-bottom: 1.25rem;
        }

        &__label {
            font-weight: 600;
            font-size: .875em;
            color: rgba(255,255,255,0.80);
            letter-spacing: 1px;
            line-height: 1.125em;
        }
    }

</style>
