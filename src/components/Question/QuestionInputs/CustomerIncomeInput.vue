<template>
  <div id="customer-income" class="row mb-3">
    <div class="col-md-6 mx-auto question-answer-inputs">
      <div class="form-check" v-for="(option) in this.incomeOptions" v-bind="option">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option.value">
        <label class="form-check-label" for="gridRadios1">
          {{ option.option }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerIncomeInput',
  data () {
    return {}
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
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 7.5vw;
}
</style>
