<template>
    <header class="navbar container">
        <router-link class="navbar__brand" to="/">
            WallOfChain.com
        </router-link>

        <ul class="navbar__nav flex-row ml-md-auto">
            <li class="navbar__item">
                <router-link class="navbar__link p-2" to="/">
                    Home
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link p-2" to="/project.html">
                    The Project
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="navbar__link p-2" to="/wall.html">
                    The Wall
                </router-link>
            </li>
            <li class="navbar__item">
                <router-link class="btn btn--outline btn--thin" to="/become-a-star.html">
                    Become a Star
                </router-link>
            </li>
        </ul>
    </header>
</template>
<script>
    export default {};
</script>
<style lang="scss">
    .navbar {
        display: flex;
        align-items: center;
        padding-top: 3.125em;
        padding-bottom: 5em;

        &__brand {
            font-size: 1.25rem;
            letter-spacing: 0.15em;
            font-weight: 800;
            line-height: 1.2;
            text-transform: uppercase;
        }

        &__nav {
            list-style: none;
            margin: 0 0 0 auto;
            padding: 0;
        }

        &__item {
            display: inline-block;
            margin: 0 1.25em;

            &:last-child {
                margin-right: 0;
            }
        }

        &__link {
            text-transform: uppercase;
            font-size: 0.875rem;
            line-height: 1.285;
            letter-spacing: 0.214em;
            color: #fff;

            &:after {
                content: '';
                display: block;
                position: relative;
                width: 20%;
                margin: 0 auto;
                top: 0.928em;
                height: 2px;
                background-image: linear-gradient(94deg, #4090ef, #9c9a42);
                opacity: 0;
                transform: translateY(-4px);
                transition: .15s ease-in-out;
            }

            &.router-link-exact-active {
                font-weight: 700;

                &:after {
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