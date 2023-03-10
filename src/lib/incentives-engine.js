import { ContractorProductsMap } from '@/constants/contractor-products'
import { transformSurveyQuestions } from '@/constants/customer-inputs'
import { INCENTIVES_DB } from '@/constants/incentives-db'

const loadProductsByContractorId = (customerInputs) => {

  const { contractorId, newSystemTypes } = customerInputs
  const { contractor, products } = ContractorProductsMap.get(contractorId)

  let filteredProducts = products.filter(
    (p) => newSystemTypes.includes(p.product_type))

  return { contractor, products: filteredProducts }

}

const filterIncentives = ({ product, incentives = [] }) => {

  let results = []
  // if (incentives.length) {

  console.log('filterIncentives', incentives)
  const federal = incentives.filter(i => i.entity_name === 'IRS')
  federal.sort((i) => Number(i.amount))
//   gasIncentives.sort((i) => Number(i.amount))
  if (federal) {
    results.push(federal.pop())
  }

  const electricity = incentives.filter(
    i => i.energy_source === 'electricity')
  if (electricity) {
    electricity.sort((i) => Number(i.amount))
    results.push(electricity.pop())
  }

  const gas = incentives.filter(i => i.energy_source === 'natural_gas')
  if (gas) {
    gas.sort((i) => Number(i.amount))
    results.push(gas.pop())
  }
  // }

  return {
    product,
    incentives: [...results.filter( i => i !== null && i !== undefined)],
  }
}
// const findIncentives = (customerInputs, contractor) => {
//
//   const elecIncentives = INCENTIVES_DB.filter(
//     (i) => (i.energy_source === 'electricity' && i.entity_name ===
//       customerInputs.utility.electricityProvider.name))
//   const gasIncentives = INCENTIVES_DB.filter(
//     (i) => (i.energy_source === 'natural_gas' && i.entity_name ===
//       customerInputs.utility.gasProvider.name))
//   const fedIncentives = INCENTIVES_DB.filter(
//     (i) => (i.entity_name === 'IRS' && i.region === contractor.region))
//   // fedIncentives.sort((i) => Number(i.amount))
//   // elecIncentives.sort((i) => Number(i.amount))
//   // gasIncentives.sort((i) => Number(i.amount))
//
//   return [fedIncentives.pop(), elecIncentives.pop(), gasIncentives.pop()].filter( i => i !== null && i !== undefined)
//   // return
// }
const findIncentives = (customerInputs, contractor, incentives) => {

  const _incentives = INCENTIVES_DB.filter((i) => {
    const isMatch =
      (i.energy_source === 'electricity' &&
        i.entity_name === customerInputs.utility.electricityProvider.name)
      ||
      (i.energy_source === 'natural_gas' &&
        i.entity_name === customerInputs.utility.gasProvider.name)
      ||
      (i.entity_name === 'IRS' && i.region === contractor.region)

    return isMatch
  })
  return _incentives
}

const productIncentiveCompare = (incentive, product, existingSystemAge) => {

  const typeMatch = incentive.product_type === product.product_type
  // console.log('product_type',incentive.product_type,product.product_type, typeMatch)

  const seer2Match = incentive.SEER2 <= product.SEER2
  // console.log('seer2',incentive.SEER2,product.SEER2, seer2Match)

  const eer2Match = incentive.EER2 <= product.EER2
  // console.log('eer2',incentive.EER2,product.EER2, eer2Match)

  const afueMatch = incentive.AFUE <= product.AFUE
  // console.log('afue',incentive.AFUE,product.AFUE, afueMatch)

  const systemAgeMatch = Number(incentive.existing_system_age) <=
    Number(existingSystemAge)
  // console.log('system_age',incentive.existing_system_age,existingSystemAge, systemAgeMatch)

  const compressorTypeMatch = incentive.compressor_type ===
    product.compressor_type
  // console.log('compressor_type',incentive.compressor_type,product.compressor_type, compressorTypeMatch)
  // console.log('compressor_type', compressorTypeMatch)

  return (typeMatch && seer2Match && eer2Match && afueMatch &&
    compressorTypeMatch && systemAgeMatch)

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
        incentive,
        product,
        existingSystemAge)
      if (isMatch) {
        set.incentives.push(incentive)
      }
    }
    matches.push(filterIncentives(set))
    // matches.push(set)
  }
  return matches
}
const findProductIncentives = (session, questionMap) => {

  const customerInputs = transformSurveyQuestions(session, questionMap)
  const { contractor, products } = loadProductsByContractorId(customerInputs)
  // console.log('products', products)
  const incentives = findIncentives(customerInputs, contractor, INCENTIVES_DB)
  console.log('incentives', incentives)

  return matchProductIncentives(products, incentives, customerInputs)
}

export { findProductIncentives }
