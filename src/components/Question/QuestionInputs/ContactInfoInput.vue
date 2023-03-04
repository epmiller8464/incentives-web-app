<template>
  <div id="contact-info" class="row g-3 px-5 mb-3">
    <fieldset class="row px-5">
      <div class="row g-3 mx-auto">
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
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  mounted () {
    console.log('ContactInfoInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('ContactInfoInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      console.log('ContactInfoInput:onUpdate')
      console.log('onUpdate', event.target.value)
    },
  },
}
</script>

<style scoped>

</style>
