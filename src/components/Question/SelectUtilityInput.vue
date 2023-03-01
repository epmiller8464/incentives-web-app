<template>
  <div id="select-utility" class="row border-bottom">
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
</template>

<script>
export default {
  name: 'SelectUtilityInput',
}
</script>

<style scoped>

</style>
