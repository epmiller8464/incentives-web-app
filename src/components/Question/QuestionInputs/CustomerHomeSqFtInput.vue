<template>
  <div id="customer-home-sqft" class="row">
    <fieldset class="row mb-3">
      <div class="col-md-6 mx-auto">
        <label for="customRange3" class="form-label"></label>
        <input type="text" class="form-control" id="customRange1" placeholder="Home Square Feet. 3500 sqft"
               @input="onUpdate"
               v-model="this.responseModel">
      </div>

    </fieldset>
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
    onUpdate (event) {
      console.log('CustomerHomeSqFtInput:onUpdate')
      console.log('onUpdate', )
      this.responseModel = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)

    },
  },
}
</script>

<style scoped>

</style>
