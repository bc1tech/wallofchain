<template>
    <header class="navbar container">
        <button ref="toggler"
                class="navbar__toggler btn btn--outline btn--thin"
                :class="navOpen ? 'navbar__toggler--active' : ''"
                @click="toggleNavbar">
            <span class="navbar__toggler-icon"></span>
        </button>

        <router-link class="navbar__brand" to="/">
            WallOfChain.com
        </router-link>

        <ul class="navbar__nav" :class="navOpen ? 'navbar__nav--open' : ''">
            <li class="navbar__item">
                <router-link class="navbar__link" title="Home" to="/">
                    Home
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link" title="The Project" to="/project.html">
                    The Project
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link" title="The Wall" to="/wall.html">
                    The Wall
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link" title="FAQ" to="/faq.html">
                    FAQ
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="btn btn--outline btn--thin" title="Become a Star" to="/become-a-star.html">
                    Become a Star
                </router-link>
            </li>
        </ul>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                navOpen: false,
            };
        },
        methods: {
            toggleNavbar() {
                this.navOpen = !this.navOpen;
            },
        },
        watch: {
            '$route'() {
                if (this.navOpen) {
                    this.navOpen = false;
                }
            }
        },
    };
</script>
<style lang="scss">
    @import "../scss/variables";
    @import "~bootstrap/scss/functions";
    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";

    .navbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-top: 1.25em;
        padding-bottom: 2.5em;

        @include media-breakpoint-up(lg) {
            padding-top: 3.125em;
            padding-bottom: 5em;
            flex-wrap: nowrap;
        }

        &__brand {
            font-size: 1.25rem;
            letter-spacing: 0.15em;
            font-weight: 800;
            line-height: 1.2;
            text-transform: uppercase;

            &:hover {
                text-decoration: none;
            }
        }

        &__toggler {
            $root: &;
            position: relative;
            padding: 0;
            margin-right: 1.25em;
            width: 3.125em;
            height: 3.125em;
            background-color: transparent;
            cursor: pointer;

            @include media-breakpoint-up(lg) {
                display: none !important;
            }

            &:focus {
                outline: none;
            }

            &-icon {
                top: 2px;
                margin: 10px -12px;

                &, &:before, &:after {
                    position: absolute;
                    width: 1.875em;
                    height: 2px;
                    transition-timing-function: ease;
                    transition-duration: .15s;
                    transition-property: transform;
                    border-radius: 4px;
                    background-color: #fff;
                }

                &:before, &:after {
                    display: block;
                    content: "";
                }

                &:before {
                    top: 8px;
                    transition-timing-function: ease;
                    transition-duration: .15s;
                    transition-property: transform, opacity;
                }

                &:after {
                    top: 16px;
                }
            }

            &--active {
                #{$root}-icon {
                    transform: translate3d(0, 0.5em, 0) rotate(45deg);

                    &:before {
                        transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
                        opacity: 0;
                    }

                    &:after {
                        transform: translate3d(0, -1.1em, 0) rotate(-90deg);
                    }
                }
            }
        }

        &__nav {
            display: none;
            list-style: none;
            margin: 1.25em 0 0;
            padding: 0;
            width: 100%;

            @include media-breakpoint-up(md) {
                text-align: center;
            }

            @include media-breakpoint-up(lg) {
                text-align: left;
                width: auto;
                margin-top: 0;
                margin-left: auto;
                display: block;
            }
            
            &--open {
                display: block;
            }
        }

        &__item {
            display: block;
            margin: 0 0 1em;
            text-align: center;

            @include media-breakpoint-up(md) {
                text-align: left;
                display: inline-block;
                margin: 0 1em;

                &:first-child {
                    margin-left: 0;
                }

                &:last-child {
                    margin-right: 0;
                }
            }

            @include media-breakpoint-up(lg) {
                margin: 0 1.25em;
            }
        }

        &__link {
            display: inline-block;
            padding: 0 2em;
            text-transform: uppercase;
            font-size: 0.875rem;
            line-height: 1.285;
            letter-spacing: 0.214em;
            color: #fff;

            @include media-breakpoint-up(lg) {
                padding: 0;
            }
            
            &::before {
                content: attr(title);
                height: 0;
                display: block;
                font-weight: 700;
                overflow: hidden;
                visibility: hidden;
            }

            &::after {
                content: '';
                display: block;
                position: relative;
                top: 0.428em;
                width: 20%;
                margin: 0 auto;
                height: 2px;
                background-image: linear-gradient(94deg, #4090ef, #9c9a42);
                opacity: 0;
                transform: translateY(-4px);
                transition: .15s ease-in-out;

                @include media-breakpoint-up(md) {
                    top: 0.928em;
                }
            }

            &.router-link-exact-active {
                font-weight: 700;

                &::after {
                    opacity: 1;
                    width: 60%;
                    transform: translateY(0);
                }
            }
            
            &:hover {
                font-weight: 700;
                text-decoration: none;
                color: #fff;
            }

            &:focus {
                outline: none;
            }
        }
    }
</style>