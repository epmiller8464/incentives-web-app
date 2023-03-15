<template>
  <div id="error-container" class="container">
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">Page not found</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          We're sorry, we couldn't find the page you requested.
        </p>
        <div class="text-muted">
          If you feel something is missing that should be here, please contact us at
          <a href="mailto:info@usemantel.com">info@usemantel.com</a>
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <router-link
              class="btn btn-outline-primary btn-lg px-4 gap-3"
              :to="{name:'GetStarted'}">Go back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'NotFoundError',
  data () {
    return {}
  },
}
</script>

<style scoped>

</style>
