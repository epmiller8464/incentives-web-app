<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ProductIncentiveCard
            title="Energy Efficient"
            subtitle="Qualifies for all eligible rebates"
            cost="$X,XXX + 4-10K"
            cost-savings="$2,635 savings"
            instant-savings="$635 instant saving from Austin Energy"
            annual-savings="$2,000 Federal Tax Credit"
            energy-savings="10% Lower bills"
            tree-count="3"
        ></ProductIncentiveCard>

      </div>
      <div class="col">
        <ProductIncentiveCard
            title="Semi-Efficient"
            subtitle="Qualifies for all eligible rebates"
            cost="$X,XXX + 2-5K"
            cost-savings="$635 savings"
            instant-savings="$635 instant saving from Austin Energy"
            annual-savings="$0 Federal Tax Credit"
            energy-savings="5% Lower bills"
            tree-count="2"
        ></ProductIncentiveCard>
      </div>
      <div class="col">
        <ProductIncentiveCard
            title="Basic"
            subtitle="Does not qualify for any rebates"
            cost="$X"
            cost-savings="$0 savings"
            instant-savings="$0 instant saving from Austin Energy"
            annual-savings="$0 Federal Tax Credit"
            energy-savings="Does not lower bill"
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

export default {
  name: 'DisplayCase',
  props: {},
  components: { ProductIncentiveCard },
  data () {
    return {
      productOffering: {},
    }
  },
  computed: {},
}
</script>

<style scoped>

</style>
