<template>
  <div class="alert alert-light alert-dismissible fade show" role="alert">
    This is an early, illustrative demo. Intent is to get initial reactions. <em>Lots more to come.</em>
    <button type="button" class="btn-close alert-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div id="error-container" class="container py-5">
    <div class="row text-center">
      <h1>Learn what rebates & incentives you are eligible for.</h1>
      <p class=" fst-italic my-4">Up to $X,XXX incentives & rebates available today</p>
      <div class="text-center">
        <button @click="onGetStarted" class="btn btn-outline-primary text-center">Get Started</button>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-1">
    </div>
  </div>
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
      this.sessionStore.clearSession()
      this.surveyStore.resetSurvey()
      const contractorId = 'dd4e55e4-bdd3-11ed-9a5f-3aebb006c675'
      //TODO: if a current session exists ask the user if they want to start a new one.
      this.sessionStore.startNewSession(generateExternalUUID(), contractorId)
      this.surveyStore.loadCurrentSurvey()
      this.$router.push({ name: 'Survey', params: { index: 0 } })
    },
  },
  mounted () {
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
      toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.hide()
      })
    }
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
