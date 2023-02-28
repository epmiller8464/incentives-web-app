<template>
  <div class="container text-center">
    <h1>Learn what rebates & incentives you are eligible for.</h1>
    <router-link :to="{name:'Survey',params:{index:1}}">
      <button class="btn btn-primary">Get Started</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'GetStarted',
  methods: {
  },
}
</script>

<style scoped>

</style>
