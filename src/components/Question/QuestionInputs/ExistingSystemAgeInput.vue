<template>
  <div id="system-age" class="row">
    <div class="col-md-6 mx-auto">
      <input type="text"
             class="form-control" id="customRange1" min="1" max="40"
             placeholder="Existing System Age" aria-label="Existing System Age"
             @input="onUpdate"
             :value="responseModel"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystemAgeInput',
  props: {
    inputModel: String,
  },
  emits: ['update:modelUpdate','update:resetInputModel'],
  data () {
    return {
      responseModel: this.inputModel
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
    onUpdate (event) {
      console.log('ExistingSystemAgeInput:onUpdate')
      this.responseModel = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
  }
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 5vw;
}
</style>
