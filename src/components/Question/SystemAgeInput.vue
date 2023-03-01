<template>
  <div id="system-age" class="row border-bottom">
    <fieldset class="row mb-3">
      <div class="col-md-6">
        <label for="customRange1" class="form-label">Existing System Age?</label>
        <input type="number" class="form-control" id="customRange1" min="1" max="40">
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SystemAgeInput',
}
</script>

<style scoped>

</style>
