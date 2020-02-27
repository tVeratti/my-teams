// DEV ONLY PROXY SERVER
// This allows netlify functions to be used during development.

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 1050;
const app = next({ dev: true });

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up netlify function proxy.
    server.use(
      '/.netlify/functions/*',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '/' },
        changeOrigin: true
      })
    );

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));
    server.listen(PORT, err => console.log(`> Ready on port ${PORT}`));
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
