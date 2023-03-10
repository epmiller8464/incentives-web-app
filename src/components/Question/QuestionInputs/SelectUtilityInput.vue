<template>
  <div id="select-utility" class="col-md-6 mx-auto">
    <div class="mb-2">
      <select id="energySelect" class="form-select form-select" aria-label="Choose your utility provider"
              v-model="energyProvider"
              @change="onUpdate">
        <option value="" disabled>
          Choose your energy provider
        </option>
        <option
            v-for="opt in this.energyProviderOptions"
            :value="opt"
            data-selected="this.energyProvider.id === opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <div>
      <select id="gasSelect" class="form-select" aria-label="Default select example"
              v-model="gasProvider"
              @change="onUpdate"
      >
        <option value="" disabled>
          Choose your gas provider
        </option>
        <option
            v-for="opt in this.gasProviderOptions"
            :value="opt"
            data-selected="this.gasProvider.id === opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>

  </div>
</template>

<script>

import { ELECTRICITY_PROVIDERS, GAS_PROVIDERS } from '@/constants/component-options'

export default {
  name: 'SelectUtilityInput',
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data () {
    return {
      defaultEnergyOption: { id: -1, name: 'Choose your energy provider' },
      defaultGasOption: { id: -1, name: 'Choose your gas provider' },
      energyProvider: this.inputModel.energyProvider.name ? this.inputModel.energyProvider : '',
      gasProvider: this.inputModel.gasProvider.name ? this.inputModel.gasProvider : '',
      responseModel: { ...this.inputModel },
    }
  },
  computed: {
    energyProviderOptions () {
      let options = [
        { id: 1, name: 'Austin Energy', type: 'electricity' },
        { id: 2, name: 'Center Point', type: 'electric' },
      ]
      return [...ELECTRICITY_PROVIDERS]
    },
    gasProviderOptions () {
      return [...GAS_PROVIDERS]
      // return [
      //   { id: 1, name: 'Texas Gas', type: 'natural_gas' },
      //   { id: 2, name: 'Gas', type: 'gas' },
      // ]
    },
  },
  mounted () {
    console.log('SelectUtilityInput:onMount', this.inputModel)
  },
  unmounted () {
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      console.log('onUpdate', event.target.value)
      this.responseModel.energyProvider = this.energyProvider
      this.responseModel.gasProvider = this.gasProvider
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
}
</script>

<style scoped>

</style>
