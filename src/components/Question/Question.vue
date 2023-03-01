<template>
  <div class="px-4 pt-5 my-5">
    <h2 class="display-6 fw-bold">{{ questionText }}</h2>
    <p class="text-start fst-italic my-4">{{ questionInfo }}</p>
    <!--0. SystemType -->
    <div id="system-type" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Central AC
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label" for="flexCheckChecked">
              Furnace
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1">
            <label class="form-check-label" for="gridRadios1">
              Heat Pump
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
            <label class="form-check-label" for="gridRadios2">
              Other
            </label>

          </div>

        </div>
      </fieldset>
    </div>
    <!--1. UtilityProvider -->
    <div id="utility-provider" class="row border-bottom">
      <div class="input-group mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>Choose your energy provider</option>
          <option value="1">Austin Energy</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>Choose your gas provider</option>
          <option value="1">Texas Gas</option>
        </select>
      </div>
    </div>
    <!--2. ExistingSystem -->
    <div id="existing-system" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Central AC
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label" for="flexCheckChecked">
              Furnace
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1">
            <label class="form-check-label" for="gridRadios1">
              Heat Pump
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
            <label class="form-check-label" for="gridRadios2">
              Nothing
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
            <label class="form-check-label" for="gridRadios2">
              Other
            </label>
          </div>

        </div>
      </fieldset>
    </div>
    <!--3. SystemAge -->
    <div id="system-age" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="col-md-6">
          <label for="customRange1" class="form-label">Existing System Age?</label>
          <input type="number" class="form-control" id="customRange1" min="1" max="40">
        </div>
      </fieldset>
    </div>
    <!--4. CustomerIncome -->
    <div id="customer-income" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="col-md-6">
          <div class="form-check" v-for="(option) in incomeOptions ">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option.value">
            <label class="form-check-label" for="gridRadios1">
              {{ option.option }}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <!--5. CustomerPriority -->
    <div id="customer-priority" class="row border-bottom">
      <p>Coming soon ranking</p>
    </div>
    <!--6. CustomerAddress -->
    <div id="customer-address" class="row border-bottom">
      <p>Coming soon google maps api</p>
    </div>
    <!--7. CustomerHomeSqFt -->
    <div id="customer-home-sqft" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="col-md-6">
          <label for="customRange3" class="form-label">Home Square Feet</label>
          <input type="number" class="form-control" id="customRange1" min="1" max="30000">
        </div>

      </fieldset>
    </div>
    <!--8. CustomerContactInfo -->
    <div id="contact-info" class="row border-bottom">
      <fieldset class="row mb-3">
        <div class="row g-3">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" aria-label="First name">
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
          </div>
        </div>
        <div class="row g-3">
            <input type="text" class="form-control" placeholder="Email" aria-label="First name">
        </div>
        <div class="row g-3">
          <input type="text" class="form-control" placeholder="Phone Number" aria-label="First name">
        </div>
      </fieldset>
    </div>

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <router-link :to="{name:'GetStarted'}">
        <button type="button" class="btn btn-outline-danger btn-lg px-4 me-sm-3">Previous</button>
      </router-link>
      <router-link :to="{name:'Survey',params:{index:(Number(this.$route.params.index)+1)}}">
        <button type="button" class="btn btn-outline-primary btn-lg px-4">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>
const _incomeOptions = [
  { option: '$0 (or less)', value: 0 },
  //TODO: capture the income level as free form for this question
  { option: '$0 - $30,000', value: 1, rebate_eligible: false, show_free_form: true },
  { option: '$30,000 - $80,000', value: 2 },
  { option: '$80,000 - $150,000', value: 3 },
  { option: '$150,000+', value: 4 },
]
const questionTypes = {
  MULTIPLE_CHOICE: 'multiple-choice',
  MULTIPLE_SELECT: 'multiple-select',
  FREE_FORM_TEXT: 'free_form_text',
  RANKING: 'ranking',
}

export default {
  name: 'Question',
  props: {
    questionText: { type: String, default: 'Question Text' },
    questionInfo: { type: String, default: 'Question info...' },
    questionType: { type: String, default: 'free_form' },
    questionId: { type: Number, default: 0 },
  },
  components: {},
  data () {
    return {
      questionResponse: {},
    }
  },
  computed: {
    incomeOptions () {
      return _incomeOptions
    },
  },

  mounted () {
  },
}
</script>

<style scoped>

</style>
