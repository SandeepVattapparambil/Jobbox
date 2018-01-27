const gulp = require('gulp');

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

gulp.task('css', function () {
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.distCSS));
});

gulp.task('js', function () {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

gulp.task('default', ['css', 'js'], function () {
    console.log('Hello World!');
});
