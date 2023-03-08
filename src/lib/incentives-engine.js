import { ContractorProductsMap } from '@/constants/contractor-products'
import { transformSurveyQuestions } from '@/constants/customer-inputs'
import { INCENTIVES_DB } from '@/constants/incentives-db'

const INCOME_ELIGIBLE_FLAGS = ['full', 'partial', 'none']
const PRODUCT_TYPES = ['central_ac', 'furnace', 'ashp']
const COMPRESSOR_TYPES = ['na', 'inverter', 'conventional']
const ENTITY_TYPES = ['utility', 'federal', 'local', 'state']

const CustomerInput = {
  sessionId: '',
  surveyId: '',
  customerId: '',
  contractorId: '',
  utility: {
    electricityProvider: {
      id: '0429dd34-bde6-11ed-9a5f-3aebb006c675',
      name: 'Austin Energy',
      type: 'electricity',
    },
    gasProvider: {
      id: '0429dda2-bde6-11ed-9a5f-3aebb006c675',
      name: 'Texas Gas',
      type: 'natural_gas',
    },
  },
  income: {
    incomeLevel: '',
    incomeLevelRange: '',
    incomeEligibleFlag: '',
  },
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
  },
  newSystemTypes: [],
  existingSystemTypes: [],
  existingSystemAge: '',
  homeSqFt: '',
  customerPriorities: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
  },
}

const Entity = {
  entityId: '',
  entityName: '',
  entityType: '',
}

const Entities = [
  {
    entityId: 'b7449b9c-bdd3-11ed-9a5f-3aebb006c675',
    entityName: 'IRS',
    entityType: 'federal',
  },
  {
    entityId: 'b7449c46-bdd3-11ed-9a5f-3aebb006c675',
    entityName: 'Austin Energy',
    entityType: 'utility',
  },
  {
    entityId: 'b7449c78-bdd3-11ed-9a5f-3aebb006c675',
    entityName: 'Texas Gas',
    entityType: 'utility',
  },
]

const loadProductsByContractorId = (contractorId) => {
  console.log(ContractorProductsMap)
  return ContractorProductsMap.get(contractorId)
}
const findIncentives = (customerInputs, contractor, incentives) => {

  const _incentives = INCENTIVES_DB.filter((i) => {
    const isMatch =
      (i.energy_source === 'electricity'
        &&
        i.entity_name === customerInputs.utility.electricityProvider.name
        ||
        i.energy_source === 'natural_gas' && i.entity_name ===
        customerInputs.utility.gasProvider.name
        ||
        i.entity_name === 'IRS' && i.region === contractor.region
      )
    return isMatch
  })
  return _incentives
}

const productIncentiveCompare = (i, p, existingSystemAge) => {
  return i.product_type === p.product_type &&
    i.SEER2 <= p.SEER2 &&
    i.EER2 <= p.EER2 &&
    i.COP <= p.COP
    // i.HSPF <= p.HSPF &&
    // i.AFUE <= p.AFUE &&

    // i.existing_system_age <= existingSystemAge

}
const matchProductIncentives = (products, incentives, customerInputs) => {
  const matches = []
  const { existingSystemAge } = customerInputs
  for (const product of products) {
    const set = {
      product,
      incentives: [],
    }
    for (const incentive of incentives) {
      const isMatch = productIncentiveCompare(
        product,
        incentive,
        existingSystemAge)
      if (isMatch) {
        set.incentives.push(incentive)
      }
    }
    matches.push(set)
  }
  return matches
}
const findProductIncentives = (session, questionMap) => {
  console.log(session)
  const customerInputs = transformSurveyQuestions(session, questionMap)
  console.log(customerInputs)
  // productMap
  const { contractor, products } = loadProductsByContractorId(
    customerInputs.contractorId)
  console.log(contractor)
  console.log('products', products)
  const incentives = findIncentives(customerInputs, contractor, INCENTIVES_DB)
  console.log('incentives', incentives)

  return matchProductIncentives(products, incentives, customerInputs)
}

// const findProducts = (customerInput) => {
//   const sysTypes = [...customerInput.systemTypes]
//
// }

export { findProductIncentives }
