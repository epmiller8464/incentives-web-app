<template>
  <div id="contact-info" class="row border-bottom">
    <fieldset class="row mb-3">
      <div class="row g-3">
        <div class="col">
          <input type="text" class="form-control" placeholder="First name" aria-label="First name">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
        </div>
      </div>
      <div class="row g-3">
        <input type="text" class="form-control" placeholder="Email" aria-label="First name">
      </div>
      <div class="row g-3">
        <input type="text" class="form-control" placeholder="Phone Number" aria-label="First name">
      </div>
    </fieldset>
  </div>

</template>

<script>
export default {
  name: 'ContactInfoInput',
}
</script>

<style scoped>

</style>
