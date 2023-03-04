<template>
  <div id="customer-priority" class="row">
    <p>Coming soon ranking</p>
  </div>
</template>

<script>
export default {
  name: 'CustomerPriorityInput',
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate','update:resetInputModel'],
  mounted () {
    console.log('CustomerPriorityInput:onMount', this.inputModel)
  },
  unmounted () {
    console.log('CustomerPriorityInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    onUpdate (event) {
      console.log('CustomerPriorityInput:onUpdate')
      console.log('onUpdate', event.target.value)
    },
  }
}
</script>

<style scoped>

</style>
