<template>
  <div id="select-utility" class="container-fluid">
    <div class="d-flex-row mb-2">
      <div class="col-6 mx-auto">
        <select id="energySelect" class="form-select" aria-label="Choose your utility provider"
                v-model="energyProvider"
                @change="onUpdate"
        >
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
    </div>
    <div class="d-flex-row">
      <div class="col-6 mx-auto">
        <!--        <label for="gasSelect" class="form-label">-->
        <!--          Choose your gas provider-->
        <!--        </label>-->
        <select id="gasSelect" class="form-select" aria-label="Default select example"
                v-model="gasProvider"
                @change="onUpdate"
        >
          <option value="" disabled>
            Choose your gas provider
          </option>
          <option :value="{id:1,name:'Texas Gas',type:'gas'}">Texas Gas</option>
          <option :value="{id:2,name:' Gas',type:'gas'}">Gas</option>
        </select>
      </div>
    </div>

  </div>

</template>

<script>
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
        { id: 1, name: 'Austin Energy', type: 'electric' },
        { id: 2, name: 'Center Point', type: 'electric' },
      ]
      return options
    },
    gasProviderOptions () {},
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
