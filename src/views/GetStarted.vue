<template>
  <div id="cta" class="container">
    <div style="opacity: 0.3;">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-1">
        <div class="col-md col-md-6 col-lg-6 mx-auto">
          <!--        <div class="col mx-auto">-->
          <DisplayCard
              title="Energy Efficient"
              subtitle="Qualifies for all eligible rebates"
              cost="$X,XXX + 4-10K"
              cost-savings="$2,635 savings"
              instant-savings="$635 instant saving from Austin Energy"
              annual-savings="$2,000 Federal Tax Credit"
              energy-savings="10% Lower bills"
              tree-count="3"
          ></DisplayCard>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h1>Learn what rebates & incentives you are eligible for.</h1>
      <p class=" fst-italic my-4">"Up to $XXXX incentives & rebates available today"</p>
      <div class="text-center">
        <button @click="onGetStarted" class="btn btn-outline-primary text-center">Get Started</button>
      </div>
    </div>
  </div>
  <!--  <div class="container-sm">100% wide until small breakpoint</div>-->
  <!--  <div class="container-md">100% wide until medium breakpoint</div>-->
  <!--  <div class="container-lg">100% wide until large breakpoint</div>-->
  <!--  <div class="container-xl">100% wide until extra large breakpoint</div>-->
  <!--  <div class="container-xxl">100% wide until extra extra large breakpoint</div>-->
</template>

<script>
import '../scss/styles.scss'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'
import { generateExternalUUID } from '@/lib/utils'
import DisplayCard from '@/components/DisplayCard.vue'

let store
export default {
  name: 'GetStarted',
  components: { DisplayCard },
  computed: {
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {
    onGetStarted (event) {
      console.log('get started click')
      //TODO: if a current session exists ask the user if they want to start a new one.
      this.sessionStore.startNewSession(generateExternalUUID())
      this.surveyStore.loadCurrentSurvey()
      this.$router.push({ name: 'Survey', params: { index: 0 } })
    },
  },
  setup () {},
}
</script>

<style scoped>

/*@media (min-width: 992px) {*/

/*}*/


/*@media (min-width: 1200px) {*/
/*}*/


/*@media (min-width: 1400px) {*/
/*}*/
</style>
