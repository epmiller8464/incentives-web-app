import { defineStore } from 'pinia'
import { generateExternalUUID } from '@/lib/utils'
import { SESSION_KEY, SESSION_USER_ID_KEY } from '@/constants'

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {
      id: null,
      userId: null,
      startTime: null,
      state: null,
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
      //TODO: inform user or current session
      const existingSession = localStorage.getItem(SESSION_KEY)
      if (existingSession) {
        console.warn('a session already exists.')
        console.log('loading previous session.')
        console.log('session:', existingSession)
        //TODO: explicitly make user start a new session
        return
      }
      this.session = {
        id: generateExternalUUID(),
        userId: externalUserId,
        startTime: new Date(),
        state: 'initiated',
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentSession))
      console.log('new session initiated.')
    },
  },
})

