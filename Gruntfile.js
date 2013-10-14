module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile %>',
				tasks: 'jshint:gruntfile',
			},

			dist: {
				files: '<%= jshint.dist %>',
				tasks: ['jshint:dist', 'mochacli:test', 'karma:test:run'],
			},

			test: {
				files: '<%= jshint.test %>',
				tasks: ['jshint:test', 'mochacli:test', 'karma:test:run'],
			},

			bin: {
				files: '<%= jshint.bin %>',
				tasks: ['jshint:bin', 'mochacli:test'],
			},
		},

		jshint: {
			gruntfile: 'Gruntfile.js',
			bin: 'bin/telepathy',
			dist: 'lib/**/*.{js,json}',
			test: ['test/**/*.json', 'test/**/*.js'],

			options: {
				curly: false,
				eqeqeq: false,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				regexdash: true,
				smarttabs: true,
				strict: false,
				browser: true,
				node: true,

				globals: {
					describe: false,
					it: false,
					before: false,
					after: false,
					beforeEach: false,
					afterEach: false,
				},
			},
		},

		mochacli: {
			test: 'test/**/*_test.js',
		},

		karma: {
			test: {
				hostname: '0.0.0.0',
				browsers: ['Firefox', 'Chrome', 'PhantomJS'],
			},

			phantom: {
				singleRun: true,
				browsers: ['PhantomJS'],
			},

			options: {
				reporters: 'dots',
				frameworks: ['mocha', 'browserify'],

				files: [
					'test/**/*_test.js',
				],

				browserify: {
					watch: true,
				},

				preprocessors: {
					'test/**/*.js': ['browserify'],
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-cli');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'mochacli', 'karma:phantom']);
};
