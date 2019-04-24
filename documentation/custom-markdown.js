const markdown = require('metalsmith-markdownit');
const markdowndeflist = require('markdown-it-deflist');
const prism = require('prismjs');
const walk = require('fs-tools').walk;
const path = require('path');

// Block format
// @/KEY/VALUE@/
// @/KEY|OPTION1|OPTION2/VALUE@/

module.exports = (options) => {

  options = options || {};
  options.directory = options.directory || 'helpers';
  options.pattern = options.pattern || /\.js$/;
  return function(files, metalsmith, done) {
    // 1. Load custom rules
    let blockMap = {};
    const parseFile = function (file, stats, next) {
      let fn;
      try {
        fn = require(path.resolve(file));
      } catch (err) {
        return next(err);
      }
      const name = path.basename(file, path.extname(file));
      blockMap[name] = fn;
      next();
    }

    // 2. Markdown setup
    const setupMk = (done) => {
      var md = markdown({
        html: false,
        highlight: function (str, lang) {
          if (lang && lang == 'javascript') {
            return  prism.highlight(str.trim(), prism.languages.javascript, 'javascript');
          }
          return '<pre class="default"><code>' + md.parser.utils.escapeHtml(str.trim()) + '</code></pre>';
        }
      });
      md.use(markdowndeflist);

      md.parser.inline.ruler.push('custom_inline_block', (state, silent) => {
        let pos = state.pos;
        const max = state.posMax;
        if (!(state.src.charAt(pos) === '@' && state.src.charAt(pos + 1) === '/')) {
          return false;
        }
        pos += 2;
        const startPos = pos;
        
        const middlePos = state.src.indexOf('/', startPos);
        if (middlePos < 0 || middlePos >= max) {
          return false;
        }

        const endPos = state.src.indexOf('/@', middlePos + 1);
        if (endPos < 0 || endPos > max) {
          return false;
        }

        // Parse options
        const keyAndOptions = state.src.slice(startPos, middlePos);
        let key = keyAndOptions;
        let options = [];
        if (keyAndOptions.indexOf('|') > 0) {
          options = keyAndOptions.split('|');
          key = options.shift();
        }

        if (!silent) {
          let token = state.push('custom_inline_block', 'div', 0);
          token.attrs = {
            key: key,
            value: state.src.slice(middlePos + 1, endPos),
            options: options,
          }
        }

        state.pos = endPos + 2;
        return true;
      }, { alt: [] });

      // Custom block rule 
      md.parser.renderer.rules['custom_inline_block'] = (tokens, idx, _options, env, renderer) => {
        const { key, value, options } = tokens[idx].attrs;

        if (key == null || typeof blockMap[key] !== 'function') {
          return '';
        }

        return blockMap[key](md.parser.render(value), options);
      }
      md(files, metalsmith, done);
    }

    walk(metalsmith.path(options.directory), options.pattern, parseFile, (err) => {
      if (err != null) {
        done(err);
      } else {
        setupMk(done);
      }
    });
 }
}
