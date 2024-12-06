<template>
  <div class="home">
    <SolarDashboard />
  </div>
</template>

<script>
import SolarDashboard from '@/components/SolarDashboard.vue';

export default {
  name: 'HomeView',
  components: {
    SolarDashboard
  }
}
</script>