module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        klassmer: {
            application: {
                options: {
                    namespace: 'klass',
                    src: '<%= pkg.directories.temp %>klass.js',
                    out: '<%= pkg.directories.build %>require-klass.js'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: '<%= pkg.directories.source %>',
                src: ['**/*.js'],
                dest: '<%= pkg.directories.temp %>',
            }
        },

        clean: {
            temp: ['<%= pkg.directories.temp %>']
        },

        concat: {
            dev: {
                src: '<%= pkg.directories.config %>dev.js',
                dest: '<%= pkg.directories.temp %>klass/config.js'
            },
            build: {
                src: '<%= pkg.directories.config %>build.js',
                dest: '<%= pkg.directories.temp %>klass/config.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.directories.build %><%= pkg.name %>.js',
                dest: '<%= pkg.directories.build %><%= pkg.name %>.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-klassmer');

    grunt.registerTask('build', [
        'copy',
        'concat:build',
        'klassmer',
        'clean',
        'uglify:build'
    ]);

    grunt.registerTask('default', ['build']);
};
