<template>
  <div id="customer-home-sqft" class="row border-bottom">
    <fieldset class="row mb-3">
      <div class="col-md-6">
        <label for="customRange3" class="form-label">Home Square Feet</label>
        <input type="number" class="form-control" id="customRange1" min="1" max="30000">
      </div>

    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CustomerHomeSqFtInput',
}
</script>

<style scoped>

</style>
