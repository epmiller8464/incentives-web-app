<template>
  <div id="customer-income" class="row border-bottom">
    <fieldset class="row mb-3">
      <div class="col-md-6">
        <div class="form-check" v-for="(option) in incomeOptions ">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option.value">
          <label class="form-check-label" for="gridRadios1">
            {{ option.option }}
          </label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CustomerIncomeInput',
}
</script>

<style scoped>

</style>
