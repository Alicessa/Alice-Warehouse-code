module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
             viewportHeight: 750, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置          
            unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', ], // 指定不转换为视窗单位的类，
            // 可以自定义，可以无限添加,建议定义一至两个通用的类名,指定ignore，前提加了标识
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px`
            // exclude:[/TabBar/]//排除渲染.必须使用正则
        },
        // 'postcss-viewport-units': {
        //     // 排除会产生警告的部份
        //     filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
        // },
        // cssnano: {
        //     preset: 'advanced',
        //     autoprefixer: false, // 和autoprefixer同样具有autoprefixer，保留一个
        //     'postcss-zindex': false
        // }
    }

}