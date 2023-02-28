<template>
  <div class="px-4 pt-5 my-5 text-center">
    <h1 class="display-4 fw-bold border-bottom">{{questionText}}</h1>
    <p class="lead my-4">{{questionInfo}}</p>
    <div class="mx-4 mb-4">
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="">
    </div>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Previous</button>
      <button type="button" class="btn btn-outline-secondary btn-lg px-4">Next</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Question',
  components: {},
  data () {
    return {
      questionText: 'Question Text',
      questionInfo: '"Question information..."',
      questionType: '',
      questionId: '',
      questionResponse: {},
    }
  },
}
</script>

<style scoped>

</style>
