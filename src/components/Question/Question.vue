<template>
  <div class="question-container">
    <div class="row">
      <h2 class="display-6 text-center fw-bold">{{ questionText }}</h2>
      <p class="fst-italic text-center">{{ questionInfo }}</p>
    </div>
    <div class="row mb-3">
      <div class="question-input">
        <QuestionResponse>
          <!--0. SystemType -->
          <slot v-if="this.questionId === 0">
            <NewSystemType></NewSystemType>
          </slot>
          <!--1. UtilityProvider -->
          <slot v-else-if="this.questionId === 1">
            <SelectUtility></SelectUtility>
          </slot>
          <!--2. ExistingSystem -->
          <slot v-else-if="this.questionId === 2">
            <ExistingSystemType></ExistingSystemType>
          </slot>
          <!--3. SystemAge -->
          <slot v-else-if="this.questionId === 3">
            <ExistingSystemAge></ExistingSystemAge>
          </slot>
          <slot v-else-if="this.questionId === 4">
            <!--4. CustomerIncome -->
            <CustomerIncome></CustomerIncome>
          </slot>
          <slot v-else-if="this.questionId === 5">
            <!--5. CustomerPriority -->
            <CustomerPriority></CustomerPriority>
          </slot>
          <slot v-else-if="this.questionId === 6">
            <!--6. CustomerAddress -->
            <CustomerAddress></CustomerAddress>
          </slot>
          <slot v-else-if="this.questionId === 7">
            <!--7. CustomerHomeSqFt -->
            <CustomerHomeSqFt></CustomerHomeSqFt>
          </slot>
          <slot v-else>
            <!--8. CustomerContactInfo -->
            <ContactInfo></ContactInfo>
          </slot>
        </QuestionResponse>
      </div>
    </div>

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

import {
  CustomerAddress,
  ContactInfo,
  CustomerHomeSqFt,
  CustomerIncome,
  CustomerPriority,
  SelectUtility,
  ExistingSystemAge,
  ExistingSystemType,
  NewSystemType,
} from '@/components/Question/QuestionInputs'
import ExistingSystemInput from '@/components/Question/QuestionInputs/ExistingSystemTypeInput.vue'
import QuestionResponse from '@/components/Question/QuestionResponse.vue'

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
  components: {
    QuestionResponse,
    ExistingSystemInput,
    CustomerAddress,
    ContactInfo,
    CustomerHomeSqFt,
    CustomerIncome,
    CustomerPriority,
    SelectUtility,
    ExistingSystemAge,
    ExistingSystemType,
    NewSystemType,
  },
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
  methods: {
    loadQuestionInput () {
      return '<ContactInfo></ContactInfo>'
    },
  },
  setup (props, { emit }) {
    console.log(`Question Setup`)
    console.log(props)
  },
}
</script>

<style scoped>

</style>
