|-- app                     //前端项目app
    |-- .browserslistrc     //浏览器
    |-- babel.config.js     //配置文件，用于兼容更多浏览器
    |-- package-lock.json   //缓存文件，用于记录所安装的插件的版本号等信息
    |-- package.json        //项目的说明性文件，用于说明项目的名字，版本，所配置的依赖
    |-- README.md           //项目描述性内容
    |-- vue.config.js       //配置开发环境的端口号等信息
    |-- public              //存放静态资源文件，用作webpack打包
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- mang.ico
    |-- src                 //项目源代码
        |-- App.vue         //整个项目的根组件
        |-- main.js         //整个项目的入口文件
        |-- router.js       //路由配置  
        |-- assets          //静态文件
        |   |-- bank.png
        |   |-- bank1.png
        |   |-- logo.png
        |   |-- mang.png
        |-- components      //存放非路由组件和全局组件
        |   |-- charts.vue
        |   |-- customerMessage.vue
        |   |-- e_barplot.vue
        |   |-- e_chart.vue
        |   |-- e_pan.vue
        |   |-- goodsMessage.vue
        |   |-- orderMessage.vue
        |   |-- sellMonitor.vue
        |   |-- showcharts.vue
        |   |-- showCustomer.vue
        |   |-- showGoods.vue
        |   |-- showOrder.vue
        |   |-- showSell.vue
        |-- views           //页面级别组件
            |-- Home.vue
            |-- Login.vue
