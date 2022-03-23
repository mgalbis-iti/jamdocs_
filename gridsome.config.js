// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/config/*.scss')
      ],
    })
}

module.exports = {
  siteName: 'Jamdocs',
  siteUrl: 'https://mgalbis.github.io',
  pathPrefix: '/jamdocs',
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Doc',
        baseDir: 'docs',
        route: '/:slug',
        template: './src/templates/Doc.vue',
        plugins: [
          '@gridsome/remark-prismjs',
          [
            "@pondorasti/remark-img-links",
            {
              absolutePath: "https://mgalbis.github.io/jamdocs/"
            },
          ]
        ]
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    }
  ],
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}