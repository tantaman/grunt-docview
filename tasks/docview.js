/*
 * grunt-docview
 * https://github.com/tantaman/grunt-docview
 *
 * Copyright (c) 2013 Matt Crinklaw-Vogt
 * Licensed under the MIT license.
 */

'use strict';

var handlebars = require('handlebars');

module.exports = function(grunt) {

  grunt.registerMultiTask('docview', 'Compiles YUIDOC data to various views', function() {
    var options = this.options({
      data: 'doc/data.json'
    });

    var yuidata = grunt.file.read(options.data);
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return handlebars.compile(grunt.file.read(filepath))(yuidata);
      }).join(grunt.util.normalizelf("\n"));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
