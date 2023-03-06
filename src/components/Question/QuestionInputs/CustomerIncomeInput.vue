<template>
  <div id="customer-income" class="row mb-3">
    <div class="col-md-6 mx-auto question-answer-inputs">
      <div class="form-check" v-for="(option) in incomeOptions" ref="">
        <input
            class="form-check-input" type="radio" name="incomeRadios" :id="optionId(option)"
            @change="onUpdate"
            v-model="selectedIncome"
            :value="option.value">
        <label class="form-check-label" :for="optionId(option)">
          {{ option.option }}
        </label>
        <div v-if="option.show_free_form" :class="{'collapse':toggleOtherInput}" id="incomeCollapse">
          <input
              type="number"
              id="otherIncomeText"
              class="form-control"
              placeholder="$25,000" aria-label="$25,000"
              :value="otherIncomeValue"
              @input="onOtherIncomeInput"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomerIncomeInput',
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data () {
    return {
      otherIncomeValue: this.inputModel.otherIncomeValue || '',
      selectedIncome: this.inputModel.incomeLevel || '',
      responseModel: {
        incomeLevel: this.inputModel.incomeLevel,
        otherIncomeValue: this.inputModel.otherIncomeValue,
      },
    }
  },
  computed: {
    toggleOtherInput () {
      return this.selectedIncome !== '1'
    },
    incomeOptions () {
      return [
        { option: '$0 (or less)', value: 0 },
        //TODO: capture the income level as free form for this question
        { option: '$0 - $30,000', value: 1, rebate_eligible: false, show_free_form: true },
        { option: '$30,000 - $80,000', value: 2 },
        { option: '$80,000 - $150,000', value: 3 },
        { option: '$150,000+', value: 4 },
      ]
    },
  },
  mounted () {
    console.log('CustomerIncomeInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('CustomerIncomeInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    optionId ({ value }) {
      return `incomeOption${value}`
    },
    onUpdate (event) {
      console.log('CustomerIncomeInput:onUpdate')
      this.responseModel.incomeLevel = this.selectedIncome = event.target.value
      this.responseModel.otherIncomeValue = this.otherIncomeValue = this.selectedIncome !== '1' ? '':this.responseModel.otherIncomeValue
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onOtherIncomeInput (event) {
      console.log('CustomerIncomeInput:onUpdate')
      this.responseModel.otherIncomeValue = this.otherIncomeValue = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 7.5vw;
}
</style>
