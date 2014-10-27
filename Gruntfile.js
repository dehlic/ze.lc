module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['browserify', 'uglify:dist', 'copy:dist', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      js: {
        files: 'app/scripts/{,**/}*.js',
        tasks: ['default'],
      },
      sass: {
        files: ['app/styles/{,**/}*.scss'],
        tasks: ['sass:compile', 'autoprefixer:singleFile']
      },

      images: {
        files: ['app/images/src/*.*'],
        tasks: ['grunticon:build']
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 4 version', 'ie 8', 'ie 9']
      },
      singleFile: {
        options: {
          // Target-specific options go here.
        },
        src: 'app/styles/main.css'
      },
      build: {
        src: 'dist/styles/main.css'
      }
    },

    sass: {
      compile: {
        files: {
          'dist/styles/main.css': 'app/styles/main.scss',
          'app/styles/main.css': 'app/styles/main.scss'
        }
      }
    }, // end sass

    grunticon: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/images/src',
          src: ['*.svg', '*.png'],
          dest: 'app/images/dist'
        }],
        options: {
        }
      }
    },

    browserify: {
      options: {
        transform : ['hbsfy']
      },
      main: {
        src: 'app/scripts/main.js',
        dest: 'dist/scripts/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts/main.js': ['dist/scripts/main.js']
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.html',
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'images/dist/{,*/}*.css',
            'images/as-is/{,*/}*.{svg,ico}'
          ]
        }]
      }
    }
  });
}
