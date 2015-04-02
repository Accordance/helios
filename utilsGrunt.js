/* jshint node: true */
'use strict';

module.exports = {
  prependPath: function (pathToPrepend, arr) {
    var returnArray = [];
    arr.forEach(function (path) {
      returnArray.push(pathToPrepend + '/' + path);
    });
    return returnArray;
  },

  /**
   * Generates the very space consuming json config needed for grunt-replace
   *
   * @method generateReplaceConfigJson
   * @param {object} replacements the replacements in a single key-value pair object
   * @param {String} path the path from app/ (deployed to the same location relative to dist/)
   * @return {object} the json config for grunt-replace
   */
  generateReplaceConfigJson: function (replacements, path) {
    return {
      options: {
        patterns: [
          {
            json: replacements
          }
        ]
      },
      files: [
        {
          src: 'app/' + path,
          dest: 'dist/' + path
        }
      ]
    };
  }
};