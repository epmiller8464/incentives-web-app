<template>
  <div class="card" style="width: 350px;min-height: 651px;">
    <div class="card-header text-center">
      <p class="card-title h5">{{ titleTxt }}</p>
    </div>
    <div class="card-body">
      <p class="text-center">{{ subtitleTxt }}</p>
      <img src="../assets/images/goodman-hvac.webp" class="card-img product-image" alt="...">

      <p class="text-center my-3">
        <em>
          <strong>{{ estimatedCost }}</strong>
        </em>
      </p>
      <p class="text-center">
        <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseExample" role="button"
                aria-expanded="false" aria-controls="collapseExample">
          <i class="bi bi-caret-down text-warning txt-icon text-start"></i>
          <em class="text-success">
            <strong>{{ estimatedCostSaving }}</strong>
          </em>
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <p class="text-center">
            <em>
              <strong>{{ instantSavingsTxt }}</strong>
            </em>
          </p>
          <p class="text-center">
            <em>
              <strong>{{ annualSavingsTxt }}</strong>
              <br>
              <em>available next year</em>
            </em>
          </p>
        </div>
      </div>
      <p class="text-center text-success" >
              <span v-if="energySavingsTxt">
                 <i class="bi bi-caret-up txt-icon text-start"></i>
                <em class="text-success">
                  <strong>{{ energySavingsTxt }}</strong>
                </em>
              </span>
      </p>
    </div>
    <div class="card-footer text-center">

        <i class="bi bi-tree-fill text-success txt-icon text-start"
           v-if="Number(this.treeCount) > 0"
           v-for="n in Number(this.treeCount)"></i>
      <i class="bi bi-tree text-success txt-icon text-start" v-else></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductIncentiveCard',
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
