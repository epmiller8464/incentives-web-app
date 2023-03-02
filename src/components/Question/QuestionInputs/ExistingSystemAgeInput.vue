<template>
  <div id="system-age" class="row">
    <div class="col-md-6 mx-auto">
      <input type="number"
             class="form-control" id="customRange1" min="1" max="40"
             placeholder="Existing System Age" aria-label="Existing System Age"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystemAgeInput',
}
</script>

<style scoped>
.question-answer-inputs {
  padding-left: 5vw;
}
</style>
