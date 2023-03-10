<template>
  <div id="display-case" class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-1">
      <div class="col-md col-md-6 col-lg-6 mx-auto my-2"
           v-if="getProductIncentives"
           v-for="(product,index) of getProductIncentives">

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
            :saving-summaries="product.savingSummaries"
        ></ProductIncentiveCard>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <router-link class="btn btn-link" :to="{name:'GetStarted'}">
          Reset
        </router-link>
      </div>
    </div>
    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Please enter an email address to see what rebates you qualify for.
            </h1>
          </div>
          <div class="modal-body">
            <fieldset class="row">
              <div class="col-md-12 mx-auto">
                <input type="email"
                       placeholder="Email" aria-label="Email"
                       class="form-control"
                       :class="[this.emailIsValid? '':'is-invalid']"
                       v-model="email"
                       @input="onEmailChange"
                >
                <div class="invalid-feedback">
                  Invalid email.
                </div>
              </div>
            </fieldset>
          </div>
          <div class="modal-footer">
            <button
                type="button" class="btn btn-outline-primary"
                @click="onGoBack">
              Go Back
            </button>
            <button
                type="button" class="btn btn-outline-primary"
                :disabled="!isValidEmail"
                @click="onProceed">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as bootstrap from 'bootstrap'
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

const formatIncentiveSummary = function (incentives) {

  let results = []
  console.log('formatIncentiveSummary', incentives)
  const federal = incentives.find(i => i.entity_name === 'IRS')

  if (federal)
    results.push(`$${federal.amount} ${federal.display_text}`)
  const electricity = incentives.find(i => i.energy_source === 'electricity')
  const gas = incentives.find(i => i.energy_source === 'natural_gas')
  if (gas)
    results.push(`$${gas.amount} ${gas.display_text}`)
  if (electricity)
    results.push(`$${electricity.amount} ${electricity.display_text}`)

  return results.sort().reverse()
}

export default {
  name: 'DisplayCase',
  props: {},
  components: { ProductIncentiveCard },
  data () {
    return {
      emailIsValid: true,
      email: '',
      productIncentives: [],
      myModal: null,
    }
  },
  computed: {
    isValidEmail () {
      return this.email.length && this.emailIsValid
    },
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

      const productIncentives = findProductIncentives(session, questionMap)

      const basicMatch = _.groupBy(productIncentives, ({ product }) => product.display_title.toLowerCase() === 'basic')

      const efficientMatch = _.groupBy(productIncentives,
          ({ product }) => product.display_title.toLowerCase() === 'efficient')
      console.log(efficientMatch)
      const semiEfficientMatch = _.groupBy(productIncentives,
          ({ product }) => product.display_title.toLowerCase() === 'semi-efficient')

      let ps = efficientMatch.true.reduce(productTransform,
          { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 })

      const efIncentives = _.flatten(efficientMatch.true.map((p) => p.incentives))
      console.log(efIncentives)
      const efficientProduct = {
        title: 'Efficient',
        subtitle: 'Eligible for all available incentives',
        treeCount: 3,
        costSavingsTxt: `$${ps.totalSavings} savings`,
        energySavingsTxt: '~XX% lower energy bill \n (vs. basic)',
        instantSavingsTxt: `$${ps.instantSavings}: Austin Energy \n (instant)`,
        annualSavingsTxt: `$${ps.annualSavings}: Federal tax credit \n (next year)`,
        equipmentSummaries: efficientMatch.true.map(({ product }) => {
          return {
            summary: product.display_equipment_summary,
            tooltip: product.display_equipment_tooltip,
          }
        }),
        savingSummaries: formatIncentiveSummary(efIncentives),
      }
      console.log(efficientProduct)
      this.productIncentives.push(efficientProduct)

      let semi = semiEfficientMatch.true.reduce(productTransform,
          { totalSavings: 0, equipmentSummaries: [], instantSavings: 0, annualSavings: 0 })
      const semiEfIncentives = _.flatten(semiEfficientMatch.true.map((p) => p.incentives))
      // console.log(semiEfIncentives)
      const semiEfficientProduct = {
        title: 'Semi-Efficient',
        subtitle: 'Eligible for some of the available incentives',
        treeCount: 2,
        costSavingsTxt: `$${semi.totalSavings} savings`,
        energySavingsTxt: '~X% lower energy bill \n (vs. basic)',
        instantSavingsTxt: `$${semi.instantSavings}: Austin Energy \n (instant)`,
        annualSavingsTxt: `$${semi.annualSavings}: Federal tax credit \n (next year)`,
        equipmentSummaries: semiEfficientMatch.true.map(({ product }) => {
          return {
            summary: product.display_equipment_summary,
            tooltip: product.display_equipment_tooltip,
          }
        }),
        savingSummaries: formatIncentiveSummary(semiEfIncentives),
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
        savingSummaries: [''],
      }
      this.productIncentives.push(basicProduct)

    },
    validateEmail (text) {
      const regex = /^[^\s@]+@[^\s@]+$/g
      return regex.test(text)
    },
    onEmailChange (event) {
      this.emailIsValid = this.validateEmail(event.target.value)
      if (this.emailIsValid) {
        this.email = event.target.value
      }
      // this.$emit('update:modelUpdate', this.responseModel)
    },
    onGoBack (event) {
      console.log('onProceed')
      console.log(event)
      this.myModal.hide()
      this.$router.push({ name: 'GetStarted', replace: true })
    },
    onProceed (event) {
      console.log('onProceed')
      console.log(event)
      this.myModal.hide()
    },
  },
  mounted () {
    try {

      this.myModal = new bootstrap.Modal('#modal')
      this.myModal.show()
      // myModal.hide()

    } catch (e) {
      console.error(e)
    }

  },
  unmount () {
    this.myModal.hide()
    // const myModal = new bootstrap.Modal('#modal')
    // myModal.hide()
  },
}
</script>

<style scoped>

</style>
