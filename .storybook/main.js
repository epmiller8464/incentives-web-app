import { mergeConfig } from 'vite'

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          modules: true,
          additionalData: '@import "src/scss/styles.scss";',
        },
      },
    }
  ],
  framework: '@storybook/vue3',
  core: {
    'builder': '@storybook/builder-vite',
  },
  async viteFinal (config) {
    // config.css = {
    //   preprocessorOptions: {
    //     scss: { additionalData: '@import "src/scss/styles.scss";' },
    //   },
    // };

    // config.resolve.alias = {
    //   '@components': path.resolve(__dirname, 'src/components'),
    //   '@pages': path.resolve(__dirname, 'src/pages'),
    //   '@assets': path.resolve(__dirname, 'src/assets'),
    //   '@styles': path.resolve(__dirname, 'src/styles'),
    //   '@settings': path.resolve(__dirname, 'src/settings'),
    //   '@utils': path.resolve(__dirname, 'src/utils'),
    // };
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      resolve: (await import('../vite.config.js')).default.resolve,
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    })
  },
  features: {
    'storyStoreV7': true,
    postcss:true
  },
}
