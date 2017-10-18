const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const remember = require('gulp-remember');

let source = {
  js: 'lib/*.js',
  test: 'test/**.{js,json}',
};

gulp.task('default', [ 'test' ]);

gulp.task('test', [ 'eslint', 'mocha' ]);

gulp.task('mocha', () =>
  gulp.src(source.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
);

gulp.task('eslint', () =>
  gulp.src([ source.js, source.test ])
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(remember('lint'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('watch', () => {
  gulp.watch(source.js, [ 'eslint' ]);
});
