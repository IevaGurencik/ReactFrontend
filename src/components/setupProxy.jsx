const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
            },
        })
    );

    app.use(
        createProxyMiddleware({
            target: 'http://16.192.224.87:8080',
            changeOrigin: true,
            pathRewrite: {
            },
        })
    );
};