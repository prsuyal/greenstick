const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
    const target = 'http://ec2-18-118-151-130.us-east-2.compute.amazonaws.com'; 

    const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/', 
        },
    });

    proxy(req, res, (err) => {
        if (err) {
            res.status(500).send('Proxy error');
        }
    });
};
