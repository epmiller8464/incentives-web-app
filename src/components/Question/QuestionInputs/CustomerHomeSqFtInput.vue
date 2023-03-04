<template>
  <div id="customer-home-sqft" class="row">
    <fieldset class="row mb-3">
      <div class="col-md-6 mx-auto">
        <label for="customRange3" class="form-label"></label>
        <input type="number" class="form-control" id="customRange1" min="1" max="30000" placeholder="Home Square Feet. 2000 sqft">
      </div>

    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CustomerHomeSqFtInput',
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate','update:resetInputModel'],
  mounted () {
    console.log('CustomerIncomeInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('CustomerIncomeInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      console.log('CustomerIncomeInput:onUpdate')
      console.log('onUpdate', event.target.value)
    },
  }
}
</script>

<style scoped>

</style>
