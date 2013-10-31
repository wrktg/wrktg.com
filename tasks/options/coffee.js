module.exports = {
  "scripts": {
    options: {
      bare: false
    },
    files: [{
      expand: true,
      cwd: 'scripts/',
      src: '**/*.coffee',
      dest: 'tmp/javascript/',
      ext: '.js'
    }]
  }
};
