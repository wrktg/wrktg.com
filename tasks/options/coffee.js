module.exports = {
  "scripts": {
    options: {
      bare: true
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
