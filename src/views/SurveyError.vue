<template>
  <div id="error-container" class="container">
    <div class="px-4 py-5 my-5 text-center">
      <h2 class="display-5 fw-bold">Survey Error</h2>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Please contact <strong>{{ contractorName }}</strong> for more information on what incentives you might be eligible for.
        </p>
        <p class="text-muted">
          If you feel something is missing that should be here, please contact us at
          <a href="mailto:info@usemantel.com">info@usemantel.com</a>
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <router-link
              class="btn btn-outline-primary btn-lg px-4 gap-3"
              :to="{name:'GetStarted'}">Go back
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'

export default {
  name: 'SurveyError',
  data () {
    return {}
  },
  computed: {
    ...mapStores(useSessionStore),
    contractorName () { return this.sessionStore.contractorName},
  },
}
</script>

<style scoped>

</style>
