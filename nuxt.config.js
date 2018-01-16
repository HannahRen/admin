module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '---胡莱管理台',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '胡莱管理台'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },
  css: [
    'element-ui/lib/theme-default/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    {
      src: '~assets/css/main.scss',
      lang: 'scss'
    }
  ],
  vender: ['element-ui'],
  babel: {
    plugins: [
      [
        'component',
        [
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-default'
          },
          'transform-async-to-generator',
          'transform-runtime'
        ]
      ]
    ],
    comments: true
  },
  plugins: [
    {
      src: '~plugins/element-ui',
      ssr: true
    }
  ],
  env: {
    gateway_base_url: process.env.GATEWAY_BASE_URL
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios'],
    render: {
      resourceHints: false
    },

    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  router: {
    middleware: 'breadcrumb'
  }
};
