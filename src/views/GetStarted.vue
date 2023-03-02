<template>
  <div id="cta" class="container">
    <h1>Learn what rebates & incentives you are eligible for.</h1>
    <p class="text-start fst-italic my-4">"Up to $XXXX incentives & rebates available today"</p>
    <div class="text-center">
      <router-link :to="{name:'Survey',params:{index:0}}">
        <button class="btn btn-outline-primary text-center">Get Started</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import '../scss/styles.scss'

export default {
  name: 'GetStarted',
  methods: {},
}
</script>

<style scoped>

</style>
