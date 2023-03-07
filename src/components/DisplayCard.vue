<template>
  <div class="card">
    <div class="card-header text-center">
      <p class="card-title h5 placeholder">{{ titleTxt }}</p>
    </div>
    <div class="card-body">
      <p class="text-center">
      <span class="placeholder">
          {{ subtitleTxt }}
      </span>
      </p>
      <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
           role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>
        Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <p class="text-center my-3">
        <em>
          <strong class="placeholder">{{ estimatedCost }}</strong>
        </em>
      </p>
      <div class="text-center my-3">
        <em class="placeholder">
          <strong>{{ estimatedCostSaving }}</strong>
        </em>
      </div>
      <p class="text-center my-3">
              <span class="placeholder">
                <em>
                  <strong>{{ energySavingsTxt }}</strong>
                </em>
              </span>
      </p>
    </div>
    <div class=" card-footer text-center">
      <i class="placeholder bi bi-tree txt-icon text-start"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayCard',
  props: {
    title: { type: String, required: true, default: 'Title' },
    subtitle: { type: String, default: 'Some text' },
    cost: { type: String },
    costSavings: { type: String },
    instantSavings: { type: String },
    annualSavings: { type: String },
    energySavings: { type: String },
    treeCount: { type: Number },

  },
  data () {
    return {
      titleTxt: this.title,
      subtitleTxt: this.subtitle,
      //''
      estimatedCost: this.cost,
      // '',
      estimatedCostSaving: this.costSavings,
      //''
      instantSavingsTxt: this.instantSavings,
      //'$2,000 Federal Tax Credit'
      annualSavingsTxt: this.annualSavings,
      energySavingsTxt: this.energySavings,
    }
  },
  computed: {
    displayTrees () {
      let trees = Array.from(4)
    },
  },
}
</script>

<style scoped>
.txt-icon {
  font-size: 1.3em !important;
}
</style>
