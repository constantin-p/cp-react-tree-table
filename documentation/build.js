const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const discoverHelpers = require('metalsmith-discover-helpers');
const discoverPartials = require('metalsmith-discover-partials');

const assets = require('./assets.js');
const versions = require('./versions.js');
const customMarkdown = require('./custom-markdown.js');


metalsmith(__dirname)
  .source('./versions')
  .destination('./build')
  .use(customMarkdown({
    directory: 'layouts/mdblocks',
  }))
  .use(versions([ 'v1.0' ]))
  .use(assets({
    src: './public'
  }))
  .use(discoverHelpers({
    directory: 'layouts/helpers',
    pattern: /\.js$/
  }))
  .use(discoverPartials({
    directory: 'layouts/partials',
    pattern: /\.hbs$/
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    default: 'index.hbs',
    pattern: [ 'index.html' ],
  }))
  .build((err) => {
    if (err != null) {
      console.error(err);
    } else {
      console.log('[SUCCESS] Build finished.');
    }
  });

