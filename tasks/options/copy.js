module.exports = {

  "javascriptToTmp": {
    files: [{
      expand: true,
      cwd: 'scripts/',
      src: '**/*.js',
      dest: 'tmp/javascript/'
    }]
  },

  // Puts gathers files in `tmp/public`
  assemble: {
    files: [{
      expand: true,
      cwd: 'public/',
      src: ['**'],
      dest: 'tmp/public/'
    }, {
      src: ['vendor/**/*.js', 'vendor/**/*.css'],
      dest: 'tmp/public/'
    }
    ]
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/public',
      src: ['**', '!coverage'],
      dest: 'dist/'
    }]
  },
};
