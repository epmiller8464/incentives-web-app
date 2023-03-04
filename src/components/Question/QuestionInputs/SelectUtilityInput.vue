<template>
  <div id="select-utility" class="row">
    <div class="col-md-6 mx-auto">
      <div class="input-group mb-3">
        <select class="form-select" aria-label="Choose your utility provider"
                v-model="energyProvider"
                @change="onUpdate"
        >
          <option value="" disabled>
            Choose your energy provider
          </option>
          <option :value="{id:1,name:'Austin Energy',type:'electric'}">
            Austin Energy
          </option>
          <option :value="{id:2,name:'Center Point',type:'electric'}">
            Center Point
          </option>
        </select>
      </div>
      <div class="input-group mb-3">
        <select class="form-select" aria-label="Default select example"
                v-model="gasProvider"
                @change="onUpdate"
        >
          <option value="" disabled selected>
            Choose your gas provider
          </option>
          <option :value="{id:2,name:'Texas Gas',type:'gas'}">Texas Gas</option>
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
  emits: ['update:modelUpdate','update:resetInputModel'],
  data () {
    return {
      defaultEnergyOption: { id: -1, name: 'Choose your energy provider' },
      defaultGasOption: { id: -1, name: 'Choose your gas provider' },
      energyProvider: '',
      gasProvider: '',
      responseModel: {...this.inputModel},
    }
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
