<template>
    <div class="dropdown" :class="`dropdown--${type} ${ open ? 'dropdown--open' : ''}`">
        <span @click="toggleDropdown" title="Select your gradient" class="dropdown__el">
            {{ selectedOption !== '' ? `${type.substr(0,1).toUpperCase()}${type.substr(1)} ${selectedOption}` : toggle }}
        </span>
        <ul class="dropdown__menu">
            <li class="dropdown__child"
                :class="{'dropdown__child--selected': selectedOption === option}"
                v-for="(option, index) in options"
                :key="index"
                @click="selectOption(option)">
                <span class="dropdown__option" :class="optionClass(option)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            toggle: {
                type: String,
                default: 'Open',
            },
            type: {
                type: String,
                required: true,
            },
            options: {
                type: Array,
                required: true,
            },
            value: {
                type: [String, Number],
                required: true,
            },
        },
        data() {
            return {
                open: false,
                selectedOption: this.value || '',
            };
        },
        methods: {
            toggleDropdown() {
                this.open = !this.open;
            },
            selectOption(option) {
                this.selectedOption = option;
                this.$emit('input', option);
                this.toggleDropdown();
            },
            optionClass(option) {
                if (this.type === 'gradient') {
                    return `gradient-style gradient-style-${option}`;
                }

                return `icon-${option}`;
            },
        },
    };
</script>
<style lang="scss">
    .dropdown {
        $root: &;
        position: relative;
        width: 100%;
        margin: 0 0 1.25rem;

        &.is-invalid {
            #{$root}__el {
                border-color: #dc3545;
                color: #dc3545;
            }
        }

        &--open {
            #{$root}__el {
                border-color: #fff;

                &:after {
                    transform: rotateX(0deg);
                }
            }

            #{$root}__menu {
                left: 0;
            }
        }

        &__el {
            position: relative;
            padding: 1rem;
            border: 1px solid rgba(255,255,255,0.40);
            border-radius: 12px;
            font-size: .875rem;
            color: rgba(255,255,255,0.80);
            letter-spacing: 1px;
            line-height: 1.2857;
            font-weight: 600;
            display: block;
            margin: 0;
            transition: border-color .15s ease-in-out;
            cursor: pointer;

            &:hover {
                border-color: #fff;
            }

            &:after {
                content: '';
                position: absolute;
                top: 1.3rem;
                right: 0.875rem;
                height: 0.375rem;
                width: 0.8125rem;
                transform: rotateX(180deg);
                transition: transform .15s ease-in;
                background-image: url('data:image/svg+xml;utf8,<svg width="13px" height="7px" viewBox="0 0 13 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.8"><g id="3.1-WoC---Become-a-star" transform="translate(-430.000000, -633.000000)" fill="#FFFFFF" fill-rule="nonzero"><path d="M439.821417,636.273367 C439.8099,636.112301 439.744741,635.95974 439.636347,635.84005 L434.436523,630.062467 C434.263984,629.870532 434.002149,629.785236 433.749664,629.838712 C433.497178,629.892188 433.292406,630.076311 433.212493,630.321714 C433.132581,630.567117 433.18967,630.836512 433.362254,631.028406 L438.128759,636.323025 L433.362254,641.617631 C433.18967,641.809526 433.132581,642.078921 433.212493,642.324324 C433.292406,642.569727 433.497178,642.75385 433.749664,642.807326 C434.002149,642.860802 434.263984,642.775505 434.436523,642.583571 L439.636347,636.805988 C439.767652,636.660855 439.834438,636.468649 439.821417,636.273367 Z" id="Shape" transform="translate(436.500000, 636.323019) scale(1, -1) rotate(90.000000) translate(-436.500000, -636.323019)"></path></g></g></svg>');
                background-repeat: no-repeat;
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
            padding: .25rem;
            margin: .325rem 0 0;
            display: flex;
            flex-wrap: wrap;
        }

        &__child {
            position: relative;
            overflow: hidden;

            &--selected {
                #{$root}__option {
                    &:after {
                        opacity: 1 !important;
                        transform: scale(1) !important;
                    }
                }
            }
        }

        &__option {
            display: block;
            height: 100%;
            width: 100%;
            border-radius: 2rem;
            border: 0;
            margin: 0;
            cursor: pointer;

            &:after {
                z-index: 1;
            }
        }

        &--gradient {
            #{$root}__menu {
                height: 100px;
            }

            #{$root}__child {
                height: 2rem;
                width: 2rem;
                margin: .32rem;
            }

            #{$root}__option {
                border-radius: 50%;
                padding: .4em;

                &:after {
                    content: '';
                    opacity: 0;
                    display: block;
                    background-image: url(../../svg/check.svg);
                    background-repeat: no-repeat;
                    background-position: center;
                    transition: all .2s ease-in-out;
                    transform: scale(.8);
                    width: 100%;
                    height: 100%;
                }
            }
        }

        &--icon {
            #{$root}__menu {
                height: 130px;
                justify-content: space-between;
            }

            #{$root}__child {
                height: 3rem;
                width: 3rem;
                max-width: 3rem;
                margin: .275rem;
            }

            #{$root}__option {
                padding: 0.75em;
                border: 1px solid white;

                &:after {
                    content: '';
                    position: absolute;
                    right: .02rem;
                    bottom: .02rem;
                    height: .8rem;
                    width: .8rem;
                    opacity: 0;
                    transform: scale(0);
                    display: block;
                    background-image: url(../../svg/check.svg), linear-gradient(-135deg, #4090ef, #9c9a42, #4090ef);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    transition: all .2s ease-in-out;
                    border-radius: 50%;
                }
            }
        }
    }
</style>