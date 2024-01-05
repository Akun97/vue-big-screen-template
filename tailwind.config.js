module.exports = {
  important: true,
  content: [
    './public/*.{html,js,ts,jsx,tsx,vue}',
    './src/*.{html,js,ts,jsx,tsx,vue}',
    './src/components/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/views/**/*.{html,js,ts,jsx,tsx,vue}',
    './src/views/**/**/*.{html,js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        theme: '#82B8FF',
        asc: '#F53A45',
        desc: '#06F7A1',
      },
      textColor: {},
      backgroundColor: {
        page: '#0A2442',
        menu: '#0A0F26',
      },
      backgroundImage: {
        'main': "url('@/assets/bg_main.png')",
        'head': "url('@/assets/bg_head.png')",
        'title-mini': "url('@/assets/bg_title_mini.png')",
        'title': "url('@/assets/bg_title.png')"
      },
      backgroundSize: {
        'full': '100% 100%',
      },
      borderColor: {
        menu: '#0285F6',
      },
      gridTemplateRows: {
        'screen-left': '1fr 1fr 1fr',
        'screen-center': '662fr 311fr',
        'screen-right': '1fr 1fr 1fr',
      },
      gridTemplateColumns: {
        'screen': '6fr 11fr 6fr',
      },
      boxShadow: {
        menu: '0px 0px 16px 0px rgba(23,112,246,0.5)'
      }
    }
  },
  plugins: []
}
