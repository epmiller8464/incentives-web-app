<template>
  <div id="cta" class="container">
    <h1>Doing some math to find you the best incentives...</h1>
    <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 2px">
      <div class="progress-bar" :style="{width:progress}"></div>
    </div>
<!--    <router-link :to="{name:'DisplayCase'}">Next</router-link>-->
  </div>
</template>

<script>
import '../scss/styles.scss'
import { mapStores } from 'pinia'
import { useSessionStore } from '@/stores/session'
import { useSurveyStore } from '@/stores/survey'

function sleep (time = 10000, message = 'sleeping for a few before checking again') {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      return resolve()
    }, time)
  })
}

let store
export default {
  name: 'DoingSomeMath',
  data () {
    return {
      currentProgress: 0,
    }
  },
  computed: {
    progress () {
      return `${this.currentProgress}%`
    },
    ...mapStores(useSessionStore, useSurveyStore),
  },
  mounted () {
    this.incrementProgressBar()
  },
  methods: {
    async incrementProgressBar () {
      while (this.currentProgress < 100) {
        this.currentProgress += 5
        await sleep(200)
      }
      this.$router.push({name:'DisplayCase'})
    },
  },
  setup () {},
}
</script>

<style scoped>

</style>
