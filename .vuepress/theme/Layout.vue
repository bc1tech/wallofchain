<template>
    <div class="page-wrapper">
        <site-header />
        <transition name="fade" mode="out-in">
            <component v-if="page" :is="page" :key="page"></component>
            <div v-else class="text-center h2 m-4 text-danger">
                Component for {{ $page.path }} not found.
            </div>
        </transition>
        <site-footer />
    </div>
</template>
<script>
    import SiteHeader from './Header.vue';
    import SiteFooter from './Footer.vue';

    export default {
        components: {
            SiteHeader,
            SiteFooter,
        },
        computed: {
            page() {
                return this.$page.frontmatter.home ? 'Home' : (this.$page.frontmatter.component || null);
            },
        },
    };
</script>
<style src="../scss/main.scss" lang="scss"></style>
