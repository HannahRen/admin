import Koa from 'koa';
import chalk from 'chalk';
import {Nuxt, Builder} from 'nuxt';

const app = new Koa();
const environment = {
  host: '0.0.0.0',
  port: process.env.NUXT_PORT || '7003'
};

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

// Instantiate nuxt.js
const nuxt = new Nuxt(config);

// Build in development
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build().catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(ctx => {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

app.listen(environment.port, environment.host);
console.log(
  chalk.bold.white.bgBlue(
    `✅  NODE_ENV=${process.env
      .NODE_ENV} and the server is running at http://${environment.host}:${environment.port}/`
  ) // eslint-disable-line no-console
);
