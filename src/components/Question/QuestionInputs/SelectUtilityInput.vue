<template>
  <div id="select-utility" class="col-md-6 mx-auto">
    <div class="my-2">
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
    <div class="my-2">
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
      <div class="my-2">
        <input
            type="text"
            id="tankedGasText"
            class="form-control"
            placeholder="Providers name" aria-label="Providers name"
            :class="[{'invisible':!toggleOtherInput}]"
            :value="tankedGasText"
            @input="onTankedGasTextInput"
        >
      </div>
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
  emits: [
    'update:modelUpdate',
    'update:resetInputModel',
    'update:valid-inputs',
  ],
  data () {
    return {
      defaultEnergyOption: { id: -1, name: 'Choose your energy provider' },
      defaultGasOption: { id: -1, name: 'Choose your gas provider' },
      energyProvider: this.inputModel.energyProvider.name ? this.inputModel.energyProvider : '',
      gasProvider: this.inputModel.gasProvider.name ? this.inputModel.gasProvider : '',
      tankedGasText: this.inputModel.tankedGasText ? this.inputModel.tankedGasText : '',
      responseModel: { ...this.inputModel },
    }
  },
  computed: {
    energyProviderOptions () {
      return [...ELECTRICITY_PROVIDERS]
    },
    gasProviderOptions () {
      return [...GAS_PROVIDERS]
    },
    toggleOtherInput () {
      return this.gasProvider && this.gasProvider.type === 'tanked_gas'
    },
  },
  mounted () {
    console.log('SelectUtilityInput:onMount', this.inputModel)
    this.validateInputModel()
  },
  methods: {
    validateInputModel () {
      if (this.responseModel.energyProvider || this.responseModel.gasProvider) {
        this.$emit('update:valid-inputs', true)
      } else {
        this.$emit('update:valid-inputs', false)
      }
    },
    onUpdate (event) {
      console.log('onUpdate', event.target.value)
      this.responseModel.energyProvider = this.energyProvider
      this.responseModel.gasProvider = this.gasProvider
      this.$emit('update:modelUpdate', this.responseModel)
      this.$emit('update:valid-inputs', true)
    },
    onTankedGasTextInput (event) {
      this.responseModel.tankedGasText = this.tankedGasText = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
      this.$emit('update:valid-inputs', true)
    },
  },
}
</script>

<style scoped>

</style>
