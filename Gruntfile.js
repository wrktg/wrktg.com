module.exports = function(grunt) {

  var Helpers = require('./tasks/helpers'),
      filterAvailable = Helpers.filterAvailableTasks,
      _ = grunt.util._;

  Helpers.pkg = require("./package.json");
  Helpers.embersmith = require("./embersmith.json");

  if (Helpers.isPackageAvailable("time-grunt")) {
    require("time-grunt")(grunt);
  }

  // Loads task options from `tasks/options/`
  // and loads tasks defined in `package.json`
  var config = require('load-grunt-config')(grunt, {
    configPath: "tasks/options",
    init: false
  });
  grunt.loadTasks('tasks'); // Loads tasks in `tasks/` folder

  config.env = process.env;


  // Generate the production version
  // ------------------
  grunt.registerTask('dist', "Build a minified & production-ready version of your app.", [
                     'clean:dist', 'build:dist', 'copy:assemble', 'optimize' ]);

  // Default Task
  // ------------------
  grunt.registerTask('default', "Start server.", ['server']);


  // Servers
  // -------------------
  grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.", [
                     'clean:debug',
                     'build:debug',
                     'expressServer:debug',
                     'watch'
                     ]);

  grunt.registerTask('server:dist', "Build and preview a minified & production-ready version of your app.", [
                     'dist',
                     'expressServer:dist:keepalive'
                     ]);

  // Worker tasks
  // =================================

  grunt.registerTask('build:dist', [
                     'concurrent:dist', // Tasks are ran in parallel, see config below
                     ]);

  grunt.registerTask('build:debug', [
                     'concurrent:debug', // Tasks are ran in parallel, see config below
                     ]);

  grunt.registerTask('optimize', [
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'copy:dist',
                     'rev',
                     'usemin'
  ]);



  // Parallelize most of the build process
  _.merge(config, {
    concurrent: {
      dist: [
        "buildScripts",
        "buildStyles",
        "buildContents"
      ],
      debug: [
        "buildScripts",
        "buildStyles",
        "buildContents"
      ]
    }
  });

  // Scripts
  grunt.registerTask('buildScripts', filterAvailable([
                     'coffee',
                     'copy:javascriptToTmp',
                     'jshint'
                     ]));

  // Styles
  grunt.registerTask('buildStyles', filterAvailable([
                     'less:compile',
                     'cssmin'
                     ]));

  // HTML
  grunt.registerTask('buildContents', [
                     'embersmith:build',
                     'preprocess:HTML'
                     ]);

  grunt.initConfig(config);

  
};