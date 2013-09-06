module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile %>',
				tasks: 'jshint:gruntfile'
			},

			dist: {
				files: '<%= jshint.dist %>',
				tasks: ['jshint:dist', 'nodeunit:test']
			},

			test: {
				files: '<%= jshint.test %>',
				tasks: ['jshint:test', 'nodeunit:test']
			},

			bin: {
				files: '<%= jshint.bin %>',
				tasks: ['jshint:bin', 'nodeunit:test']
			}
		},

		jshint: {
			gruntfile: 'Gruntfile.js',
			bin: 'bin/telepathy',
			dist: 'lib/**/*.{js,json}',
			test: ['test/**/*.json', '<%= nodeunit.test %>'],

			options: {
				curly: false,
				eqeqeq: false,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				smarttabs: true,
				strict: false,
				browser: true,
				node: true,

				globals: {
				}
			}
		},

		nodeunit: {
			test: 'test/**/*.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'nodeunit']);
};
