<template>
  <div id="existing-system" class="row">
    <fieldset class="row mb-3">
      <div class="col-md-6 mx-auto question-answer-inputs">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="electricCheck"
                 @change="onUpdate"
                 v-model="checkedSystemTypes" value="central-ac">
          <label class="form-check-label" for="electricCheck">
            Central AC
          </label>
        </div>
        <div class="form-check">
          <input
              class="form-check-input" type="checkbox" id="gasCheckChecked"
              @change="onUpdate"
              v-model="checkedSystemTypes" value="furnace">
          <label class="form-check-label" for="gasCheckChecked">
            Furnace
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="esGridRadios1"
                 @change="onRadioUpdate"
                 v-model="heatPumpNothingOrOther"
                 value="heat-pump">
          <label class="form-check-label" for="esGridRadios1">
            Heat Pump
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
  emits: ['update:modelUpdate', 'update:resetInputModel'],
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
  },
  unmounted () {
    console.log('ExistingSystemInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      console.log('ExistingSystemInput:onUpdate')
      console.log(event.target.value)
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes
      this.responseModel.heatPumpNothingOrOther = this.heatPumpNothingOrOther = ''
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onRadioUpdate (event) {
      this.responseModel.heatPumpNothingOrOther = this.heatPumpNothingOrOther
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes = []
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 5vw;
}
</style>
