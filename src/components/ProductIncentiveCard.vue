<template>
  <div class="card">

    <div class="card-header text-center">
      <p class="card-title h5">{{ titleTxt }}</p>
    </div>
    <div class="card-body mt-1">
      <div style="min-height: 2.5rem; font-size: 0.95em;">
        <p class="text-center"><em>{{ subtitleTxt }}</em></p>
      </div>
      <div class="mx-auto px-3" >
        <img src="../assets/images/elementor-placeholder-image.webp" class="img-thumbnail"  alt="alt">
      </div>

      <p class="text-center mt-4">
        <em class="">
          <strong>{{ estimatedCost }}</strong>
        </em>
        <button class="btn btn-link btnnp" data-bs-toggle="collapse" :data-bs-target="`#col_${this.collapseId}`"
                role="button"
                aria-expanded="false" :aria-controls="`col_${this.collapseId}`">
          <i class="bi bi-caret-down-square text-dark txt-icon text-start"></i>
        </button>
      </p>
      <div v-if="savingSummariesList" class="collapse" :id="`col_${this.collapseId}`">
        <div class="card card-body">
          <p class="text-center" v-for="line in this.savingSummariesList">
            <em>
              <strong>{{ line }}</strong>
              <br>
            </em>
          </p>
        </div>
      </div>
      <p class="text-center" style="padding-left: 0;">
        <em>
          <strong>{{ energySavings }}</strong>
        </em>
      </p>
      <!-- trees     -->
      <div class="text-center">
        <i class="bi bi-tree-fill text-success txt-icon text-start"
           v-if="Number(this.treeCount) > 0"
           v-for="n in Number(this.treeCount)"></i>
        <i class="bi bi-tree text-success txt-icon text-start" v-else></i>
      </div>
      <div class="mt-3">
        <p class="text-start mb-0"><strong>Sample Equipment</strong></p>
        <ul class="m-0">
          <li v-if="equipmentSummaries" v-for="({summary,tooltip},index) in equipmentSummaries">
            <p class="m-0">{{summary}}
              <span class="custom-tooltip"></span>
              <i  class="bi bi-info-circle txt-icon text-start"
                 data-bs-toggle="tooltip" data-bs-placement="top"
                 data-bs-custom-class="custom-tooltip"
                 :data-bs-title="tooltip"></i>
            </p>

          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { Tooltip } from 'bootstrap'

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
    treeCount: { type: Number },
    equipmentSummary: { type: String },
    equipmentTooltip: { type: String },
    product: Object,
    equipmentSummaries: [Object],
    savingSummaries: [String]
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
      equipmentSummaryTxt: this.equipmentSummary,
      equipmentTooltipTxt: this.equipmentTooltip,
      savingSummariesList:this.savingSummaries
    }
  },
  computed: {
    collapseId () {
      return this.cid
    },
  },
  methods:{
  },
  mounted () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
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
