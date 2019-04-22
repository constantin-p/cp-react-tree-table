const path = require('path');
const fs = require('fs-extra');


module.exports = (options) => {
  options = options || {};
  return function(files, metalsmith, done) {
    if (options.src != null) {
      const src = path.join(metalsmith.directory(), options.src);
      
      fs.copySync(src, metalsmith.destination());
    }

    done();
  }
}