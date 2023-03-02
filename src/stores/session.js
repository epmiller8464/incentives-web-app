import { defineStore } from 'pinia'
import { generateExternalUUID } from '@/lib/utils'

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {
      id: '',
      userId: '',
      startTime: '',
      state: 'undefined',
    },
  }),
  getters: {
    sessionUserId (state) {
      return state.session.userId
    },
    sessionId (state) {
      return state.session.id
    },
    sessionTime (state) {
      return state.session.startTime
    },
    currentSession (state) {
      return state.session
    },
  },
  actions: {
    startNewSession (externalUserId) {
      console.log(`startNewSession:start`)
      console.log('previous-session:', this.currentSession)
      this.session = {
        id: generateExternalUUID(),
        userId: externalUserId,
        startTime: new Date(),
        state: 'initiated',
      }
      console.log(`startNewSession:complete`, this.currentSession)
    },
  },
})

