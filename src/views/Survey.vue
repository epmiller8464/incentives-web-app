<template>
  <div id="survey" class="" v-if="this.currentQuestion" ref="currentQuestion">
    <Question
        :question-id='this.currentQuestion.id'
        :question-info='this.currentQuestion.info'
        :question-text='this.currentQuestion.text'
        :question-type='this.currentQuestion.id.type'>
      <slot>
      </slot>
    </Question>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'
import Question from '@/components/Question/Question.vue'
import { ContactInfo } from '@/components/Question/QuestionInputs'
import { QuestionTypes, SystemTypes, Utilities } from '@/lib/question-util'
import ContactInfoInput from '@/components/Question/QuestionInputs/ContactInfoInput.vue'
import { INCENTIVE_SURVEY_QUESTIONS } from '@/constants/incentive-questions'

const Survey = {
  surveyId: 'survey@v1.0.0',
  version: 1,
  userId: '',
  questions: [...INCENTIVE_SURVEY_QUESTIONS],
}

export default {
  name: 'Survey',
  components: { ContactInfo, Question },
  props: {
    // surveyId: { type: String, default: 'test-survey' },
    // userId: { type: String, default: 'testUser123' },
  },
  data () {
    return {
      currentQuestionId: 0,
      previousQuestionId: 0,
      nextQuestionId: 0,
      surveyStarted: false,
      surveyComplete: false,
      question: {},
    }
  },
  computed: {
    currentQuestion () {
      const qid = this.$route.params.index
      this.question = Survey.questions[qid]
      console.log(this.question)
      return this.question
    },
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {
    loadQuestionByIndex () {
      const qid = this.$route.params.index
      return INCENTIVE_SURVEY_QUESTIONS[qid]
    },
  },
  mounted () {
    this.loadQuestionByIndex()
  },
  setup (props, { emit }) {
    // 1. setup new survey
    // 2. persist new survey
    // 3. load survey questions

    const question = ref({})
    // console.log(question)
    return {
      question,
      // surveyId,
    }
  },
}
</script>

<style scoped>

</style>
