// import { generateExternalUUID } from '@/lib/utils'
import {
  SURVEY_STATES,
  INCENTIVES_VERSION,
  INCENTIVES_SURVEY_DESCRIPTION,
  INCENTIVES_SURVEY_NAME,
} from '@/constants'

export const createNewIncentivesSurvey = ({ id, userId, startTime }) => {

  let survey = {
    id: id,
    userId,
    version: INCENTIVES_VERSION,
    name: INCENTIVES_SURVEY_NAME,
    description: INCENTIVES_SURVEY_DESCRIPTION,
    status: SURVEY_STATES.INITIATED,
    startTime,
    endTime: null,
  }
  console.log(survey)
  return survey
}

export const surveyKey = (sessionId) => `${sessionId}-${INCENTIVES_VERSION}`
