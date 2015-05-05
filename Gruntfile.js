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
            aws: grunt.file.readJSON('config/aws.json'),


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
                fonts: [buildDirectory+'/app/fonts'],
                misc: [buildDirectory+'/app/misc'],
                views: [buildDirectory+'/app/js/views.js'],
                common: [buildDirectory+'/app/js/common.js'],
                sections: [buildDirectory+'/app/js/sections.js'],
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
                    bowerOptions: { relative: false },
                    dependencies: {
                        'angular-perfect-scrollbar-4.1.1fixed': 'perfect-scrollbar'
                    }
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
                sections: {
                    src: [sourceDirectory+'/app/sections/**/*.js'],
                    dest: buildDirectory+'/app/js/sections.js'
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
                dev: {
                    src: deployDirectory+'/index.html',
                    dest: deployDirectory,
                    options: {
                        prefix: '<%= config.dev.resUrl %>/',
                        relative: false,
                        scripts: {
                            'js': {
                                cwd: deployDirectory,
                                files: [
                                    'app/js/libs.js',
                                    'app/app.js',
                                    'app/js/views.js',
                                    'app/js/common.js',
                                    'app/js/sections.js',
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
                                    'app/js/sections.js',
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
                stage: {
                    src: deployDirectory+'/index.html',
                    dest: deployDirectory,
                    options: {
                        prefix: '<%= config.stage.resUrl %>/',
                        relative: false,
                        scripts: {
                            'js': {
                                cwd: deployDirectory,
                                files: [
                                    'app/js/libs.js',
                                    'app/app.js',
                                    'app/js/views.js',
                                    'app/js/common.js',
                                    'app/js/sections.js',
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
                misc: {
                    files: [
                        {
                            expand: true,
                            cwd: sourceDirectory+'/assets',
                            src: 'misc/*',
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
                libs: {
                    files: '/lib/*',
                    tasks: ['libs']
                }
            }


        }
    );





};
