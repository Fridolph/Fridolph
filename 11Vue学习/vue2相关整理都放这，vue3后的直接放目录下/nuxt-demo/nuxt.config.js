module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "learn-nuxt-demo",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
      { name: "description", content: "vue nuxt demo" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },

    // 后面是自己配置的
    vendor: ["element-ui"],
    babel: {
      plugins: [
        [
          "component",
          [
            {
              libraryName: "element-ui",
              styleLibraryName: "theme-chalk"
            }
          ]
        ]
      ]
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    { src: "./plugins/element-ui", ssr: true },
    { src: "./plugins/particles", ssr: false },
    // { src: "./plugins/hotcss", ssr: false }
  ],
  css: [
    "./assets/css/main.css",
    "./assets/css/iconfont.css",
    "element-ui/lib/theme-chalk/index.css"
  ]
};
