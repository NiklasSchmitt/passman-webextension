module.exports = function (grunt) {
    var jsResources = [];
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jsResources: [],
        cssResources: [],
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                curly: false,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                jshintrc: true,
                globals: {
                    "OC": true,
                    "console": true,
                    "CRYPTO": true,
                    "C_Promise": true,
                    "forge": true,
                    "sjcl": true,
                    "jQuery": true,
                    "$": true,
                    "_": true,
                    "oc_requesttoken": true
                }
            },
            all: ['js/*', '!js/vendor']
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'css/auto-login-popup.css': 'style/auto-login-popup.scss',
                    'css/browser_action.css': 'style/browser_action.scss',
                    'css/doorhanger.css': 'style/doorhanger.scss',
                    'css/doorhanger-iframe.css': 'style/doorhanger-iframe.scss',
                    'css/main.css': 'style/main.scss',
                    'css/password_picker.css': 'style/password_picker.scss',
                }
            }
        },
        watch: {
            scripts: {
                files: ['style/**/*.scss', 'style/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        mkdir: {
            dist: {
                options: {
                    mode: 0700,
                    create: ['dist']
                }
            }
        },
        copy: {
            dist: {
                src: [
                    '**',
                    '*.xpi',
                    '!fixLocale.js',
                    '!tests/*/**/*',
                    '!tests/*',
                    '!tests',
                    '!style/*/**/*',
                    '!style/*',
                    '!style',
                    '!node_modules/*',
                    '!node_modules/**',
                    '!dist/**',
                    '!dist/*',
                    '!.drone.yml',
                    '!.gitignore',
                    '!.jshintrc',
                    '!.scrutinizer.yml',
                    '!.travis.yml',
                    '!Gruntfile.js',
                    '!launch_phpunit.sh',
                    '!Makefile',
                    '!manifest-chrome.json',
                    '!manifest-firefox.json',
                    '!package.json',
                    '!package-lock.json',
                    '!phpunit.*',
                    '!Dockerfile',
                    '!*.md',
                    '!*.zip',
                    '!swagger.yaml',
                    '!.tx'
                ],
                dest: 'dist/'
            },
            firefox: {
                files: [{
                    expand: true,
                    src: ['manifest-firefox.json'],
                    rename: function () {
                        return 'manifest.json';
                    }
                }]
            },
            chrome: {
                files: [{
                    expand: true,
                    src: ['manifest-chrome.json'],
                    rename: function () {
                        return 'manifest.json';
                    }
                }]
            },
        },
        compress: {
            dist: {
                options: {
                    archive: 'extension.zip'
                },
                files: [
                    {src: ['**'], dest: '.', cwd: 'dist/'}, // includes files in path
                ]
            }
        },
        clean: {
            dist: ['dist']
        },
        exec: {
            fixLocale: {
                cmd: 'node fixLocale.js'
                // stdout: false,
                // stderr: false
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['jshint']);

    // Currently it's needed to separate the build-processes because firefox and chrome needs different manifest keys which are not compatible with each other.
    // grunt.registerTask('build', ['exec', 'sass', 'jshint', 'clean:dist', 'mkdir:dist', 'copy:dist', 'compress:dist']);
    grunt.registerTask('build-ff', ['exec:fixLocale', 'sass', 'jshint', 'clean:dist', 'mkdir:dist', 'copy:firefox', 'copy:dist', 'compress:dist']);
    grunt.registerTask('build-chrome', ['exec:fixLocale', 'sass', 'jshint', 'clean:dist', 'mkdir:dist', 'copy:chrome', 'copy:dist', 'compress:dist']);

    grunt.registerTask('dist', ['']);

};
