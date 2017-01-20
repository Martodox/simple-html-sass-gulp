const   gulp        = require('gulp'),
        babel       = require('gulp-babel'),
        browserify  = require('gulp-browserify'),
        watch       = require('gulp-watch'),
        runSequence = require('run-sequence'),
        concat      = require('gulp-concat'),
        chalk       = require('chalk'),
        server      = require('gulp-server-livereload');


const buildStuff = (src) => {
  return src
        .pipe(babel({presets: ['es2015']}).on('error', err => {console.log(err)}))
        .pipe(browserify().on('error', err => {console.log(err)}))
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

gulp.task('ecma6', () => {


    return buildStuff(gulp.src('src/ecma6/*.js'))
        .pipe(gulp.dest('dist/ecma6'))
});



gulp.task('webserver', function() {
    gulp.src('./dist')
    .pipe(server({
        livereload: true
    }));
});

gulp.task('default', () => {

    runSequence(['webserver', 'js', 'ecma6'], ['tests']);

    console.log(`${chalk.styles.green.open}[GULP] Starting watchers${chalk.styles.green.close}`);

    watch('./src/**/*.js', () => {
        runSequence(['js', 'ecma6'],  ['tests']);
    });
});
