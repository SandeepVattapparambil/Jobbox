//Gulpfile
'use strict';
//override event emitter maxListeners
require('events').EventEmitter.prototype._maxListeners = 100;
//include gulp module
const gulp = require('gulp');
const del = require('del');
//include gulp-sass
const sass = require('gulp-sass');
const uglifyjs = require('gulp-uglify');
const concatjs = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const inject = require('gulp-inject');
//setup file paths
const paths = {
    jQuerySource: 'bower_components/jQuery/dist/jquery.js',
    materializeSASS: 'bower_components/materialize/sass/**/*.scss',
    materializeJsSource: 'bower_components/materialize/dist/js/materialize.js',
    srcJS: 'src/js/*.js',
    srcSCSS: 'src/scss/*.scss',

    dist: 'public',
    distCSS: 'public/css/',
    distJS: 'public/js/',

    views: 'views',
    partials: 'views/partials'
};

//setup tasks flow for various environments
const tasks = {
    development: ['cleanup-public-dir', 'copy-jQuery', 'copy-materialize.js', 'copy-all-custom-js', 'compile-sass-css', 'compile-source-sass', 'inject-css', 'inject-js', 'nodemon', 'watch-files'],
    production: ['cleanup-public-dir', 'copy-compress-concat-all-js', 'compile-sass-css', 'compile-source-sass', 'inject-css', 'inject-js', 'nodemon']
};

//clean working directory
gulp.task('cleanup-public-dir', () => {
    return del([paths.distCSS + '*.*', paths.distJS + '*.*']);
});
//copy jQuery from bower_components to public directory
gulp.task('copy-jQuery', () => {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});

//copy materialize.js from bower_components to public directory
gulp.task('copy-materialize.js', () => {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});
//copy custom javascript from working directory to public directory
gulp.task('copy-all-custom-js', () => {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

//copy and concatenate all js files into one single file and compress it
gulp.task('copy-compress-concat-all-js', () => {
    return gulp.src([paths.jQuerySource, paths.materializeJsSource, paths.srcJS])
        .pipe(concatjs('script.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(paths.distJS));
});

//compile materialize scss surce files from bower_components to css and pipe to public directory
gulp.task('compile-sass-css', () => {
    return gulp.src(paths.materializeSASS)
        .pipe(sass({
            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : ''
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS));
});
//compile custom scss surce files from working directory to css and pipe to public directory
gulp.task('compile-source-sass', () => {
    return gulp.src(paths.srcSCSS)
        .pipe(sass({
            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : ''
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('watch-files', () => {
    console.log('Gulp is now watching....');
    gulp.watch([paths.srcJS, paths.srcSCSS], ['default'], () => {
        console.log('watcher updating resources....');
    });
});

let subTask = process.env.NODE_ENV === 'development' ? 'copy-all-custom-js' : 'copy-compress-concat-all-js';
let time = (new Date()).getTime();
const transform = (filepath) => {
    arguments[0] = filepath + '?v=' + time;
    return inject.transform.apply(inject.transform, arguments);
};
gulp.task('inject-js', [subTask], () => {
    return gulp.src('./views/partials/footer.ejs')
        .pipe(inject(gulp.src('./public/js/*.*', {
            read: false
        }), {
            relative: false,
            ignorePath: '/public',
            transform: process.env.NODE_ENV === 'development' ? '' : transform
        }))
        .pipe(gulp.dest(paths.partials));
});
gulp.task('inject-css', ['compile-sass-css', 'compile-source-sass'], () => {
    return gulp.src('./views/partials/header.ejs')
        .pipe(inject(gulp.src('./public/css/*.*', {
            read: false
        }), {
            relative: false,
            ignorePath: '/public',
            transform: process.env.NODE_ENV === 'development' ? '' : transform
        }))
        .pipe(gulp.dest(paths.partials));
});

gulp.task('nodemon', (cb) => {
    return nodemon({
        script: 'bin/www'
    }).once('start', cb);
});

//setup and run tasks
gulp.task('default', tasks[process.env.NODE_ENV === 'production' ? 'production' : 'development'], () => {
    console.log('Gulp tasks for ' + process.env.NODE_ENV + ' environment completed successfully!');
    console.log('Application is now is now ready!');
});
