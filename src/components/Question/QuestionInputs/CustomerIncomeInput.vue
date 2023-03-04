<template>
  <div id="customer-income" class="row mb-3">
    <div class="col-md-6 mx-auto question-answer-inputs">
      <div class="form-check" v-for="(option) in incomeOptions" ref="">
        <input
            class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
            @change="onUpdate"
            v-model="this.responseModel"
            :value="option.value">
        <label class="form-check-label" for="gridRadios1">
          {{ option.option }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomerIncomeInput',
  props: {
    inputModel: String,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data () {
    return {
      responseModel: this.inputModel,
    }
  },
  computed: {
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
    onUpdate (event) {
      console.log('CustomerIncomeInput:onUpdate')
      console.log('onUpdate', event.target.value,this.responseModel)
      this.$emit('update:modelUpdate', this.responseModel)
    },
    setup (props) {

      // let incomeOptionsRefs = ref()

      return {
        // incomeOptions,
      }
    },
  },
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 7.5vw;
}
</style>
