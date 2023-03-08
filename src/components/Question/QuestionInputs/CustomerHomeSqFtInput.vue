<template>
  <div id="customer-income" class="row mb-3">
    <div class="col-md-6 mx-auto">
      <label for="customRange3" class="form-label"></label>
      <input id="customRange1"
             type="number"
             placeholder="Home Square Feet. 3500 sqft"
             v-model="this.responseModel"
             class="form-control"
             :class="[this.isValid? '':'is-invalid']"
             @input="onUpdate">
      <div class="invalid-feedback">
        Value should be less than 10,000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerHomeSqFtInput',
  props: {
    inputModel: String,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data () {
    return {
      isValid: true,
      responseModel: this.inputModel,
    }
  },
  mounted () {
    console.log('CustomerHomeSqFtInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('CustomerHomeSqFtInput:unmounted')
    // this.$emit('update:resetInputModel')
  },
  methods: {
    validateInput (value) {
      const n = Number(value)
      return n > 0 && n <= 10000
    },
    onUpdate (event) {
      console.log('ExistingSystemAgeInput:onUpdate')
      this.responseModel = event.target.value
      this.isValid = event.target.value.length === 0 || this.validateInput(event.target.value)
      let val
      if (this.isValid) {
        val = this.responseModel
      } else {
        val = ''
      }
      this.$emit('update:modelUpdate', val)
    },
  },
}
</script>

<style scoped>

</style>
