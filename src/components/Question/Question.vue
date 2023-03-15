<template>
  <div id="error-container">
    <div class="col-md col-md-6 col-lg-6 mx-auto">
      <h2 class="display-6 text-center fw-bold">{{ questionText }}</h2>
      <p class="fst-italic text-center">{{ questionInfo }}</p>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-1">

    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2">
      <div class="question-input mx-auto">
        <!--0. SystemType -->
        <slot v-if="this.questionId === 0">
          <NewSystemType
              v-model:input-model="systemTypeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
              @error:question-failure="onQuestionError"
              @update:valid-inputs="onValidInputs"
          >
          </NewSystemType>
        </slot>
        <!--1. UtilityProvider -->
        <slot v-else-if="this.questionId === 1">
          <SelectUtility
              v-model:input-model="utilityModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></SelectUtility>
        </slot>
        <!--2. ExistingSystem -->
        <slot v-else-if="this.questionId === 2">
          <ExistingSystemType
              v-model:input-model="existingSystemTypeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></ExistingSystemType>
        </slot>
        <!--3. SystemAge -->
        <slot v-else-if="this.questionId === 3">
          <ExistingSystemAge
              v-model:input-model="sysAgeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></ExistingSystemAge>
        </slot>
        <slot v-else-if="this.questionId === 4">
          <!--4. CustomerIncome -->
          <CustomerIncome
              v-model:input-model="incomeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></CustomerIncome>
        </slot>
        <slot v-else-if="this.questionId === 5">
          <!--5. CustomerPriority -->
          <CustomerPriority
              v-model:input-model="prioritiesModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></CustomerPriority>
        </slot>
        <slot v-else-if="this.questionId === 6">
          <!--6. CustomerAddress -->
          <CustomerAddress
              v-model:input-model="addressModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></CustomerAddress>
        </slot>
        <slot v-else-if="this.questionId === 7">
          <!--7. CustomerHomeSqFt -->
          <CustomerHomeSqFt
              v-model:input-model="homeSizeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></CustomerHomeSqFt>
        </slot>
        <slot v-else>
          <!--8. CustomerContactInfo -->
          <ContactInfo
              v-model:input-model="contactInfoModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"
          ></ContactInfo>
        </slot>
      </div>
    </div>
    <div class="d-grid gap-3 d-md-flex justify-content-md-center mt-3">
      <button @click="onPreviousClick" type="button" class="btn btn-outline-danger nav-button">
        Previous
      </button>
      <button
          type="button" class="btn btn-outline-primary nav-button"
          @click="onNextClick"
          :disabled="!hasValidInputs">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'

import {
  CustomerAddress,
  ContactInfo,
  CustomerHomeSqFt,
  CustomerIncome,
  CustomerPriority,
  SelectUtility,
  ExistingSystemAge,
  ExistingSystemType,
  NewSystemType,
} from '@/components/Question/QuestionInputs'
import ExistingSystemInput from '@/components/Question/QuestionInputs/ExistingSystemTypeInput.vue'

//TODO: track start and end time per question.
export default {
  name: 'Question',
  props: {
    questionText: { type: String, default: 'Question Text' },
    questionInfo: { type: String, default: 'Question info...' },
    questionType: { type: String, default: 'free_form' },
    questionId: { type: Number, default: 0 },
  },
  components: {
    ExistingSystemInput,
    CustomerAddress,
    ContactInfo,
    CustomerHomeSqFt,
    CustomerIncome,
    CustomerPriority,
    SelectUtility,
    ExistingSystemAge,
    ExistingSystemType,
    NewSystemType,
  },
  data () {
    return {
      systemTypeModel: {
        checkedSystemTypes: [],
        heatPumpOrOther: '',
      },
      utilityModel: {
        energyProvider: {},
        gasProvider: {},
      },
      existingSystemTypeModel: {
        checkedSystemTypes: [],
        heatPumpNothingOrOther: '',
      },
      sysAgeModel: '',
      homeSizeModel: '',
      incomeModel: '',
      prioritiesModel: {},
      addressModel: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      },
      contactInfoModel: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      hasValidInputs: false,
      startTime () {},
      endTime () {},
    }
  },
  computed: {
    ...mapStores(useSessionStore, useSurveyStore),
  },
  beforeMount () {
    console.log('question component beforeMount')
    this.loadAnswer()
  },
  mounted () {
    console.log('question component mounted')
    this.loadAnswer()
  },
  beforeUpdate () {
    console.log('question:updated')
    //TODO: prevent or warn about page reload
    this.loadAnswer()
  },
  beforeUnmount () {console.log('question:beforeUnmount')},
  unmount () {console.log('question:unmount')},
  methods: {
    onPreviousClick () {
      const qid = Number(this.$route.params.index)
      if (qid === 0) {
        this.$router.push({ name: 'GetStarted' })
      } else {
        this.$router.push({ name: 'Survey', params: { index: (qid - 1) } })
      }

    },
    onNextClick () {
      //TODO: handle the end of questions logic to display case
      if ((Number(this.$route.params.index) + 1) > 8) {
        this.$router.push({ name: 'DoingSomeMath' })
      } else {
        this.$router.push({ name: 'Survey', params: { index: (Number(this.$route.params.index) + 1) } })
      }
      this.hasValidInputs = false
    },
    onInputModelUpdate (event) {
      console.log('onInputModelUpdate')
      this.inputModel = event
      console.log(this.questionId, event)
      this.surveyStore.persistQuestionAnswer(this.questionId, event)
    },
    onResetInputModel (event) {},
    onValidInputs (event) {
      console.log(event)
      this.hasValidInputs = event
    },
    onQuestionError (event) {
      this.$router.push({ name: 'SurveyError' })
    },
    loadAnswer () {
      if (this.surveyStore) {
        const qaState = this.surveyStore.questionAnswerMap[this.questionId]
        console.log('questionState', qaState)
        if (qaState) {
          // console.log('got through')

          switch (this.questionId) {
            case 0:
              this.systemTypeModel = qaState
              break
            case 1:
              throw new Error('not implemented')
              // this.utilityModel = qaState
              break
            case 2:
              this.existingSystemTypeModel = qaState
              break
            case 3:
              this.sysAgeModel = qaState
              break
            case 4:
              this.incomeModel = qaState
              break
            case 5:
              this.prioritiesModel = qaState
              break
            case 6:
              this.addressModel = qaState
              break
            case 7:
              this.homeSizeModel = qaState
              break
            case 8:
              this.contactInfoModel = qaState
              break
            default:
              console.log('default switch option')
              break
          }

        }
      }
    },
  },
}
</script>

<style scoped>


</style>
