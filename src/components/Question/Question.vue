<template>
  <div class="px-4 pt-5 my-5">
    <h2 class="display-6 fw-bold">{{ questionText }}</h2>
    <p class="text-start fst-italic my-4">{{ questionInfo }}</p>
    <div class="my-4">
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
    </div>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <router-link :to="{name:'GetStarted'}">
        <button type="button" class="btn btn-outline-danger btn-lg px-4 me-sm-3">Previous</button>
      </router-link>
      <router-link :to="{name:'Survey',params:{index:(Number(this.$route.params.index)+1)}}" replace="replace">
        <button type="button" class="btn btn-outline-primary btn-lg px-4">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>

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
  mounted () {
  },
}
</script>

<style scoped>

</style>
