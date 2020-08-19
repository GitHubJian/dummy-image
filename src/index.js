const koa = require('koa');
const address = require('address');
const createImageStream = require('./createImageStream');

const defaults = {
    port: 8080
};

const ip = address.ip();
const app = new koa();

const re = /^\/(\d+(\.\d+)?x\d+(\.\d+)?)(\/([A-Fa-f0-9]{6}))?(\/([A-Fa-f0-9]{6}))?/;

module.exports = function (config = {}) {
    const port = config.port || process.env.PORT || defaults.port;

    app.use(async function (ctx, next) {
        const reqpath = ctx.path;
        let ret;

        if ((ret = re.exec(reqpath))) {
            const wh = ret[1];
            const bgColor = ret[5];
            const color = ret[7];
            const text = ctx.query['text'];

            const [width, height] = wh.split('x');

            const stream = createImageStream({
                width: +width,
                height: +height,
                bgColor,
                color,
                text
            });

            ctx.set('Content-Type', 'image/png');

            ctx.body = stream;
        } else {
            await next();
        }
    });

    app.use(async function (ctx, next) {
        if (ctx.path === '/') {
            ctx.body = 'Dummy Image Run...';
        } else {
            return await next();
        }
    });

    app.listen(port, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log(`✨ Server on: http://${ip}:${port}`);
        }
    });
};
