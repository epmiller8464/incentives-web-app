<template>
  <div id="cta" class="container">
    <h1>Doing Some Math...</h1>
    <h2>Display Case Redirect</h2>
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
  name: 'DoingSomeMath',
  computed: {
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {},
  setup () {},
}
</script>

<style scoped>

</style>
