<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ProductIncentiveCard
            cid="1"
            title="Energy Efficient"
            subtitle="Eligible for all available incentives"
            cost="$X,XXX savings"
            cost-savings="~XX savings"
            instant-savings="$635 instant saving from Austin Energy"
            annual-savings="$2,000 Federal Tax Credit"
            energy-savings="~XX% lower energy bill (vs. basic)"
            tree-count="3"
        ></ProductIncentiveCard>

      </div>
      <div class="col">
        <ProductIncentiveCard
            cid="2"
            title="Semi-Efficient"
            subtitle="Eligible for some of the incentives"
            cost="$X,XXX savings"
            cost-savings="$635 savings"
            instant-savings="$635 instant saving from Austin Energy"
            annual-savings="$0 Federal Tax Credit"
            energy-savings="~X% lower energy bill"
            tree-count="2"
        ></ProductIncentiveCard>
      </div>
      <div class="col">
        <ProductIncentiveCard
            cid="3"
            title="Basic"
            subtitle="Eligible for no incentives"
            cost="$0 savings"
            cost-savings="$0 savings"
            instant-savings="$0 instant saving from Austin Energy"
            annual-savings="$0 Federal Tax Credit"
            energy-savings="-"
            tree-count="0"
        ></ProductIncentiveCard>
      </div>
      <div class="d-flex">
        <router-link :to="{name:'GetStarted'}">Reset</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import ProductIncentiveCard from '@/components/ProductIncentiveCard.vue'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'
import { findProductIncentives } from '@/lib/incentives-engine'

export default {
  name: 'DisplayCase',
  props: {},
  components: { ProductIncentiveCard },
  data () {
    return {
      productOffering: {},
    }
  },
  computed: {
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {
    loadProductIncentives () {
      this.sessionStore.loadSession()
      const session = this.sessionStore.currentSession
      const questionMap = this.surveyStore.questionAnswerMap
      console.log(session)
      const productIncentives = findProductIncentives(session, questionMap)
      console.log(productIncentives)
    },
  },
  mounted () {
    try {
      this.loadProductIncentives()
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style scoped>

</style>
