//Gulpfile
//include gulp module
const gulp = require('gulp');
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

gulp.task('copyjQuery', () => {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyMaterializeJs', () => {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyAllCcustomJs', () => {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

gulp.task('compile-sass-css', () => {
    return gulp.src(paths.materializeSASS)
        .pipe(sass())
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('compile-source-sass', () => {
    return gulp.src(paths.srcSCSS)
        .pipe(sass())
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('default', ['copyjQuery', 'copyMaterializeJs', 'copyAllCcustomJs', 'compile-sass-css', 'compile-source-sass'], () => {
    console.log('Gulp tasks completed successfully!');
});