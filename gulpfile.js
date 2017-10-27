const gulp = require('gulp');

const plug = require('gulp-load-plugins')({
  rename: {
    'gulp-cached': 'cache',
  },
});

let source = {
  js: 'lib/*.js',
  test: 'test/**.{js,json}',
};

gulp.task('default', [ 'test' ]);

gulp.task('test', [ 'eslint', 'mocha' ]);

gulp.task('mocha', () =>
  gulp.src(source.test, { read: false })
    .pipe(plug.mocha({ reporter: 'spec' }))
);

gulp.task('eslint', () =>
  gulp.src([ source.js, source.test ])
    .pipe(plug.cache('lint'))
    .pipe(plug.eslint())
    .pipe(plug.remember('lint'))
    .pipe(plug.eslint.format())
    .pipe(plug.eslint.failAfterError())
);

gulp.task('watch', () => {
  gulp.watch(source.js, [ 'eslint' ]);
});
