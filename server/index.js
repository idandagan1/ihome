/* eslint consistent-return:0 */

const express = require('@feathersjs/express');
const logger = require('./logger');
const routes = require('./routes');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const rest = require('@feathersjs/express/rest');
const versionate = require('feathers-versionate');

const services = require('./services');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const app = express(feathers());

app.configure(versionate());
app.configure(rest(restFormatter));
app.versionate('v2', '/v2/');

app.configure(services);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

function restFormatter(req, res) {
  res.format({
    'application/json': function() {
      res.json(res.data);
    },
    'text/html': function() {
      res.send(res.data);
    },
  });
}

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

app.use(routes);

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});