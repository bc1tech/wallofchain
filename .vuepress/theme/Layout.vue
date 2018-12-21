<template>
  <div class="page-wrapper">
    <SiteHeader></SiteHeader>
    <Transition name="fade"
        mode="out-in">
      <Component :is="page"
          v-if="page"
          :key="page"></Component>
      <div v-else
          class="text-center h2 m-4 text-danger">
        Component for {{ $page.path }} not found.
      </div>
    </Transition>
    <SiteFooter></SiteFooter>
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
        return this.$page.frontmatter.home ? 'Wall' : (this.$page.frontmatter.component || null);
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"></style>
