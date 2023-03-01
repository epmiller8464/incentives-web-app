<template>
  <div class="px-4 pt-5 my-5">
    <h2 class="display-6 fw-bold">{{ questionText }}</h2>
    <p class="text-start fst-italic my-4">{{ questionInfo }}</p>
    <!--0. SystemType -->
    <!--1. UtilityProvider -->
    <!--2. ExistingSystem -->
    <!--3. SystemAge -->
    <!--4. CustomerIncome -->
    <!--5. CustomerPriority -->
    <!--6. CustomerAddress -->
    <!--7. CustomerHomeSqFt -->
    <!--8. CustomerContactInfo -->

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <router-link :to="{name:'GetStarted'}">
        <button type="button" class="btn btn-outline-danger btn-lg px-4 me-sm-3">Previous</button>
      </router-link>
      <router-link :to="{name:'Survey',params:{index:(Number(this.$route.params.index)+1)}}">
        <button type="button" class="btn btn-outline-primary btn-lg px-4">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>
const _incomeOptions = [
  { option: '$0 (or less)', value: 0 },
  //TODO: capture the income level as free form for this question
  { option: '$0 - $30,000', value: 1, rebate_eligible: false, show_free_form: true },
  { option: '$30,000 - $80,000', value: 2 },
  { option: '$80,000 - $150,000', value: 3 },
  { option: '$150,000+', value: 4 },
]
const questionTypes = {
  MULTIPLE_CHOICE: 'multiple-choice',
  MULTIPLE_SELECT: 'multiple-select',
  FREE_FORM_TEXT: 'free_form_text',
  RANKING: 'ranking',
}

export default {
  name: 'Question',
  props: {
    questionText: { type: String, default: 'Question Text' },
    questionInfo: { type: String, default: 'Question info...' },
    questionType: { type: String, default: 'free_form' },
    questionId: { type: Number, default: 0 },
  },
  components: {},
  data () {
    return {
      questionResponse: {},
    }
  },
  computed: {
    incomeOptions () {
      return _incomeOptions
    },
  },

  mounted () {
  },
}
</script>

<style scoped>

</style>
