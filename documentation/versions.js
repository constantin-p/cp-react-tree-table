const multimatch = require('multimatch');


module.exports = (options) => {

  options = options || [];
  return function(files, metalsmith, done) {
    let metadata = metalsmith.metadata();
    let versions = {};
    let currentVersionKey;

    const fileKeys = Object.keys(files);
    options.forEach((versionKey) => {
      // Setup version sections
      const matchingFileKeys = multimatch(fileKeys, [`${versionKey}/**/*`]);
      if (matchingFileKeys.length > 0) {
        // Valid version (has a corresponding directory inside the source)
        versions[versionKey] = {
          sections: {}
        };
        let currentVersion = versions[versionKey];
        if (currentVersionKey == null) {
          currentVersionKey = versionKey;
        }

        // Setup sections
        matchingFileKeys.forEach((sectionFileKey) => {
          let parts = sectionFileKey
            .split('/')
            .map((part, i) => i == 0 ? part : part.replace(/\.[^/.]+$/, '')); // Remove extensions (ignore version tag folder)
          
          if (parts.length < 2) {
            console.warn('Invalid file name: ', sectionFileKey);
          } else {
            const sectionName = parts[1];

            if (currentVersion.sections[sectionName] == null) {
              currentVersion.sections[sectionName] = { articles: [], slug: generateSlug(`${parts[0]}_${parts[1]}_section`) };
            }

            files[sectionFileKey].slug = generateSlug(parts.join('_'));
            currentVersion.sections[sectionName].articles.push(files[sectionFileKey]);
            // Remove the file
            delete files[sectionFileKey];
          }
        })
      }
    })

    // Update the global metadata object
    metadata.versions = versions;
    metadata.currentVersionKey = currentVersionKey;
    done();
  }
}


const generateSlug = (str) => {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '-')                           // Replace spaces with -
    .replace(/\./g, '_')                            // Replace . with _
    .replace(/&/g, '-and-')                         // Replace & with 'and'
    .replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g, '')  // Remove all non-word chars
    .replace(/\-\-+/g, '-')                         // Replace multiple - with single -
    .replace(/^-+/, '')                             // Trim - from start of text
    .replace(/-+$/, '');                            // Trim - from end of text
}
