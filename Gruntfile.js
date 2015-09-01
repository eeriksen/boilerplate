'use strict';
module.exports = function (grunt) {

    //Properties
    var sourceDirectory = "src";
    var buildDirectory = "build";
    var deployDirectory = "deploy";

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // initialize the configuration object
    grunt.initConfig({

            //Load properties
            config: grunt.file.readJSON('config/default.json'),
            pkg: grunt.file.readJSON('package.json'),


            /*****************************************************
             Task:
             CLEAN - Delete resources, clean folders
             */
            clean: {
                all: [buildDirectory],
                main: [buildDirectory+'/index.html', buildDirectory+'/app/app.js'],
                css: [buildDirectory+'/app/css/**/*.css'],
                language: [buildDirectory+'/app/language'],
                images: [buildDirectory+'/app/images'],
                views: [buildDirectory+'/app/js/views.js'],
                common: [buildDirectory+'/app/js/common.js'],
                modules: [buildDirectory+'/app/js/modules.js'],
                model: [buildDirectory+'/app/js/model.js'],
                services: [buildDirectory+'/app/js/services.js'],
                libs: [buildDirectory+'/app/js/libs.js'],
                deploy: [deployDirectory]
            },


            /*****************************************************
             Task:
             SASS - Transpile stylesheets with SCSS
             */
            sass: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: sourceDirectory+'/assets/css/',
                        src: ['*.scss'],
                        dest: buildDirectory+'/app/css/',
                        ext: '.min.css'
                    }]
                }
            },


            /*****************************************************
             Task:
             CSSMIN - Minify stylesheets
             */
            cssmin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: deployDirectory+'/app/css/',
                        src: ['**/*.css'],
                        dest: deployDirectory+'/app/css/',
                        ext: '.min.css'
                    }]
                }
            },


            /*****************************************************
             Task:
             BOWER_CONCAT - Merge all bower dependencies into one file
             */
            bower_concat: {
                libs: {
                    dest: buildDirectory+'/app/js/libs.js',
                    bowerOptions: { relative: false }
                }
            },


            /*****************************************************
             Task:
             CONCAT - Merge two or more files into one.
             */
            concat: {
                options: {
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                    stripBanners: {
                        block: true
                    }
                },
                app: {
                    src: [sourceDirectory+'/app/app.modules.js', sourceDirectory+'/app/app.*.js'],
                    dest: buildDirectory+'/app/app.js'
                },
                common: {
                    src: [sourceDirectory+'/app/common/**/*.js'],
                    dest: buildDirectory+'/app/js/common.js'
                },
                model: {
                    src: [sourceDirectory+'/app/model/**/*.js'],
                    dest: buildDirectory+'/app/js/model.js'
                },
                services: {
                    src: [sourceDirectory+'/app/services/**/*.js'],
                    dest: buildDirectory+'/app/js/services.js'
                },
                modules: {
                    src: [sourceDirectory+'/app/modules/**/*.js'],
                    dest: buildDirectory+'/app/js/modules.js'
                }
            },


            /*****************************************************
             Task:
             UGLIFY - Minify and compress JavaScript files
             */
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: false,
                    compress: true
                },
                js: {
                    files: [{
                        expand: true,
                        cwd: deployDirectory,
                        src: ['app/js/**/*.js', 'app/app.modules.js'],
                        dest: deployDirectory
                    }]
                }
            },


            /*****************************************************
             Task:
             HTMLMIN - Minify and compress HTML files
             */
            htmlmin: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                index: {
                    files: [{
                        expand: true,
                        cwd: sourceDirectory,
                        src: 'index.html',
                        dest: buildDirectory
                    }]
                }
            },


            /*****************************************************
             Task:
             HTMLBUILD - Append correct paths to resources before deploying
             */
            htmlbuild: {
                test: {
                    src: deployDirectory+'/index.html',
                    dest: deployDirectory,
                    options: {
                        prefix: '<%= config.test.resUrl %>/',
                        relative: false,
                        scripts: {
                            'js': {
                                cwd: deployDirectory,
                                files: [
                                    'app/js/libs.js',
                                    'app/app.js',
                                    'app/js/views.js',
                                    'app/js/common.js',
                                    'app/js/modules.js',
                                    'app/js/model.js',
                                    'app/js/services.js'
                                ]
                            }
                        },
                        styles: {
                            'css': {
                                cwd: deployDirectory,
                                files: ['app/css/*.css']
                            }
                        }
                    }
                },
                prod: {
                    src: deployDirectory+'/index.html',
                    dest: deployDirectory,
                    options: {
                        prefix: '<%= config.test.resUrl %>/',
                        relative: false,
                        scripts: {
                            'js': {
                                cwd: deployDirectory,
                                files: [
                                    'app/js/libs.js',
                                    'app/app.js',
                                    'app/js/views.js',
                                    'app/js/common.js',
                                    'app/js/modules.js',
                                    'app/js/model.js',
                                    'app/js/services.js'
                                ]
                            }
                        },
                        styles: {
                            'css': {
                                cwd: deployDirectory,
                                files: ['app/css/*.css']
                            }
                        }
                    }
                }
            },


            /*****************************************************
             Task:
             JSON-MINIFY - Minify and compress JSON files
             */
            'json-minify': {
                language: {
                    files: deployDirectory+'/app/language/*.json'
                }
            },


            /*****************************************************
             Task:
             COPY - Copy files from one location to another
             */
            copy: {
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: sourceDirectory,
                            src: 'index.html',
                            dest: buildDirectory,
                            filter: 'isFile'
                        }
                    ]
                },
                language: {
                    files: [
                        {
                            expand: true,
                            cwd: sourceDirectory+'/assets',
                            src: 'language/*.json',
                            dest: buildDirectory+'/app',
                            filter: 'isFile'
                        }
                    ]
                },
                images: {
                    files: [
                        {
                            expand: true,
                            cwd: sourceDirectory+'/assets',
                            src: 'images/*',
                            dest: buildDirectory+'/app',
                            filter: 'isFile'
                        }
                    ]
                },
                deploy: {
                    files: [
                        {
                            expand: true,
                            cwd: buildDirectory,
                            src: '**/*.*',
                            dest: deployDirectory
                        }
                    ]
                }
            },


            /*****************************************************
             Task:
             NGTEMPLATES - Minify angular templates and create import statement that puts them in $templateCache
             */
            ngtemplates: {
                views: {
                    cwd: sourceDirectory+'/app',
                    src: '**/*.html',
                    dest: buildDirectory+'/app/js/views.js',
                    options: {
                        module: 'app',
                        htmlmin: {
                            collapseBooleanAttributes:      true,
                            collapseWhitespace:             true,
                            removeAttributeQuotes:          true,
                            removeComments:                 true,
                            removeEmptyAttributes:          true,
                            removeRedundantAttributes:      true,
                            removeScriptTypeAttributes:     true,
                            removeStyleLinkTypeAttributes:  true
                        },
                        url: function(url) {
                            var slashPos = url.lastIndexOf("/");
                            if(slashPos >= 0){
                                return url.substring(slashPos+1);
                            }else {
                                return url;
                            }
                        }
                    }
                }
            },



            /*****************************************************
             Task:
             WATCH - Watch for changes on files or directories, and perform consequent tasks
             */
            watch: {
                main: {
                    files: [sourceDirectory+'/index.html', sourceDirectory+'/app/app.*.js'],
                    tasks: ['main']
                },
                css: {
                    files: sourceDirectory+'/assets/css/**/*.scss',
                    tasks: ['css']
                },
                language: {
                    files: sourceDirectory+'/assets/language/**/*.json',
                    tasks:['language']
                },
                images: {
                    files: sourceDirectory+'/assets/images/**/*',
                    tasks:['images']
                },
                views: {
                    files: [sourceDirectory+'/app/**/*.html'],
                    tasks: ['views']
                },
                common: {
                    files: [sourceDirectory+'/app/common/**/*.js'],
                    tasks: ['common']
                },
                modules: {
                    files: [sourceDirectory+'/app/modules/**/*.js'],
                    tasks: ['modules']
                },
                model: {
                    files: [sourceDirectory+'/app/model/**/*.js'],
                    tasks: ['model']
                },
                services: {
                    files: [sourceDirectory+'/app/services/**/*.js'],
                    tasks: ['services']
                },
                libs: {
                    files: '/lib/*',
                    tasks: ['libs']
                }
            }


        }
    );

    // BUILD
    grunt.registerTask('main', ['clean:main', 'copy:main', 'concat:app']);
    grunt.registerTask('css', ['clean:css', 'sass']);
    grunt.registerTask('language', ['clean:language', 'copy:language']);
    grunt.registerTask('images', ['clean:images', 'copy:images']);
    grunt.registerTask('views', ['clean:views', 'ngtemplates:views']);
    grunt.registerTask('common', ['clean:common', 'concat:common']);
    grunt.registerTask('modules', ['clean:modules', 'concat:modules']);
    grunt.registerTask('model', ['clean:model', 'concat:model']);
    grunt.registerTask('services', ['clean:services', 'concat:services']);
    grunt.registerTask('libs', ['clean:libs', 'bower_concat']);

    grunt.registerTask('default', ['clean:all', 'main', 'css', 'language', 'images', 'views', 'common', 'modules', 'model', 'services', 'libs']);



};
