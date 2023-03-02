// Question.stories.js

import Question from './Question.vue'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Question',
  component: Question,
}

const Template = (args) => ({
  components: { Question },
  setup () {
    return { args }
  },
  template: '<Question v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  questionType: '',
  questionText: 'Some Question?',
  label: 'Question Component',
}
