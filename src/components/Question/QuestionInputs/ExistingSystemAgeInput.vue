<template>
  <div id="system-age">
    <div class="">
      <input type="number"
             id="customRange1" min="1" max="40"
             class="form-control"

             placeholder="Existing System Age" aria-label="Existing System Age"
             @input="onUpdate"
             :value="responseModel"
      >
      <div class="invalid-feedback">
        Range should be 1 - 40
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystemAgeInput',
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
    console.log('ExistingSystemAgeInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('ExistingSystemAgeInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInput (value) {
      const n = Number(value)
      return n > 0 && n <= 40
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
.question-answer-inputs {
  padding-left: 5vw;
}
</style>
