<template>
  <div class="question-container">
    <div class="row">
      <h2 class="display-6 text-center fw-bold">{{ questionText }}</h2>
      <p class="fst-italic text-center">{{ questionInfo }}</p>
    </div>
    <div class="row mb-3">
      <div class="question-input">
        <!--0. SystemType -->
        <slot v-if="this.questionId === 0">
          <NewSystemType
              v-model:input-model="inputModel"
              @update:model-update="onInputModelUpdate"></NewSystemType>
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
      </div>
    </div>

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <button @click="onPreviousClick" type="button" class="btn btn-outline-danger btn-lg px-4 me-sm-3">
        Previous
      </button>
      <button @click="onNextClick" type="button" class="btn btn-outline-primary btn-lg px-4">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'

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
import { generateExternalUUID } from '@/lib/utils'

// const questionTypes = {
//   MULTIPLE_CHOICE: 'multiple-choice',
//   MULTIPLE_SELECT: 'multiple-select',
//   FREE_FORM_TEXT: 'free_form_text',
//   RANKING: 'ranking',
// }

//TODO: track start and end time per question.
export default {
  name: 'Question',
  props: {
    questionText: { type: String, default: 'Question Text' },
    questionInfo: { type: String, default: 'Question info...' },
    questionType: { type: String, default: 'free_form' },
    questionId: { type: Number, default: 0 },
  },
  components: {
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
      inputModel: {
        checkedSystemTypes: [],
        // checkedSystemTypes: ["central-ac", "furnace"],
        heatPumpOrOther: '',
      },
      startTime () {},
      endTime () {},
    }
  },
  computed: {
    ...mapStores(useSessionStore, useSurveyStore),
  },
  beforeMount () {
    console.log('question component mounted')
    if (this.surveyStore) {
      const qaState = this.surveyStore.questionAnswerMap[this.questionId]
      console.log('questionState', qaState)
      if (qaState) {
        if (qaState.checkedSystemTypes)
          this.inputModel.checkedSystemTypes = qaState.checkedSystemTypes
        if (qaState.heatPumpOrOther)
          this.inputModel.heatPumpOrOther = qaState.heatPumpOrOther
      }
    }
  },

  mounted () {
    console.log('question component mounted')
    if (this.surveyStore) {
      const qaState = this.surveyStore.questionAnswerMap[this.questionId]
      console.log('questionState', qaState)
      if (qaState) {
        if (qaState.checkedSystemTypes)
          this.inputModel.checkedSystemTypes = qaState.checkedSystemTypes
        if (qaState.heatPumpOrOther)
          this.inputModel.heatPumpOrOther = qaState.heatPumpOrOther
      }
    }
  },
  methods: {
    onPreviousClick () {

      const qid = Number(this.$route.params.index)
      if (qid === 0)
        this.$router.push({ name: 'GetStarted' })
      else
        this.$router.push({ name: 'Survey', params: { index: (qid - 1) } })

    },
    onNextClick () {
      //TODO: handle the end of questions logic to display case
      this.$router.push({ name: 'Survey', params: { index: (Number(this.$route.params.index) + 1) } })
    },
    onInputModelUpdate (event) {
      console.log('onInputModelUpdate')
      // console.log(event)
      this.inputModel = event
      console.log(this.questionId, this.inputModel)
      this.surveyStore.persistQuestionAnswer(this.questionId, this.inputModel)
      // this.sessionStore.startNewSession(generateExternalUUID())
    },
  },
  setup (props, { emit }) {
    console.log(`Question Setup`)
    console.log(props)
    // console.log(this.surveyStore)

  },
}
</script>

<style scoped>

</style>
