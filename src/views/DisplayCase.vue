<template>
  <div id="display-case" class="">
    <div class="row">
      <div class="col-md-6" v-if="getProductIncentives" v-for="(product,index) of getProductIncentives">
        <ProductIncentiveCard
            :cid="index.toString()"
            :title="product.title"
            :subtitle="product.subtitle"
            :cost="product.costSavingsTxt"
            :instant-savings="product.instantSavingsTxt"
            :annual-savings="product.annualSavingsTxt"
            :energy-savings="product.energySavingsTxt"
            :tree-count="product.treeCount"
            :equipment-summaries="product.equipmentSummaries"
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
import _ from 'lodash'

const productTransform = function (result, { product, incentives }, index) {
  let totalSavings = 0
  // console.log(incentives)
  for (let i = 0; i < incentives.length; i++) {
    // console.log('ince', incentives[i])
    const { amount, entity_name } = incentives[i]
    totalSavings += Number(amount)
    if (entity_name.toUpperCase() === 'IRS')
      result.annualSavings += Number(amount)
    else
      result.instantSavings += Number(amount)
    // console.log(totalSavings, amount)
  }

  result.id += product.id
  result.totalSavings += totalSavings

  // if(!result.equipmentSummaries)
  //   result.equipmentSummaries = []

  return result
}
export default {
  name: 'DisplayCase',
  props: {},
  components: { ProductIncentiveCard },
  data () {
    return {
      productIncentives: [],
    }
  },
  computed: {
    getProductIncentives () {
      return this.productIncentives
    },
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {
    costSavingsText (displayTitle = '') {
      let savingsTxt = ''
      switch (displayTitle.toLowerCase()) {
        case 'basic':
          savingsTxt = '$0 savings'
          break
        case 'semi-efficient':
          savingsTxt = '$XXX savings'
          break
        case 'efficient':
          savingsTxt = '$X,XXX savings'
          break
      }
      return savingsTxt
    },
    energyBillText (displayTitle = '') {
      let savingsTxt = ''
      switch (displayTitle.toLowerCase()) {
        case 'basic':
          savingsTxt = '-'
          break
        case 'semi-efficient':
          savingsTxt = '~X% lower energy bill (vs. basic)'
          break
        case 'efficient':
          savingsTxt = '~XX% lower energy bill (vs. basic)'
          break
      }
      return savingsTxt
    },
    loadProductIncentives () {
      this.sessionStore.loadSession()
      const session = this.sessionStore.currentSession
      const questionMap = this.surveyStore.questionAnswerMap
      // console.log(session)
      // console.log(questionMap)
      const productIncentives = findProductIncentives(session, questionMap)

      const basicMatch = _.groupBy(productIncentives, ({ product }) => product.display_title.toLowerCase() === 'basic')
      // console.log(basicMatch)
      const efficientMatch = _.groupBy(productIncentives, ({ product }) => product.display_title.toLowerCase() === 'efficient')
      console.log(efficientMatch)
      const semiEfficientMatch = _.groupBy(productIncentives,
          ({ product }) => product.display_title.toLowerCase() === 'semi-efficient')
      // console.log(semiEfficientMatch)
      // const prodModel = { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 }
      let ps = efficientMatch.true.reduce(productTransform,
          { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 })

      const efficientProduct = {
        title: 'Efficient',
        subtitle: 'Eligible for all available incentives',
        treeCount: 3,
        costSavingsTxt: `$${ps.totalSavings} savings`,
        energySavingsTxt: '10% lower energy bill \n (vs. basic)',
        instantSavingsTxt: `$${ps.instantSavings}: Austin Energy \n (instant)`,
        annualSavingsTxt: `$${ps.annualSavings}: Federal tax credit \n (next year)`,
        equipmentSummaries: efficientMatch.true.map(({ product }) => {
          return {
            summary: product.display_equipment_summary,
            tooltip: product.display_equipment_tooltip,
          }
        }),
      }
      // console.log(product)
      this.productIncentives.push(efficientProduct)

      let semi = semiEfficientMatch.true.reduce(productTransform,
          { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 })
      const semiEfficientProduct = {
        title: 'Semi-Efficient',
        subtitle: 'Eligible for some of the available incentives',
        treeCount: 2,
        costSavingsTxt: `$${semi.totalSavings} savings`,
        energySavingsTxt: '2% lower energy bill \n (vs. basic)',
        instantSavingsTxt: `$${semi.instantSavings}: Austin Energy \n (instant)`,
        annualSavingsTxt: `$${semi.annualSavings}: Federal tax credit \n (next year)`,
        equipmentSummaries: semiEfficientMatch.true.map(({ product }) => {
          return {
            summary: product.display_equipment_summary,
            tooltip: product.display_equipment_tooltip,
          }
        }),
      }
      this.productIncentives.push(semiEfficientProduct)

      let basic = basicMatch.true.reduce(productTransform,
          { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 })
      // console.log(basic)
      const basicProduct = {
        title: 'Basic',
        subtitle: 'Eligible for no incentives',
        treeCount: 0,
        costSavingsTxt: `$${basic.totalSavings} savings`,
        energySavingsTxt: '-',
        instantSavingsTxt: `$${basic.instantSavings}: Austin Energy \n (instant)`,
        annualSavingsTxt: `$${basic.annualSavings}: Federal tax credit \n (next year)`,
        equipmentSummaries: basicMatch.true.map(({ product }) => {
          return {
            summary: product.display_equipment_summary,
            tooltip: product.display_equipment_tooltip,
          }
        }),
      }
      this.productIncentives.push(basicProduct)

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
