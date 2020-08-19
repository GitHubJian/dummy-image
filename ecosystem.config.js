const pkg = require('./package.json');
const {name: appname} = pkg;

module.exports = {
    name: appname,
    script: 'npm start',
    instance: 1,
    cwd: '.',
    error_file: `./logs/${appname}-err.log`,
    out_file: `./logs/${appname}-out.log`,
    env: {
        NODE_ENV: 'production'
    }
};
