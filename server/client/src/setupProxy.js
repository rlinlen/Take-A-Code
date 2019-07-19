const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    /* app.use(proxy('/api/login/azuread', 
        { target: 'https://192.168.100.27:5000/',
        secure: false }
    )); */
    let cookie;
    function onProxyReq(proxyReq, req, res) {
        // add custom header to request
        //console.log("onProxyReq", proxyReq.headers);
        // or log the req
        if (cookie) {
            proxyReq.setHeader('cookie', cookie);
        }
      }
    function onProxyRes(proxyRes, req, res) {
        //console.log("onProxyRes", proxyRes.headers);
        let proxyCookie = proxyRes.headers["set-cookie"];
        if (proxyCookie) {
            //console.log("onProxyRes", proxyCookie);
            //console.log("onProxyRes", proxyRes.headers);
            cookie = proxyCookie;
        }
    }
    //matches paths starting with /api
    app.use(proxy('/api', 
        { 
            target: 'https://192.168.100.27:5001/',
            changeOrigin: true,
            secure: false,
            logLevel: "info"
        }
    ));
}


/* cookieDomainRewrite: {
    '*':'192.168.100.27'
    } */
/* "proxy": {
    "/api/login/azuread":{
      "target": "https://localhost:5000"
    }
  }, */