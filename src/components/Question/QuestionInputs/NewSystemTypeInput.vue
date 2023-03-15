<template>
  <div id="system-type" class="col-md-6 question-input mx-auto">
    <fieldset class="">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="flexCheckDefault"
               @change="onUpdate"
               v-model="checkedSystemTypes" value="cooling">
        <label class="form-check-label" for="flexCheckDefault">
          Cooling system (e.g, air conditioner, heat pump)
        </label>
      </div>
      <div class="form-check">
        <input
            class="form-check-input" type="checkbox" id="flexCheckChecked"
            @change="onUpdate"
            v-model="checkedSystemTypes" value="heating">
        <label class="form-check-label" for="flexCheckChecked">
          Heating (e.g., furnace, boiler, heat pump)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
               @change="onRadioUpdate"
               v-model="other"
               value="other">
        <label class="form-check-label" for="gridRadios2">
          Other
        </label>
        <div>
          <input type="text"
                 id="otherInputText"
                 class="form-control"
                 :class="[{'invisible':!toggleOtherInput},this.otherTextValid? '':'is-invalid']"
                 placeholder="System description" aria-label=""
                 :value="otherText"
                 @input="onOtherTextInput">
          <div class="invalid-feedback" :class="{'invisible':!toggleOtherInput}">
            10 characters please.
          </div>
          <div :class="{'invisible':!toggleOtherInput}">
            <em>Please contact your contractor for more information on what you qualify for.</em>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap'

export default {
  name: 'NewSystemTypeInput',
  props: {
    inputModel: Object,
  },
  data () {
    return {
      checkedSystemTypes: this.inputModel.checkedSystemTypes || [],
      other: this.inputModel.other || '',
      otherText: this.inputModel.otherText || '',
      responseModel: { ...this.inputModel },
    }
  },
  computed: {
    toggleOtherInput () {
      return this.other === 'other'
    },
    otherTextValid () {
      return this.toggleOtherInput && this.otherText.length && this.otherText.length >= 5
    },
    hasValidSystemTypes () {},
    haHeatPumpOrOther () {

    },
  },
  mounted () {
    console.log('NewSystemTypeInput:onMount', this.inputModel)
    this.validateInputModel()
  },
  unmounted () {
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInputModel () {
      if (this.responseModel.checkedSystemTypes.length > 0) {
        this.$emit('update:valid-inputs', true)
        return
      }
      if (this.responseModel.other === 'other' && this.otherTextValid) {
        this.$emit('update:valid-inputs', true)
        this.$emit('error:question-failure', { name: 'SurveyError' })
        return
      }
      this.$emit('update:valid-inputs', false)
    },
    onUpdate (event) {
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes
      this.responseModel.other = this.other = ''
      this.responseModel.otherText = this.otherText = ''
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onRadioUpdate (event) {
      this.responseModel.other = this.other
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes = []
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onOtherTextInput (event) {
      this.responseModel.otherText = this.otherText = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
      this.$emit('update:valid-inputs', false)
      this.validateInputModel()
      // if (this.otherTextValid) {
      //   this.$emit('update:valid-inputs', true)
      //   this.$emit('error:question-failure', { name: 'SurveyError' })
      // }
    },
    onKeyUp (event) {
      console.log(event)
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
