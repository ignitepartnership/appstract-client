/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./webpack_config/webpack.prod');
        break;
    case 'test':
    case 'testing':
        module.exports = require('./webpack_config/webpack.test')({env: 'test'});
        break;
    case 'dev':
    case 'development':
    default:
        //module.exports = require('./webpack_config/webpack.dev')({env: 'development'});
        module.exports = require('./webpack_config/webpack.dev');

}