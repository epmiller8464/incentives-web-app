import { QuestionTypes, SystemTypes, Utilities } from '@/lib/question-util'

export const INCENTIVE_SURVEY_QUESTIONS = [
  {
    id: 0,
    name: 'SystemType',
    text: 'What type of system are you considering buying?',
    type: QuestionTypes.MULTIPLE_SELECT,
    info: '',
    options: [...SystemTypes],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 1,
    name: 'UtilityProvider',
    text: 'Who provides your home with power?',
    type: QuestionTypes.MULTIPLE_SELECT,
    info: 'This would be who you pay for electricity and natural gas / fuel (if you have it). Utilities commonly have incentives programs. This information will allow the system to check your local utility.',
    options: [...Utilities],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 2,
    name: 'ExistingSystem',
    text: 'What do you have today?',
    type: QuestionTypes.MULTIPLE_SELECT,
    info: '',
    options: [],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 3,
    name: 'SystemAge',
    text: 'How many years old is your existing system?',
    type: QuestionTypes.RANGE,
    info: 'Not sure? No worries. We can proceed without it for now. \n',
    options: [],
    config: { min: 0, max: 40 },
    canBypass: true,
    isComplete: false,
    answer: {},
  },
  {
    id: 4,
    name: 'CustomerIncome',
    text: 'What do you estimate your taxable income (after deductions) to be this year?',
    type: QuestionTypes.SINGLE_SELECT,
    info: 'Eligibility for some federal incentives (e.g., Energy Efficient Home Improvement Tax Credit) is informed by taxable income. Taxable income is roughly your total income (e.g., W2 wages, earnings from investment) less deductions.',
    options: [
      { option: '$0 (or less)', value: 0 },
      //TODO: capture the income level as free form for this question
      {
        option: '$0 - $30,000',
        value: 1,
        rebate_eligible: false,
        show_free_form: true,
      },
      { option: '$30,000 - $80,000', value: 2 },
      { option: '$80,000 - $150,000', value: 3 },
      { option: '$150,000+', value: 4 },
    ],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 5,
    name: 'CustomerPriority',
    text: 'What are the relative prioritization of these factors?',
    type: QuestionTypes.RANKING,
    info: 'Please place these item in order of most important to least important.',
    options: [
      {
        id: 1,
        type: 'cost',
        option: 'Lower upfront cost',
      },
      {
        id: 2,
        type: 'energy',
        option: 'Reduce monthly energy/utility bills',
      },
      {
        id: 3,
        type: 'emissions',
        option: 'Reduce carbon emissions from my house',
      },
      {
        id: 4,
        type: 'comfort',
        option: 'Improve comfort inside my house',
      },
      {
        id: 5,
        type: 'Quietness',
        option: 'quietness',
      },
      {
        id: 6,
        type: 'Speed',
        option: 'speed of replacement',
      },
    ],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 6,
    name: 'CustomerAddress',
    text: 'What is your home’s address?',
    type: QuestionTypes.CUSTOM,
    info: 'Please place these item in order of most important to least important.',
    options: [
      {
        id: 'cost',
        option: 'Lower upfront cost',
      },
      {
        id: 'energy',
        option: 'Reduce monthly energy/utility bills',
      },
      {
        id: 'emissions',
        option: 'Reduce carbon emissions from my house',
      },
      {
        id: 'comfort',
        option: 'Improve comfort inside my house',
      },
      {
        id: 'Quietness',
        option: 'quietness',
      },
      {
        id: 'Speed',
        option: 'speed of replacement',
      },
    ],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 7,
    name: 'CustomerHomeSqFt',
    text: 'What is the square footage of your home?',
    type: QuestionTypes.FREE_FORM_TEXT,
    info: 'This will allow us to understand roughly how big of a system you will need.',
    options: [
      {
        id: 'cost',
        option: 'Lower upfront cost',
      },
      {
        id: 'energy',
        option: 'Reduce monthly energy/utility bills',
      },
      {
        id: 'emissions',
        option: 'Reduce carbon emissions from my house',
      },
      {
        id: 'comfort',
        option: 'Improve comfort inside my house',
      },
      {
        id: 'Quietness',
        option: 'quietness',
      },
      {
        id: 'Speed',
        option: 'speed of replacement',
      },
    ],
    config: { min: 0, max: 30000 },
    canBypass: false,
    isComplete: false,
    answer: {},
  },
  {
    id: 8,
    name: 'CustomerContactInfo',
    text: 'What’s the best way to share eligible rebates with you?',
    type: QuestionTypes.FREE_FORM_TEXT,
    info: 'This will allow us to understand roughly how big of a system you will need.',
    options: [],
    config: {},
    canBypass: false,
    isComplete: false,
    answer: {},
  },
]
