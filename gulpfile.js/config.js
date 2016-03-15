module.exports = {
    name: 'console-theme',
    directories: {
        dist: './wordpress/wp-content/themes/console',
        src: './src',
        wordpress: './wordpress',
        module: './node_modules'
    },
    proxy: 'development.server:9001',
    watch: false
}
