<template>
  <div id="customer-priority" class="row mb-3" v-if="rawList.length">
    <div class="col-md-6 mx-auto question-answer-inputs">
      <h3>Priority</h3>
      <draggable
          class="list-group priority-list"
          v-model="list2"
          group="priority"
          itemKey="name"
          @change="onLeftChange"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">
              <span>
              {{ index + 1 }}.

              </span>
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="col-md-6 mx-auto question-answer-inputs">
      <h3>Options</h3>
      <draggable
          class="list-group raw-list"
          :list="list1"
          group="priority"
          @change="onRightChange"
          itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">
            <span>&nbsp;</span>
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import { shuffleArray } from '@/lib/utils'
import _ from 'lodash'

export default {
  name: 'CustomerPriorityInput',
  order: 7,
  components: { draggable },
  props: {
    inputModel: Object,
  },
  emits: ['update:modelUpdate', 'update:resetInputModel', 'update:valid-inputs'],
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
          name: 'Reduce carbon emissions',
        },
        {
          id: 4,
          type: 'comfort',
          name: 'Improve home\'s comfort',
        },
        {
          id: 5,
          type: 'Quietness',
          name: 'Less noisy system',
        },
        {
          id: 6,
          type: 'Speed',
          name: 'Quicker replacement',
        },
        {
          id: 7,
          type: 'air-quality',
          name: 'Improve indoor air quality',
        },
      ],
      list1: [],
      list2: this.inputModel.priorityList || [{}, {}, {}, {}, {}, {}, {}],
      list3: [{}, {}, {}, {}, {}, {}, {}],
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
    this.validateInputModel()
    this.shuffleList()
  },
  unmounted () {
    console.log('CustomerPriorityInput:unmounted')
    this.$emit('update:resetInputModel')
  },
  methods: {
    validateInputModel () {
      console.log(this.responseModel.priorityList.length)
      const priorities = this.list2.filter((i) => Object.hasOwn(i, 'id'))
      // console.log(priorities.length)
      if (priorities.length > 0) {
        this.$emit('update:valid-inputs', true)
      } else {
        this.$emit('update:valid-inputs', false)
      }
    },
    shuffleList () {
      this.list1 = this.rawList.map((item, index) => { return { ...item, id: index + 1 }})
      this.list1 = _.differenceWith(this.rawList, this.list2, _.isEqual)
      shuffleArray(this.list1)
      const diff = this.rawList.length - this.list1.length
      const f = Array.of(diff)
      const s = _.repeat('*', diff).split('')
      this.list1.push(..._.fill(s, { type: 'temp' }))
    },
    onLeftChange (event) {
      console.log('onLeftChange', event)
      const isAdd = Object.keys(event).includes('added')
      const isRemove = Object.keys(event).includes('removed')

      if (isRemove) {
        this.list2.push({ type: 'temp' })
      }
      if (isAdd) {
        const i = _.findIndex(this.list2, (i) => {
          return _.isEqual(i, {}) || i.type === 'temp'
        })
        _.pullAt(this.list2, [i])
      }
      this.responseModel.priorityList = this.list2
      this.responseModel.originalList = this.list1
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onRightChange: function (event) {
      console.log('onRightChange', event)
      const isAdd = Object.keys(event).includes('added')
      const isRemove = Object.keys(event).includes('removed')

      if (isRemove) {
        if (this.list1.length === 0)
          this.list1.push({ type: 'temp' })
        console.log(_.findIndex(this.list1, (i) => {return i.type === 'temp'}))
      }
      if (isAdd) {
        const i = _.findIndex(this.list1, (i) => {return i.type === 'temp'})
        _.pullAt(this.list1, [i])
      }
      this.responseModel.priorityList = this.list2
      this.responseModel.originalList = this.list1
      this.$emit('update:modelUpdate', this.responseModel)
      this.validateInputModel()
    },
    onUpdate (event) {
      // console.log('CustomerPriorityInput:onUpdate')
      // console.log('onUpdate', event.target.value)
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

.priority-list {
  border: #e8e8e8 dotted 1px !important;
}

.priority-list > .list-group-item {
  border: #e8e8e8 dotted 1px !important;
}

.raw-list {
  border: #000000 solid 1px !important;
}

.raw-list > .list-group-item {
  /*border: #000000 solid  !important;*/
}
</style>
