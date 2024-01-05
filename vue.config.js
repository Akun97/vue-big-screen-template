const { defineConfig } = require('@vue/cli-service');
const Icons = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      AutoImport.default({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver.default({
            prefix: 'icon',
            enabledCollections: ['ep']
          })
        ],
        imports: [
          "vue", 
          "vue-router",
          'pinia'
        ],
        dirs: [
          'src/hooks',
          'src/server',
          'src/store'
        ]
      }),
      Components.default({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver.default({
            prefix: 'icon',
            enabledCollections: ['ep']
          })
        ],
        dirs: ['src/components']
      }),
      Icons.default({
        autoInstall: true,
      })
    ],
    performance: {
      maxEntrypointSize: 50000000, // 入口起点的最大体积
      maxAssetSize: 30000000, // 生成文件的最大体积
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    });
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
        }
      }
    }
  },
  devServer: {
    client: {
      overlay: false
    },
    proxy: {
      '/api-prefix-dev': {
        target: 'http://10.2.1.16:32186',
        ws: false, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite:{
          '^/api-prefix-dev': ''
        }
      }
    }
  }
})