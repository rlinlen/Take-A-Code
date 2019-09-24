module.exports = function(){
   switch (process.env.NODE_ENV){
    case 'development':
        return {
            ////Web HTTPS
            webPrivateKey: '/config/selfsigned.key',
            webCertificate:'/config/selfsigned.crt',
            frontendServer: 'https://192.168.100.27:3000',
            backendServer: 'https://192.168.100.27:5001',
        
            ////Azure AD
            // Required
            identityMetadata: 'https://login.microsoftonline.com/aprinoia.onmicrosoft.com/.well-known/openid-configuration',
            // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
            //
            // or you can use the common endpoint
            // https://login.microsoftonline.com/aprinoia.onmicrosoft.com/.well-known/openid-configuration
            // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
            // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.
            // Required, the reply URL registered in AAD for your app
            redirectUrl: 'https://192.168.100.27:5000/auth/openid/return',
            // Required If need logout. Registered in AAD fro you app.
            logOutUrl: 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=https://192.168.100.27:3000/',
            // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
            responseType: 'code id_token',
            // Required
            responseMode: 'form_post',
            // Recommended to set to true. By default we save state in express session, if this option is set to true, then
            // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
            // to be completely express session free.
            // must set to true since I am not using express-session~~ 20190315 Len
            // weird behaviro using this and cookie-session together, change back to session~~ 20190318
            useCookieInsteadOfSession: false,
        
            // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
            // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
            // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
            cookieEncryptionKeys: [
                { 'key': '1234567890ous9fbusbjoejtjl789012', 'iv': '123thj78df12' },
                { 'key': 'abcdef13jj1tj02gjrgtuvwxyzabcdef', 'iv': 'abcdew4nijkl' }
            ],
        
            // Optional. The additional scope you want besides 'openid', for example: ['email', 'profile'].
            scope: null,
        
            // Required to set to true if the `verify` function has 'req' as the first parameter
            passReqToCallback: false,
        
        
            ////Solr
            solrBaseUrl: 'https://192.168.100.26:8983/solr',
            solrDefaultIndex: 'testStudy4-1',
        
        
            //api audit key
            apiAuthKey: 'jf09fue0jekJSDFJDSOGI0gjidjg0GJ0ggr0g0r9GJRIJ23t',
        
        
            //multer tmp save location:
            uploadLocation: '/home/pacs/tmp',
        };

    case 'production':
        return {
            ////Web HTTPS
            webPrivateKey: '/config/selfsigned.key',
            webCertificate:'/config/selfsigned.crt',
            frontendServer: 'https://take.aprinoia.com',
            backendServer: 'https://take.aprinoia.com',
        }

    default:
        return {
            error: 'please specify NODE_ENV'
        }; 
    }
}