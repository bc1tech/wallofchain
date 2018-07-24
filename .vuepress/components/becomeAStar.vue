<template>
    <main class="container">
        <ClientOnly>
            <become-star-form />
        </ClientOnly>
    </main>
</template>
<script>
    const BecomeStarForm = () => import('../theme/BecomeStarForm.vue');

    export default {
        components: {
            BecomeStarForm,
        },
    };
</script>