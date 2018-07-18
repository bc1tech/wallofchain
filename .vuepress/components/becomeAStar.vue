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
                            <ul class="dropdown">
                                <li class="dropdown__child">
                                    <a href="javascript:void(0)" title="Select your gradient" class="dropdown__el">Select your gradient</a>
                                    <input type="checkbox" class="dropdown__checkbox">
                                    <span class="caret"></span>
                                    <ul class="dropdown__menu dropdown__menu--gradient">
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-0"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-1"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-2"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-3"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-4"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-5"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-6"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-7"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-8"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-9"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--gradient">
                                            <input type="radio" name="gradient-style" class="dropdown__radio">
                                            <label for="gradient-style" class="dropdown__label dropdown__label--gradient gradient-style gradient-style-10"></label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <label class="form__label">Icon</label>
                            <ul class="dropdown">
                                <li class="dropdown__child">
                                    <a href="javascript:void(0)" title="Select your gradient" class="dropdown__el">Select your icon</a>
                                    <input type="checkbox" class="dropdown__checkbox">
                                    <span class="caret"></span>
                                    <ul class="dropdown__menu dropdown__menu--icon">
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-1"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-2"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-3"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-4"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-5"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-6"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-7"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-8"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-9"></label>
                                        </li>
                                        <li class="dropdown__menu-child dropdown__menu-child--icon">
                                            <input type="radio" name="icon" class="dropdown__radio">
                                            <label for="icon" class="dropdown__label dropdown__label--icon icon-10"></label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="col-lg-5">
                    <div class="edit-star">
                        <h2 class="title">Edit your stars</h2>

                        <div class="star star--edit star--style-0">
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

    .dropdown {
        position: relative;
        width: 100%;
        list-style: none;
        margin: 0 0 1.25rem;
        padding: 0;

        .caret {
            position: absolute;
            top: -.5rem;
            right: .875rem;
            bottom: 0;
            height: .875rem;
            width: .875rem;
            margin: auto;
            display: inline-block;
            transform: rotate(135deg);
            transition: all .3s ease-in-out;
            

            &::before {
                height: .875rem;
                width: .875rem;
                content: '';
                display: block;
                border-color: #fff;
                border-width: 1px 1px 0 0;
                border-style: solid;
            }
        }

        &__child {

            &:hover  {
                .dropdown__menu { 
                    left: 0;
                }

                .caret {
                    top: .5rem;
                    transform: rotate(-45deg);
                }
            }

        }

        &__el {
            padding: 1rem;
            border: 1px solid rgba(255,255,255,0.40);
            border-radius: 12px;
            font-size: .875rem;
            color: rgba(255,255,255,0.80);
            letter-spacing: 1px;
            line-height: 1.125;
            display: block;
            margin: 0;

            &:hover {
                text-decoration: none;
            }
        }

        &__menu {
            position: absolute;
            left: -9999px;
            width: 100%;
            background: rgba(255,255,255,0.20);
            border: 1px solid rgba(255,255,255,0.40);
            border-radius: 12px;
            list-style: none;
            padding: .3rem;
            margin: .325rem 0 0;
            display: flex;
            flex-wrap: wrap;
            overflow: scroll;
            transition-delay: left .3s ease-in;

            &::before {
                position: absolute;
                top: -1rem;
                right: 0;
                bottom: 0;
                left: 0;
                content: '';
                height: 100%;
                width: 100%;
                display: block;
                padding: .325rem 0 0 0;
            }

            &--gradient {
                height: 100px;
            }

            &--icon {
                height: 130px;
                justify-content: space-between;
            }
        }

        &__menu-child {
            position: relative;
            overflow: hidden;

            &--gradient {
                height: 2rem;
                width: 2rem;
                max-width: 2rem;
                margin: .375rem;
            }

            &--icon {
                height: 3rem;
                width: 3rem;
                max-width: 3rem;
                margin: .275rem;
                
            }
        }

        &__checkbox {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            &:checked {
                ~ .dropdown__menu {
                    left: 0;
                }

                ~ .caret {
                    top: .5rem;
                    transform: rotate(-45deg);
                }
            }
        }

        &__radio {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;

            &:checked {
                ~ .dropdown__label--gradient {
                    &::after {
                        height: 100%;
                        width: 100%;
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                ~ .dropdown__label--icon {
                    &::after {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
        }

        &__label {
            height: 100%;
            width: 100%;
            border-radius: 2rem;
            border: 0;
            margin: 0;

            &--icon {
                border: 1px solid #fff;
                border-radius: 50%;
                padding: .6em;
                
                &::after {
                    content: '';
                    position: absolute;
                    right: .02rem;
                    bottom: .02rem;
                    height: .8rem;
                    width: .8rem;
                    opacity: 0;
                    transform: scale(0);
                    display: block;
                    background-image: url(../svg/check.svg), linear-gradient(-135deg, #4090ef, #9c9a42, #4090ef);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    transition: all .2s ease-in-out;
                    border-radius: 50%;
                    
                    
                }
            }

            &--gradient {
                &::after {
                    content: '';
                    position: relative;
                    top: .08rem;
                    opacity: 0;
                    display: block;
                    background-image: url(../svg/check.svg);
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: all .2s ease-in-out;
                    transform: scale(.8);
                }
            }
        }
    }
</style>
