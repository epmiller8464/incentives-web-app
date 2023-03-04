<template>
  <div id="contact-info" class="row g-3 px-5 mb-3">
    <fieldset class="row px-5">
      <div class="row g-3">
        <div class="col ps-0">
          <input type="text" class="form-control" placeholder="First name" aria-label="First name"
                 v-model="firstName"
                 @input="onFirstNameChange"
          >
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Last name" aria-label="Last name"
                 v-model="lastName"
                 @input="onLastNameChange"
          >
        </div>
      </div>
      <div class="row g-3">
        <input type="email" class="form-control" placeholder="Email" aria-label="Email"
               v-model="email"
               @input="onEmailChange"
        >
      </div>
      <div class="row g-3">
        <input type="text" class="form-control" placeholder="Phone Number" aria-label="Phone Number"
               v-model="phoneNumber"
               @input="onPhoneNumberChange"
        >
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
  data () {
    return {
      firstName: this.inputModel.firstName || '',
      lastName: this.inputModel.lastName || '',
      email: this.inputModel.email || '',
      phoneNumber: this.inputModel.phoneNumber || '',
      responseModel: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
    }
  },
  mounted () {
    console.log('ContactInfoInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('ContactInfoInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    onFirstNameChange (event) {
      this.responseModel.firstName = this.firstName = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onLastNameChange (event) {
      this.responseModel.lastName = this.lastName = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onEmailChange (event) {
      this.responseModel.email = this.email = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onPhoneNumberChange (event) {
      this.responseModel.phoneNumber = this.phoneNumber = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
    // onUpdate (event) {
    //   console.log('ContactInfoInput:onUpdate')
    //   console.log('onUpdate', event.target.value)
    //   this.$emit('update:modelUpdate', this.responseModel)
    // },
  },
}
</script>

<style scoped>

</style>
