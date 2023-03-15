import { defineStore } from 'pinia'
import { generateExternalUUID } from '@/lib/utils'
import { SESSION_KEY, SESSION_USER_ID_KEY } from '@/constants'
import { surveyKey } from '@/lib/survey'

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {
      id: null,
      userId: null,
      startTime: null,
      state: null,
      contractorId: 'dd4e55e4-bdd3-11ed-9a5f-3aebb006c675',
      contractorName: 'McCullough',
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
    contractorId (state) {
      return state.session.contractorId
    },
    contractorName (state) {
      return state.session.contractorName
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
        contractorId: this.contractorId,
        startTime: new Date(),
        state: 'initiated',
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.currentSession))
      console.log('new session initiated.')
    },
    loadSession () {
      const value = localStorage.getItem(SESSION_KEY)
      if (!value) {
        console.error('no active session')
        return null
      }
      const existingSession = JSON.parse(value)
      // currentSession
      this.session = {
        id: existingSession.id,
        userId: existingSession.userId,
        contractorId: existingSession.contractorId,
        startTime: existingSession.startTime,
        state: existingSession.state,
      }
      return this.currentSession
    },
    clearSession () {
      localStorage.removeItem(SESSION_KEY)
      this.session = {
        id: null,
        userId: null,
        startTime: null,
        state: null,
        contractorId: null,
      }
    },
  },
})

