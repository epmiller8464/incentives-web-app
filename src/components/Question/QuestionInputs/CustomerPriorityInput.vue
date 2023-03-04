<template>
  <div id="customer-priority" class="row">
    <div class="row mx-auto" v-if="rawList.length">
      <div class="col">
        <h3>Comfort Options</h3>
        <draggable
            class="list-group"
            v-model="list1"
            group="priority"
            @change="log"
            itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
            <span>
                +
              </span>
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>

      <div class="col">
        <h3>Comfort Priority</h3>
        <draggable
            class="list-group"
            :list="list2"
            group="priority"
            @change="log"
            itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              <span>{{ index + 1 }}.</span>
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import { shuffleArray } from '@/lib/utils'

export default {
  name: 'CustomerPriorityInput',
  order: 1,
  components: { draggable },
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel'],
  data () {
    return {
      rawList: [
        {
          id: 1,
          type: 'cost',
          name: 'Lower upfront cost',
        },
        {
          id: 2,
          type: 'energy',
          name: 'Reduce monthly energy/utility bills',
        },
        {
          id: 3,
          type: 'emissions',
          name: 'Reduce carbon emissions from my house',
        },
        {
          id: 4,
          type: 'comfort',
          name: 'Improve comfort inside my house',
        },
        {
          id: 5,
          type: 'Quietness',
          name: 'Quietness',
        },
        {
          id: 6,
          type: 'Speed',
          name: 'Speed of replacement',
        },
      ],
      list1: this.inputModel.originalList || [],
      list2: this.inputModel.priorityList || [],
      responseModel: { priorityList: [], originalList: [] },
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },

  },
  mounted () {
    console.log('CustomerPriorityInput:onMount', this.inputModel)
    this.shuffleList()

  },
  unmounted () {
    console.log('CustomerPriorityInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    shuffleList () {
      // if (this.list1.length === this.rawList.length) {
      if (this.list2.length === 0) {
        shuffleArray(this.rawList)
        this.list1 = this.rawList.map((item, index) => { return { ...item, id: index + 1 }})
      }
      // }
      return this.list1
    },
    log: function (evt) {
      console.log(evt)
      console.log(this.list2)
      this.responseModel.priorityList = this.list2
      this.responseModel.originalList = this.list1
      this.$emit('update:modelUpdate', this.responseModel)
    },
    onUpdate (event) {
      console.log('CustomerPriorityInput:onUpdate')
      console.log('onUpdate', event.target.value)
    },
  },
}
</script>

<style scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
