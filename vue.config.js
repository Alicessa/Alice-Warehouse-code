
//别名文件。执行时会做合并
module.exports = {
    configureWebpack: {//准备
        resolve: {
            alias: {
                //配置别名
                // 系统已经设置@为src
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'pluginunit':'@/pluginunit'
            }
        }
    },
    devServer: {
        host: '192.168.0.108',  //本机电脑 ip 地址
        port: 8080,  //端口号
    }
}