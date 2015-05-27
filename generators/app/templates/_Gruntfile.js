/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
	 
		copy: {
			fonts: {
				files: [{
                    expand: true,
                    flatten: true,
                    src: ['source/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
                    dest: 'fonts/',
                    filter: 'isFile'
                }],
			},
		},
	 
		imagemin: {
			img: {
				files: [{
					expand: true,
					cwd: 'source/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'images/'
				}]
			}
		},
		
		concat: {
			js: {
				src: [
					'bower_components/bootstrap/js/transition.js',
					'bower_components/bootstrap/js/alert.js',
					'bower_components/bootstrap/js/button.js',
					'bower_components/bootstrap/js/carousel.js',
					'bower_components/bootstrap/js/collapse.js',
					'bower_components/bootstrap/js/dropdown.js',
					'bower_components/bootstrap/js/modal.js',
					'bower_components/bootstrap/js/tooltip.js',
					'bower_components/bootstrap/js/popover.js',
					'bower_components/bootstrap/js/scrollspy.js',
					'bower_components/bootstrap/js/tab.js',
					'bower_components/bootstrap/js/affix.js',
					'bower_components/modernizr/modernizr.js',
					'bower_components/respond/src/respond.js',
					'source/js/scripts.js'
				],
				dest: 'js/main.js'
			}
		},
	
		uglify: {
			js: {
				src: ['<%= concat.js.dest %>'],
				dest: 'js/main.min.js'
			}
		},
	
		less: {
			css: {
				src: [
					'bower_components/bootstrap/less/bootstrap.less',
					'source/less/styles.less'
				],
				dest: 'css/main.css',
			}
		},
	
		cssmin: {
			options: {
				rebase: false
			},
			css: {
				src: ['<%= less.css.dest %>'],
				dest: 'css/main.min.css'
			}
		},
		
		compress: {
			main: {
				options: {
					archive: '../<%= pkg.name %>-v<%= pkg.version %>.zip'
				},
				files: [{
						src: [
							'css/**',
							'fonts/**',
							'html/**',
							'images/**',
							'js/**',
							'language/**',
							'component.php',
							'error.php',
							'favicon.ico',
							'index.html',
							'index.php',
							'offline.php',
							'template_preview.png',
							'template_thumbnail.png',
							'templateDetails.xml'
						],
						dest: '/',
				}],
			},
		},
	
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['default'],
			},
			fonts: {
				files: 'source/fonts/**/*.{eot,svg,ttf,woff,woff2}',
				tasks: ['fonts'],
			},
			img: {
				files: 'source/img/**/*.{png,jpg,gif,svg}',
				tasks: ['img'],
			},
			css: {
				files: 'source/less/**/*.less',
				tasks: ['css'],
			},
			js: {
				files: '<%= concat.js.src %>',
				tasks: ['js'],
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('zip', ['default', 'compress']);
	grunt.registerTask('fonts', ['copy:fonts']);
	grunt.registerTask('img', ['imagemin']);
	grunt.registerTask('css', ['less', 'cssmin']);
	grunt.registerTask('js', ['concat', 'uglify']);
	
	grunt.registerTask('default', ['fonts', 'img', 'css', 'js']);

};