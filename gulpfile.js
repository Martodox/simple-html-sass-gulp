const   gulp        = require('gulp'),
        babel       = require('gulp-babel'),
        browserify  = require('gulp-browserify'),
        qunit       = require('gulp-qunit'),
        watch       = require('gulp-watch'),
        runSequence = require('run-sequence'),
        chalk       = require('chalk'),
        server      = require('gulp-server-livereload');


gulp.task('js', () => {

    console.log(`${chalk.styles.green.open}[GULP] Starting build task${chalk.styles.green.close}`);

    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify())
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function() {
    gulp.src('./dist')
    .pipe(server({
        livereload: true
    }));
});

gulp.task('default', () => {

    runSequence('webserver', 'js');

    console.log(`${chalk.styles.green.open}[GULP] Starting watchers${chalk.styles.green.close}`);

    watch('./src/**/*.js', () => {
        runSequence('js');
    });
});