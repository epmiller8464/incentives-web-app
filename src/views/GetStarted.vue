<template>
  <div class="alert alert-light alert-dismissible fade show" role="alert">
    This is an early, illustrative demo. Intent is to get initial reactions. <em>Lots more to come.</em>
    <button type="button" class="btn-close alert-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <div id="error-container" class="container py-5">
    <div class="col-md-6 mx-auto">
      <h1 class="text-center">Learn what rebates & incentives you are eligible for.</h1>
      <p>
        Homeowners can get <strong>$4,000+</strong> from the government by buying an efficient heating & cooling system.
      </p>
      <ul>
        <li>
          <strong>Local:</strong> Local utilities have a variety of programs (worth over $1,000) to encourage homeowners
          to buy
          energy-efficient equipment.
        </li>
        <li>
          <strong>Federal:</strong> The Inflation Reduction Act allocates billions every year to homeowners to buy
          certain equipment.
          Homeowners can qualify for up to $3,200 of tax credits per year.
        </li>
      </ul>
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
