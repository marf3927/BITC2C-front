const withCSS = require('@zeit/next-css')

module.exports = withCSS({
    cssModules: false,
    cssLoaderOptions: {
        url: false,
    }
})