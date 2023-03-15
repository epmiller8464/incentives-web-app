<template>
  <div id="system-age" class="col-md-6 mx-auto">
    <label for="customRange3" class="form-label"></label>
    <input
        id="customRange8"
        type="number"
        placeholder="Existing System Age" aria-label="Existing System Age"
        min="1" max="40"
        v-model="this.responseModel"
        class="form-control"
        :class="[this.isValid? '':'is-invalid']"
        @input="onUpdate"
    >
    <div class="invalid-feedback">
      Range should be 1 - 40
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystemAgeInput',
  props: {
    inputModel: String,
  },
  emits: [
    'update:modelUpdate',
    'update:resetInputModel',
    'update:valid-inputs',
  ],
  data () {
    return {
      isValid: true,
      responseModel: this.inputModel || '',
    }
  },
  mounted () {
    console.log('ExistingSystemAgeInput:onMount', this.inputModel)
    this.validateInputModel()
  },
  unmounted () {
    console.log('ExistingSystemAgeInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInputModel () {
      if (this.validateInput(this.responseModel)) {
        this.$emit('update:valid-inputs', true)
      } else {
        this.$emit('update:valid-inputs', false)
      }
    },
    validateInput (value) {
      const n = Number(value)
      return n > 0 && n <= 40
    },
    onUpdate (event) {
      console.log('ExistingSystemAgeInput:onUpdate')
      this.responseModel = event.target.value
      this.isValid = event.target.value.length === 0 || this.validateInput(event.target.value)
      console.log('isValid', this.isValid)
      let val
      if (this.isValid) {
        val = this.responseModel
      } else {
        val = ''
      }
      this.$emit('update:modelUpdate', val)
      this.validateInputModel()
    },
  },
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 5vw;
}
</style>
