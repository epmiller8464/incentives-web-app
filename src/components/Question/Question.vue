<template>
  <div class="question-container">
    <div class="row">
      <h2 class="display-6 text-center fw-bold">{{ questionText }}</h2>
      <p class="fst-italic text-center">{{ questionInfo }}</p>
    </div>
    <div class="row mb-3">
      <div class="question-input">
        <!--0. SystemType -->
        <slot v-if="this.questionId === 0">
          <NewSystemType
              v-model:input-model="systemTypeModel"
              @update:reset-input-model="onResetInputModel"
              @update:model-update="onInputModelUpdate"></NewSystemType>
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

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <button @click="onPreviousClick" type="button" class="btn btn-outline-danger btn-lg px-4 me-sm-3">
        Previous
      </button>
      <button @click="onNextClick" type="button" class="btn btn-outline-primary btn-lg px-4">
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
      if (qid === 0)
        this.$router.push({ name: 'GetStarted' })
      else
        this.$router.push({ name: 'Survey', params: { index: (qid - 1) } })

    },
    onNextClick () {
      //TODO: handle the end of questions logic to display case
      this.$router.push({ name: 'Survey', params: { index: (Number(this.$route.params.index) + 1) } })
    },
    onInputModelUpdate (event) {
      console.log('onInputModelUpdate')
      this.inputModel = event
      console.log(this.questionId, event)
      this.surveyStore.persistQuestionAnswer(this.questionId, event)
    },
    onResetInputModel (event) {
      console.log('onResetInputModel')
      // this.inputModel = { ...inputSchemaMap[this.questionId] }
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
              this.utilityModel = qaState
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
  setup (props, { emit }) {
    console.log(`question Setup`)
    // console.log(props)

  },
}
</script>

<style scoped>

</style>
