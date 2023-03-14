<template>
  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">{{errorTitleTxt}}</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Please contact {{contractorNameTxt}} for more information.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn btn-outline-primary btn-lg px-4 gap-3">Start Over</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyError',
  props:{
    errorTitle:String,
    contractorName:String
  },
  data(){
    return {
      errorTitleTxt:'Survey Error',
      contractorNameTxt:'McCullough'
    }
  }
}
</script>

<style scoped>

</style>
