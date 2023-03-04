<template>
  <div id="system-type">
    <fieldset class="row mb-3">
      <div class="col-md-6 mx-auto question-answer-inputs">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="flexCheckDefault"
                 @change="onUpdate"
                 v-model="checkedSystemTypes" value="central-ac">
          <label class="form-check-label" for="flexCheckDefault">
            Central AC
          </label>
        </div>
        <div class="form-check">
          <input
              class="form-check-input" type="checkbox" id="flexCheckChecked"
              @change="onUpdate"
              v-model="checkedSystemTypes" value="furnace">
          <label class="form-check-label" for="flexCheckChecked">
            Furnace
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                 @change="onRadioUpdate"
                 v-model="heatPumpOrOther"
                 value="heat-pump">
          <label class="form-check-label" for="gridRadios1">
            Heat Pump
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
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'NewSystemTypeInput',
  props: {
    inputModel: Object,
  },
  data () {
    return {
      checkedSystemTypes: this.inputModel.checkedSystemTypes || [],
      heatPumpOrOther: this.inputModel.heatPumpOrOther || '',
      responseModel: this.inputModel,
    }
  },
  mounted () {
    console.log('NewSystemTypeInput:onMount', this.inputModel)
  },
  methods: {
    onUpdate (event) {
      console.log(event.target.value)
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes
      this.responseModel.heatPumpOrOther = this.heatPumpOrOther = ''
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onRadioUpdate (event) {
      this.responseModel.heatPumpOrOther = this.heatPumpOrOther
      this.responseModel.checkedSystemTypes = this.checkedSystemTypes = []
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
  emits: ['update:modelUpdate'],
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 10vw;
}
</style>
