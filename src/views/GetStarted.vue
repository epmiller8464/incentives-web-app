<template>
  <div id="cta" class="container">
    <h1>Learn what rebates & incentives you are eligible for.</h1>
    <p class="text-start fst-italic my-4">"Up to $XXXX incentives & rebates available today"</p>
    <div class="text-center">
      <button @click="onGetStarted" class="btn btn-outline-primary text-center">Get Started</button>
    </div>
  </div>
</template>

<script>
import '../scss/styles.scss'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'
import { generateExternalUUID } from '@/lib/utils'

let store
export default {
  name: 'GetStarted',
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

</style>
