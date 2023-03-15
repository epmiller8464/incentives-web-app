<template>
  <div id="existing-system" class="col-md-6 question-input mx-auto">
    <fieldset>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="electricChecked"
               @change="onUpdate"
               v-model="checkedSystemTypes" value="central_ac">
        <label class="form-check-label" for="electricChecked">
          Central AC
        </label>
      </div>
      <div class="form-check">
        <input
            class="form-check-input" type="checkbox" id="heatPumpChecked"
            @change="onUpdate"
            v-model="checkedSystemTypes" value="ashp">
        <label class="form-check-label" for="heatPumpChecked">
          Heat Pump
        </label>
      </div>
      <div class="form-check">
        <input
            class="form-check-input" type="checkbox" id="furnaceChecked"
            @change="onUpdate"
            v-model="checkedSystemTypes" value="furnace">
        <label class="form-check-label" for="furnaceChecked">
          Furnace
        </label>
      </div>
      <div class="form-check">
        <input
            class="form-check-input" type="checkbox" id="boilerChecked"
            @change="onUpdate"
            v-model="checkedSystemTypes" value="boiler">
        <label class="form-check-label" for="boilerChecked">
          Boiler
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="esGridRadios2"
               @change="onRadioUpdate"
               v-model="heatPumpNothingOrOther"
               value="nothing">
        <label class="form-check-label" for="esGridRadios2">
          Nothing
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
               @change="onRadioUpdate"
               v-model="heatPumpNothingOrOther"
               value="other">
        <label class="form-check-label" for="gridRadios3">
          Other
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystemInput',
  props: {
    inputModel: Object,
  },
  emits: [
    'update:modelUpdate',
    'update:resetInputModel',
    'update:valid-inputs',
  ],
  data () {
    return {
      checkedSystemTypes: this.inputModel.checkedSystemTypes || [],
      heatPumpNothingOrOther: this.inputModel.heatPumpNothingOrOther || '',

      responseModel: {
        checkedSystemTypes: '',
        heatPumpNothingOrOther: '',
      },
    }
  },
  mounted () {
    console.log('ExistingSystemInput:onMount', this.inputModel)
    this.validateInputModel()
  },
  unmounted () {
    console.log('ExistingSystemInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInputModel () {
      if (this.checkedSystemTypes.length > 0 || this.heatPumpNothingOrOther) {
        this.$emit('update:valid-inputs', true)
      } else {
        this.$emit('update:valid-inputs', false)
      }
    },
    onUpdate (event) {
      console.log('ExistingSystemInput:onUpdate')
      console.log(event.target.value)
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes
      this.responseModel.heatPumpNothingOrOther = this.heatPumpNothingOrOther = ''
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onRadioUpdate (event) {
      this.responseModel.heatPumpNothingOrOther = this.heatPumpNothingOrOther
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes = []
      this.$emit('update:modelUpdate', this.responseModel)
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
