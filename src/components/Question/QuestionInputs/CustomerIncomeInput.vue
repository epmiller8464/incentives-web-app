<template>
  <div id="customer-income" class="row mb-3">
    <div class="col-md-6 mx-auto question-answer-inputs">
      <div class="form-check" v-for="(option) in incomeOptions" ref="">
        <input
            class="form-check-input" type="radio" name="incomeRadios" :id="optionId(option)"
            @change="onUpdate"
            v-model="selectedIncome"
            :value="option.incomeLevel">
        <label class="form-check-label" :for="optionId(option)">
          {{ option.incomeLevelRange }}
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
import { INCOME_LEVEL_OPTIONS } from '@/constants/component-options'
export default {
  name: 'CustomerIncomeInput',
  props: {
    inputModel: Object,
  },
  emits: [
    'update:modelUpdate',
    'update:resetInputModel',
    'update:valid-inputs',
  ],
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
      return this.selectedIncome !== '2'
    },
    incomeOptions () {
      return [...INCOME_LEVEL_OPTIONS]
    },
  },
  mounted () {
    console.log('CustomerIncomeInput:onMount', this.inputModel)
    this.validateInputModel()
  },
  unmounted () {
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInputModel () {
      if (this.selectedIncome) {
        //TODO: add logic around income
        this.$emit('update:valid-inputs', true)
      } else {
        this.$emit('update:valid-inputs', false)
      }
    },
    optionId ({ incomeLevel }) {
      return `incomeOption${incomeLevel}`
    },
    onUpdate (event) {
      console.log('CustomerIncomeInput:onUpdate')
      this.responseModel.incomeLevel = this.selectedIncome = event.target.value
      this.responseModel.otherIncomeValue = this.otherIncomeValue = this.selectedIncome !== '1'
          ? ''
          : this.responseModel.otherIncomeValue
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onOtherIncomeInput (event) {
      console.log('CustomerIncomeInput:onUpdate')
      this.responseModel.otherIncomeValue = this.otherIncomeValue = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
  },
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 7.5vw;
}
</style>
