const   gulp        = require('gulp'),
        babel       = require('gulp-babel'),
        browserify  = require('gulp-browserify'),
        watch       = require('gulp-watch'),
        runSequence = require('run-sequence'),
        concat      = require('gulp-concat'),
        chalk       = require('chalk'),
        server      = require('gulp-server-livereload'),
        sass        = require('gulp-sass'),
        plumber     = require('gulp-plumber');



const buildStuff = (src) => {
  return src
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']}))
        .pipe(browserify())
};


gulp.task('js', () => {

    console.log(`${chalk.styles.green.open}[GULP] Starting build task${chalk.styles.green.close}`);

    return buildStuff(gulp.src('src/app.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('tests', () => {

    return buildStuff(gulp.src(['src/app.js', 'src/tests.js'])
        .pipe(concat('tests.js')))
        .pipe(gulp.dest('dist'))
});


gulp.task('sass', function () {
  return gulp.src('./src/scss/app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'));
});


gulp.task('webserver', () => {
    gulp.src('./dist')
    .pipe(server({
        livereload: true,
        clientLog: 'info',
        fallback: 'index.html'

    }));
});

gulp.task('copy-html', () => {
    gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));

});

gulp.task('sass:watch', () => {
  return watch('./src/scss/**/*.scss', () => {
      runSequence(['sass']);
  });
});

gulp.task('js:watch', () => {
  return watch('./src/**/*.js', () => {
    runSequence(['js'],  ['tests']);
  });
});

gulp.task('html:watch', () => {
  return watch('./src/**/*.html', () => {
    runSequence(['copy-html']);
  });
});


gulp.task('default', () => {

    runSequence(['webserver', 'js', 'sass', 'copy-html'], ['tests'], ['sass:watch', 'js:watch', 'html:watch']);

    console.log(`${chalk.styles.green.open}[GULP] Starting watchers${chalk.styles.green.close}`);


});
