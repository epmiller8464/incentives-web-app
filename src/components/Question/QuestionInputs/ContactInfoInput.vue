<template>
  <div id="contact-info">

    <fieldset class="row">
      <div class="col-md-6">
        <input type="text"
               placeholder="First name" aria-label="First name"
               class="form-control"
               :class="[this.fnIsValid? '':'is-invalid']"
               v-model="firstName"
               @input="onFirstNameChange"
        >
        <div class="invalid-feedback">
          Invalid first name.
        </div>
      </div>
      <div class="col-md-6">
        <input type="text"
               placeholder="Last name" aria-label="Last name"
               class="form-control"
               :class="[this.lnIsValid? '':'is-invalid']"
               v-model="lastName"
               @input="onLastNameChange"
        >
        <div class="invalid-feedback">
          Invalid last name.
        </div>
      </div>
    </fieldset>
    <fieldset class="row">
      <div class="col-md-6">
        <input type="email"
               placeholder="Email" aria-label="Email"
               class="form-control"
               :class="[this.emailIsValid? '':'is-invalid']"
               v-model="email"
               @input="onEmailChange"
        >
        <div class="invalid-feedback">
          Invalid email.
        </div>
      </div>
      <div class="col-md-6">
        <input type="text"
               placeholder="Phone Number" aria-label="Phone Number"
               class="form-control"
               :class="[this.phoneIsValid? '':'is-invalid']"
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
      fnIsValid: true,
      lnIsValid: true,
      emailIsValid: true,
      phoneIsValid: true,

      responseModel: {
        firstName: this.inputModel.firstName || '',
        lastName: this.inputModel.lastName || '',
        email: this.inputModel.email || '',
        phoneNumber: this.inputModel.phoneNumber || '',
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
    validateName (text) {
      return /^[A-Z]+$/i.test(text)
    },
    validateEmail (text) {
      const regex = /^[^\s@]+@[^\s@]+$/g
      return regex.test(text)
    },
    validatePhoneNumber (text) {},
    onFirstNameChange (event) {
      const val = event.target.value
      if (val.length > 1) {
        this.fnIsValid = this.validateName(val)
        // console.log('first name')
        if (this.fnIsValid) {
          this.responseModel.firstName = this.firstName = event.target.value
          this.$emit('update:modelUpdate', this.responseModel)
        }
      }
    },
    onLastNameChange (event) {
      const val = event.target.value
      if (val.length > 1) {
        this.lnIsValid = this.validateName(val)
        if (this.lnIsValid) {
          this.responseModel.lastName = this.lastName = event.target.value
          this.$emit('update:modelUpdate', this.responseModel)
        }
      }
    },
    onEmailChange (event) {
      this.emailIsValid = this.validateEmail(event.target.value)
      if (this.emailIsValid) {
        this.responseModel.email = this.email = event.target.value
      }else{
        this.responseModel.email = ''
      }
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onPhoneNumberChange (event) {
      this.responseModel.phoneNumber = this.phoneNumber = event.target.value
      this.$emit('update:modelUpdate', this.responseModel)
    },
  },
}
</script>

<style scoped>

</style>
