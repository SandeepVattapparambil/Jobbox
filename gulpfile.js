//Gulpfile
'use strict';
//include gulp module
const gulp = require('gulp');
const del = require('del');
//include gulp-sass
const sass = require('gulp-sass');
const uglifyjs = require('gulp-uglify');
const concatjs = require('gulp-concat');
//setup file paths
const paths = {
    jQuerySource: 'bower_components/jQuery/dist/jquery.js',
    materializeSASS: 'bower_components/materialize/sass/**/*.scss',
    materializeJsSource: 'bower_components/materialize/dist/js/materialize.js',
    srcJS: 'src/js/*.js',
    srcSCSS: 'src/scss/*.scss',

    dist: 'public',
    distCSS: 'public/css/',
    distJS: 'public/js/'
};

const tasks = {
    development: ['cleanup-public-dir', 'copyjQuery', 'copyMaterializeJs', 'copyAllCcustomJs', 'compile-sass-css', 'compile-source-sass'],
    production: ['cleanup-public-dir', 'copy-compress-concat-all-js', 'compile-sass-css', 'compile-source-sass']
};

//clean working directory
gulp.task('cleanup-public-dir', () => {
    return del([paths.distCSS, paths.distJS]);
});
//copy jQuery from bower_components to public directory
gulp.task('copyjQuery', () => {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});

//copy materialize.js from bower_components to public directory
gulp.task('copyMaterializeJs', () => {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});
//copy custom javascript from working directory to public directory
gulp.task('copyAllCcustomJs', () => {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

//copy and concatenate all js files into one single file and compress it
gulp.task('copy-compress-concat-all-js', () => {
    return gulp.src([paths.jQuerySource, paths.materializeJsSource, paths.srcJS])
        .pipe(concatjs('script.js'))
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
//setup and run tasks
gulp.task('default', tasks[process.env.NODE_ENV === 'production' ? 'production' : 'development'], () => {
    console.log('Gulp tasks for '+process.env.NODE_ENV+' environment completed successfully!');
});
