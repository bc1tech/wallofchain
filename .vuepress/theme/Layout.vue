<template>
  <div class="page-wrapper">
    <SiteHeader :menu-open="menuOpen"
        @toggleMenu="toggleMenu"></SiteHeader>
    <Transition name="fade"
        mode="out-in">
      <KeepAlive :include="/^Page/">
        <SiteMenu v-if="menuOpen"></SiteMenu>
        <Component v-else-if="page"
            :is="page"
            :key="page"></Component>
        <div v-else
            class="text-center h2 m-4 text-danger">
          Component for {{ $page.path }} not found.
        </div>
      </KeepAlive>
    </Transition>
    <Transition name="fade"
        mode="out-in">
      <SiteFooter v-if="!menuOpen"></SiteFooter>
    </Transition>
  </div>
</template>
<script>
  import SiteHeader from './Header.vue';
  import SiteFooter from './Footer.vue';
  import SiteMenu from './Menu.vue';

  export default {
    components: {
      SiteHeader,
      SiteMenu,
      SiteFooter,
    },
    data() {
      return {
        menuOpen: false,
      };
    },
    computed: {
      page() {
        return this.$page.frontmatter.home ? 'Wall' : (this.$page.frontmatter.component || null);
      },
    },
    watch: {
      $route() {
        if (this.menuOpen) {
          this.menuOpen = false;
        }
      },
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"></style>
