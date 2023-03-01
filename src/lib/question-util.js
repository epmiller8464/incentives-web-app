export const QuestionTypes = {
  MULTIPLE_CHOICE: 'multiple-choice',
  MULTIPLE_SELECT: 'multiple-select',
  SINGLE_SELECT: 'single-select',
  FREE_FORM_TEXT: 'free-form-text',
  RANKING: 'ranking',
  RANGE: 'range',
  CUSTOM: 'custom',
}

export const ProductTypes = {
  NA: 'N/A',
  CENTRAL_AC: 'CENTRAL_AC',
  FURNACE: 'FURNACE',
  ASHP: 'ASHP',
}
export const SystemTypes = [
  { option: 'Central AC', type: ProductTypes.CENTRAL_AC },
  { option: 'Furnace', type: ProductTypes.FURNACE },
  { option: 'Heat Pump', type: ProductTypes.ASHP },
  { option: 'Other', type: ProductTypes.NA, action: 'show text input' },
]
export const Utilities = [
  { option: 'Austin Energy', type: 'Electric' },
  { option: 'Texas Gas', type: 'Gas' },
]

export const createQuestion = () => {
  return {
    id: 0,
    name: 'SystemType',
    text: 'What type of system are you considering buying?',
    type: QuestionTypes.MULTIPLE_SELECT,
    info: '',
    options: [...SystemTypes],
    config: {},
    canBypass: false,
  }
}
