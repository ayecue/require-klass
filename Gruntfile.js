module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                expand: true,
                cwd: '<%= pkg.directories.source %>',
                src: ['**/*.js'],
                dest: '<%= pkg.directories.temp %>',
            }
        },

        concat: {
            dev: {
                src: '<%= pkg.directories.config %>dev.js',
                dest: '<%= pkg.directories.temp %>XClass/config.js'
            },
            build: {
                src: '<%= pkg.directories.config %>build.js',
                dest: '<%= pkg.directories.temp %>XClass/config.js'
            }
        },

        amdwrap: {
            src: {
                expand: true,
                cwd: '<%= pkg.directories.temp %>',
                src: ['**/*.js'],
                dest: '<%= pkg.directories.build %>'
            }
        },

        browserify: {
            test: {
                files: {
                    'test_bundle.js': ['test-built/**/*.js']
                },
                options: {
                    transform: ['envify'],
                    verbose: true
                }
            }
        },

        requirejs: {
            dev: {
                options: {
                    baseUrl: "amd",
                    name: "../tools/vendor/almond",
                    out: "<%= pkg.directories.build %>require-xclass.js",
                    wrap: {
                        startFile: "tools/wrap.start",
                        endFile: "tools/wrap.end"
                    },
                    paths: {
                        'cls': './XClass',
                        'fn': './XClass/Functions',
                        'prop': './XClass/Properties',
                        'tpl': './XClass/Templates'
                    },
                    include: ["xclass"],
                    optimize: "none"
                }
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
    grunt.loadNpmTasks('grunt-amd-wrap');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('dev', [
        'copy',
        'concat:dev',
        'amdwrap',
        'browserify:test',
        'requirejs:dev',
        'uglify:build'
    ]);

    grunt.registerTask('build', [
        'copy',
        'concat:build',
        'amdwrap',
        'browserify:test',
        'requirejs:dev',
        'uglify:build'
    ]);

    grunt.registerTask('staging', ['dev']);
    grunt.registerTask('default', ['build']);
};
