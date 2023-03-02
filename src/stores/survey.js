import { defineStore } from 'pinia'
import { createNewIncentivesSurvey, surveyKey } from '@/lib/survey'
//TODO:
export const useSurveyStore = defineStore('survey', {
  state: () => ({
    sessionId: null,
    previousQuestionId: null,
    currentQuestionId: null,
    nextQuestionId: null,
    survey: null
    ,
  }),
  getters: {
    currentSurvey (state) {
      return state.survey
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
  },
})

