//Gulpfile
//include gulp module
const gulp = require('gulp');
//setup file paths
const paths = {
    jQuerySource: 'bower_components/jQuery/dist/jquery.js',
    materializeCssSource: 'bower_components/materialize/dist/css/materialize.css',
    materializeJsSource: 'bower_components/materialize/dist/js/materialize.js',
    srcCSS: 'public/src/css/*.css',
    srcJS: 'public/src/js/*.js',

    dist: 'public',
    distCSS: 'public/css/',
    distJS: 'public/js/'
};

gulp.task('copyjQuery', function () {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyMaterializeCss', function () {
    return gulp.src(paths.materializeCssSource).pipe(gulp.dest(paths.distCSS));
});

gulp.task('copyMaterializeJs', function () {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyAllCustomCss', function () {
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.distCSS));
});

gulp.task('copyAllCcustomJs', function () {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

gulp.task('default', ['copyjQuery', 'copyMaterializeCss', 'copyAllCustomCss', 'copyMaterializeJs', 'copyAllCcustomJs'], function () {
    console.log('Hello World!');
});
