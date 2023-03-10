import { PRODUCTS_DB } from '@/constants/products-db'

const Contractor = {
  contractorId: 'dd4e55e4-bdd3-11ed-9a5f-3aebb006c675',
  name: 'McCullough Heating & Air Conditioning',
  region: null,
}

export const ContractorProductsMap = new Map([
  [
    Contractor.contractorId,
    {
      contractor: Contractor,
      products: [...PRODUCTS_DB],
    },
  ],
])


