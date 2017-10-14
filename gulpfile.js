const gulp = require('gulp');
const mocha = require('gulp-mocha');

let source = {
  js: 'lib/*.js',
  test: 'test/*.js',
};

gulp.task('test', () =>
  gulp.src(source.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
);
