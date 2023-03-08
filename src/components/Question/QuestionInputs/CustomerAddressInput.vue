<template>
  <div id="customer-address" class="row mb-3">
    <div class="col border-bottom mb-3">
      <label for="addressAutoComplete" class="form-label ">Search for address</label>
      <!--        >-->
      <vue-google-autocomplete
          ref="address"
          id="addressAutoComplete"
          classname="form-control mb-3"
          placeholder="Please type your address"
          v-on:placechanged="getAddressData"
          country="us"
      >
      </vue-google-autocomplete>
    </div>
    <div class="col-12">
      <label for="inputAddress1" class="form-label">Address 2</label>
      <input type="text" class="form-control" id="inputAddress1" placeholder="123 Main Street"
             v-model="address1"
      >
    </div>
    <div class="col-12">
      <label for="inputAddress2" class="form-label">Address 2</label>
      <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"
             v-model="address2"
             @change="onAddress2"
      >
    </div>
    <div class="col-md-6">
      <label for="inputCity" class="form-label">City</label>
      <input type="text" class="form-control" id="inputCity"
             v-model="city">
    </div>
    <div class="col-md-4">
      <label for="inputState" class="form-label">State</label>
      <input type="text" class="form-control" id="inputState"
             v-model="state">
    </div>
    <div class="col-md-2">
      <label for="inputZip" class="form-label">Zip</label>
      <input type="text" class="form-control" id="inputZip" v-model="postalCode">
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'CustomerAddressInput',
  components: { VueGoogleAutocomplete },
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data: function () {
    return {
      address: '',
      address1: this.inputModel.address1 || '',
      address2: this.inputModel.address2 || '',
      city: this.inputModel.city || '',
      state: this.inputModel.state || '',
      country: this.inputModel.country || '',
      postalCode: this.inputModel.postalCode || '',
      responseModel: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: 'us',
        postalCode: '',
      },
    }
  },
  beforeMount () {
  },
  mounted () {
    console.log('CustomerAddressInput:onMount', this.inputModel)
    // Here we make focus on the user input
    this.$refs.address.focus()
  },
  unmounted () {
    console.log('CustomerAddressInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData, id) {
      const { address_components: addressModelParts } = placeResultData

      const { long_name: streetNumber } = addressModelParts.find((part) => part.types.includes('street_number'))
      const { long_name: route } = addressModelParts.find((part) => part.types.includes('route'))
      const { short_name: city } = addressModelParts.find((part) => part.types.includes('locality'))
      const { short_name: state } = addressModelParts.find((part) => part.types.includes('administrative_area_level_1'))
      const { short_name: country } = addressModelParts.find((part) => part.types.includes('country'))
      const { short_name: postalCode } = addressModelParts.find((part) => part.types.includes('postal_code'))
      // console.log(streetNumber, route, city, state, country, postalCode)
      this.responseModel.address1 = this.address1 = `${streetNumber} ${route}`
      this.responseModel.address2 = this.address2
      this.responseModel.city = this.city = city
      this.responseModel.state = this.state = state
      this.responseModel.country = this.country = country
      this.responseModel.postalCode = this.postalCode = postalCode
      this.address = ''
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onAddress2 (event) {
      // console.log('onAddress2', event.target.value)
      this.address2 = event.target.value
      this.responseModel.address2 = this.address2
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onUpdate (event) {
      console.log('CustomerAddressInput:onUpdate')
      console.log('onUpdate', event.target.value)
    },
  },
}
</script>

<style scoped>

</style>
