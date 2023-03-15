<template>
  <div id="home-type" class="col-md-6 question-input mx-auto">
    <fieldset class="">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
               @change="onRadioUpdate"
               v-model="this.responseModel"
               value="single-family">
        <label class="form-check-label" for="gridRadios1">
          Single-family (own yourself)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
               @change="onRadioUpdate"
               v-model="this.responseModel"
               value="single-family-rented">
        <label class="form-check-label" for="gridRadios2">
          Single-family (rent from a landlord)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
               @change="onRadioUpdate"
               v-model="this.responseModel"
               value="multi-family">
        <label class="form-check-label" for="gridRadios3">
          1-4 units
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
               @change="onRadioUpdate"
               v-model="this.responseModel"
               value="apartment">
        <label class="form-check-label" for="gridRadios3">
          4+ unit multifamily, apartment, or condo building
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'

export default {
  name: 'HomeTypeInput',
  props: {
    inputModel: String,
  },
  data () {
    return {
      responseModel: this.inputModel || '',
    }
  },
  computed: {},
  mounted () {
    console.log('NewSystemTypeInput:onMount', this.inputModel)
  },
  methods: {
    validateInputModel () {
      this.$emit('update:valid-inputs', true)
      switch (this.responseModel) {
        case 'single-family':
          this.$emit('error:question-failure', null)
          break
        case 'single-family-rented':
        case 'multi-family':
        case 'apartment':
          this.$emit('error:question-failure', { name: 'SurveyError' })
          break
      }
    },
    onRadioUpdate (event) {
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
  },
  emits: [
    'update:modelUpdate',
    'update:resetInputModel',
    'error:question-failure',
    'update:valid-inputs',
  ],
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 10vw;
}

.invisible {
  display: none;
}
</style>
