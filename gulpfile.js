//Gulpfile
'use strict';
//include gulp module
const gulp = require('gulp');
//include gulp-sass
const sass = require('gulp-sass');
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

//copy jQuery from bower_components to working directory
gulp.task('copyjQuery', () => {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});
//copy materialize.js from bower_components to working directory
gulp.task('copyMaterializeJs', () => {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});
//copy custom javascript from working directory to dist
gulp.task('copyAllCcustomJs', () => {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});
//compile materialize scss surce files from bower_components to css and pipe to working directory
gulp.task('compile-sass-css', () => {
    return gulp.src(paths.materializeSASS)
        .pipe(sass({
            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : ''
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS));
});
//compile custom scss surce files from working directory to css and pipe to dist directory
gulp.task('compile-source-sass', () => {
    return gulp.src(paths.srcSCSS)
        .pipe(sass({
            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : ''
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS));
});
//setup and run tasks
gulp.task('default', ['copyjQuery', 'copyMaterializeJs', 'copyAllCcustomJs', 'compile-sass-css', 'compile-source-sass'], () => {
    console.log('Gulp tasks completed successfully!');
});
