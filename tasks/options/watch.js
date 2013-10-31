var Helpers = require('../helpers');

var scripts = '{scripts}/**/*.{js,coffee}',
    styles = 'styles/**/*.{css,sass,scss,less,styl}',
    contents = 'contents/*.{md,markdown}',
    other = '{public}/**/*';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock']
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'unlock']
  },
  contents: {
    files: [contents],
    tasks: ['lock', 'embersmith:build', 'buildContents', 'unlock']
  },
  other: {
    files: [other, '!'+scripts, '!'+styles, '!'+contents],
    tasks: ['lock', 'build:debug', 'unlock']
  },

  options: {
    debounceDelay: 200,
    livereload: Helpers.isPackageAvailable("connect-livereload")
  }
};
