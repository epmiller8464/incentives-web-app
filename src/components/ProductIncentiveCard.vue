<template>
  <div class="card" style="width: 275px;height: 600px;">
    <div class="card-header text-center">
      <p class="card-title h5">{{ titleTxt }}</p>
    </div>
    <div class="card-body">
      <div style="min-height: 50px; font-size: 0.95em;">
        <p class="text-start"><em>{{ subtitleTxt }}</em></p>
      </div>
      <div class="mx-auto" style="width: 150px;">
        <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="90%" height="100"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Responsive image"
             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text>
        </svg>
      </div>

      <p class="text-savings mt-4">
        <em class="">
          <strong>{{ estimatedCost }}</strong>
        </em>
        <button class="btn btn-link btnnp" data-bs-toggle="collapse" :data-bs-target="`#col${this.collapseId}`"
                role="button"
                aria-expanded="false" :aria-controls="`col${this.collapseId}`">
          <i class="bi bi-caret-down-square text-dark txt-icon text-start"></i>
        </button>
      </p>
      <div class="collapse" :id="`col${this.collapseId}`">
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
      <p class="text-start" style="padding-left: 0;">
        <em>
          <strong>{{ energySavings }}</strong>
        </em>
      </p>

      <!-- trees     -->
      <div class="text-start">
        <i class="bi bi-tree-fill text-success txt-icon text-start"
           v-if="Number(this.treeCount) > 0"
           v-for="n in Number(this.treeCount)"></i>
        <i class="bi bi-tree text-success txt-icon text-start" v-else></i>
      </div>
      <div class="mt-3">
        <p class="text-start"><strong>Sample Equipment:</strong></p>

        <i class="bi bi-caret-down-square text-dark txt-icon text-start position-absolute"></i>
        <ul class="ms-1">
          <li>
            <p class="mb-0">AC: 18 SEER2, 13 EER2
              <i class="bi bi-info-circle text-dark txt-icon text-start"></i>
            </p>

          </li>
          <li>
            <p class="mb-0">Furnace: 97% AFUE
              <i class="bi bi-info-circle text-dark txt-icon text-start"></i>
            </p>
            <p></p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductIncentiveCard',
  props: {
    cid: String,
    title: { type: String, required: true, default: 'Title' },
    subtitle: { type: String, default: 'Some text' },
    cost: { type: String },
    costSavings: { type: String },
    instantSavings: { type: String },
    annualSavings: { type: String },
    energySavings: { type: String },
    treeCount: { type: String },

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
    collapseId () {
      return this.cid
    },
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

.product-image {
  height: 150px;
  width: 250px;
  border: #e2e2e2 solid 2px;
}

.btnnp {
  /*padding-left: 0;*/
  text-decoration: none;
  color: #000000
}

.np {
  padding-bottom: 0 !important;
}


</style>
