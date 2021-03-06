/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	var base = grunt.option('base') || '.';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'lib/js/reveal.js',
				dest: 'lib/js/reveal.min.js',
			},
		},

		sass: {
			options: {
				outputStyle: 'compressed',
			},
			core: {
				files: {
					'css/reveal.css': 'css/reveal.scss',
				},
			},
			themes: {
				files: [
					{
						expand: true,
						cwd: 'css/theme/src',
						src: ['*.scss'],
						dest: 'css/theme/dist',
						ext: '.css',
					},
				],
			},
		},

		autoprefixer: {
			dist: {
				src: 'css/reveal.css',
			},
		},

		cssmin: { compress: { files: {} } },

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false,
				},
			},
			files: ['Gruntfile.js', 'js/reveal.js'],
		},

		connect: {
			server: {
				options: {
					port: port,
					base: base,
					livereload: true,
					open: true,
				},
			},
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**',
				'**.md',
			],
		},

		watch: {
			js: {
				files: ['Gruntfile.js', 'js/reveal.js'],
				tasks: 'js',
			},
			theme: {
				files: ['css/theme/src/*.scss'],
				tasks: 'css-themes',
			},
			css: {
				files: ['css/reveal.scss'],
				tasks: 'css-core',
			},
			html: {
				files: ['*.html'],
			},
			markdown: {
				files: ['*.md'],
			},
			options: {
				livereload: true,
			},
		},
	});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-zip');

	// Default task
	grunt.registerTask('default', ['css', 'js']);

	// JS task
	grunt.registerTask('js', ['jshint', 'uglify']);

	// Theme CSS
	grunt.registerTask('css-themes', ['sass:themes']);

	// Core framework CSS
	grunt.registerTask('css-core', ['sass:core', 'autoprefixer', 'cssmin']);

	// All CSS
	grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin']);

	// Package presentation to archive
	grunt.registerTask('package', ['default', 'zip']);

	// Serve presentation locally
	grunt.registerTask('serve', ['connect', 'watch']);

	// Run tests
	grunt.registerTask('test', ['jshint']);
};
