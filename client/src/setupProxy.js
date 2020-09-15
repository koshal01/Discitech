const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', {
        target: 'https://code-fox-01.herokuapp.com',
        secure: false,
        changeOrigin: true
    }));

    app.use(proxy('/auth/facebook', {
        target: 'https://code-fox-01.herokuapp.com', 
        secure: false,
        changeOrigin: true
    }));

    app.use(proxy('/auth/github', {
        target: 'https://code-fox-01.herokuapp.com', 
        secure: false,
        changeOrigin: true
    }));
}