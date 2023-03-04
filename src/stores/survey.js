import { defineStore } from 'pinia'
import { createNewIncentivesSurvey, surveyKey } from '@/lib/survey'

const QUESTION_ANSWER_MAP = 'QUESTION_ANSWER_MAP'
//TODO:
export const useSurveyStore = defineStore('survey', {
  state: () => ({
    sessionId: null,
    previousQuestionId: null,
    currentQuestionId: null,
    nextQuestionId: null,
    survey: null,
    qaMap: {},
  }),
  getters: {
    currentSurvey (state) {
      return state.survey
    },
    questionAnswerMap (state) {

      const transformMap = () => {
        const value = localStorage.getItem(QUESTION_ANSWER_MAP)
        return value ? JSON.parse(value) : {}
      }
      // localStorage.getItem(QUESTION_ANSWER_MAP)
      const persistedQAMap = transformMap()
      console.log(persistedQAMap)
      state.qaMap = persistedQAMap
      return state.qaMap
    },
  },
  actions: {
    createNewSurvey (session) {
      console.log('createNewSurvey')
      const { id } = session
      this.survey = createNewIncentivesSurvey(session)
      console.log(this.survey)

      // persist survey
      localStorage.setItem(surveyKey(id), JSON.stringify(this.survey))

      return this.currentSurvey
    },
    loadCurrentSurvey (sessionId) {
      console.log('loadCurrentSurvey')
      this.survey = localStorage.getItem(surveyKey(sessionId))
      if (!this.survey)
        console.log('no survey in progress.')
      else
        console.log('survey found. load survey state.')
      return this.currentSurvey
    },
    resetSurvey () {},
    persistQuestionAnswer (questionId, answer) {
      // this.questionAnswerMap.set(questionId, answer)
      this.questionAnswerMap[questionId] = answer
      // const { entries } = this.questionAnswerMap
      const copy = { ...this.questionAnswerMap }
      console.log(copy)
      localStorage.setItem(QUESTION_ANSWER_MAP, JSON.stringify(copy))
    },
  },
})

