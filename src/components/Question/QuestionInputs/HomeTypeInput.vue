<template>
  <div id="home-type" class="col-md-6 question-input mx-auto">
    <fieldset class="">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
               @change="onRadioUpdate"
               v-model="homeType"
               value="single-family">
        <label class="form-check-label" for="gridRadios1">
          Single-family (own yourself)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
               @change="onRadioUpdate"
               v-model="homeType"
               value="single-family-rented">
        <label class="form-check-label" for="gridRadios2">
          Single-family (rent from a landlord)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
               @change="onRadioUpdate"
               v-model="homeType"
               value="multi-family">
        <label class="form-check-label" for="gridRadios3">
          1-4 units
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
               @change="onRadioUpdate"
               v-model="homeType"
               value="apartment">
        <label class="form-check-label" for="gridRadios3">
          4+ unit multifamily, apartment, or condo building
        </label>
        <div>
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
  name: 'HomeTypeInput',
  props: {
    inputModel: Object,
  },
  data () {
    return {
      homeType: this.inputModel.homeType || '',
      responseModel: { ...this.inputModel },
    }
  },
  computed: {
  },
  mounted () {
    console.log('NewSystemTypeInput:onMount', this.inputModel)

  },
  unmounted () {
    this.$emit('update:resetInputModel')
  },
  methods: {
    onRadioUpdate (event) {
      this.responseModel.homeType = this.homeType
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
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
