<template>
    <header class="navbar">
        <div class="container">
            <router-link class="navbar-brand mr-0 mr-md-2" to="/">
                WallOfChain.com
            </router-link>

            <ul class="navbar-nav flex-row ml-md-auto">
                <li class="nav-item">
                    <router-link class="nav-link p-2" to="/">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link p-2" to="/project.html">
                        The Project
                    </router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link p-2">
                        The Wall
                    </a>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-primary d-inline-block mb-3 mb-md-0 ml-md-3" to="/become-a-star.html">
                        Become a Star
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
    export default {};
</script>
