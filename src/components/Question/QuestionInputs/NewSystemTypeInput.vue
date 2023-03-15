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
               v-model="heatPumpOrOther"
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
          <div class="invalid-feedback">
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
      heatPumpOrOther: this.inputModel.heatPumpOrOther || '',
      otherText: this.inputModel.otherText,

      responseModel: { ...this.inputModel },
    }
  },
  computed: {
    toggleOtherInput () {
      return this.heatPumpOrOther === 'other'
    },
    otherTextValid () {
      return this.otherText.length >= 5
    },
  },
  mounted () {
    console.log('NewSystemTypeInput:onMount', this.inputModel)

  },
  unmounted () {
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes
      this.responseModel.heatPumpOrOther = this.heatPumpOrOther = ''
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onRadioUpdate (event) {
      this.responseModel.heatPumpOrOther = this.heatPumpOrOther
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes = []
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onOtherTextInput (event) {
      this.responseModel.otherText = this.otherText = event.target.value

      this.$emit('update:modelUpdate', this.responseModel)
      this.$emit('update:valid-inputs', false)
      if (this.otherTextValid) {
        console.log('valid')
        this.$emit('update:valid-inputs', true)
      }
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
