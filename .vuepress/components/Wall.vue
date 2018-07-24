<template>
    <main class="section container-lg">
        <h2 class="section__title section__title--center">Discover the wall of blockchain</h2>
        <wall />
    </main>
</template>
<script>
    const Wall = () => import('../theme/Wall.vue');

    export default {
        components: {
            Wall,
        },
    };
</script>