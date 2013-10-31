var Helpers = require('../helpers');

var scripts   = 'scripts/**/*.{js,coffee}',
    styles    = 'styles/**/*.{css,sass,scss,less,styl}',
    contents  = 'contents/**/*.{md,markdown}',
    templates = 'templates/**/*.{hbs,handlebars}',
    other     = '{public}/**/*';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock']
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'unlock']
  },
  embersmith: {
    files: [contents, templates],
    tasks: ['lock', 'embersmith:build', 'buildContents', 'unlock']
  },
  other: {
    files: [other, '!'+scripts, '!'+styles, '!'+contents, '!'+templates],
    tasks: ['lock', 'build:debug', 'unlock']
  },

  options: {
    debounceDelay: 200,
    livereload: Helpers.isPackageAvailable("connect-livereload")
  }
};
