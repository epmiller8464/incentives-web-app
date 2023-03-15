<template>
  <div id="error-container" v-if="this.currentQuestion" v-bind="this.currentQuestion">
    <Question
        :question-id='this.currentQuestion.id'
        :question-info='this.currentQuestion.info'
        :question-text='this.currentQuestion.text'
        :question-type='this.currentQuestion.type'>
      <slot>
      </slot>
    </Question>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'
import Question from '@/components/Question/Question.vue'
import { INCENTIVE_SURVEY_QUESTIONS } from '@/constants/incentive-questions'

export default {
  name: 'Survey',
  components: { Question },
  data () {
    return {
      surveyStarted: false,
      surveyComplete: false,
      questionsMap: new Map(),
    }
  },
  computed: {
    currentQuestion () {
      return this.questionsMap.get(this.currentQuestionId)
    },
    currentQuestionId () {
      return Number(this.$route.params.index)
    },
    ...mapStores(useSessionStore, useSurveyStore),
  },
  methods: {
    sortedQuestions () {
      return INCENTIVE_SURVEY_QUESTIONS.sort(q => q.id)
    },
    loadQuestionByIndex () {
      // console.log('loadQuestionByIndex')
      const qid = this.currentQuestionId
      this.question = this.questionsMap.get(qid)
      return this.question
    },
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    console.log(to, from, next)
    const validRoutes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const index = Number(to.params.index)

    if (validRoutes.includes(index)) {
      next()
    } else {
      next({ name: 'not-found' })
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    console.log(to, from, next)
    const validRoutes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const index = Number(to.params.index)

    if (validRoutes.includes(index)) {
      next()
    } else {
      console.warn('invalid question id')
      next({ name: 'not-found' })
    }
    // reload data when query params or site ID update
    // if (to.params.id !== from.params.id || !_.isEqual(to.query, from.query)) {
    //   this.loadAllData()
    //   this.maybeOpenMeterModal()
    // }
  },
  mounted () {
    this.loadQuestionByIndex()
  },
  // updated () {console.log('survey:updated')},
  // beforeUnmount () {console.log('survey:beforeUnmount')},
  // unmount () {console.log('survey:unmount')},
  setup (props, { emit }) {
    // 1. setup new survey
    // 2. persist new survey
    // 3. load survey questions
    let question = ref({})
    let questionsMap = ref({})
    // let questionAnswerMap = ref()

    questionsMap = new Map(INCENTIVE_SURVEY_QUESTIONS.map((q) => [q.id, q]))

    // console.log(question)
    return {
      question,
      questionsMap,
    }
  },
}
</script>

<style scoped>

</style>
