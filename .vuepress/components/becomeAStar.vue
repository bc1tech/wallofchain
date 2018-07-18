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
                            <input class="form__input" type="number" name="Last Name" placeholder="Insert value" min="0">
                        </div>
                        <div class="col-lg-6">
                            <label class="form__label">Gift This (optional)</label>
                            <input class="form__input" type="text" name="Last Name" placeholder="Insert an address wallet of a friend">
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
                    <div class="edit-star">
                        <h2 class="title">Edit your stars</h2>

                        <div class="star star--edit star--style-1">
                            <div class="star__content">
                                <span class="star__icon star__icon--3">Select icon</span>
                                <h2 class="star__title">Insert infos</h2>
                                <div class="star__amount">0 ETH</div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn--no-border">Create your star</button>

                    </div>
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

    $sizes: (
        size-1: (
                xs: 6,
                lg: 4
        ),
        size-small-1: (
                xs: 6,
                lg: 8
        ),
        size-2: (
                xs: 3,
                lg: 3
        ),
        size-small-2: (
                xs: 4,
                lg: 4
        ),
        size-3: (
                xs: 3,
                lg: 2
        ),
        size-small-3: (
                xs: 4,
                lg: 4
        ),
);

$font-sizes: (
        size-1: 1.75rem,
        size-2: 1.375rem,
        size-3: 1rem,
);

$styles: (
        style-1: linear-gradient(-135deg, #959595 0%, #C6C6C6 100%),
        style-2: linear-gradient(-135deg, #FCE38A 0%, #F38181 100%),
        style-3: linear-gradient(45deg, #FF7676 0%, #F54EA2 100%),
        style-4: linear-gradient(-135deg, #17EAD9 0%, #6078EA 100%),
        style-5: linear-gradient(-135deg, #622774 0%, #C53364 100%),
        style-6: linear-gradient(-135deg, #7117EA 0%, #EA6060 100%),
        style-7: linear-gradient(-135deg, #43E695 0%, #3BB2B8 100%),
        style-8: linear-gradient(-135deg, #F030C1 0%, #6094EA 100%),
        style-9: linear-gradient(44deg, #5E2563 0%, #65799B 100%),
        style-10: linear-gradient(44deg, #57CA85 0%, #194F68 100%),
        style-11: linear-gradient(45deg, #1BCEDF 0%, #5B247A 100%),
);


.star {
    $root: &;
    display: block;
    position: relative;
    width: 100%;
    max-width: percentage(1 / $grid-columns);

    @each $class, $size in $sizes {
        &--#{$class} {
            // max-width: percentage($size / $grid-columns);

            #{$root}__content {
                font-size: map_get($font-sizes, $class);
            }

            @each $breakpoint, $columns in $size {
                @include media-breakpoint-up($breakpoint) {
                    max-width: percentage($columns / $grid-columns);
                }
            }
        }
    }

    @each $class, $style in $styles {
        &--#{$class} {
            #{$root}__content {
                background-image: map_get($styles, $class);
            }
        }
    }

    &:before {
        content: '';
        width: 100%;
        padding-top: 100%;
        display: block;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        padding: 1em;
        top: ($grid-gutter-width/2);
        right: ($grid-gutter-width/2);
        bottom: ($grid-gutter-width/2);
        left: ($grid-gutter-width/2);
        // box-shadow: 0 30px 60px 0 rgba(0,0,0,0.50);
        border-radius: 4px;
        text-align: center;
        text-shadow: 0 3px 3px rgba(112,112,112,0.50);
        z-index: 1;

        &:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            content: '';
            background-image: url(../images/star.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;

            @media
            (-webkit-min-device-pixel-ratio: 2),
            (min-resolution: 192dpi) {
                background-image: url(../images/star@2x.png);
            }
        }
    }

    &__title {
        font-weight: 700;
        line-height: 1.02;
        font-size: inherit;
        margin-bottom: 0.5em;
        letter-spacing: 0;
    }

    &__amount {
        font-weight: 700;
        font-size: 80%;
        letter-spacing: 0;
        line-height: 1.02;
    }

    &--edit {

        #{$root}__title {
            margin: 1.75rem 0 1.25rem 0;
        }

        #{$root}__icon,
        #{$root}__title,
        #{$root}__amount {
            font-size: 1.625em;
        }
    }
}
</style>
