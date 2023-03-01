<template>
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
</template>

<script>
export default {
  name: 'SystemTypeInput',
}
</script>

<style scoped>

</style>
