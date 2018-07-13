<template>
    <main>
        <div class="container">
            <h1>Become a part of the blockchain hall of fame. Become a star now</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor si amet, consectetur adipiscing elit</p>

            <router-link to="/become-a-star.html" class="btn">Become a star</router-link>
        </div>
        <wall :limit="10" />
        <div class="text-center">
            <router-link to="/wall.html" class="btn btn--outline">Show other position</router-link>
        </div>
    </main>
</template>
<script>
    export default {};
</script>
