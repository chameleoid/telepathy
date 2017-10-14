const gulp = require('gulp');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');

let source = {
  js: 'lib/*.js',
  test: 'test/**.{js,json}',
};

gulp.task('test', [ 'jshint', 'mocha' ]);

gulp.task('mocha', () =>
  gulp.src(source.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
);

gulp.task('jshint', () =>
  gulp.src([ source.js, source.test ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
);
