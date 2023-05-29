const functions = require('firebase-functions');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'build' } });
const handle = app.getRequestHandler();

exports.nextjsserver = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => {
    return handle(req, res);
  });
});