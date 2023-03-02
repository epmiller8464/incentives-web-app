import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    sessionId:null,
    survey: {
      questions: [, , ],
      previousQuestionId:null,
      currentQuestionId:null,
      nextQuestionId:null,
    },
  }),
  getters: {
    questionCount (state) {
      return state.survey.questions.length
    },
    remainingQuestionCount (state) {
      return state.survey.questions.length
    },
    productsCheaperThan (state) {
      return (price) => (
        state.products.filter(product =>
          product.price < price,
        )
      )
    },
  },
  actions: {
    addProduct () {
      this.products.push()
    },
  },
})
t
