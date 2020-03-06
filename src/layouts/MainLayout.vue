<template>
  <main class="main">
    <Header />  
    <div class="page-layout container">
      <router-view/>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>