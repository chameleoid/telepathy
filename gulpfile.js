const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

let source = {
  js: 'lib/*.js',
  test: 'test/**.{js,json}',
};

gulp.task('test', [ 'eslint', 'mocha' ]);

gulp.task('mocha', () =>
  gulp.src(source.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
);

gulp.task('eslint', () =>
  gulp.src([ source.js, source.test ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('watch', () => {
  gulp.watch(source.js, [ 'eslint' ]);
});
